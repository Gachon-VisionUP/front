import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal } from 'react-native';

const logoImage = require('../../assets/images/login/Logo.png');
const closeIcon = require('../../assets/images/exp/close.png'); // 사용자 저장된 이미지

const LeaderQuestDetail: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('리더부여 퀘스트'); // 탭 전환 상태
  const [year, setYear] = useState<number>(2024); // 현재 연도 상태
  const [modalVisible, setModalVisible] = useState<boolean>(false); // 팝업 상태
  const minYear = 2020; // 최소 연도
  const maxYear = 2030; // 최대 연도

  // 월 데이터
  const monthData = [
    { month: '1월', count: 7, experience: 100, color: '#F16E27' },
    { month: '2월', count: 3, experience: 50, color: '#5698CE' },
    { month: '3월', count: 5, experience: 67, color: '#5698CE' },
    { month: '4월', count: 0, experience: 0, color: '#E0E0E0' },
    { month: '5월', count: 4, experience: 50, color: '#5698CE' },
    { month: '6월', count: 7, experience: 100, color: '#F16E27' },
    { month: '7월', count: 0, experience: 0, color: '#E0E0E0' },
    { month: '8월', count: 0, experience: 0, color: '#E0E0E0' },
    { month: '9월', count: 0, experience: 0, color: '#E0E0E0' },
    { month: '10월', count: 0, experience: 0, color: '#E0E0E0' },
    { month: '11월', count: 0, experience: 0, color: '#E0E0E0' },
    { month: '12월', count: 0, experience: 0, color: '#E0E0E0' },
  ];

  const renderContent = () => {
    if (activeTab === '리더부여 퀘스트') {
      return (
        <>
          <View style={styles.headerContent}>
            <Text style={styles.title}>월특근</Text>
            <TouchableOpacity style={styles.filterButton} onPress={() => setModalVisible(true)}>
              <Text style={styles.filterButtonText}>기준표 ▼</Text>
            </TouchableOpacity>
          </View>

          {/* 연도 선택 */}
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

          {/* 월 데이터 */}
          <ScrollView>
            <View style={styles.monthContainer}>
              {monthData.map((month, index) => (
                <View key={index} style={styles.monthBox}>
                  <View
                    style={[
                      styles.circle,
                      { backgroundColor: month.color },
                    ]}
                  >
                    <Text style={styles.monthText}>{month.month}</Text>
                  </View>
                  {month.count > 0 && (
                    <View style={styles.experienceContainer}>
                      <Text style={styles.countText}>{month.count}회</Text>
                      <Text style={styles.experienceText}>
                        +{month.experience} <Text style={{ color: '#F16E27' }}>do</Text>
                      </Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </ScrollView>
        </>
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* 상단 로고 */}
      <View style={styles.logoContainer}>
        <Image source={logoImage} style={styles.logo} />
      </View>

      {/* 탭 네비게이션 */}
      <View style={styles.tabNavigation}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === '리더부여 퀘스트' && styles.activeTab]}
          onPress={() => setActiveTab('리더부여 퀘스트')}
        >
          <Text style={[styles.tabText, activeTab === '리더부여 퀘스트' && styles.activeTabText]}>
            리더부여 퀘스트
          </Text>
        </TouchableOpacity>
      </View>

      {/* 컨텐츠 렌더링 */}
      {renderContent()}

      {/* 팝업 모달 */}
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>월특근</Text>
            <View style={styles.modalRow}>
              <View style={styles.modalItem}>
                <Text style={[styles.modalText, { color: '#F16E27' }]}>MAX</Text>
                <Text style={styles.modalSubText}>주 4회 이상</Text>
              </View>
              <View style={styles.modalItem}>
                <Text style={[styles.modalText, { color: '#5698CE' }]}>MED</Text>
                <Text style={styles.modalSubText}>주 2회 이상</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
              <Image source={closeIcon} style={styles.closeIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#8F734D',
    top: 10,
  },
  filterButton: {
    padding: 8,
  },
  filterButtonText: {
    top: 10,
    fontSize: 15,
    color: '#888',
  },
  yearNavigation: {
    top: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
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
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 16,
    color: '#333',
  },
  monthContainer: {
    marginTop: 30,
  },
  monthBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  circle: {
    width: 70,
    height: 70,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthText: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },
  experienceContainer: {
    marginLeft: 16,
    alignItems: 'center',
  },
  countText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    left: 70,
  },
  experienceText: {
    left: 70,
    fontSize: 17,
    color: '#F16E2D',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    height: '20%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  modalTitle: {
    top: 5,
    fontSize: 27,
    fontWeight: 'bold',
    color: '#CDAD7F',
    marginBottom: 16,
  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalItem: {
    alignItems: 'center',
    flex: 1,
  },
  modalText: {
    top: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalSubText: {
    top: 27,
    fontSize: 17,
    color: '#333',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  closeIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});

export default LeaderQuestDetail; 