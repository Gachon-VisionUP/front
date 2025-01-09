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
        <Text style={styles.headerText}>퀘스트</Text>
      </View>

      {/* Content */}
      <View style={styles.contentContainer}>
        {/* Section 1 */}
        <View style={styles.section}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>음성 1센터</Text>
          </View>
          <View style={styles.spacing} />
          <Text style={styles.questText}>
            1300 <Text style={styles.doText}>do</Text>
          </Text>
        </View>

        {/* Section 2 */}
        <View style={styles.section}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>직무그룹 1</Text>
          </View>
          <View style={styles.spacing} />
          <Text style={styles.questText}>
            1500 <Text style={styles.doText}>do</Text>
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
    marginBottom: 5,
    //borderWidth: 2,  
    //borderRadius: 5,  
    //borderStyle: 'solid'  
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  contentContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flex: 1,
    alignItems: 'center',
    //borderWidth: 2,  
    //borderRadius: 5,  
    //borderStyle: 'solid'  

  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 50,

  },
  badge: {
    backgroundColor: '#71A9F7',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 5,
    opacity: 0.8
  },
  badgeText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  spacing: {
    height: 5,
  },
  questText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  doText: {
    color: '#FD8568',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
