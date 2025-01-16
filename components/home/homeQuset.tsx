import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import questIcon from "@/assets/images/main/quest.png";

interface Quest {
  questName: string;
  grantedExp: number;
}

const BASE_URL = process.env.REACT_NATIVE_BASE_URL || "http://35.216.61.56:8080";

export default function HomeQuest() {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/home`);
        setQuests(response.data.quests || []);
        setIsLoading(false);
      } catch (err) {
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
        setIsLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (isLoading) {
    return (
      <View style={[styles.card, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.card, styles.loadingContainer]}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={["#5698CE", "#0681E7"]}
      style={[styles.card, { opacity: 0.9 }]}
    >
      {/* Header */}
      <View style={styles.headerContainer}>
        <Image source={questIcon} style={styles.icon} />
        <Text style={styles.headerText}>최근 퀘스트 경험치</Text>
      </View>

      {/* Content */}
      <View style={styles.contentContainer}>
        {quests.map((quest, index) => (
          <View style={styles.section} key={index}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {quest.questName || "없음"}
              </Text>
            </View>
            <Text style={styles.questText}>
              + {quest.grantedExp || 0} <Text style={styles.doText}>do</Text>
            </Text>
          </View>
        ))}

        {/* If quests array is empty */}
        {quests.length === 0 && (
          <Text style={styles.noQuestsText}>퀘스트가 없습니다.</Text>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    padding: 15,
    width: 350,
    height: 150,
    justifyContent: "space-between",
    marginTop: 10,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  headerText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
  },
  badge: {
    backgroundColor: "#71A9F7",
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 15,
    opacity: 0.8,
  },
  badgeText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  questText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  doText: {
    color: "#FD8568",
    fontSize: 16,
    fontWeight: "bold",
  },
  noQuestsText: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    marginTop: 30,
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});