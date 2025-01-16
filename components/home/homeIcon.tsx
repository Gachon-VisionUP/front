import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { useIcon } from "@/context/IconContext"; // 전역관리 아이콘
import background from "../../assets/images/main/background.png";
import axios from "axios";

const BASE_URL = process.env.REACT_NATIVE_BASE_URL || "http://35.216.61.56:8080";

export default function HomeIcon() {
  const { setIcon } = useIcon(); // Update icon in global context if needed
  const [iconUrl, setIconUrl] = useState<string | null>(null); // To store parsed icon URL
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchIcon = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/home`);
        const rawImageUrl = response.data.imageUrl;

        // Extract icon name from imageUrl
        const parsedIcon = rawImageUrl.match(/man-\d+|woman-\d+/)?.[0];
        const validIconUrl = parsedIcon
          ? `${BASE_URL}/images/${parsedIcon}.png`
          : null; // Fallback to null if parsing fails

        setIconUrl(validIconUrl); // Set valid icon URL
        setIcon(validIconUrl); // Optionally update global context
      } catch (error) {
        Alert.alert("오류", "아이콘 정보를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchIcon();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={background} style={styles.backgroundImage} />
      <Image
        source={iconUrl ? { uri: iconUrl } : background} // Use iconUrl or fallback to background
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    width: "45%",
    height: "20%",
  },
  backgroundImage: {
    position: "absolute",
    width: "90%",
    height: "90%",
    borderRadius: 999,
    resizeMode: "cover",
  },
  image: {
    position: "absolute",
    width: "90%",
    height: "90%",
    resizeMode: "contain",
    borderRadius: 999,
    aspectRatio: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
