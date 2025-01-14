import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Modal, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router"; // 라우터 추가

const infoIcon = require("../../assets/images/exp/info.png"); // 알림 아이콘
const flagIcon = require("../../assets/images/exp/flag.png"); // 깃발 아이콘
const truckIcon = require("../../assets/images/exp/truck.png"); // 트럭 아이콘
const closeIcon = require("../../assets/images/exp/close.png"); // 닫기 아이콘

const dummyData = {
  team: "F1-I",
  nextLevelPoints: 343,
  totalExperience: 13000,
  personalExperience: 12657,
  nextLevel: "F1-II",
  yearComparison: [
    { year: "2024년", experience: 7657 },
    { year: "2023년", experience: 5000 },
  ],
};

export default function ExpStatus() {
  const [data] = useState(dummyData);
  const [isModalVisible, setModalVisible] = useState(false);
  const router = useRouter(); // 라우터 객체 생성

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const nextLevelPoints = data.totalExperience - data.personalExperience;

  return (
    <View style={styles.container}>
      {/* 팀 정보 */}
      <View style={styles.header}>
        <Text style={styles.levelText}>오늘의 나의 레벨</Text>
        <View style={styles.teamInfo}>
          <Text style={styles.teamName}>{data.team}</Text>
          <TouchableOpacity onPress={toggleModal}>
            <Image source={infoIcon} style={styles.alertIcon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* 팝업창 */}
      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeIcon} onPress={toggleModal}>
              <Image source={closeIcon} style={styles.closeIconImage} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>레벨별 총 필요 경험치</Text>
            <View style={styles.table}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={[styles.tableCell, styles.headerCell]}>레벨</Text>
                <Text style={[styles.tableCell, styles.headerCell]}>
                  총 필요 경험치
                </Text>
              </View>
              {[
                { level: "F1-I", experience: 0 },
                { level: "F1-II", experience: 13500 },
                { level: "F2-I", experience: 27000 },
                { level: "F2-II", experience: 39000 },
                { level: "F2-III", experience: 51000 },
                { level: "F3-I", experience: 63000 },
                { level: "F3-II", experience: 78000 },
                { level: "F3-III", experience: 93000 },
                { level: "F4-I", experience: 108000 },
                { level: "F4-II", experience: 126000 },
                { level: "F4-III", experience: 144000 },
                { level: "F5", experience: 162000 },
              ].map((item, index) => (
                <View key={index} style={[styles.tableRow]}>
                  <Text style={styles.tableCell}>{item.level}</Text>
                  <Text style={styles.tableCell}>
                    {item.experience.toLocaleString()} do
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Modal>

      {/* 전체 누적 경험치 이동 */}
      <View style={[styles.card, { height: 150 }]}>
        <Text
          style={styles.cardTitle}
          onPress={() => router.push("../exp/exp-graph")}
        >
          전체 누적 경험치 {" >"}
        </Text>
        <Text style={styles.levelUpInfo}>
          다음 레벨까지 {data.nextLevelPoints} do
        </Text>
        <View style={styles.experienceBarContainer}>
          <View style={styles.flagContainer}>
            <Text style={styles.nextLevel}>{data.nextLevel || "F1-II"}</Text>
            <Text style={styles.totalExperienceText}>
              {data.totalExperience} do
            </Text>
            <Image source={flagIcon} style={styles.flagIcon} />
          </View>
          <View style={styles.experienceBar}>
            <Image
              source={truckIcon}
              style={[
                styles.truckIcon,
                {
                  left: `${
                    (data.personalExperience / data.totalExperience) * 100 - 5
                  }%`,
                },
              ]}
            />
            <View
              style={[
                styles.experienceProgress,
                {
                  width: `${
                    (data.personalExperience / data.totalExperience) * 100
                  }%`,
                },
              ]}
            />
            <View
              style={[
                styles.currentExperienceContainer,
                {
                  left: `${
                    (data.personalExperience / data.totalExperience) * 100 - 5
                  }%`,
                },
              ]}
            >
              <Text style={styles.currentExperienceText}>
                {data.personalExperience} do
              </Text>
            </View>
          </View>
        </View>
      </View>

     {/* 연도별 경험치 이동 */}
     <View style={[styles.card, { height: 260 }]}>
        <Text
          style={styles.cardTitle}
          onPress={() => router.push("../exp/exp-graph2")} // exp-graph2로 이동
        >
          연도별 / 항목별 누적 경험치 {" >"}
        </Text>
        {data.yearComparison.map((item, index) => (
          <View key={index} style={styles.yearComparisonRow}>
            <Text
              style={[
                styles.yearText,
                {
                  left: `${
                    (item.experience / data.totalExperience) * 100 - 5
                  }%`,
                },
              ]}
            >
              {item.year}
            </Text>
            <View style={styles.experienceBar}>
              <Image
                source={truckIcon}
                style={[
                  styles.truckIconSmall,
                  {
                    left: `${
                      (item.experience / data.totalExperience) * 100 - 5
                    }%`,
                  },
                ]}
              />
              <View
                style={[
                  styles.experienceProgress,
                  {
                    width: `${
                      (item.experience / data.totalExperience) * 100
                    }%`,
                  },
                ]}
              />
            </View>
            <View
              style={[
                styles.currentYearExperienceContainer,
                {
                  left: `${
                    (item.experience / data.totalExperience) * 100 - 5
                  }%`,
                },
              ]}
            >
              <Text style={styles.currentYearExperienceText}>
                {item.experience} do
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "flex-start",
    marginBottom: 20,
    marginLeft: -20,
  },
  levelText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  teamInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  teamName: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#344bfd",
  },
  alertIcon: {
    width: 28,
    height: 28,
    marginLeft: 10,
    resizeMode: "contain",
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    elevation: 2,
    width: "120%",
    alignSelf: "center",
  },
  cardTitle: {
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  experienceBarContainer: {
    marginTop: 20,
    position: "relative",
  },
  experienceBar: {
    height: 16,
    backgroundColor: "#ddd",
    borderRadius: 8,
    overflow: "visible",
    width: "95%",
    zIndex: 1,
    marginTop: 15,
  },
  experienceProgress: {
    height: "100%",
    backgroundColor: "#FF5C35",
    zIndex: 1,
  },
  flagContainer: {
    position: "absolute",
    top: -50,
    right: 0,
    alignItems: "center",
    zIndex: 2,
  },
  nextLevel: {
    fontSize: 13,
    color: "#307BFF",
    fontWeight: "bold",
    marginBottom: 2,
  },
  flagIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    marginTop: 2,
    marginBottom: 5,
  },
  totalExperienceText: {
    fontSize: 12,
    color: "#333",
    fontWeight: "bold",
    marginBottom: 5,
  },
  truckIcon: {
    position: "absolute",
    top: -15,
    width: 40,
    height: 40,
    resizeMode: "contain",
    zIndex: 3,
  },
  currentExperienceContainer: {
    position: "absolute",
    top: 10,
  },
  currentExperienceText: {
    fontSize: 12,
    color: "#333",
    fontWeight: "bold",
    marginTop: 12,
  },
  yearComparisonRow: {
    marginTop: 10,
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: 35,
    paddingBottom: 15,
  },
  yearText: {
    position: "absolute",
    top: -10,
    fontSize: 14,
    color: "#555",
    fontWeight: "bold",
    marginBottom: 5,
  },
  truckIconSmall: {
    position: "absolute",
    top: -10,
    width: 35,
    height: 35,
    resizeMode: "contain",
    zIndex: 3,
  },
  currentYearExperienceContainer: {
    position: "absolute",
    top: 20,
  },
  currentYearExperienceText: {
    fontSize: 12,
    color: "#333",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  levelUpInfo: {
    marginTop: 10,
    fontSize: 14,
    color: "#777",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  table: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#307BFF", // 파란색 테두리
    borderRadius: 5,
    overflow: "hidden",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#307BFF",
  },
  tableHeader: {
    backgroundColor: "#fff",
    borderBottomColor: "#307BFF",
    borderBottomWidth: 2,
    flexDirection: "row",
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
    fontSize: 14,
    color: "#333",
  },
  headerCell: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#FF5C35",
  },
  closeButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#FF5C35",
    borderRadius: 8,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 2,
  },
  closeIconImage: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
});
