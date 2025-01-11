import { Tabs } from "expo-router";
import React from "react";
import { Platform, Image } from "react-native";
import { HapticTab } from "@/components/HapticTab"; 
import TabBarBackground from '@/components/ui/TabBarBackground';
import adminHomeIcon from "@/assets/images/navigation/home.png";
import memberIcon from "@/assets/images/navigation/paper.png";
import boardIcon from "@/assets/images/navigation/pencil.png";

export default function AdminTabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#F58220",
        tabBarInactiveTintColor: "#000",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 60,
          borderTopWidth: 0,
          position: Platform.select({
            ios: "absolute",
            default: "relative",
          }),
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="admin"
        options={{
          title: "홈",
          tabBarIcon: ({ focused }) => (
            <Image
              source={adminHomeIcon}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? "#F58220" : "#000",
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="member"
        options={{
          title: "구성원 조회",
          tabBarIcon: ({ focused }) => (
            <Image
              source={memberIcon}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? "#F58220" : "#000",
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="board"
        options={{
          title: "게시판",
          tabBarIcon: ({ focused }) => (
            <Image
              source={boardIcon}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? "#F58220" : "#000",
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}