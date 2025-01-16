import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { Svg, Circle } from 'react-native-svg';
import exp from '@/assets/images/main/exp.png';
import { LinearGradient } from "expo-linear-gradient";
import axios from 'axios';

const BASE_URL = process.env.REACT_NATIVE_BASE_URL || "http://35.216.61.56:8080";

export default function HomeExp() {
  const circleRadius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * circleRadius;

  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/home`);
        setUserData(response.data);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0681E7" />
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>데이터를 불러오지 못했습니다.</Text>
      </View>
    );
  }

  const {
    latestExpDate = "없음",
    latestExp = 0,
    totalExp = 0,
    nextLevelExpRequirement = 1,
  } = userData;

  const progressPercentage = Math.min((totalExp / nextLevelExpRequirement) * 100, 100);
  const progressStroke = (progressPercentage / 100) * circumference;

  return (
    <LinearGradient
      colors={["#5698CE", "#0681E7"]}
      style={[styles.card, { opacity: 0.9 }]}
    >
      <View>
        <View style={styles.headerContainer}>
          <Image source={exp} style={styles.icon} />
          <Text style={styles.headerText}>최신경험치</Text>
          <Text style={styles.dateText}>{latestExpDate}</Text>
        </View>
        <View style={styles.contentContainer}>
          <View>
            <Text style={styles.expText}>
              <Text style={styles.expTextWhite}>+ </Text>
              <Text style={styles.expTextNumber}>{latestExp} </Text>
              <Text style={styles.expTextOrange}>do</Text>
            </Text>
          </View>
          <View style={styles.chartContainer}>
            <Svg height={120} width={120}>
              <Circle
                cx={60}
                cy={60}
                r={circleRadius}
                stroke="rgba(255, 102, 102, 0.2)"
                strokeWidth={strokeWidth}
                fill="none"
              />
              <Circle
                cx={60}
                cy={60}
                r={circleRadius}
                stroke="#FD8568"
                strokeWidth={strokeWidth}
                strokeDasharray={`${progressStroke}, ${circumference}`}
                strokeLinecap="round"
                fill="none"
                rotation="-90"
                origin="60, 60"
              />
            </Svg>
            <View style={styles.circleTextContainer}>
              <Text style={styles.circleText}>{totalExp}</Text>
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    padding: 20,
    width: 350,
    height: 150,
    marginTop: 15,
  },
  headerContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginRight: 5,
  },
  dateText: {
    color: '#E1E1E1',
    fontSize: 12,
    marginTop: 10,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  expText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  expTextWhite: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  expTextNumber: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    opacity: 1,
  },
  expTextOrange: {
    color: '#FD8568',
    fontSize: 22,
    fontWeight: 'bold',
  },
  chartContainer: {
    position: 'absolute',
    top: -40,
    right: 0,
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleTextContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorText: {
    color: '#ff0000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});