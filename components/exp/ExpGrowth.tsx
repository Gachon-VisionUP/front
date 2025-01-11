import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from "react-native";

const flagIcon = require("../../assets/images/exp/flag.png");
const truckIcon = require("../../assets/images/exp/truck.png");
const infoIcon = require("../../assets/images/exp/info.png");
const closeIcon = require("../../assets/images/exp/close.png"); // 닫기 버튼 아이콘

interface GrowthData {
  currentLevel: string;
  nextLevel: string;
  yearComparison: {
    type: string;
    label: string;
    percentage: number;
    experience: number;
    totalExperience: number;
    year: string;
  }[];
}

interface TopCardProps {
  data: {
    label: string;
    percentage: number;
    experience: number;
    totalExperience: number;
    year: string;
  };
  currentLevel: string;
  nextLevel: string;
  onIconPress: () => void;
}

interface BottomCardProps {
  data: {
    label: string;
    percentage: number;
    experience: number;
    totalExperience: number;
    year: string;
  };
  onIconPress: () => void;
}

const growthData: GrowthData = {
  currentLevel: "F1-I",
  nextLevel: "F1-II",
  yearComparison: [
    {
      type: "top",
      label: "작년까지 누적된 경험치 비율",
      percentage: 37,
      experience: 5000,
      totalExperience: 13500,
      year: "2023년",
    },
    {
      type: "bottom",
      label: "올해 획득한 경험치 비율",
      percentage: 120,
      experience: 7657,
      totalExperience: 9000,
      year: "2024년",
    },
  ],
};

const Popup: React.FC<{ visible: boolean; onClose: () => void; content: React.ReactNode }> = ({
  visible,
  onClose,
  content,
}) => (
  <Modal transparent={true} visible={visible} animationType="fade">
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        {/* 닫기 버튼 */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Image source={closeIcon} style={styles.closeIcon} />
        </TouchableOpacity>

        {/* 팝업 내용 */}
        <View style={styles.popupContent}>
          <Image source={truckIcon} style={styles.popupIcon} />
          {content}
        </View>
      </View>
    </View>
  </Modal>
);

const TopCard: React.FC<TopCardProps> = ({ data, currentLevel, nextLevel, onIconPress }) => (
  <View style={[styles.card, styles.topCard]}>
    <View style={styles.titleRow}>
      <Text style={styles.cardTitle}>{data.label}</Text>
      <TouchableOpacity onPress={onIconPress}>
        <Image source={infoIcon} style={styles.infoIcon} />
      </TouchableOpacity>
    </View>
    <View style={styles.progressBarContainer}>
      <View style={styles.progressBar}>
        <View
          style={[styles.progressFill, { width: `${Math.min(data.percentage, 100)}%` }]}
        />
      </View>
      <Image
        source={truckIcon}
        style={[
          styles.truckIcon,
          { left: `${data.percentage > 100 ? 90 : data.percentage - 5}%` },
        ]}
      />
      <View
        style={[
          styles.textBelowTruck,
          { left: `${data.percentage > 100 ? 90 : data.percentage - 5}%` },
        ]}
      >
        <Text style={styles.percentage}>{data.percentage}%</Text>
        <Text style={[styles.experienceScrollable]}>
          {data.year} 누적 {data.experience} do
        </Text>
      </View>
    </View>
    <View style={styles.flagContainer}>
      <Image source={flagIcon} style={styles.flagIcon} />
      <Text style={styles.nextLevelText}>{nextLevel}</Text>
      <Text style={styles.totalExperienceText}>{data.totalExperience} do</Text>
    </View>
  </View>
);

const BottomCard: React.FC<BottomCardProps> = ({ data, onIconPress }) => (
  <View style={[styles.card, styles.bottomCard]}>
    <View style={styles.titleRow}>
      <Text style={styles.cardTitle}>{data.label}</Text>
      <TouchableOpacity onPress={onIconPress}>
        <Image source={infoIcon} style={styles.infoIcon} />
      </TouchableOpacity>
    </View>
    <View style={styles.progressBarContainer}>
      <View style={styles.progressBar}>
        <View
          style={[styles.progressFill, { width: `${Math.min(data.percentage, 100)}%` }]}
        />
      </View>
      <Image
        source={truckIcon}
        style={[
          styles.truckIcon,
          { left: `${data.percentage > 100 ? 90 : data.percentage - 5}%` },
        ]}
      />
      <View
        style={[
          styles.textBelowTruck,
          { left: `${data.percentage > 100 ? 90 : data.percentage - 5}%` },
        ]}
      >
        <Text style={styles.percentage}>{data.percentage}%</Text>
        <Text style={[styles.experienceScrollable]}>
          {data.year} 획득 {data.experience} do
        </Text>
      </View>
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.nextLevelText}>중위평균</Text>
      <Text style={styles.totalExperienceText}>9000 do</Text>
    </View>
  </View>
);

const ExpGrowth: React.FC = () => {
  const [popupContent, setPopupContent] = useState<React.ReactNode>(null);
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleOpenPopup = (content: React.ReactNode) => {
    setPopupContent(content);
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  const [data] = useState<GrowthData>(growthData);

  return (
    <View style={styles.container}>
      <Popup visible={isPopupVisible} onClose={handleClosePopup} content={popupContent} />
      <View style={styles.header}>
        <Text style={styles.levelText}>오늘의 나의 레벨</Text>
        <Text style={styles.level}>{data.currentLevel}</Text>
      </View>
      <TopCard
        data={data.yearComparison[0]}
        currentLevel={data.currentLevel}
        nextLevel={data.nextLevel}
        onIconPress={() =>
          handleOpenPopup(
            <Text style={styles.popupText}>
              <Text style={styles.highlightText}>작년까지 누적된 경험치</Text>를{"\n"}
              <Text style={styles.secondaryHighlightText}>
                다음 레벨 달성에 필요한 총 경험치
              </Text>로 나눈 값입니다.
            </Text>
          )
        }
      />
      <BottomCard
        data={data.yearComparison[1]}
        onIconPress={() =>
          handleOpenPopup(
            <Text style={styles.popupText}>
              <Text style={styles.highlightText}>올해 획득한 경험치</Text>는{"\n"}
              <Text style={styles.secondaryHighlightText}>
                달성 목표와 비교한 퍼센트 값
              </Text>을 나타냅니다.
            </Text>
          )
        }
      />
    </View>
  );
};

export default ExpGrowth;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    marginBottom: 20,
    marginLeft: -20,
  },
  levelText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  level: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#344bfd",
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    elevation: 2,
  },
  topCard: {
    backgroundColor: "#f9f9f9",
    width: "120%",
    height: "30%",
    left: -30,
  },
  bottomCard: {
    backgroundColor: "#f9f9f9",
    width: "120%",
    height: "30%",
    left: -30,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#333",
    marginRight: 8,
  },
  infoIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  progressBarContainer: {
    position: "relative",
    marginTop: 40,
    height: 16,
    backgroundColor: "#ddd",
    borderRadius: 8,
    overflow: "visible",
  },
  progressBar: {
    position: "relative",
    height: "100%",
    width: "100%",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#0681E7",
  },
  truckIcon: {
    position: "absolute",
    top: -15,
    width: 40,
    height: 40,
    resizeMode: "contain",
    zIndex: 2,
  },
  textBelowTruck: {
    position: "absolute",
    top: 30,
    alignItems: "center",
    zIndex: 1,
    width: 130,
    transform: [{ translateX: -40 }],
    textAlign: "center",
  },
  percentage: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 2,
  },
  experienceScrollable: {
    fontSize: 12,
    color: "#555",
    textAlign: "center",
    marginHorizontal: 5,
    overflow: "hidden",
  },
  flagContainer: {
    position: "absolute",
    top: 20,
    right: 15,
    alignItems: "center",
  },
  flagIcon: {
    width: 20,
    height: 20,
    marginBottom: 5,
    resizeMode: "contain",
  },
  textContainer: {
    position: "absolute",
    top: 35,
    right: 15,
    alignItems: "center",
  },
  nextLevelText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
    textAlign: "center",
    marginBottom: 2,
  },
  totalExperienceText: {
    fontSize: 12,
    color: "#777",
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "88%", // 팝업 너비
    height: "20%", // 팝업 높이
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  closeIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  popupContent: {
    alignItems: "center",
    marginTop: 20,
  },
  popupIcon: {
    width: 38, // 팝업 아이콘 크기
    height: 38, // 팝업 아이콘 크기
    marginBottom: 20, // 아이콘과 텍스트 간격
  },
  popupText: {
    fontSize: 15, // 팝업 텍스트 크기
    color: "#000", // 팝업 텍스트 색상
    textAlign: "center",
  },
  highlightText: {
    color: "#F68D2B", // 강조 텍스트 주황색
    fontWeight: "bold",
  },
  secondaryHighlightText: {
    color: "#FFD200", // 강조 텍스트 노란색
    fontWeight: "bold",
  },
});
