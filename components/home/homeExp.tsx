import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Svg, Circle } from 'react-native-svg';

export default function HomeExp() {
  const circleRadius = 50; // Radius of the progress circle
  const strokeWidth = 10; // Thickness of the circle
  const progressPercentage = 75; // Progress percentage (e.g., 75%)
  const circumference = 2 * Math.PI * circleRadius;
  const progressStroke = (progressPercentage / 100) * circumference;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>경험치</Text>
        <Text style={styles.dateText}>2025.01.04 기준</Text>
      </View>
      <View style={styles.contentContainer}>
        <View>
          <View style={styles.labelContainer}>
            <Text style={styles.labelText}>상반기 인사평가</Text>
          </View>
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
              stroke="rgba(255, 102, 102, 0.2)" // Background circle color
              strokeWidth={strokeWidth}
              fill="none"
            />
            <Circle
              cx={60}
              cy={60}
              r={circleRadius}
              stroke="orange" // Progress circle color
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
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(48, 123, 255, 0.65)',
    borderRadius: 15,
    padding: 20,
    width: 350,
    height: 150,
    marginTop: 15,
  },
  headerContainer: {
    marginBottom: 10,
    flexDirection: 'row', // Arrange items in a row
    alignItems: 'center', // Vertically center items
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10, // Add space between headerText and dateText
  },
  dateText: {
    color: 'white',
    fontSize: 12,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  labelContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.22)', // White background with 22% opacity
    paddingVertical: 5, // Vertical padding for better appearance
    paddingHorizontal: 10, // Horizontal padding
    borderRadius: 5, // Rounded corners
    marginBottom: 10,
  },
  labelText: {
    color: 'white',
    fontSize: 14,
  },
  expText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expTextWhite: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  expTextNumber: {
    color: 'white',
    fontSize: 28, // Increase font size for the number
    fontWeight: 'bold',
  },
  expTextOrange: {
    color: 'orange',
    fontSize: 22,
    fontWeight: 'bold',
  },
  chartContainer: {
    position: 'absolute', // Absolute positioning to move the chart
    top: -40, // Move the chart upwards
    right: 0, // Align to the right
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
});
