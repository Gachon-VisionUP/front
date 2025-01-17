import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import axios from 'axios';
import LeaderQuest from '../quest/leader-quest';
import * as Notifications from 'expo-notifications';

const logoImage = require('../../assets/images/login/Logo.png');

const BASE_URL = process.env.REACT_NATIVE_BASE_URL || "http://35.216.61.56:8080";

const monthKeys = [
  '1월', '2월', '3월', '4월', '5월',
  '6월', '7월', '8월', '9월', '10월',
  '11월', '12월'
];

interface Quest {
  department: string;
  part: number;
  cycle: string;
  round: number;
  grantedExp: number;
  questGrade: string;
  grantedDate: string;
}


const QuestScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('직무별 퀘스트'); // 탭 전환 상태
  const [year, setYear] = useState<number>(2024);
  const [questData, setQuestData] = useState<Quest[]>([]);

  const fetchQuestData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/team-quest/job`, {
        params: { year },
      });
      setQuestData(response.data);
    } catch (error) {
      console.error('Failed to fetch quest data:', error);
    }
  };


  // ✅ 알림 전송
  const sendNotification = async (month: string) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '축하합니다!',
        body: `${month}의 모든 주차가 활성화되었습니다!`,
      },
      trigger: null, // 즉시 보내려면 'trigger'에 'null'을 설정
    });
  };

  useEffect(() => {
    renderMonths();
    fetchQuestData();
  }, [year]);

  const isMonthFullyActive = (monthIndex: number): boolean => {
    const weeksPerMonth = [4, 4, 4, 4, 4, 4, 5, 4, 4, 5, 4, 4]; // Weeks distribution per month
    let weekStart = 1;

    // Calculate the starting week number for the given month
    for (let i = 0; i < monthIndex; i++) {
      weekStart += weeksPerMonth[i];
    }

    // Get the list of weeks for the given month
    const weeksInMonth = Array.from(
      { length: weeksPerMonth[monthIndex] },
      (_, i) => weekStart + i
    );

    // Check if all weeks in the month are active
    return weeksInMonth.every((weekNumber) =>
      questData.some(
        (quest) =>
          quest.round === weekNumber &&
          new Date(quest.grantedDate).getFullYear() === year
      )
    );
  };

  const renderMonths = () => {
    return monthKeys.map((month, index) => {
      const isFullyActive = isMonthFullyActive(index);
      sendNotification(month);
      return (
        <>

        </>
      );
    });
  };

  const renderWeeks = () => {
    const weeksPerMonth = [4, 4, 4, 4, 4, 4, 5, 4, 4, 5, 4, 4];
    let weekCounter = 1;

    return weeksPerMonth.map((weeksInMonth, monthIndex) => (
      <View key={monthIndex} style={styles.monthContainer}>
        <Text style={styles.monthTitle}>{[monthKeys[monthIndex]]}</Text>
        <View style={styles.weeksContainer}>
          {Array.from({ length: weeksInMonth }, (_, i) => {
            if (weekCounter > 52) return null;

            const quest = questData.find(
              (q) =>
                q.round === weekCounter &&
                new Date(q.grantedDate).getFullYear() === year
            );

            const isActive = !!quest;
            const circleColor = quest?.questGrade === 'MAX' ? '#F16E27' : '#5698CE';

            const currentWeek = weekCounter;
            weekCounter++;

            return (
              <View key={currentWeek} style={styles.weekContainer}>
                <View
                  style={[
                    styles.weekCircle,
                    isActive && { backgroundColor: circleColor },
                  ]}
                >
                  <Text
                    style={[
                      styles.weekLabel,
                      isActive && styles.activeWeekLabel,
                    ]}
                  >
                    {currentWeek}주차
                  </Text>
                </View>
                {isActive && (
                  <Text style={styles.experienceText}>
                    <Text style={styles.experienceNumber}>+{quest?.grantedExp}</Text>{' '}
                    <Text style={styles.experienceUnit}>do</Text>
                  </Text>
                )}
              </View>
            );
          })}
        </View>
      </View>
    ));
  };

  const renderContent = () => {
    if (activeTab === '직무별 퀘스트') {
      // department를 변환하는 로직 추가
      const departmentRaw = questData[0]?.department || 'N/A';
      const department =
        departmentRaw === 'EUMSEONG1'
          ? '음성 1센터'
          : departmentRaw === 'EUMSEONG2'
            ? '음성 2센터'
            : departmentRaw;

      const part = questData[0]?.part || 'N/A';
      const cycle = questData[0]?.cycle === 'WEEKLY' ? '주' : questData[0]?.cycle || 'N/A';

      return (
        <>
          <View style={styles.headerCard}>
            <View style={styles.headerRow}>
              <View style={styles.headerItem}>
                <Text style={styles.headerLabel}>소속</Text>
                <Text style={styles.headerValue}>{department}</Text>
              </View>
              <View style={styles.headerItem}>
                <Text style={styles.headerLabel}>직무 그룹</Text>
                <Text style={styles.headerValue}>{part}</Text>
              </View>
              <View style={styles.headerItem}>
                <Text style={styles.headerLabel}>주기</Text>
                <Text style={styles.headerValue}>{cycle}</Text>
              </View>
            </View>
          </View>
          <View style={styles.productivitySection}>
            <Text style={styles.productivityTitle}>생산성</Text>
            <View style={styles.legendContainer}>
              <View style={styles.legendItem}>
                <View style={[styles.legendCircle, { backgroundColor: '#F16E27' }]} />
                <Text style={styles.legendText}>맥스</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendCircle, { backgroundColor: '#5698CE' }]} />
                <Text style={styles.legendText}>미디움</Text>
              </View>
            </View>
          </View>
          <View style={styles.yearNavigation}>
            <TouchableOpacity
              style={styles.navButton}
              onPress={() => setYear((prevYear) => Math.max(prevYear - 1, 2020))}
            >
              <Text style={styles.navButtonText}>{'<'}</Text>
            </TouchableOpacity>
            <Text style={styles.yearText}>{year}</Text>
            <TouchableOpacity
              style={styles.navButton}
              onPress={() => setYear((prevYear) => prevYear + 1)}
            >
              <Text style={styles.navButtonText}>{'>'}</Text>
            </TouchableOpacity>
          </View>
          <ScrollView>{renderWeeks()}</ScrollView>
        </>
      );
    } else if (activeTab === '리더부여 퀘스트') {
      return <LeaderQuest />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logoImage} style={styles.logo} />
      </View>
      <View style={styles.tabNavigation}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === '직무별 퀘스트' && styles.activeTab]}
          onPress={() => setActiveTab('직무별 퀘스트')}
        >
          <Text
            style={[styles.tabText, activeTab === '직무별 퀘스트' && styles.activeTabText]}
          >
            직무별 퀘스트
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === '리더부여 퀘스트' && styles.activeTab]}
          onPress={() => setActiveTab('리더부여 퀘스트')}
        >
          <Text
            style={[styles.tabText, activeTab === '리더부여 퀘스트' && styles.activeTabText]}
          >
            리더부여 퀘스트
          </Text>
        </TouchableOpacity>
      </View>

      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  logoContainer: {
    alignItems: 'flex-start',
    marginTop: 20,
    marginBottom: 8,
  },
  logo: {
    width: 120,
    height: 45,
    resizeMode: 'contain',
    marginLeft: -5,
  },
  tabNavigation: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTab: {
    borderBottomColor: '#000',
    borderBottomWidth: 2,
  },
  activeTabText: {
    color: '#000',
    fontWeight: 'bold',
  },
  headerCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 32,
    paddingVertical: 16,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingTop: 30,
    paddingBottom: 30,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerItem: {
    alignItems: 'center',
    flex: 1,
  },
  headerLabel: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 4,
  },
  headerValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  monthContainer: {
    marginBottom: 20,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  weeksContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  weekContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  weekCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  weekLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  activeWeekLabel: {
    color: '#fff',
  },
  experienceText: {
    marginTop: 8,
    fontSize: 16,
    color: '#F16E27',
  },
  experienceNumber: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 20,
  },
  experienceUnit: {
    color: '#F16E27',
  },
  yearNavigation: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  navButton: {
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  navButtonText: {
    fontSize: 16,
    color: '#7B5E2A',
  },
  yearText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 16,
    color: '#333',
  },
  productivitySection: {
    marginTop: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productivityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7B5E2A',
    marginBottom: 8,
  },
  legendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  legendCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 4,
  },
  legendText: {
    fontSize: 12,
    color: '#333',
  },
});

export default QuestScreen;
