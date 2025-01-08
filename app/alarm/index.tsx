import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import Title from "../../assets/images/login/Logo.png";
import backIcon from "../../assets/images/main/back.png";
import { LinearGradient } from 'expo-linear-gradient';

// 데이터 샘플
const data = [
  {
    id: "1",
    title: "AAA 프로젝트 신설",
    content: "(경험치 500 do, 신청 마감 ~10/31)",
    date: "2025.01.04",
  },
  {
    id: "2",
    title: "잡초이스 공고",
    content: "(신청 마감 ~11/20)",
    date: "2025.01.04",
  },
  {
    id: "3",
    title: "최신 경험치",
    content: "2500 do",
    date: "2025.01.04",
  },
  {
    id: "4",
    title: "최신 경험치",
    content: "1700 do",
    date: "2025.01.04",
  },
  {
    id: "5",
    title: "AAA 프로젝트 신설",
    content: "(경험치 500 do, 신청 마감 ~10/31)",
    date: "2025.01.04",
  },
  {
    id: "6",
    title: "잡초이스 공고",
    content: "(신청 마감 ~11/20)",
    date: "2025.01.04",
  },
  {
    id: "7",
    title: "최신 경험치",
    content: "2500 do",
    date: "2025.01.04",
  },
  {
    id: "8",
    title: "최신 경험치",
    content: "1700 do",
    date: "2025.01.04",
  },
];

export default function AlarmScreen() {
  const router = useRouter();

  const renderItem = ({ item }: any) => (
    <LinearGradient
      colors={["#8593FF", "#040782"]} // 배경 그라데이션 색상
      style={[styles.card, { opacity: 0.8 }]} // Opacity 조정
    >
      <View style={styles.cardHeader}>
        {/* 제목 텍스트 */}
        <Text style={[styles.cardTitle, { color: "#FFFFFF" }]}>
          {item.title}
        </Text>
        <TouchableOpacity>
          <Text style={[styles.deleteButton, { color: "#FFFFFF" }]}>
            X
          </Text>
        </TouchableOpacity>
      </View>
      {/* 내용 텍스트 */}
      <Text style={[styles.cardContent, { color: "#E0E0E0" }]}>
        {item.content}
      </Text>
      <Text style={styles.cardDate}>{item.date}</Text>
    </LinearGradient>
  );


  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={backIcon} style={styles.backIcon} />
        </TouchableOpacity>
        <Image source={Title} style={styles.logo} />
      </View>
      <Text style={styles.title}>알림</Text>

      {/* Filter Section */}
      <View style={styles.filterSection}>
        <Text style={styles.filterText}>전체 n개</Text>
        <Text style={styles.filterButton}>전체 ▼</Text>
      </View>

      {/* FlatList */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        style={{
          borderWidth: 0, // 테두리 제거
          backgroundColor: "transparent", // 배경색 투명 처리
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  logo: {
    flex: 1,
    width: 140,
    height: 50,
    resizeMode: "contain",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#344BFD",
    marginLeft: 20,
  },
  filterSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,

  },
  filterText: {
    fontSize: 18,
    color: "#333",
  },
  filterButton: {
    fontSize: 18,
    color: "#666",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  card: {
    borderRadius: 15,
    padding: 30, // 기존 25에서 30으로 증가
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 3,
    minHeight: 110,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF", // 흰색 텍스트

  },
  deleteButton: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff", // 흰색 텍스트
  },
  cardContent: {
    fontSize: 14,
    color: "#E0E0E0", // 연한 흰색
    marginBottom: 10,
  },
  cardDate: {
    fontSize: 12,
    color: "#D6D6D6", // 더 연한 흰색
  },
});