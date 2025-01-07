import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Image } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import graph from '@/assets/images/navigation/graph.png';
import paper from '@/assets/images/navigation/paper.png';
import pencil from '@/assets/images/navigation/pencil.png';
import home from '@/assets/images/navigation/home.png';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#F58220',
        tabBarInactiveTintColor: '#000',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 60,
          borderTopWidth: 0,
          position: Platform.select({
            ios: 'absolute',
            default: 'relative',
          }),
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: '홈',
          tabBarIcon: ({ focused }) => (
            <Image
              source={home}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? '#F58220' : '#000',
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="exp"
        options={{
          title: '경험치 현황',
          tabBarIcon: ({ focused }) => (
            <Image
              source={graph}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? '#F58220' : '#000',
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="quest"
        options={{
          title: '퀘스트 현황',
          tabBarIcon: ({ focused }) => (
            <Image
              source={paper}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? '#F58220' : '#000',
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="board"
        options={{
          title: '게시판',
          tabBarIcon: ({ focused }) => (
            <Image
              source={pencil}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? '#F58220' : '#000',
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
