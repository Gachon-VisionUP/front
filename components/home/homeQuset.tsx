import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeQuest() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.headerText}>12월 1주차 퀘스트</Text>

      {/* Content */}
      <View style={styles.contentContainer}>
        {/* Left Section */}
        <View style={styles.section}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>음성 1센터</Text>
          </View>
          <Text style={styles.questText}>
            퀘스트 <Text style={styles.highlightText}>7/7</Text>
          </Text>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Right Section */}
        <View style={styles.section}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>직무그룹 1</Text>
          </View>
          <Text style={styles.questText}>
            퀘스트 <Text style={styles.highlightText}>3/5</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F58220', // Orange background
    borderRadius: 15,
    padding: 20,
    width: 350,
    height: 150,
    justifyContent: 'space-between',
    marginTop: 15
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  section: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  badge: {
    backgroundColor: '#FFC04D', // Yellow badge background
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  badgeText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  questText: {
    color: 'white',
    fontSize: 16,
  },
  highlightText: {
    color: '#4A90E2', // Blue text
    fontSize: 20,
    fontWeight: 'bold',
  },
  divider: {
    width: 1,
    height: '70%',
    backgroundColor: 'white',
    marginHorizontal: 10,
  },
});
