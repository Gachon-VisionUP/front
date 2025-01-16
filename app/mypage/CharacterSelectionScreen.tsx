import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIcon } from "@/context/IconContext";
import axios from "axios";
import logo from "@/assets/images/login/Logo.png";
import backIcon from "@/assets/images/main/back.png";

const BASE_URL = process.env.REACT_NATIVE_BASE_URL || "http://35.216.61.56:8080";

export default function CharacterSelectionScreen() {
    const router = useRouter();
    const { icon, setIcon } = useIcon();
    const [selectedIcon, setSelectedIcon] = useState<string>(
        typeof icon === "string" ? icon : "man-01" // Default selection
    );
    const [isLoading, setIsLoading] = useState(false);

    const icons = [
        { url: "http://35.216.61.56:8080/images/man-01.png", name: "man-01" },
        { url: "http://35.216.61.56:8080/images/man-02.png", name: "man-02" },
        { url: "http://35.216.61.56:8080/images/man-03.png", name: "man-03" },
        { url: "http://35.216.61.56:8080/images/man-05.png", name: "man-05" },
        { url: "http://35.216.61.56:8080/images/woman-01.png", name: "woman-01" },
        { url: "http://35.216.61.56:8080/images/woman-03.png", name: "woman-03" },
        { url: "http://35.216.61.56:8080/images/woman-04.png", name: "woman-04" },
        { url: "http://35.216.61.56:8080/images/woman-05.png", name: "woman-05" },
    ];

    const handleIconSelect = (icon: any) => {
        if (icon.name) {
            setSelectedIcon(icon.name); // Set only the name, e.g., "man-01"
        } else {
            Alert.alert("오류", "유효하지 않은 캐릭터를 선택했습니다.");
        }
    };

    const handleConfirm = async () => {
        if (!selectedIcon) {
            Alert.alert("오류", "캐릭터를 선택해주세요.");
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.put(`${BASE_URL}/api/users/image`, {
                icon: selectedIcon, // Send only the name, e.g., "man-01"
            });

            if (response.status === 200) {
                setIcon(selectedIcon); // Save the selected icon name globally
                Alert.alert("성공", "캐릭터가 성공적으로 변경되었습니다.", [
                    { text: "확인", onPress: () => router.push("/mypage") },
                ]);
            }
        } catch (error) {
            Alert.alert("오류", "캐릭터 변경에 실패했습니다. 다시 시도해주세요.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeContainer}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.container}>
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.push("/mypage")}>
                            <Image source={backIcon} style={styles.backIcon} />
                        </TouchableOpacity>
                        <Image source={logo} resizeMode="contain" style={styles.imageStyle} />
                    </View>

                    {/* Current Icon */}
                    <View style={styles.currentIconContainer}>
                        <Image
                            source={{
                                uri: icons.find((icon) => icon.name === selectedIcon)?.url,
                            }}
                            style={styles.currentIcon}
                        />
                        <Text style={styles.instructionsText}>캐릭터를 눌러서 변경해주세요!</Text>
                    </View>

                    {/* Icon Selection */}
                    <View style={styles.iconGrid}>
                        {icons.map((icon, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handleIconSelect(icon)}
                                style={[
                                    styles.iconWrapper,
                                    selectedIcon === icon.name && styles.selectedIconWrapper,
                                ]}
                            >
                                <Image source={{ uri: icon.url }} style={styles.icon} />
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Confirm Button */}
                    <TouchableOpacity
                        style={[styles.confirmButton, isLoading && styles.disabledButton]}
                        onPress={handleConfirm}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator size="small" color="#FFF" />
                        ) : (
                            <Text style={styles.confirmButtonText}>변경</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: "#F6F6F6",
    },
    scrollContent: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        backgroundColor: "#F6F6F6",
        padding: 20,
        alignItems: "center",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        marginBottom: 20,
    },
    backIcon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    currentIconContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    currentIcon: {
        width: 120,
        height: 120,
        borderRadius: 50,
        marginBottom: 10,
    },
    instructionsText: {
        fontSize: 16,
        color: "#888",
    },
    iconGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        width: "80%",
        marginBottom: 20,
    },
    iconWrapper: {
        width: 120,
        height: 120,
        borderRadius: 10,
        backgroundColor: "#E8E8E8",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 5,
        marginVertical: 10,
    },
    selectedIconWrapper: {
        borderWidth: 2,
        borderColor: "#488EF6",
    },
    icon: {
        width: 100,
        height: 100,
    },
    confirmButton: {
        width: "80%",
        padding: 15,
        backgroundColor: "#488EF6",
        borderRadius: 10,
        alignItems: "center",
    },
    disabledButton: {
        backgroundColor: "#CCCCCC",
    },
    confirmButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    imageStyle: {
        width: 280,
        height: 50,
    },
});
