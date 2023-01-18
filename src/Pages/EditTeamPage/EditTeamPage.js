import React, { useEffect, useState } from "react";
import { ScrollView, KeyboardAvoidingView, Text, View, TouchableOpacity, ImageBackground, } from "react-native";
import firestore from "@react-native-firebase/firestore";
import Input from '../../Components/LoginInput';
import styles from "./EditTeamPage.style";
import auth from "@react-native-firebase/auth"
import { Formik } from 'formik';
import Button from '../../Components/Button';
import { showMessage } from 'react-native-flash-message';
import { Provider } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheet from "../../Components/BottomSheets/BottomSheet";
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';



// Takımdan oyuncu silmek oyuncunun hasTeam değişkenini değiştirmek
//Silinen oyuncunun Team Name silmek 

// oyuncu eklemek yukarıdaki işlemleri gerçekleştirmek
//Takıma fotoğraf eklemek
//Takım ismini değiştirebilmek
//Takımın şehrini değiştirebilmek
//

// // // // İLK TAKIMIN VERİLERİ ALINIP EKRANA BASILACAK
// // // // SONRA FORM VALİDASYONU SAĞLANACAK
// // // // OYUNCU SİL EKLE ÖZELLİKLERİ EKLENECEK
// // // // PLACEHOLDER Takım verileri gösterilecek
// // // // BUTON SADECE TAKIM KAPTANINA GÖZÜKECEK


/////////DELETE
// const deletePlayer = (playerId, teamName, isCaptain) => {
//   firestore().collection('users').doc(playerId).update({
//       hasTeam: false,
//       Team: firebase.firestore.FieldValue.delete()
//   });
//   firestore().collection('Teams').where('name', '==', teamName)
//   .get()
//   .then(function(querySnapshot) {
//       querySnapshot.forEach(function(doc) {
//           if (doc.data().captain === playerId && isCaptain) {
//               firestore().collection('Teams').doc(doc.id).update({
//                   captain: firebase.firestore.FieldValue.delete()
//               });
//           } else {
//               firestore().collection('Teams').doc(doc.id).update({
//                   [`mem${doc.data().mem1 === playerId ? 1 : doc.data().mem2 === playerId ? 2 : 3}`]: firebase.firestore.FieldValue.delete()
//               });
//           }
//       });
//   })
//   .catch(function(error) {
//       console.log("Error getting documents: ", error);
//   });
// }


///////////////////ADD
// const addPlayer = (formValues, teamName) => {
//   firestore().b collection('users').add({
//       name: formValues.name,
//       email: formValues.email,
//       hasTeam: true,
//       Team: teamName,
//   });
//   firestore().collection('Teams').where('name', '==', teamName)
//   .get()
//   .then(function(querySnapshot) {
//       querySnapshot.forEach(function(doc) {
//           if (!doc.data().mem1) {
//               firestore().collection('Teams').doc(doc.id).update({
//                   mem1: formValues.name,
//               });
//           } else if (!doc.data().mem2) {
//               firestore().collection('Teams').doc(doc.id).update({
//                   mem2: formValues.name,
//               });
//           } else if (!doc.data().mem3) {
//               firestore().collection('Teams').doc(doc.id).update({
//                   mem3: formValues.name,
//               });
//           }
//       });
//   })
//   .catch(function(error) {
//       console.log("Error getting documents: ", error);
//   });
// }




// const updateTeam= async(team)=>{
//   try {
//       await firestore().collection('Teams').doc(teamId).update(team)
//       navigation.navigate("Home")
//   } catch (error) {
//    console.log(error)   
//   }
// }

const initialFormValues = {
    name: "",
    captain: "",
    mem1: "",
    mem2: "",
    mem3: "",
    mem4: "",
    mem5: "",
    city: "",
    ImageUrl: "",
    type: ""
};
const CreateTeamPage = ({ navigation, route }) => {
    const [loading, setLoading] = useState(false);
    const [team, setTeam] = useState(false);
    const [image, setImage] = useState("https://upload.wikimedia.org/wikipedia/tr/2/25/Eski%C5%9Fehirspor.png");

    useEffect(() => {
        console.log("irem")
        console.log(route.params.teams)
        searchTeam(route.params.teams)
    }, []);


    const searchTeam = async (search) => {//Sorgu
        const collection = await firestore().collection('Teams').where('name', '==', search).limit(1).get()
        console.log(collection.docs)
        setTeam(
            collection.docs.map((doc) => {
                return { ...doc.data(), id: doc.id }
            })
        )
    }
    //TAKIMA SAHİP Mİ KONTROLÜ
    const hasteamControl = async (mem) => {
        console.log(mem[0].Name + 'hasteamcontrol yapılıyor');
        memControl = mem[0].hasTeam;
        console.log(memControl);
        if (memControl == true) {
            console.log('show message');
            showMessage({
                message: mem[0].Name + " isimli oyuncunun zaten bir takımı var.",
                type: 'danger',
            });
            return false;
        }
        return true;
    }

    const handleFormSubmit = async formValues => {
        //INITIAL OLARAK ESKİ VERİLERİ GİRİYORUZ
        let Name = team.Name
        let City = team.city
        let Mem1 = team.mem1
        let Mem2 = team.mem2
        let Mem3 = team.mem3
        let Mem4 = team.mem4
        let Mem5 = team.mem5
        let ImageUrl = team.ImageUrl
        let oldmem1_id = ""
        let oldmem2_id = ""
        let oldmem3_id = ""
        let oldmem4_id = ""
        let oldmem5_id = ""
        //INITIAL OLARAK ESKİ VERİLERİ GİRİYORUZ
        //TAKIMA SAHİP Mİ KONTROLÜ
        if (formValues.mem1) {
            let mem1_id = await searchMem(formValues.mem1);
            const y1 = await hasteamControl(mem1_id)
            if (y1) {
                oldmem1_id = await searchMem(Mem1);
                oldmem1_id = oldmem1_id[0].id;
                mem1_id = mem1_id[0].id;
                Mem1 = mem1_id[0].Name
                console.log("mem1 çalıştı");
            } else { return };
        }

        if (formValues.mem2) {
            let mem2_id = await searchMem(formValues.mem2);
            const y2 = await hasteamControl(mem2_id)
            if (y2) {
                oldmem2_id = await searchMem(Mem2);
                oldmem2_id = oldmem2_id[0].id;
                mem2_id = mem2_id[0].id;
                Mem2 = mem2_id[0].Name
                console.log("mem2 çalıştı");
            } else { return; }
        }

        if (formValues.mem3) {
            let mem3_id = await searchMem(formValues.mem3);
            const y3 = await hasteamControl(mem3_id)
            if (y3) {
                oldmem3_id = await searchMem(Mem3);
                oldmem3_id = oldmem3_id[0].id;
                mem3_id = mem3_id[0].id;
                Mem3 = mem3_id[0].Name
                console.log("mem3 çalıştı");
            } else { return; }
        }

        if (formValues.mem4) {
            let mem4_id = await searchMem(formValues.mem4);
            const y4 = await hasteamControl(mem4_id)
            if (y4) {
                oldmem4_id = await searchMem(Mem4);
                oldmem4_id = oldmem4_id[0].id;
                mem4_id = mem4_id[0].id;
                Mem4 = mem4_id[0].Name
                console.log("mem4 çalıştı");
            } else { return; }
        }

        if (formValues.mem5) {
            let mem5_id = await searchMem(formValues.mem5);
            const y5 = await hasteamControl(mem5_id)
            if (y5) {
                oldmem5_id = await searchMem(Mem5);
                oldmem5_id = oldmem5_id[0].id;
                mem5_id = mem5_id[0].id;
                Mem5 = mem5_id[0].Name
                console.log("mem5 çalıştı");
            } else { return; }
        }


        if (formValues.name != "") {
            Name = formValues.name;
        }
        if (formValues.city != "") {
            City = formValues.city;
        }
        if (image != "") {
            ImageUrl = image
        }
        //TAKIMA SAHİP Mİ KONTROLÜ

        //FİRESTORE İŞLEMLERİ
        try {
            setLoading(true);
            await firestore().collection('Teams').update(
                {
                    name: Name,
                    mem1: Mem1,
                    mem2: Mem2,
                    mem3: Mem3,
                    mem4: Mem4,
                    mem5: Mem5,
                    city: City,
                    ImageUrl: ImageUrl,
                }
            ).then(() => {
                {
                    if (mem1_id) {
                        firestore().collection('users').doc(mem1_id).update({
                            hasTeam: true,
                            Team: formValues.name,
                        })
                        firestore().collection('users').doc(oldmem1_id).update({
                            hasTeam: false,
                            Team: "",
                        })
                    }
                }
                {
                    if (mem2_id) {
                        firestore().collection('users').doc(mem1_id).update({
                            hasTeam: true,
                            Team: formValues.name,
                        })
                        firestore().collection('users').doc(oldmem2_id).update({
                            hasTeam: false,
                            Team: "",
                        })
                    }
                }
                {
                    if (mem3_id) {
                        console.log(mem3_id + 'firestore içindeyim');
                        firestore().collection('users').doc(mem3_id).update({
                            hasTeam: true,
                            Team: formValues.name,
                        })
                        firestore().collection('users').doc(oldmem3_id).update({
                            hasTeam: false,
                            Team: "",
                        })
                    }
                }
                {
                    if (mem4_id) {
                        console.log(mem4_id + 'firestore içindeyim');
                        firestore().collection('users').doc(mem4_id).update({
                            hasTeam: true,
                            Team: formValues.name,
                        })
                        firestore().collection('users').doc(oldmem4_id).update({
                            hasTeam: false,
                            Team: "",
                        })
                    }
                }
                {
                    if (mem5_id) {
                        console.log(mem5_id + 'firestore içindeyim');
                        firestore().collection('users').doc(mem5_id).update({
                            hasTeam: true,
                            Team: formValues.name,
                        })
                        firestore().collection('users').doc(oldmem5_id).update({
                            hasTeam: false,
                            Team: "",
                        })
                    }
                }
               
            }).catch(e => {
                console.log(e)
            });
            console.log("başarılı")
            navigation.navigate("Home")
            setLoading(false);
            showMessage({
                message: 'Güncellemeler Kaydedildi.',
                type: 'success',
            });
        } catch (error) {
            setLoading(false);
            console.log(error)
            showMessage({
                message: "Ay Bozuldum",
                type: 'danger',
            });
        }
    };
    //FİRESTORE İŞLEMLERİ
    //FOTOOO
    const [show, setshow] = useState(false);
    const takePhotos = () => {
        ImagePicker.openCamera({
            compressImageMaxWidth: 300,
            compressImageMaxHeight: 400,
            cropping: true,
            compressImageQuality: 0.7,
        }).then(async image => {
            console.log(image.path);
            setImage(image.path);
            const reference = storage().ref('userImage/' + auth().currentUser.uid);
            try {
                const task1 = reference.putFile(image.path);
                task1.on('state_changed', taskSnapshot => {
                    console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
                });
                task1.then(() => {
                    ImageUrl = image;
                    console.log('Image uploaded to the bucket!');
                });
            } catch (error) {
                if (error.code === 'E_PICKER_CANCELLED') {
                    return false;
                }
                console.log(error);
            }
        }).catch(e => {
            console.log(e)
        });
    }

    const notUndefined = anyValue => typeof anyValue !== 'undefined'
    const choosePhotos = () => {
        ImagePicker.openPicker({
            compressImageMaxWidth: 300,
            compressImageMaxHeight: 400,
            cropping: true,
            compressImageQuality: 0.7,
        }).then(async image => {
            setImage(image.path);
            const reference = storage().ref('teamImage/' + auth().currentUser.uid);
            try {
                const task = reference.putFile(image.path);
                task.on('state_changed', taskSnapshot => {
                    // console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
                });
                task.then(() => {
                    ImageUrl = image;
                    // console.log('Image uploaded to the bucket!');
                });
            } catch (error) {

            }
        }).catch(e => {
            console.log(e)
        });
    }
    //FOTOOOO
    console.log(team);
    return (
        <Provider>
            <ScrollView>
                <View style={styles.container}>

                    <KeyboardAvoidingView behavior='position'>

                        <View style={styles.TouchableOpacityContainer}>
                            <TouchableOpacity onPress={() => { setshow(true) }}>
                                <View style={styles.imageContainer}>
                                    <ImageBackground source={{ uri: image }}
                                        style={{ height: 100, width: 100 }}
                                        imageStyle={{ borderRadius: 15 }}>
                                        <View style={{
                                            flex: 1,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                            <Icon name="camera" size={40} color={'#fff'} style={styles.ıconContainer} />
                                        </View>
                                    </ImageBackground>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <BottomSheet show={show} onDismiss={() => { setshow(false); }}>
                            <Text style={styles.TitleBottomSheetStyle}> Fotoğraf Yükle</Text>
                            <Text style={styles.textBottomSheetStyle}> Fotoğrafını Seç</Text>
                            <TouchableOpacity style={styles.galleryButtonStyle} onPress={choosePhotos}>
                                <Text style={styles.galleyButtonTitleStyle}>
                                    Galeriden Seç</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.galleryButtonStyle} onPress={takePhotos}>
                                <Text style={styles.galleyButtonTitleStyle}>
                                    Fotoğraf Çek</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.galleryButtonStyle} onPress={() => {
                                try {
                                    setshow(false)

                                } catch (error) {
                                    console.log(error);
                                }
                            }}>
                                <Text style={styles.galleyButtonTitleStyle}>
                                    Geri Gel</Text>
                            </TouchableOpacity>
                        </BottomSheet>

                        <Formik initialValues={initialFormValues} onSubmit={handleFormSubmit}>
                            {({ values, handleChange, handleSubmit }) => (
                                <View style={styles.body_container}>
                                    <Input
                                        value={values.name}
                                        onChangeText={handleChange('name')}
                                        placeholder="Takım ismi"
                                        iconName="name"
                                    />
                                    <Input
                                        value={values.city}
                                        onChangeText={handleChange('city')}
                                        placeholder="Bulunduğunuz Şehir"
                                        iconName="name"
                                    />
                                    <Input
                                        value={values.mem1}
                                        onChangeText={handleChange('mem1')
                                        }
                                        placeholder="1. Oyuncu"
                                        iconName="email"
                                    />
                                    <Input
                                        value={values.mem2}
                                        onChangeText={handleChange('mem2')}
                                        placeholder="2. Oyuncu"
                                        iconName="age"
                                    />
                                    <Input
                                        value={values.mem3}
                                        onChangeText={handleChange('mem3')}
                                        placeholder="3. Oyuncu"
                                        iconName="height"
                                    />
                                    <Input
                                        value={values.mem4}
                                        onChangeText={handleChange('mem4')}
                                        placeholder="4. Oyuncu"
                                        iconName="height"
                                    />
                                    <Input
                                        value={values.mem5}
                                        onChangeText={handleChange('mem5')}
                                        placeholder="5. Oyuncu"
                                        iconName="height"
                                    />
                                  
                                    <Button text={"Değişiklileri Kaydet"} loading={loading} onPress={handleSubmit} />
                                </View>
                            )}
                        </Formik>
                    </KeyboardAvoidingView>

                </View>

            </ScrollView>
        </Provider>
    );

}
export default CreateTeamPage;