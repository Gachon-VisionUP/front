import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router'; // Router 추가

// 타입 정의
interface MonthData {
  month: string;
  status: string;
}

interface WeekData {
  week: string;
  status: string;
}

const LeaderQuestHeader: React.FC = () => {
  const router = useRouter(); // Router 가져오기
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMonthly, setIsMonthly] = useState(true); // 월별/주별 상태

  // 기본 퀘스트 목록 데이터
  const questList = [
    { title: '월특근', unit: '월 / 단위', id: 'monthly' },
    { title: '업무개선', unit: '주 / 단위', id: 'weekly' },
  ];

  // 표시할 퀘스트 개수 (기본적으로 3개만 표시)
  const visibleQuests = isExpanded ? questList : questList.slice(0, 3);

  // 월별 데이터
  const monthData: MonthData[] = [
    { month: '1월', status: 'max' },
    { month: '2월', status: 'medium' },
    { month: '3월', status: 'empty' },
    { month: '4월', status: 'max' },
    { month: '5월', status: 'medium' },
    { month: '6월', status: 'empty' },
    { month: '7월', status: 'max' },
    { month: '8월', status: 'medium' },
    { month: '9월', status: 'empty' },
    { month: '10월', status: 'max' },
    { month: '11월', status: 'medium' },
    { month: '12월', status: 'empty' },
  ];

  // 주별 데이터
  const weekData: WeekData[] = [
    { week: '1주차', status: 'medium' },
    { week: '2주차', status: 'empty' },
    { week: '3주차', status: 'max' },
    { week: '4주차', status: 'medium' },
    { week: '5주차', status: 'empty' },
  ];

  const navigateToDetail = () => {
    router.push('/quest/detailquest'); // 페이지 이동
  };

  return (
    <ScrollView style={styles.container}>
      {/* 퀘스트 목록 상자 */}
      <View style={styles.questListHeader}>
        <Text style={styles.questListTitle}>퀘스트 목록</Text>
        <ScrollView
          style={styles.questListContainer}
          nestedScrollEnabled
          showsVerticalScrollIndicator
        >
          {visibleQuests.map((quest, index) => (
            <TouchableOpacity key={index}>
              <View style={styles.questItem}>
                <View style={styles.verticalBar} />
                <Text style={styles.questName}>{quest.title}</Text>
                <Text style={styles.questUnit}>{quest.unit}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity
          style={styles.expandButton}
          onPress={() => setIsExpanded(!isExpanded)}
        >
          <Text style={styles.expandButtonText}>{isExpanded ? '▲' : '▼'}</Text>
        </TouchableOpacity>
      </View>

      {/* 월별/주별 스위치 & 맥스/미디움 */}
      <View style={styles.switchAndLegendContainer}>
        {/* 스위치 버튼 */}
        <View style={styles.switchContainer}>
          <TouchableOpacity
            style={[styles.switchButton, isMonthly && styles.activeSwitchButton]}
            onPress={() => setIsMonthly(true)}
          >
            <Text style={[styles.switchText, isMonthly && styles.activeSwitchText]}>월별</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.switchButton, !isMonthly && styles.activeSwitchButton]}
            onPress={() => setIsMonthly(false)}
          >
            <Text style={[styles.switchText, !isMonthly && styles.activeSwitchText]}>주별</Text>
          </TouchableOpacity>
        </View>
        {/* 색상 정보 */}
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

      {/* 각 퀘스트별 현황 박스 */}
      {questList
  .filter((quest) => (isMonthly && quest.id === 'monthly') || (!isMonthly && quest.id === 'weekly'))
  .map((quest, questIndex) => (
    <View key={questIndex} style={styles.questBox}>
      {/* 제목 부분 */}
      <TouchableOpacity onPress={() => navigateToDetail()}>
        <Text style={styles.questBoxTitle}>{quest.title} {'>'}</Text>
      </TouchableOpacity>

      {/* 주별 전환 시 월 텍스트 추가 */}
      {!isMonthly && <Text style={styles.monthLabel}>{`${questIndex + 1}월`}</Text>}

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.monthContainer}>
          {(isMonthly ? monthData : weekData).map((data, index) => (
            <View
              key={index}
              style={[
                styles.monthBox,
                data.status === 'max'
                  ? styles.max
                  : data.status === 'medium'
                  ? styles.medium
                  : styles.empty,
              ]}
            >
              <Text style={styles.monthText}>
                {'month' in data ? data.month : data.week}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  ))}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  questListHeader: {
    width: '110%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
    marginTop: 20,
    marginLeft: -15,
  },
  questListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  questListContainer: {
    flex: 1,
    marginLeft: 16,
    maxHeight: 120,
  },
  questItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  verticalBar: {
    width: 3,
    height: 16,
    backgroundColor: '#CDAD7F',
    marginRight: 8,
    marginLeft: 15,
  },
  questName: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  questUnit: {
    fontSize: 14,
    color: '#888',
    marginRight: 8,
  },
  expandButton: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  expandButtonText: {
    fontSize: 14,
    color: '#888',
  },
  switchAndLegendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 0,
    overflow: 'hidden',
    width: 100,
    height: 25,
    left: -13,
    top: 10,
  },
  switchButton: {
    flex: 1,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  activeSwitchButton: {
    backgroundColor: '#CDAD7F',
  },
  switchText: {
    fontSize: 12,
    color: '#888',
  },
  activeSwitchText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  legendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  legendCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 4,
    top: 23,
    left: 12,
  },
  legendText: {
    top: 23,
    fontSize: 12,
    color: '#333',
    right: -15,
  },
  questBox: {
    top: 25,
    width: "110%",
    left: -15,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#CDAD7F',
    marginBottom: 16,
  },
  questBoxTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  monthLabel: {
    fontSize: 16,
    color: '#3348EB',
    marginBottom: 8,
  },
  monthContainer: {
    flexDirection: 'row',
  },
  monthBox: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  max: {
    backgroundColor: '#F16E27',
  },
  medium: {
    backgroundColor: '#5698CE',
  },
  empty: {
    backgroundColor: '#E0E0E0',
  },
  monthText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default LeaderQuestHeader;