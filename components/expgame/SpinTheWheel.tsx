import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Svg, { Path } from "react-native-svg";

const isLoggedIn = false; // 서버 연결 여부 (true: 서버 연결, false: 서버 미연결)

// 화면 크기
const { width: WINDOW_WIDTH } = Dimensions.get("window");
// 룰렛 크기
const WHEEL_SIZE = WINDOW_WIDTH * 0.7;
// 파란 원 크기: 룰렛보다 5%만 크게
const BG_SIZE = WHEEL_SIZE * 1.15;

// 룰렛 섹션
const SECTIONS = [
  { label: "+1 do", color: "#FC4851", value: 1 },
  { label: "+2 do", color: "#FFBC55", value: 2 },
  { label: "다음 기회", color: "#91C3F6", value: 0 },
  { label: "+1 do", color: "#FFBC55", value: 1 },
  { label: "+2 do", color: "#91C3F6", value: 2 },
  { label: "다음 기회", color: "#FFFFFF", value: 0 },
];
const NUM_SECTIONS = SECTIONS.length;
const SECTION_ANGLE = 360 / NUM_SECTIONS;

// placeholder 이미지 (투명 PNG)
const placeholderImg = require("@/assets/images/expgame/placeholder.png");
// 타이틀 이미지
const titleImg = require("@/assets/images/expgame/exp_title-002.png");
// 트럭 이미지
const truckImg = require("@/assets/images/expgame/truck.png");

// 텍스트 색상 계산 함수
function getTextColor(backgroundColor) {
  return backgroundColor === "#FFFFFF" ? "#FD5A62" : "#FFFFFF";
}

// "섹션 i"가 "12시 위치"에 오도록 한 각도를 계산
function getAngleForIndex(i) {
  return i * SECTION_ANGLE;
}

export default function SpinTheWheel() {
  const [selectedReward, setSelectedReward] = useState<string | null>(null);
  const [finalAngle, setFinalAngle] = useState(0);
  const [isSpinUsed, setIsSpinUsed] = useState(false);

  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 서버 연결된 상태에서만 AsyncStorage를 확인
    if (isLoggedIn) {
      checkSpinStatus();
    } else {
      setIsSpinUsed(false); // 서버 미연결 시 항상 초기화
    }
  }, []);

  const checkSpinStatus = async () => {
    const lastSpinDate = await AsyncStorage.getItem("lastSpinDate");
    const today = new Date().toDateString();

    if (lastSpinDate === today) {
      setIsSpinUsed(true); // 오늘 이미 사용한 경우
    }
  };

  const spinWheel = async () => {
    if (isLoggedIn && isSpinUsed) {
      Alert.alert("알림", "하루에 한번만 참여 가능합니다.");
      return;
    }

    setSelectedReward(null);

    const turns = 3;
    const randomAngle = Math.random() * 360;
    const newAngle = 360 * turns + randomAngle;
    setFinalAngle(newAngle);

    spinValue.setValue(0);

    Animated.timing(spinValue, {
      toValue: 1,
      duration: 3000,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(async () => {
      const closestSectionIndex = getClosestSectionIndex(newAngle % 360);
      setSelectedReward(SECTIONS[closestSectionIndex].label);
      if (isLoggedIn) {
        setIsSpinUsed(true);
        const today = new Date().toDateString();
        await AsyncStorage.setItem("lastSpinDate", today); // 서버 연결 시 날짜 저장
      }
      console.log("서버로 보낼 값:", SECTIONS[closestSectionIndex].value);
    });
  };

  const getClosestSectionIndex = (angle) => {
    let closestIndex = 0;
    let minDifference = 360;

    for (let i = 0; i < SECTIONS.length; i++) {
      const sectionAngle = (360 - getAngleForIndex(i) + 90) % 360; // 섹션 중심 각도 계산
      const difference = Math.abs(angle - sectionAngle);
      if (difference < minDifference) {
        minDifference = difference;
        closestIndex = i;
      }
    }

    return closestIndex;
  };

  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", `${finalAngle}deg`],
  });

  const inverseRotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", `-${finalAngle}deg`],
  });

  const renderWheelSlices = () => {
    return SECTIONS.map((item, idx) => {
      const startAngle = (idx * SECTION_ANGLE * Math.PI) / 180;
      const endAngle = ((idx + 1) * SECTION_ANGLE * Math.PI) / 180;
      const path = createArcPath(
        WHEEL_SIZE / 2,
        WHEEL_SIZE / 2,
        WHEEL_SIZE / 2,
        startAngle,
        endAngle
      );

      return (
        <Path
          key={idx}
          d={path}
          fill={item.color}
          stroke="#fff"
          strokeWidth={2}
        />
      );
    });
  };

  const renderSectionText = () => {
    return SECTIONS.map((item, idx) => {
      const midAngle = (idx + 0.5) * SECTION_ANGLE;
      const rad = (midAngle * Math.PI) / 180;
      const r = (WHEEL_SIZE / 2) * 0.65;
      const x = WHEEL_SIZE / 2 + r * Math.cos(rad);
      const y = WHEEL_SIZE / 2 + r * Math.sin(rad);

      const textColor = getTextColor(item.color);

      return (
        <Animated.Text
          key={idx}
          style={[
            styles.sectionText,
            {
              color: textColor, // 글자 색상 설정
              position: "absolute",
              left: x - 30,
              top: y - 10,
              width: 60,
              textAlign: "center",
              transform: [{ rotateZ: inverseRotate }],
            },
          ]}
        >
          {item.label}
        </Animated.Text>
      );
    });
  };

  return (
    <View style={styles.container}>
      {/* 타이틀 이미지 */}
      <Image source={titleImg} style={styles.titleImage} />

      <View style={styles.wheelWrapper}>
        <View style={styles.bigCircle} />

        <View style={styles.placeholderContainer}>
          <Image source={placeholderImg} style={styles.placeholderImage} />
        </View>

        <Animated.View
          style={[
            styles.wheelContainer,
            {
              transform: [{ rotateZ: rotate }],
            },
          ]}
        >
          <Svg width={WHEEL_SIZE} height={WHEEL_SIZE}>
            {renderWheelSlices()}
          </Svg>

          {renderSectionText()}

          <Animated.View
            style={[
              styles.startButton,
              {
                transform: [{ rotateZ: inverseRotate }],
              },
            ]}
          >
            <TouchableOpacity onPress={spinWheel}>
              <Text style={styles.startButtonText}>START</Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </View>

      {/* 트럭 이미지 */}
      <Image source={truckImg} style={styles.truckImage} />

      <View style={styles.standContainer}>
        <View style={styles.standTop} />
        <View style={styles.standBottom} />
      </View>

      {/* 결과 값 표시 */}
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>
          {selectedReward ? `결과: ${selectedReward}` : " "}
        </Text>
      </View>
    </View>
  );
}

function createArcPath(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number
) {
  const startX = cx + r * Math.cos(startAngle);
  const startY = cy + r * Math.sin(startAngle);
  const endX = cx + r * Math.cos(endAngle);
  const endY = cy + r * Math.sin(endAngle);

  const largeArcFlag = endAngle - startAngle <= Math.PI ? 0 : 1;

  return [
    `M ${startX} ${startY}`,
    `A ${r} ${r} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
    `L ${cx} ${cy}`,
    `Z`,
  ].join(" ");
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  titleImage: {
    width: 250,
    height: 150,
    resizeMode: "contain",
    marginBottom: 5,
    marginTop: -50,
  },
  wheelWrapper: {
    width: WHEEL_SIZE * 1.2,
    height: WHEEL_SIZE * 1.2,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  bigCircle: {
    position: "absolute",
    width: BG_SIZE,
    height: BG_SIZE,
    borderRadius: BG_SIZE / 2,
    backgroundColor: "#0254CB",
    zIndex: 0,
  },
  placeholderContainer: {
    position: "absolute",
    top: 0,
    left: WHEEL_SIZE / 1.9,
    zIndex: 2,
    marginLeft: 80,
    marginTop: 30,
  },
  placeholderImage: {
    width: 35,
    height: 35,
    resizeMode: "contain",
    transform: [{ rotate: "20deg" }],
  },
  wheelContainer: {
    position: "absolute",
    width: WHEEL_SIZE,
    height: WHEEL_SIZE,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  startButton: {
    position: "absolute",
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#0254CB",
    justifyContent: "center",
    alignItems: "center",
  },
  startButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  truckImage: {
    position: "absolute",
    bottom: 170,
    left: WHEEL_SIZE * 0.65,
    width: 210,
    height: 70,
    resizeMode: "contain",
    zIndex: 2,
  },
  standContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: -10,
    marginBottom: 20,
  },
  standTop: {
    width: WHEEL_SIZE * 0.6,
    height: 25,
    backgroundColor: "#0650CF",
    borderRadius: 10,
  },
  standBottom: {
    width: WHEEL_SIZE * 0.8,
    height: 15,
    backgroundColor: "#C5E0FB",
    borderRadius: 10,
    marginTop: -5,
  },
  sectionText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  resultContainer: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  resultText: {
    backgroundColor: "#71A9F7",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    opacity: 0.9,
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    textTransform: "uppercase",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
});
















