import { StatusBar } from "expo-status-bar";
import React, { useState , useEffect } from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import { Button, Image, Input } from "react-native-elements";
import { auth } from "../firebase";

const LoginScreen = ({navigation}) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

useEffect(() => {
  const unsubcribe =auth.onAuthStateChanged((authUser)=>{
    if(authUser){
      navigation.replace('Home');
    }
  })
  return unsubcribe;
}, [])

  const signIn = () => {
    auth.signInWithEmailAndPassword(email,password)
    .catch((error)=>{
      alert(error);
    })
  };

  return (
    <KeyboardAvoidingView
      // behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar style="light" />
      <Image
        source={{
          uri: "https://assets.stickpng.com/images/580b57fcd9996e24bc43c526.png",
        }}
        style={{ width: 200, height: 200 }}
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          value={email}
          autoFocus
          type="email"
          onChangeText={(text) => setemail(text)}
        />
        <Input
          placeholder="Password"
          value={password}
          secureTextEntry
          type="password"
          onChangeText={(text) => setpassword(text)}
          onSubmitEditing={signIn}
        />
      </View>
      <Button containerStyle={styles.button} onPress={signIn} title="Login"  />
      <Button containerStyle={styles.button} onPress ={()=> navigation.navigate('Register')} type="outline" title="Register" />
      <View style={{height:100}}/>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor:"white"
  },
  inputContainer: {
      width:300,
  },
  button:{
     width:200,
     marginTop:10 
  }
});
