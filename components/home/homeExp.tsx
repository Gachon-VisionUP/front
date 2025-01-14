import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Svg, Circle } from 'react-native-svg';
import exp from '@/assets/images/main/exp.png';
import { LinearGradient } from "expo-linear-gradient";


export default function HomeExp() {
  const circleRadius = 50;
  const strokeWidth = 10;
  const progressPercentage = 75;
  const circumference = 2 * Math.PI * circleRadius;
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
          <Text style={styles.dateText}>25.01.04 기준</Text>
        </View>
        <View style={styles.contentContainer}>
          <View>
            <Text style={styles.expText}>
              <Text style={styles.expTextWhite}>+ </Text>
              <Text style={styles.expTextNumber}>2500 </Text>
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
              <Text style={styles.circleText}>10,500</Text>
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
  labelContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  labelText: {
    color: 'white',
    fontSize: 14,
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
    opacity: 1
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
});
