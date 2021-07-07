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

const ChatScreen = ({ navigation, route }) => {
  const [input, setinput] = useState("");

  const sendMessage=()=>{

  }

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
              uri: "https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png",
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
  }, [navigation]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <>
          <ScrollView>{/* chat */}</ScrollView>
          <View style={styles.footer}>
            <TextInput
              placeholder="Signal message"
              style={styles.textInput}
              value={input}
              onChangeText={(text) => setinput(text)}
            />
            <TouchableOpacity
            onPress={sendMessage}
            activeOpacity={0.5}>
                <Ionicons name="send" size={24} color="#2B68E6"/>
            </TouchableOpacity>
          </View>
        </>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
      flex:1,
  },
  footer: {
      flexDirection:"row",
      alignItems:"center",
      width:"100%",
      padding:15
  },
  textInput: {
      bottom:0,
      height:40,
      marginRight:15,
      backgroundColor:"#ECECEC",
      padding:10,
      color:"gray",
      borderRadius:30,
      flex:1
  },
});
