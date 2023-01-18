import React, { useEffect, useState } from "react";
import { ScrollView, KeyboardAvoidingView, View, } from "react-native";
import firestore from "@react-native-firebase/firestore";
import Input from '../../Components/LoginInput';
import styles from "./CreateTeamPage.style";
import auth from "@react-native-firebase/auth"
import { Formik } from 'formik';
import Button from '../../Components/Button';
import { showMessage } from 'react-native-flash-message';
import { Provider } from "react-native-paper";

const initialFormValues = {
    name: "",
    mem1: "",
    mem2: "",
    mem3: "",
    mem4: "",
    mem5: "",
    city: "",
};
const CreateTeamPage = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState('')

    //AKTİF KULLANICILARIN VERİLERİNİ ÇEKME
    useEffect(() => {
        firestore()
            .collection('users')
            .doc(auth().currentUser.uid)
            .get().then((doc) => {
                setUser(doc.data())
            });
    }, []);

    //ADI GİRİLEN KULLANICILARIN BİLGİLERİNİ ÇEKME
    const searchMem = async (name) => {//Sorgu
        try {
            const collections = await firestore().collection('users').where('Name', '==', name).limit(1).get()
            const docs = collections.docs;
            try {
                if (docs[0].data().Name) {
                    return docs.map(doc => ({ ...doc.data() }));
                }
            } catch (error) {
                showMessage({
                    message: name + " adında bir oyuncu yok",
                    type: 'danger',
                });
                return;
            }
        } catch (e) {
            console.log(e.message)
        }
    }

    const hasteamControl = async (mem) => {
        memControl = mem[0].hasTeam;
        if (memControl == true) {
            showMessage({
                message: mem[0].Name + " isimli oyuncunun zaten bir takımı var.",
                type: 'danger',
            });
            return false;
        }
        return true;
    }

    const handleFormSubmit = async formValues => {
        let mem5_id = "";
        let mem4_id = "";
        let mem3_id = "";
        //TAKIMA SAHİP Mİ KONTROLÜ
        let mem1_id = await searchMem(formValues.mem1);
        const y1 = await hasteamControl(mem1_id)
        if (y1) {
            mem1_id = mem1_id[0].id;
        } else { return };

        let mem2_id = await searchMem(formValues.mem2);
        const y2 = await hasteamControl(mem2_id)
        if (y2) {
            mem2_id = mem2_id[0].id;
        } else { return; }

        if (formValues.mem3) {
            mem3_id = await searchMem(formValues.mem3);
            const y3 = await hasteamControl(mem3_id)
            if (y3) {
                mem3_id = mem3_id[0].id;
            } else { return; }
        }
        if (formValues.mem4) {
            mem4_id = await searchMem(formValues.mem4);
            const y4 = await hasteamControl(mem4_id)
            if (y4) {
                mem4_id = mem4_id[0].id;
            } else { return; }
        }
        if (formValues.mem5) {
            mem5_id = await searchMem(formValues.mem5);
            const y5 = await hasteamControl(mem5_id)
            if (y5) {
                mem5_id = mem5_id[0].id;
            } else { return; }
        }
        //TAKIMA SAHİP Mİ VE FORMDAN ALINIYOR MU KONTROLÜ

        //FORMDA GİRİLMESİ ZORUNLU ALANLAR KONTROLÜ
        if (formValues.mem1 === "") {
            showMessage({
                message: 'İlk oyuncu Girilmek zorundadır.',
                type: 'danger',
            });
            return;
        }
        if (formValues.name === "") {
            showMessage({
                message: 'Takım İsmi Girilmek Zorundadır.',
                type: 'danger',
            });
            return;
        }
        if (formValues.city === "") {
            showMessage({
                message: 'Şehir İsmi Girilmek Zorundadır.',
                type: 'danger',
            });
            return;
        }
        if (formValues.mem2 === "") {
            showMessage({
                message: 'İkinci oyuncu Girilmek zorundadır.',
                type: 'danger',
            });
            return;
        }
        //FORMDA GİRİLMESİ ZORUNLU ALANLAR KONTROLÜ

        //FİRESTORE İŞLEMLERİ
        try {
            setLoading(true);
            await firestore().collection('Teams').add(
                {
                    name: formValues.name,
                    captain: user.Name,
                    mem1: formValues.mem1,
                    mem2: formValues.mem2,
                    mem3: formValues.mem3,
                    mem4: formValues.mem4,
                    mem5: formValues.mem5,
                    city: formValues.city,
                    id: "",
                    ImageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Football_Pallo_valmiina-cropped.jpg",
                    type: "team"
                }
            ).then(() => {
                firestore().collection('users').doc(auth().currentUser.uid).update({
                    hasTeam: true,
                    isCaptain: true,
                    Team: formValues.name,
                }),
                    firestore().collection('users').doc(mem1_id).update({
                        hasTeam: true,
                        Team: formValues.name,
                    }),
                    firestore().collection('users').doc(mem2_id).update({
                        hasTeam: true,
                        Team: formValues.name,
                    }),
                {
                    if(mem3_id) {
                        firestore().collection('users').doc(mem3_id).update({
                            hasTeam: true,
                            Team: formValues.name,
                        })
                    }
                }
                {
                    if (mem4_id) {
                        firestore().collection('users').doc(mem4_id).update({
                            hasTeam: true,
                            Team: formValues.name,
                        })
                    }
                }
                {
                    if (mem5_id) {
                        firestore().collection('users').doc(mem5_id).update({
                            hasTeam: true,
                            Team: formValues.name,
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
                message: 'Takım Oluşturuldu',
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

    return (
        <Provider>
            <ScrollView>
                <View style={styles.container}>
                    <KeyboardAvoidingView behavior='position'>


                        <Formik initialValues={initialFormValues} onSubmit={handleFormSubmit}>
                            {({ values, handleChange, handleSubmit }) => (
                                <View style={styles.body_container}>
                                    <Input
                                        value={values.name}
                                        onChangeText={handleChange('name')}
                                        placeholder="Takım Adını Giriniz"
                                        iconName="name"
                                    />
                                    <Input
                                        value={values.city}
                                        onChangeText={handleChange('city')}
                                        placeholder="Şehrinizi Giriniz"
                                        iconName="name"
                                    />
                                    <Input
                                        value={values.mem1}
                                        onChangeText={handleChange('mem1')
                                        }
                                        placeholder="1. Oyuncuyu.."
                                        iconName="email"
                                    />
                                    <Input
                                        value={values.mem2}
                                        onChangeText={handleChange('mem2')}
                                        placeholder="2. Oyuncu..."
                                        iconName="age"
                                    />
                                    <Input
                                        value={values.mem3}
                                        onChangeText={handleChange('mem3')}
                                        placeholder="3. Oyuncu..."
                                        iconName="height"
                                    />
                                    <Input
                                        value={values.mem4}
                                        onChangeText={handleChange('mem4')}
                                        placeholder="4. Oyuncu..."
                                        iconName="height"
                                    />
                                    <Input
                                        value={values.mem5}
                                        onChangeText={handleChange('mem5')}
                                        placeholder="5. Oyuncu..."
                                        iconName="height"
                                    />
                                  

                                    <Button text={"Takım Oluştur"} loading={loading} onPress={handleSubmit} />
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