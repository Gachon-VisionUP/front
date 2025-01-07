import { Link, Stack } from "expo-router";
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import img from "../../assets/images/login/Title.png";
import styled, { css } from 'styled-components/native';
import Input from "../../components/login/input";

export default function LoginPage() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <Image
          source={img}
          resizeMode={"stretch"}
          style={styles.imageStyle}
        />
        <Input />
        <Link
          style={styles.button}
          href={{
            pathname: "/home",
          }}
        >
          <Text style={styles.buttonText}>홈으로</Text>
        </Link>
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
    borderColor: "red",
  },
  button: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "skyblue",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  imageStyle: {
    width: "50%",                     //가로비율
    height: "7%",                    //세로비율
    alignItems: "center",              //중간정렬
    justifyContent: "center"
  }
});

const StyledButton = styled.Image`
  margin: 30px;
  background-color: blue;
`;