import { Image, StyleSheet, Text, View, StatusBar } from 'react-native';
import { Link } from 'expo-router';
import Title from "../../assets/images/login/Title.png";
import bell from "../../assets/images/main/bell.png";
import styled from 'styled-components/native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#000000" barStyle="light-content" animated={true} />
      <ImageContainer>
        {/* Title logo centered */}
        <CenteredView>
          <Image
            source={Title}
            resizeMode={"stretch"}
            style={styles.imageStyle}
          />
        </CenteredView>

        {/* Bell icon on the right */}
        <Image
          source={bell}
          resizeMode={"stretch"}
          style={styles.bellImage}
        />
      </ImageContainer>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  imageStyle: {
    width: "45%", // Adjust width
    height: "40%", // Adjust height
  },
  bellImage: {
    width: "12%", // Adjust width
    height: "55%", // Adjust height
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
  }
});

const ImageContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 85%;
  height: 10%;
  margin-top: 70px;
  margin-left: 50px;

`;

const CenteredView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
