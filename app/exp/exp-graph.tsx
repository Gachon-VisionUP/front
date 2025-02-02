import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native";
import { Svg, Circle } from "react-native-svg";
import { useRouter } from "expo-router";

const logoImage = require("../../assets/images/login/Logo.png"); // 로고 이미지
const backIcon = require("../../assets/images/exp/back.png"); // 뒤로가기 아이콘

const screenWidth = Dimensions.get("window").width;
const chartSize = screenWidth * 0.52; // 차트 크기 조정
const apiUrl = "http://35.216.61.56:8080/api/exp-bar/ring"; // 간소화된 API URL

export default function ExpGraph() {
  const router = useRouter();

  // 초기값 설정
  const [data, setData] = useState({
    currentYearExp: 7657, // 기본값
    previousYearExp: 5000, // 기본값
    totalExp: 12657, // 기본값
    levelName: "F1-I", // 기본값
  });
  const [isApiFailed, setIsApiFailed] = useState(false); // API 실패 여부

  // API 호출
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          credentials: "include", // 세션 쿠키 포함
        });

        if (!response.ok) {
          throw new Error("API 요청 실패");
        }

        const result = await response.json();
        setData(result); // 서버에서 가져온 데이터로 업데이트
        setIsApiFailed(false); // 실패 상태 초기화
        console.log("서버 연동 성공:", result);
      } catch (error) {
        console.error("서버 연동 실패:", error);
        setIsApiFailed(true); // 실패 시 플래그 설정
      }
    };

    fetchData();
  }, []);

  // 경험치 비율 계산
  const currentYearPercentage = data.totalExp
    ? (data.currentYearExp / data.totalExp) * 100
    : 0;
  const previousYearPercentage = data.totalExp
    ? (data.previousYearExp / data.totalExp) * 100
    : 0;

  return (
    <View style={styles.container}>
      {/* 헤더: 뒤로 가기 + 로고 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Image source={backIcon} style={styles.backIcon} />
        </TouchableOpacity>
        <Image source={logoImage} style={styles.logo} />
      </View>

      {/* 내용 */}
      <View style={styles.content}>
        {/* 제목 및 레벨 */}
        <Text style={styles.subtitle}>전체 누적 경험치</Text>
        <Text style={styles.levelText}>오늘의 나의 레벨</Text>
        <Text style={styles.teamName}>{data.levelName || "N/A"}</Text>

        {/* 차트와 값 */}
        <View style={styles.chartWrapper}>
          {/* 주황색 값 (왼쪽) */}
          <View style={styles.valueLeft}>
            <Text style={[styles.valueText, { color: "#FF5C35" }]}>
              {data.previousYearExp.toLocaleString()} do
            </Text>
          </View>

          {/* 원형 차트 */}
          <View style={styles.chartContainer}>
            <Svg width={chartSize} height={chartSize}>
              {/* 주황색 (배경) */}
              <Circle
                cx={chartSize / 2}
                cy={chartSize / 2}
                r={chartSize / 2 - 15}
                stroke="#FF5C35"
                strokeWidth={20}
                fill="none"
              />
              {/* 파란색 (데이터) */}
              <Circle
                cx={chartSize / 2}
                cy={chartSize / 2}
                r={chartSize / 2 - 15}
                stroke="#344BFD"
                strokeWidth={20}
                fill="none"
                strokeDasharray={`${(currentYearPercentage / 100) * Math.PI * (chartSize - 30)}, ${
                  Math.PI * (chartSize - 30)
                }`}
                strokeDashoffset={0}
                rotation="-90"
                origin={`${chartSize / 2}, ${chartSize / 2}`}
              />
            </Svg>
            <Text style={styles.experienceText}>
              {data.totalExp.toLocaleString()} do
            </Text>
          </View>

          {/* 파란색 값 (오른쪽) */}
          <View style={styles.valueRight}>
            <Text style={[styles.valueText, { color: "#344BFD" }]}>
              {data.currentYearExp.toLocaleString()} do
            </Text>
          </View>
        </View>

        {/* 범례 */}
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: "#344BFD" }]} />
            <Text style={styles.legendText}>2024년 경험치</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: "#FF5C35" }]} />
            <Text style={styles.legendText}>입사일 ~ 전년도 누적 경험치</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  /* 동일한 스타일 */
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  backButton: {
    position: "absolute",
    left: 0,
    zIndex: 10,
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  logo: {
    width: 120,
    height: 45,
    resizeMode: "contain",
  },
  content: {
    alignItems: "center",
  },
  subtitle: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 12,
    marginTop: 50,
  },
  levelText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  teamName: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#344BFD",
    marginBottom: 20,
  },
  chartWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  valueLeft: {
    marginRight: 10,
    alignItems: "center",
  },
  valueRight: {
    marginLeft: 10,
    alignItems: "center",
  },
  valueText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  chartContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  experienceText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    position: "absolute",
    top: chartSize / 2 - 10,
  },
  legend: {
    marginTop: 20,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  legendText: {
    fontSize: 18,
    color: "#555",
  },
});