import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { Link, useRouter } from "expo-router";

// 실제 경로에 맞춰 import를 수정하세요
import backImg from "@/assets/images/expgame/back.png";
import logoImg from "@/assets/images/expgame/Logo.png";

export default function ExpGame() {
  const router = useRouter();

  // 뒤로가기 (Navigation 등 필요 시 수정)
  const handleBackPress = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* 왼쪽 상단 뒤로가기 버튼 */}
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Image source={backImg} style={styles.backImage} />
      </TouchableOpacity>

      {/* 상단 가운데 로고 */}
      <View style={styles.logoContainer}>
        <Image source={logoImg} style={styles.logoImage} />
      </View>

      <Text style={styles.title}>매일매일 게임하고 do 받자!</Text>
      <Image 
  source={require('@/assets/images/expgame/game_title.png')} 
  style={styles.gameTitleImage} 
/>

      {/* 랜덤 휠 돌리기 */}
      <Link href="/expgame/SpinTheWheel" style={styles.gameButton}>
        <Text style={styles.gameText}>랜덤 룰렛 돌리기</Text>
      </Link>

      {/* 미로 게임 */}
      <Link href="/expgame/MazeGame" style={styles.gameButton}>
        <Text style={styles.gameText}>택배 성공적으로 배달하기</Text>
      </Link>

      <Link href="/expgame/DoMemoryGame" style={styles.gameButton}>
        <Text style={styles.gameText}>카드 뒤집기기</Text>
      </Link>
      <Text style={styles.title1}>모든 게임은 하루에 한번씩만 가능합니다.</Text>
    </View>
  );
}

// 상단바 옵션 (expo-router 등)
ExpGame.options = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",  // 수직 정렬
    justifyContent: "center", // 수직 정렬
    padding: 20,
  },
  // 뒤로가기 버튼 (상단 왼쪽)
  backButton: {
    position: "absolute",
    top: 80,      // 원하는 위치로 조절
    left: 20,
    zIndex: 9999, // 버튼이 위에 표시되도록
  },
  backImage: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  // 상단 가운데 로고
  logoContainer: {
    position: "absolute",
    top: 40,            // 로고 높이
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 9998,       // 뒤로가기 버튼보단 뒤에, 그러나 상단 표시
    marginTop: 20,
  },
  logoImage: {
    width: 120,
    height: 80,
    resizeMode: "contain",
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10, // 로고 아래에 공간 확보
  },
  title1: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 30, // 로고 아래에 공간 확보
    color: "gray", // 글자 색상을 회색으로 설정
  },
  gameButton: {
    backgroundColor: "#9FD898",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    width: "80%",
    alignItems: "center",
  },
  gameText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  gameTitleImage: {
    width: 240, // 원하는 너비로 설정
    height: 100, // 원하는 높이로 설정
    resizeMode: "contain", // 이미지 비율 유지
    marginBottom: 20, // 아래 여백 추가
  },
});

