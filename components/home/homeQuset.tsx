import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import questIcon from '@/assets/images/main/quest.png';

export default function HomeQuest() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Image source={questIcon} style={styles.icon} />
        <Text style={styles.headerText}>퀘스트</Text>
      </View>

      {/* Content */}
      <View style={styles.contentContainer}>
        {/* Left Section */}
        <View style={styles.section}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>음성 1센터</Text>
          </View>
          <Text style={styles.questText}>1300 <Text style={styles.doText}>do</Text></Text>
        </View>

        {/* Right Section */}
        <View style={styles.section}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>직무그룹 1</Text>
          </View>
          <Text style={styles.questText}>1500 <Text style={styles.doText}>do</Text></Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#488EF6',
    borderRadius: 15,
    padding: 20,
    width: 350,
    height: 150,
    justifyContent: 'space-between',
    marginTop: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8, // Space between icon and text
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  section: {
    flex: 1,
    alignItems: 'center',
  },
  badge: {
    backgroundColor: '#71A9F7', // Light blue badge background
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
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
    fontWeight: 'bold',
  },
  doText: {
    color: '#FFDF00', // Yellow for 'do'
    fontSize: 16,
    fontWeight: 'bold',
  },
});
