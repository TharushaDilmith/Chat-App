import React,{useLayoutEffect} from 'react'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import CustomListItems from '../components/CustomListItems'
import { auth, db } from '../firebase'
import {AntDesign,SimpleLineIcons} from "@expo/vector-icons"
import { useEffect } from 'react'
import { useState } from 'react'

const HomeScreen = ({navigation}) => {
    const [chats, setchats] = useState([]);

    useEffect(() => {
       const unsubcribe = db.collection('chats').onSnapshot(snapshot=>{
           setchats(snapshot.docs.map(doc=>({
               id:doc.id,
               data:doc.data()
           })))
       })
       return unsubcribe;
    }, [])

    const signOutUser=()=>{
        auth.signOut().then(()=>{
            navigation.replace("Login");
        })
    }
    
    useLayoutEffect(() => {
        navigation.setOptions({
            title:"Signal",
            headerTitleAlign :"center",
            headerStyle :{backgroundColor :"#fff"},
            headerTitleStyle :{color :"black"},
            headerTintColor :"black",
            headerLeft:()=>(
                <View style={{marginLeft:15}}>
                    <TouchableOpacity onPress={signOutUser}>
                    <Avatar rounded source={{uri:auth.currentUser?.photoURL}} />
                    </TouchableOpacity>
                    
                </View>
            ),
            headerRight:()=>(
                <View style={{
                    flexDirection:"row",
                    justifyContent:"space-between",
                    width:80,
                    marginRight:20
                }}>
                    <TouchableOpacity>
                        <AntDesign name ="camerao" size={24} color="black"/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate("AddChat")} >
                        <SimpleLineIcons name ="pencil" size={21} color="black"/>
                    </TouchableOpacity>
                </View>
            )
        })
        
    }, [navigation])

    const enterChat = (id,chatName)=>{
        navigation.navigate("Chat",{
            id,
            chatName,
        })
    }

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {chats.map(({id,data :{chatName}})=>(
                    <CustomListItems key={id} id={id} chatName={chatName} enterChat={enterChat} />
                ))}
                
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        height:"100%"
    }
})
