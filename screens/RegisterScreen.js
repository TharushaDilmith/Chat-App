import React from "react";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, Input,Text } from "react-native-elements";
import { useState } from "react";
import { useLayoutEffect } from "react";
import { auth } from "../firebase";

const RegisterScreen = ({navigation}) => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [imageUrl, setimageUrl] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle :"Back to login"
    })
    
  }, [navigation])

  const register = () => {
    auth.createUserWithEmailAndPassword(email,password)
    .then((authUser)=>{
      authUser.user.updateProfile({
        displayName : name,
        photoURL : imageUrl || "https://upload.wikimedia.org/wikipedia/en/thumb/c/c6/The_Night_King_at_Hardhome.jpg/220px-The_Night_King_at_Hardhome.jpg"
      })

    })
    .catch((error)=>{
      alert(error.message);
    })
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
    >
      <StatusBar style="light" />
      <Text h3 style={{ marginBottom: 50 }}>
        Create a Signal account
      </Text>

      <View style={styles.inputContainer}>
        <Input
          placeholder="Full Name"
          value={name}
          autoFocus
          type="text"
          onChangeText={(text) => setname(text)}
        />
        <Input
          placeholder="Email"
          value={email}
          type="email"
          onChangeText={(text) => setemail(text)}
        />
        <Input
          placeholder="Password"
          value={password}
          secureTextEntry
          type="password"
          onChangeText={(text) => setpassword(text)}
        />
        <Input
          placeholder="Profile Picture URL (optional)"
          type="text"
          onChangeText={(text) => setimageUrl(text)}
          onSubmitEditing={register}
          value={imageUrl}
        />
      </View>
      <Button raised onPress={register} title="Register" containerStyle={styles.button} />
    <View style={{height:100}}/>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'white',
    padding:10,
  },
  button :{
    width:200,
    marginTop: 10,
  },
  inputContainer:{
    width:300
  }
});
