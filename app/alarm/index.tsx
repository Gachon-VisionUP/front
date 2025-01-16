import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import Title from "../../assets/images/login/Logo.png";
import backIcon from "../../assets/images/main/back.png";
import { LinearGradient } from "expo-linear-gradient";
import graph from "@/assets/images/navigation/graph.png";
import pencil from "@/assets/images/navigation/pencil.png";
import axios from "axios";

const BASE_URL = process.env.REACT_NATIVE_BASE_URL || "http://35.216.61.56:8080";

// Define the type for notifications
interface Notification {
  id: number;
  title: string;
  message: string;
  read: boolean;
  type: string;
  createdAt: string;
}

export default function AlarmScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get<Notification[]>(
          `${BASE_URL}/api/notifications/unread`
        );
        setNotifications(response.data);
        setIsLoading(false);
      } catch (error) {
        Alert.alert("오류", "알림 데이터를 가져오는 데 실패했습니다.");
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // Handle marking a notification as read
  const handleMarkAsRead = async (notificationId: number) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/notifications/${notificationId}/read`
      );

      if (response.status === 200) {
        // Remove the notification from the list after marking as read
        setNotifications((prevNotifications) =>
          prevNotifications.filter((notification) => notification.id !== notificationId)
        );
      }
    } catch (error) {
      Alert.alert("오류", "알림을 삭제하는 데 실패했습니다.");
    }
  };

  const renderItem = ({ item }: { item: Notification }) => {
    // Determine the icon based on the notification type
    const iconSource = item.type === "경험치" ? graph : pencil;

    return (
      <LinearGradient
        colors={["#5698CE", "#0681E7"]}
        style={[styles.card, { opacity: 0.8 }]}
      >
        <View style={styles.cardHeader}>
          {/* Icon and Title */}
          <View style={styles.titleWithIcon}>
            <Image
              source={iconSource}
              style={[styles.icon, { tintColor: "#FFF" }]}
            />
            <Text style={[styles.cardTitle, { color: "#FFFFFF" }]}>
              {item.title}
            </Text>
          </View>
          <TouchableOpacity onPress={() => handleMarkAsRead(item.id)}>
            <Text style={[styles.deleteButton, { color: "#FFFFFF" }]}>X</Text>
          </TouchableOpacity>
        </View>
        {/* Content */}
        <Text style={styles.cardDate}>{new Date(item.createdAt).toLocaleString()}</Text>
      </LinearGradient>
    );
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

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
        <Text style={styles.filterText}>전체 {notifications.length}개</Text>
      </View>

      {/* FlatList */}
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
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
  cardDate: {
    fontSize: 12,
    color: "#D6D6D6",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
