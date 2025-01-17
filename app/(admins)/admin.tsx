import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import adminImage from "../../assets/images/admin.png";
import postIcon from "../../assets/images/navigation/pencil.png";
import registerIcon from "../../assets/images/navigation/paper.png";
import Logo from "../../assets/images/login/Logo.png";
import { useRouter } from "expo-router";
import axios from "axios";

const BASE_URL = process.env.REACT_NATIVE_BASE_URL || "http://35.216.61.56:8080";

export default function AdminScreen() {
    const router = useRouter(); // useRouter 추가

    const handleLogout = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/users/logout`);
            if (response.status === 200) {
                router.push("/login");
            } else {
                throw new Error("로그아웃 실패");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <Image source={Logo} style={styles.logo} />
                <Image source={adminImage} style={styles.adminImage} />
                <Text style={styles.welcomeText}>
                    <Text style={styles.adminText}>관리자</Text>
                    <Text style={styles.subText}>님 환영합니다!</Text>
                </Text>
                <TouchableOpacity onPress={handleLogout}>
                    <Text style={styles.loginOutText}>로그아웃 &gt;</Text>
                </TouchableOpacity>
            </View>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.push("/admin/write")}
                >
                    <Image source={postIcon} style={styles.icon} />
                    <Text style={styles.buttonText}>
                        게시판 글쓰기 <Text style={styles.greaterThan}>&gt;</Text>
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.push("/admin/RegisterMember")}
                >
                    <Image source={registerIcon} style={styles.icon} />
                    <Text style={styles.buttonText}>
                        구성원 신규 등록 <Text style={styles.greaterThan}>&gt;</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        paddingVertical: 60,
    },
    headerContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    logo: {
        width: 220,
        height: 120,
        marginBottom: 30,
        resizeMode: "contain",
    },
    adminImage: {
        width: 140,
        height: 140,
        marginBottom: 10,
    },
    welcomeText: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    loginOutText: {
        flexDirection: "row",
        alignItems: "center",
        color: "#8D8A8A",
    },
    adminText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#1C6CF9",
    },
    subText: {
        fontSize: 18,
        color: "#333",
    },
    buttonContainer: {
        width: "100%",
        alignItems: "center",
        marginBottom: 20,
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        width: "90%",
        height: "23%",
        marginBottom: 15,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    buttonText: {
        fontSize: 18,
        color: "#333",
        fontWeight: "bold",
    },
    bottomNav: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        position: "absolute",
        bottom: 0,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: "#E0E0E0",
    },
    navItem: {
        alignItems: "center",
    },
    navIcon: {
        width: 24,
        height: 24,
        marginBottom: 5,
    },
    navText: {
        fontSize: 12,
        color: "#333",
    },
    greaterThan: {
        fontSize: 24,
        color: "#333",
        fontWeight: "bold",
    },
});
