import { Link, Stack } from "expo-router";
import React from "react";
import { StyleSheet, Text, View, Image, StatusBar } from "react-native";
import img from "../../assets/images/login/Title.png";
import styled from 'styled-components/native';
import Input from "../../components/login/input";

export default function LoginPage() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar backgroundColor="#000000" barStyle="light-content" animated={true} />
      <View style={styles.container}>
        <Image
          source={img}
          resizeMode={"stretch"}
          style={styles.imageStyle}
        />
        <Input />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  imageStyle: {
    width: "50%", //가로비율
    height: "5%", //세로비율
    alignItems: "center", //중간정렬
    justifyContent: "center",
  },
});

const LoginButton = styled.TouchableOpacity`
  background-color: #C4C4C4;
  padding: 20px;
  align-items: center;
  justify-content: center;
  width: 90%;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  text-align: center;
`;
