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
import { LinearGradient } from "expo-linear-gradient";
import graph from "@/assets/images/navigation/graph.png";
import pencil from "@/assets/images/navigation/pencil.png";

// Sample Data
const data = [
  {
    id: "1",
    title: "AAA 프로젝트 신설 \n(신청 마감 ~10/31)",
    content: "",
    date: "2025.01.04",
  },
  {
    id: "2",
    title: "잡초이스 공고 \n(신청 마감 ~11/20)",
    content: "",
    date: "2025.01.04",
  },
  {
    id: "3",
    title: "최신 경험치",
    content: "2500 do",
    date: "직무 퀘스트 | 2025.01.04",
  },
  {
    id: "4",
    title: "최신 경험치",
    content: "1700 do",
    date: "전사 프로젝트 | 2025.01.04",
  },
  {
    id: "5",
    title: "AAA 프로젝트 신설 \n(신청 마감 ~10/31)",
    content: "",
    date: "2025.01.04",
  },
  {
    id: "6",
    title: "잡초이스 공고\n (신청 마감 ~11/20)",
    content: "",
    date: "2025.01.04",
  },
  {
    id: "7",
    title: "최신 경험치",
    content: "2500 do",
    date: "상반기 인사결과 | 2025.01.04",
  },
  {
    id: "8",
    title: "최신 경험치",
    content: "1700 do",
    date: "하반기 인사결과 | 2025.01.04",
  },
];

export default function AlarmScreen() {
  const router = useRouter();

  const renderContent = (content: string) => {
    const parts = content.split("do"); // Split the string by "do"
    return (
      <Text style={[styles.cardContent, { color: "#ffffff" }]}>
        {parts.map((part, index) => (
          <Text key={index}>
            {part}
            {index < parts.length - 1 && (
              <Text style={styles.highlightedText}>do</Text>
            )}
          </Text>
        ))}
      </Text>
    );
  };

  const renderItem = ({ item }: any) => {
    // Determine the icon based on the title content
    const iconSource = item.title.includes("경험치") ? graph : pencil;

    return (
      <LinearGradient
        colors={["#5698CE", "#0681E7"]}
        style={[styles.card, { opacity: 0.8 }]}
      >
        <View style={styles.cardHeader}>
          {/* Icon and Title */}
          <View style={styles.titleWithIcon}>
            <Image source={iconSource} style={[styles.icon, { tintColor: "#FFF" }]} />
            <Text style={[styles.cardTitle, { color: "#FFFFFF" }]}>{item.title}</Text>
          </View>
          <TouchableOpacity>
            <Text style={[styles.deleteButton, { color: "#FFFFFF" }]}>X</Text>
          </TouchableOpacity>
        </View>
        {/* Content */}
        {renderContent(item.content)}
        <Text style={styles.cardDate}>{item.date}</Text>
      </LinearGradient>
    );
  };

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
        <Text style={styles.filterText}>전체 {data.length}개</Text>
      </View>

      {/* FlatList */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        style={{
          borderWidth: 0,
          backgroundColor: "transparent",
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
    padding: 30,
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
  titleWithIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  deleteButton: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  cardContent: {
    fontSize: 24,
    color: "#E0E0E0",
    marginBottom: 10,
  },
  highlightedText: {
    color: "#FF8A6D",
  },
  cardDate: {
    fontSize: 12,
    color: "#D6D6D6",
  },
});
