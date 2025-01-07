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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#488EF6',
    borderRadius: 15,
    padding: 15, // 기존 20에서 15로 줄임
    width: 350,
    height: 150, // 높이 줄임
    justifyContent: 'space-between',
    marginTop: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5, // 헤더와 내용 간의 간격 줄임
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
    flexDirection: 'column', // 가로에서 세로로 변경
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
  },
  badgeText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  spacing: {
    height: 5, // 음성 1센터와 숫자 간의 간격
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
