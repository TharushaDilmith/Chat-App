import React from "react";
import { useLayoutEffect } from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView } from "react-native";
import { Platform } from "react-native";
import { ScrollView } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useState } from "react";
import { Keyboard } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { auth, db } from "../firebase";
import firebase from 'firebase/app';
import 'firebase/firestore';

const ChatScreen = ({ navigation, route }) => {
  const [input, setinput] = useState("");
  const [messages, setmessages] = useState([])

  const sendMessage = () => {
    Keyboard.dismiss();
    db.collection("chats").doc(route.params.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    });
    setinput("");
  };
  useLayoutEffect(() => {
    const unsubcribe = db
      .collection("chats")
      .doc(route.params.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot)=>setmessages(
        snapshot.docs.map(doc=>({
          id:doc.id,
          data: doc.data()
        
        })),
      ))
     
      return unsubcribe;
  }, [route]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerBackTitleVisible: false,
      headerTitleAlign: "left",
      headerTitle: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Avatar
            rounded
            source={{
              uri:messages[0]?.data.photoURL ||"https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png",
            }}
          />
          <Text
            style={{
              color: "white",
              marginLeft: 10,
              fontWeight: "700",
              fontSize: 20,
            }}
          >
            {route.params.chatName}
          </Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={navigation.goBack}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
            marginRight: 20,
          }}
        >
          <TouchableOpacity>
            <FontAwesome name="video-camera" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="call" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation,messages]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView contentContainerStyle={{paddingTop:15}}>
              {messages.map(({id,data})=>(
                data.email===auth.currentUser.email ? (
                  <View key={id} style={styles.reciever}>
                    <Avatar
                    position="absolute"  
                    rounded
                    containerStyle={{
                      position:"absolute",
                      bottom:-15,
                      right:-5
                    }}
                    bottom={-15}
                    right={-5}
                    size={30}
                    source={{
                    uri:data.photoURL
                    }}/>
                    <Text style={styles.recieverText}>{data.message}</Text>
                  </View>
                ):(
                  <View key={id}style={styles.sender}>
                    <Avatar
                    position="absolute"
                    containerStyle={{
                      position:"absolute",
                      bottom:-15,
                      left:-5
                    }} 
                    bottom={-15}
                    left={-5}
                    rounded
                    size={30}
                    source={{
                      uri:data.photoURL
                    }}
                    />
                    <Text style={styles.senderText} >{data.message}</Text>
                    <Text style={styles.senderName}>{data.displayName}</Text>
                  </View>
                )
              ))}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                placeholder="Signal message"
                style={styles.textInput}
                value={input}
                onChangeText={(text) => setinput(text)}
                onSubmitEditing={sendMessage}
              />
              <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                <Ionicons name="send" size={24} color="#2B68E6" />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  textInput: {
    bottom: 0,
    height: 40,
    marginRight: 15,
    backgroundColor: "#ECECEC",
    padding: 10,
    color: "gray",
    borderRadius: 30,
    flex: 1,
  },
  reciever:{
    padding:15,
    backgroundColor:"#ECECEC",
    alignSelf:"flex-end",
    borderRadius:20,
    marginRight:15,
    marginBottom:20,
    maxWidth:"80%",
    position:"relative"
  },
  sender:{
    padding:15,
    backgroundColor:"#2B68E6",
    alignSelf:"flex-start",
    borderRadius:20,
    marginRight:15,
    maxWidth:"80%",
    position:"relative",
    marginBottom:20,
  },
  senderName:{
    left:10,
    paddingRight:10,
    fontSize:10,
    color:"white"
  },
  senderText:{
    color:"white",
    fontWeight:"500",
    marginLeft:10,
    marginBottom:15
  },
  recieverText:{
    color:"black",
    fontWeight:"500",
    marginLeft:10,
  }
});
