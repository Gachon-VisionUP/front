import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import LogoutModal from "../../components/mypage/LogoutModal";
import EditInfoModal from "../../components/mypage/EditInfoModal";
import backIcon from "@/assets/images/main/back.png";
import logo from "@/assets/images/login/Logo.png";
import miniLogo from "@/assets/images/mypage/Logo2.png";
import { useIcon } from "@/context/IconContext";

const BASE_URL = process.env.REACT_NATIVE_BASE_URL || "http://35.216.61.56:8080";

interface ProfileResponse {
  timestamp: string;
  success: boolean;
  code: string;
  result: {
    profileImageUrl: string;
    name: string;
    employeeId: string;
    department: string;
    joinDate: string;
    level: string;
  };
  message: string;
}

export default function ProfileScreen() {
  const router = useRouter();
  const { icon } = useIcon();
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const [isEditInfoModalVisible, setEditInfoModalVisible] = useState(false);
  const [profileData, setProfileData] = useState<ProfileResponse["result"] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProfileData = async () => {
    try {
      const response = await axios.get<ProfileResponse>(`${BASE_URL}/api/users/info`);

      // Extract valid image name from the response
      const rawProfileImageUrl = response.data.result.profileImageUrl;
      const parsedIcon = rawProfileImageUrl.match(/man-\d+|woman-\d+/)?.[0];
      const validProfileImageUrl = parsedIcon
        ? `${BASE_URL}/images/${parsedIcon}.png`
        : `${BASE_URL}/images/default.png`;

      setProfileData({
        ...response.data.result,
        profileImageUrl: validProfileImageUrl,
      });
      setIsLoading(false);
    } catch (err) {
      setError("프로필 정보를 불러오는 중 오류가 발생했습니다.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch data initially
    fetchProfileData();

    // Polling mechanism to refresh data every 60 seconds
    const interval = setInterval(() => {
      fetchProfileData();
    }, 60000); // 60 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleLogoutPress = () => {
    setLogoutModalVisible(true);
  };

  const handleEditInfoPress = () => {
    setEditInfoModalVisible(true);
  };

  const closeLogoutModal = () => {
    setLogoutModalVisible(false);
  };

  const closeEditInfoModal = () => {
    setEditInfoModalVisible(false);
  };

  const handleEditCharacter = () => {
    closeEditInfoModal();
    console.log("Editing Character...");
  };

  const handleEditPassword = () => {
    closeEditInfoModal();
    console.log("Editing Password...");
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/home")}>
          <Image source={backIcon} style={styles.backIcon} />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Image source={logo} resizeMode="contain" style={styles.imageStyle} />
        </View>
      </View>

      {/* Profile Card */}
      <View style={styles.cardContainer}>
        <View style={styles.orangeHeader}>
          <Image source={miniLogo} style={styles.cardLogo} />
        </View>
        <View style={styles.profileContent}>
          {/* Global Icon */}
          <Image source={{ uri: profileData?.profileImageUrl }} style={styles.profileImage} />
          <View style={styles.nameRow}>
            <Text style={[styles.nameText, { color: "#344BFD", fontSize: 24, fontWeight: "bold" }]}>
              {profileData?.name || "이름 없음"}
            </Text>
            <Text style={[styles.centerText, { marginLeft: 10 }]}>
              {profileData?.department || "부서 없음"}
            </Text>
          </View>
          <Text style={[styles.levelText, { marginTop: 15 }]}>
            LV. {profileData?.level || "레벨 없음"}
          </Text>
          <Text style={[styles.infoText, { marginTop: 20 }]}>
            사번: {profileData?.employeeId || "사번 없음"}
          </Text>
          <Text style={[styles.infoText, { marginTop: 10 }]}>
            입사일: {profileData?.joinDate || "입사일 없음"}
          </Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footerContainer}>
        <TouchableOpacity onPress={handleEditInfoPress}>
          <Text style={styles.footerText}>정보 수정하기 &gt;</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogoutPress}>
          <Text style={styles.footerText}>로그아웃 &gt;</Text>
        </TouchableOpacity>
      </View>

      {/* Modals */}
      <LogoutModal visible={isLogoutModalVisible} onClose={closeLogoutModal} />
      <EditInfoModal
        visible={isEditInfoModalVisible}
        onClose={closeEditInfoModal}
        onEditCharacter={handleEditCharacter}
        onEditPassword={handleEditPassword}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6F6",
    alignItems: "center",
    paddingVertical: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  backIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  cardContainer: {
    backgroundColor: "#FFF",
    width: "90%",
    borderRadius: 15,
    paddingBottom: 50,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  orangeHeader: {
    backgroundColor: "#FF6B48",
    width: "100%",
    height: 50,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 15,
  },
  cardLogo: {
    width: 30,
    height: 30,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: -80,
    marginBottom: 10,
    resizeMode: "contain",
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  nameText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#7A7777",
  },
  centerText: {
    fontSize: 16,
    color: "#7A7777",
  },
  levelText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF5722",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: "#424753",
    fontWeight: "bold",
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageStyle: {
    width: 160,
    height: 70,
  },
  profileContent: {
    marginTop: 120,
    alignItems: "center",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
});
