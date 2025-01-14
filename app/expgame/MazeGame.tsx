import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MazeGameComponent from "@/components/expgame/MazeGame";

// 실제 경로(파일 구조)에 맞춰 import 경로를 변경하세요.
import backImg from "@/assets/images/expgame/back.png";
import logoImg from "@/assets/images/expgame/Logo.png";
import titleImg from "@/assets/images/expgame/exp_title(box)-001.png"; // 제목 이미지 경로

async function sendScoreToServer(score: number) {
  try {
    console.log("Sending score with the following details:");
    console.log("URL: https://example.com/api/score");
    console.log("Method: POST");
    console.log("Headers:", {
      "Content-Type": "application/json",
    });
    console.log("Body:", JSON.stringify({ score }));

    const response = await fetch("https://example.com/api/score", {
      method: "POST", // 서버에서 허용된 메서드인지 확인
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ score }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    Alert.alert("서버 전송 성공!", `${score}do가 저장되었습니다.`);
    console.log("Score sent successfully.");
    return true;
  } catch (error) {
    console.error(`Failed to send score: ${error.message}`);
    console.log(`Score (${score}) still intended to send when possible.`);
    Alert.alert("서버 전송 실패", "게임은 계속 진행됩니다.");
    return false;
  }
}

export default function MazeGamePage() {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack(); // 페이지 뒤로가기
  };

  const handleGameSuccess = async () => {
    console.log("Game success! Preparing to send score...");
    await sendScoreToServer(0.5); // 점수 전송, 실패 시에도 게임 진행
  };

  return (
    <View style={styles.container}>
      {/* 왼쪽 상단 뒤로 가기 버튼 */}
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Image source={backImg} style={styles.backImage} />
      </TouchableOpacity>

      {/* 상단 중앙 로고 */}
      <View style={styles.logoContainer}>
        <Image source={logoImg} style={styles.logoImage} />
      </View>

      {/* 제목 이미지 */}
      <View style={styles.titleContainer}>
        <Image source={titleImg} style={styles.titleImage} />
      </View>

      {/* 미로 게임 */}
      <View style={styles.gameWrapper}>
        <MazeGameComponent onSuccess={handleGameSuccess} />
      </View>
    </View>
  );
}

MazeGamePage.options = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  // 뒤로 가기 버튼 (상단 왼쪽)
  backButton: {
    position: "absolute",
    top: 80,
    left: 20,
    zIndex: 9999,
  },
  backImage: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  // 로고를 상단 중앙에
  logoContainer: {
    marginTop: 40, // 원하는 만큼 조정 가능
    alignItems: "center",
    justifyContent: "center",
  },
  logoImage: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  // 제목 이미지를 위한 스타일
  titleContainer: {
    alignItems: "center",
    marginTop: 20, // 로고와 간격
  },
  titleImage: {
    width: 500, // 기존 크기 대비 2배
    height: 150,
    resizeMode: "contain",
  },
  // 미로 게임 컴포넌트가 화면 정중앙에 오도록
  gameWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});







