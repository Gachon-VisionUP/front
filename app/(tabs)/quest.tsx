import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import experienceData from '@/data/experienceData';
import LeaderQuest from '../quest/leader-quest'; // 리더 부여 퀘스트 화면 import

const logoImage = require('../../assets/images/login/Logo.png');

const monthNames = {
  January: '1월',
  February: '2월',
  March: '3월',
  April: '4월',
  May: '5월',
  June: '6월',
  July: '7월',
  August: '8월',
  September: '9월',
  October: '10월',
  November: '11월',
  December: '12월',
};

const QuestScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('직무별 퀘스트'); // 탭 전환 상태
  const [year, setYear] = useState<number>(2024);

  const minYear = Math.min(...Object.keys(experienceData.week).map(Number));
  const maxYear = Math.max(...Object.keys(experienceData.week).map(Number));

  const renderWeeks = (monthData: { [key: string]: { experience: number } }) => {
    return Object.keys(monthData).map((weekKey) => {
      const week = monthData[weekKey];
      const isActive = week.experience > 0;
      return (
        <View key={weekKey} style={styles.weekContainer}>
          <View
            style={[
              styles.weekCircle,
              isActive ? styles.activeWeekCircle : styles.inactiveWeekCircle,
            ]}
          >
            <Text style={[styles.weekLabel, isActive && styles.activeWeekLabel]}>
              {weekKey.replace('Week', '')}주차
            </Text>
          </View>
          {isActive && (
            <Text style={styles.experienceText}>
              <Text style={styles.experienceNumber}>+{week.experience}</Text>{' '}
              <Text style={styles.experienceUnit}>do</Text>
            </Text>
          )}
        </View>
      );
    });
  };

  const renderMonths = () => {
    const yearData = experienceData.week[year];
    return Object.keys(yearData).map((monthKey) => {
      const monthData = yearData[monthKey];
      return (
        <View key={monthKey} style={styles.monthContainer}>
          <Text style={styles.monthTitle}>{monthNames[monthKey as keyof typeof monthNames]}</Text>
          <View style={styles.weeksContainer}>{renderWeeks(monthData)}</View>
        </View>
      );
    });
  };

  const renderContent = () => {
    if (activeTab === '직무별 퀘스트') {
      return (
        <>
          <View style={styles.headerCard}>
            <View style={styles.headerRow}>
              <View style={styles.headerItem}>
                <Text style={styles.headerLabel}>소속</Text>
                <Text style={styles.headerValue}>음성 1센터</Text>
              </View>
              <View style={styles.headerItem}>
                <Text style={styles.headerLabel}>직무 그룹</Text>
                <Text style={styles.headerValue}>1</Text>
              </View>
              <View style={styles.headerItem}>
                <Text style={styles.headerLabel}>주기</Text>
                <Text style={styles.headerValue}>주</Text>
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
              onPress={() => setYear((prevYear) => Math.max(prevYear - 1, minYear))}
            >
              <Text style={styles.navButtonText}>{'<'}</Text>
            </TouchableOpacity>
            <Text style={styles.yearText}>{year}</Text>
            <TouchableOpacity
              style={styles.navButton}
              onPress={() => setYear((prevYear) => Math.min(prevYear + 1, maxYear))}
            >
              <Text style={styles.navButtonText}>{'>'}</Text>
            </TouchableOpacity>
          </View>
          <ScrollView>{renderMonths()}</ScrollView>
        </>
      );
    } else if (activeTab === '리더부여 퀘스트') {
      // 리더 부여 퀘스트 화면 렌더링
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
          <Text style={[styles.tabText, activeTab === '직무별 퀘스트' && styles.activeTabText]}>
            직무별 퀘스트
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === '리더부여 퀘스트' && styles.activeTab]}
          onPress={() => setActiveTab('리더부여 퀘스트')}
        >
          <Text style={[styles.tabText, activeTab === '리더부여 퀘스트' && styles.activeTabText]}>
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
  leaderQuestContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  leaderQuestHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  monthContainer: {
    marginBottom: 24,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  weeksContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
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
  },
  activeWeekCircle: {
    backgroundColor: '#5698CE',
  },
  inactiveWeekCircle: {
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
    color: '#000', // 검은색
    fontWeight: 'bold',
    fontSize: 20,
  },
  experienceUnit: {
    color: '#F16E27',
  },
});

export default QuestScreen;
