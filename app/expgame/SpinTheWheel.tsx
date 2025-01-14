import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; // React Navigation 사용
import SpinTheWheelComponent from "@/components/expgame/SpinTheWheel"; // 게임 컴포넌트 임포트

export default function SpinTheWheel() {
  const navigation = useNavigation(); // 뒤로 가기 기능을 위한 Navigation 훅

  return (
    <View style={styles.container}>
      {/* 상단 헤더 */}
      <View style={styles.header}>
        {/* 뒤로 가기 버튼 */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonContainer}>
          <Image
            source={require("@/assets/images/expgame/back.png")}
            style={styles.backButton}
          />
        </TouchableOpacity>

        {/* 로고 */}
        <Image
          source={require("@/assets/images/expgame/Logo.png")}
          style={styles.logo}
        />
      </View>

      {/* 실제 게임 컴포넌트 렌더링 */}
      <SpinTheWheelComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // 가운데 정렬
    position: "relative", // 뒤로 가기 버튼과 로고를 절대 위치로 배치
    backgroundColor: "#FFFFF",
    marginTop: 80,
    marginBottom: -10,
  },
  backButtonContainer: {
    position: "absolute",
    left: 10, // 왼쪽 정렬
    top: 15,
  },
  backButton: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  logo: {
    width: 200,
    height: 40,
    resizeMode: "contain",
  },
});



