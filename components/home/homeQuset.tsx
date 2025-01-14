import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import questIcon from '@/assets/images/main/quest.png';
import { LinearGradient } from "expo-linear-gradient";

export default function HomeQuest() {
  return (
    <LinearGradient
      colors={["#5698CE", "#0681E7"]}
      style={[styles.card, { opacity: 0.9 }]}
    >
      {/* Header */}
      <View style={styles.headerContainer}>
        <Image source={questIcon} style={styles.icon} />
        <Text style={styles.headerText}>최근 퀘스트 경험치</Text>
      </View>

      {/* Content */}
      <View style={styles.contentContainer}>
        {/* Section 1 */}
        <View style={styles.section}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>월특근</Text>
          </View>
          <Text style={styles.questText}>
            + 1300 <Text style={styles.doText}>do</Text>
          </Text>
        </View>

        {/* Section 2 */}
        <View style={styles.section}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>업무개선</Text>
          </View>
          <Text style={styles.questText}>
            + 1500 <Text style={styles.doText}>do</Text>
          </Text>
        </View>

        {/* Section 3 */}
        <View style={styles.section}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>직무부여</Text>
          </View>
          <Text style={styles.questText}>
            + 1500 <Text style={styles.doText}>do</Text>
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    padding: 15,
    width: 350,
    height: 150,
    justifyContent: 'space-between',
    marginTop: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  headerText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  badge: {
    backgroundColor: '#71A9F7',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 15,
    opacity: 0.8,
  },
  badgeText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  questText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  doText: {
    color: '#FD8568',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
