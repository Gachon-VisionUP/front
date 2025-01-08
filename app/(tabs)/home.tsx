import { Image, StyleSheet, Text, View, StatusBar } from 'react-native';
import { Link } from 'expo-router';
import Title from "../../assets/images/login/Logo.png";
import bell from "../../assets/images/main/bell.png";
import styled from 'styled-components/native';

import HomeIcon from "@/components/home/homeIcon";
import HomeTitle from "@/components/home/homeTitle";
import HomeExp from '@/components/home/homeExp';
import HomeQuest from '@/components/home/homeQuset';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#000000" barStyle="light-content" animated={true} />
      <ImageContainer>
        {/* Title logo centered */}
        <View style={styles.logoContainer}>
          <Image
            source={Title}
            resizeMode="contain"
            style={styles.imageStyle}
          />
        </View>

        {/* Bell icon on the right */}
        <Link
          href={{
            pathname: "../alarm",
          }}
        >
          <Image
            source={bell}
            resizeMode="contain"
            style={styles.bellImage}
          />
        </Link>
      </ImageContainer>
      <HomeIcon />
      <HomeTitle />
      <HomeExp />
      <HomeQuest />
      <Link
        style={styles.button}
        href={{
          pathname: "../login",
        }}
      >
        <Text style={styles.buttonText}>로그인 페이지로</Text>
      </Link>
    </View>
  );
}

// 상단바 옵션 추가
HomeScreen.options = {
  headerShown: false, // 상단바 숨기기
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  imageStyle: {
    width: 160, // Adjust logo width
    height: 70, // Adjust logo height
    marginLeft: 25,
  },
  bellImage: {
    width: 30, // Adjust bell width
    height: 30, // Adjust bell height
  },
  logoContainer: {
    flex: 1,
    alignItems: "center", // Center horizontally
    justifyContent: "center", // Center vertically
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
});

const ImageContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between; /* Logo is centered horizontally */
  width: 90%; /* Adjust container width */
  margin-top: 30px;
  padding: 0 10px; /* Add padding for spacing */
`;
