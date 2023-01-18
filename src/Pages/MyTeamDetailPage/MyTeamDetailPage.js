import { View, Text,StyleSheet, SafeAreaView, Image, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import React, { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import auth from '@react-native-firebase/auth';
import styles from "../MyTeamDetailPage/MyTeamDetailPage.style";
import { Provider } from "react-native-paper";
import BottomSheet from '../../Components/detailBottomSheet/DetailBottomSheet';
import Storage from "@react-native-firebase/storage";
import Button from '../../Components/Button';
import Icon from "react-native-vector-icons/Ionicons";




// SAYFA İLK AÇILDIĞINDA UNDEFINED DÖNÜYOR VE SAYFA YÜKLENMİYOR EĞER Kİ sayfayı kayıt edersen sayfa ekrana basılıyor. ALINAN HATA İSE 
//[Error: firebase.firestore().collection().where(_, _, *) 'value' argument expected.]


const MyTeamDetailPage = ({ navigation }) => {
  const img = "https://as2.ftcdn.net/v2/jpg/01/26/61/13/1000_F_126611337_m8kcRtS5G7AhrFpOQ0Wufx4PgL6J4yxg.jpg";
  const [Team, setTeam] = useState([])
  const [show, setshow] = useState(false);
  const [member, setmember] = useState([])
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .get()
      .then((doc) => {
        searchTeam(doc.data().Team);
      });

  }, []);
  
  //Takım Arama
  const searchTeam = async (name) => {//Sorgu
    console.log(name);
    try {
      const collection = await firestore().collection('Teams')
      .where('name', '==', name)
      .limit(1)
      .get()
      console.log(collection.docs)
      setTeam(
        collection.docs.map((doc) => {
          return { ...doc.data(), id: doc.id }
        })
      )
    } catch (error) {
      console.log(error);
    }
  }


  const searchMem = async (name) => {//Sorgu
    const collection = await firestore().collection('users').where('Name', '==', name).get()
    //console.log(collection.docs)
    try {
      if (collection !== "") {
        setmember(
          collection.docs.map((doc) => {
            return { ...doc.data(), id: doc.id }
          })
        )
      }
    } catch (error) {

      console.log(error)
    }

  }

  //Fotoğraf cekme
  const func = async (use) => {
    try {
      console.log("aaa")
      // console.log(Storage().ref)
      const reference = await Storage().ref('userImage/' + use).getDownloadURL()
      //console.log(reference)
      if (reference !== null) {
        setImageUrl(reference)
      }
    } catch (error) {
      console.log(error)
      setImageUrl(img)
    }
  }

  return (
    <Provider>
      <SafeAreaView>
        {Team.map((teams) => {
          return (
            <View key={teams.id}>
 <View>
                                <Image source={require("../../assets/deneme3.jpg")} style={StyleSheet.absoluteFillObject}  blurRadius={1} /></View>
              <View style={styles.team_container}>
             
                <View style={styles.editButton}>
                  <Button theme="tertiary" size={15} icon={"cog-outline"} onPress={() => { navigation.navigate('TeamEditPage', { teams: teams.name }) }}>
                  </Button>
                </View>
                <View style={{flexDirection:'row',marginLeft:Dimensions.get('window').width/3.75}}>
                <Image style={styles.image} source={{ uri: teams.ImageUrl }} />
                <Text style={styles.title}>{teams.name}</Text>
                </View>
              </View>
              <View style={styles.inner_container}>
                <ImageBackground source={require("../../assets/Soccer_Field_Transparant.svg.png")} resizeMode="stretch" style={styles.backgroundimage} />

                <View style={styles.members_container}>
                  <View style={styles.forvet}>
                    <TouchableOpacity onPress={() => {
                      names = teams.captain
                      searchMem(names)
                      setshow(true)
                    }}>

                      <Image style={styles.memberImage} source={{ uri: img }} />
                      <Text style={styles.memberText}>{teams.captain}</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.ortasaha}>
                    <View style={styles.members}>
                      <TouchableOpacity onPress={() => {
                        if (teams.mem1) {
                          names = teams.mem1
                          searchMem(names)
                          setshow(true)
                        }
                      }}>

                        <Image style={styles.memberImage} source={{ uri: img }} />
                        <Text style={styles.memberText}>{teams.mem1}</Text>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.members}>
                      <TouchableOpacity onPress={() => {
                        if (teams.mem2) {
                          names = teams.mem2
                          searchMem(names)
                          setshow(true)
                        }
                      }}>
                        <Image style={styles.memberImage} source={{ uri: img }} />
                        <Text style={styles.memberText}>{teams.mem2}</Text>
                      </TouchableOpacity>
                    </View>

                  </View>

                  <View style={styles.defans}>
                    <View style={styles.members}>
                      <TouchableOpacity onPress={() => {
                        if (teams.mem3) {
                          names = teams.mem3
                          searchMem(names)
                          setshow(true)
                        }
                      }}>
                        <Image style={styles.memberImage} source={{ uri: img }} />
                        <Text style={styles.memberText}>{teams.mem3}</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.members}>
                      <TouchableOpacity onPress={() => {
                        if (teams.mem4) {
                          names = teams.mem4
                          searchMem(names)
                          setshow(true)
                        }
                      }}>
                        <Image style={styles.memberImage} source={{ uri: img }} />
                        <Text style={styles.memberText}>{teams.mem4}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.kaleci}>
                    <TouchableOpacity onPress={() => {
                      if (teams.mem5) {
                        names = teams.mem5
                        searchMem(names)
                        setshow(true)
                      }
                    }}>
                      <Image style={styles.memberImage} source={{ uri: img }} />
                      <Text style={styles.memberText}>{teams.mem5}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>)
        })}
      </SafeAreaView>

      <View>
        <BottomSheet show={show} onDismiss={() => { setshow(false); }}>
          {member.map(mem => {

            func(mem.id)

            //console.log(mem.id)
            //console.log("/userImage/"+mem.id)
            return (

              <View key={mem.id} style={{alignItems:'center',}} >
              <Image style={{ width: 150, height: 150,borderRadius:75,marginTop:20 }} source={{ uri: imageUrl }} />
              <View>
                  <Text style={{fontSize:12,marginTop:8,fontStyle:'italic', color:"gray"}}>{mem.email}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                  <View style={{ flex: 1, height: 2, backgroundColor: 'orange' }} />
                  <View>
                      <Text style={{ width: 170, textAlign: 'center', fontWeight: 'bold', color: '#006400' }}>Oyuncu Profili</Text>
                  </View>
                  <View style={{ flex: 1, height: 2, backgroundColor: 'orange' }} />
              </View>

              <View style={{marginLeft:50,marginTop:30}}>
                  <View style={styles.person}>
                      <Text style={styles.info}>      Ad :</Text>
                      <View style={{ flexDirection: 'row', marginLeft: '15%' }}>
                          <View style={{ flexDirection: 'row', }}>
                              <Icon name="ios-person" size={20} color="#006400" />
                              <Text style={styles.info}>{mem.Name}</Text>
                          </View>
                      </View>
                  </View>

                  <View style={styles.person}>
                      <Text style={styles.info}>  Şehir :</Text>
                      <View style={{ flexDirection: 'row', marginLeft: '15%' }}>
                          <Icon name="business" size={20} color="#006400" />
                          <Text style={styles.info}> {mem.City}</Text>
                      </View>
                  </View>

                  <View style={styles.person}>
                      <Text style={styles.info}>    Boy :</Text>
                      <View style={{ flexDirection: 'row', marginLeft: '15%' }}>
                          <Icon name="md-ellipsis-vertical" size={20} color="#006400" />
                          <Text style={styles.info}> {mem.Height}</Text>
                      </View>
                  </View>

                  <View style={styles.person}>
                      <Text style={styles.info}>    Kilo :</Text>
                      <View style={{ flexDirection: 'row', marginLeft: '15%' }}>
                          <Icon name="ios-barbell-sharp" size={20} color="#006400" />
                          <Text style={styles.info}> {mem.Weight}</Text>
                      </View>
                  </View>

                  <View style={styles.person}>
                      <Text style={styles.info}>Takım :</Text>
                      <View style={{ flexDirection: 'row', marginLeft: '15%' }}>
                          <Icon name="shirt" size={20} color="#006400" />
                          <Text style={styles.info}>{!(mem.Team) ? "Takımı Yok" : mem.Team}</Text>
                      </View>
                  </View>

                  <View style={styles.person}>
                      <Text style={styles.info}>Mevki :</Text>
                      <View style={{ flexDirection: 'row', marginLeft: '15%' }}>
                          <Icon name="ios-football-sharp" size={20} color="#006400" />
                          <Text style={styles.info}> {mem.Position}</Text>
                      </View>
                  </View>

                  <View style={styles.person}>
                      <Text style={styles.info}>    Yaş :</Text>
                      <View style={{ flexDirection: 'row', marginLeft: '15%' }}>
                          <Icon name="calendar-sharp" size={20} color="#006400" />
                          <Text style={styles.info}> {mem.Age}</Text>
                      </View>
                  </View>
              </View>
          </View>


            )
          }
          )

          }
        </BottomSheet>
      </View>


    </Provider>
  )

}

export default MyTeamDetailPage