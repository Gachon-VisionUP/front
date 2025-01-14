import React, { useState } from "react";
import { View, StyleSheet, Alert, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MemoryCardGame from "../../components/expgame/MemoryCardGame";
import backImg from "@/assets/images/expgame/back.png";
import logoImg from "@/assets/images/expgame/Logo.png";
import titleImg from "@/assets/images/expgame/card_title-003.png"; // 타이틀 이미지 경로

export default function ExMemoryGame() {
  const [hasPlayedToday, setHasPlayedToday] = useState(false);
  const [lastScore, setLastScore] = useState<number | null>(null);
  const navigation = useNavigation();

  const handleGameFinish = (totalDo: number) => {
    Alert.alert("게임 종료", `획득 경험치: ${totalDo.toFixed(1)} do`);
    setHasPlayedToday(true); // 하루 제한 적용
    setLastScore(totalDo); // 마지막 점수 저장
    console.log("서버 전송: 오늘 플레이 완료, 획득 do =", totalDo);
  };

  const handleBackPress = () => {
    navigation.goBack(); // 페이지 뒤로 가기
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

      {/* 타이틀 이미지 */}
      <Image
        source={titleImg}
        style={styles.titleImage}
      />
      <Text style={styles.title1}>2장의 카드를 뒤집어 동일한 내용이면 do 획득!</Text>

      {/* 메모리 카드 게임 */}
      <MemoryCardGame
        onFinish={handleGameFinish}
        isDisabled={hasPlayedToday} // 게임이 끝난 후 재플레이 비활성화
      />
      {lastScore !== null && (
        <Text style={styles.lastScoreText}>
          오늘 게임의 결과: {lastScore.toFixed(1)} do
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // 화면 중앙 정렬
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 50, // 상단에서 간격
    left: 20, // 왼쪽에서 간격
    zIndex: 9999,
  },
  backImage: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    marginTop: 40,
  },
  logoContainer: {
    position: "absolute",
    top: 50, // 상단에서 간격
    alignSelf: "center", // 화면 중앙 정렬
  },
  logoImage: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  titleImage: {
    width: 800, // 이미지 너비 (필요에 맞게 조정 가능)
    height: 200, // 이미지 높이 (필요에 맞게 조정 가능)
    resizeMode: "contain",
    marginBottom: 5, // 아래 요소와 간격
  },
  lastScoreText: {
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
  title1: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 0, // 로고 아래에 공간 확보
    color: "gray", // 글자 색상을 회색으로 설정
  },
});









