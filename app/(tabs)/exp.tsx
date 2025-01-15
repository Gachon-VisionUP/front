import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ExpStatus from '../exp/exp-status';
import ExpGrowth from '../exp/exp-growth';

const logoImage = require('../../assets/images/login/Logo.png');
const graphIcon = require('../../assets/images/exp/graph.png');

const experienceData = [
  { id: '1', title: '상반기 인사평가', points: '+2500 do', date: '2025.01.04' },
  { id: '2', title: '직무별 퀘스트', points: '+1300 do', date: '2025.01.04' },
  { id: '3', title: '리더별 퀘스트', points: '+1300 do', date: '2025.01.04' },
];

export default function Exp() {
  const [activeTab, setActiveTab] = useState('경험치 목록');
  const [selectedYear, setSelectedYear] = useState('2024');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const renderContent = () => {
    if (activeTab === '경험치 목록') {
      return (
        <>
          <LinearGradient colors={['#0681E7', '#5698CE']} style={styles.mainCard}>
            <View style={styles.cardHeaderRow}>
              <View style={styles.cardHeader}>
                <Image source={graphIcon} style={styles.graphIcon} />
                <Text style={styles.cardHeaderText}>경험치</Text>
              </View>
              <Text style={styles.cardSubtitle}>2025.01.04 기준</Text>
            </View>
            <View style={styles.mainTitleRow}>
              <Text style={styles.mainTitle}>상반기 인사평가</Text>
              <View style={styles.pointsContainer}>
                <Text style={styles.points}>+2500</Text>
                <Text style={styles.pointsUnit}> do</Text>
              </View>
            </View>
          </LinearGradient>

          {/* 드롭다운 */}
          <View style={styles.listHeaderContainer}>
            <Text style={styles.listHeader}>{selectedYear}년 3개</Text>
            <TouchableOpacity
              style={styles.dropdownToggle}
              onPress={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <Text style={styles.dropdownText}>{selectedYear}</Text>
            </TouchableOpacity>

            {isDropdownOpen && (
              <View style={styles.dropdownList}>
                {['2024', '2023', '2022'].map((year) => (
                  <TouchableOpacity
                    key={year}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSelectedYear(year);
                      setIsDropdownOpen(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{year}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* 리스트 */}
          <FlatList
            data={experienceData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.listCard}>
                <View style={styles.listLeftBar} />
                <View style={styles.listContent}>
                  <Text style={styles.listTitle}>{item.title}</Text>
                  <Text style={styles.listPoints}>{item.points}</Text>
                </View>
                <Text style={styles.listDate}>{item.date}</Text>
              </TouchableOpacity>
            )}
          />
        </>
      );
    } else if (activeTab === '경험치 현황') {
      return <ExpStatus />;
    } else if (activeTab === '성장 현황') {
      return <ExpGrowth />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logoImage} style={styles.logo} />
      </View>

      <View style={styles.tabNavigation}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === '경험치 목록' && styles.activeTab]}
          onPress={() => setActiveTab('경험치 목록')}
        >
          <Text style={[styles.tabText, activeTab === '경험치 목록' && styles.activeTabText]}>
            경험치 목록
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === '경험치 현황' && styles.activeTab]}
          onPress={() => setActiveTab('경험치 현황')}
        >
          <Text style={[styles.tabText, activeTab === '경험치 현황' && styles.activeTabText]}>
            경험치 현황
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === '성장 현황' && styles.activeTab]}
          onPress={() => setActiveTab('성장 현황')}
        >
          <Text style={[styles.tabText, activeTab === '성장 현황' && styles.activeTabText]}>
            성장 현황
          </Text>
        </TouchableOpacity>
      </View>

      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
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
    justifyContent: 'space-around',
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
    paddingBottom: 8,
  },
  tabButton: {
    paddingHorizontal: 8,
    paddingVertical: 8,
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
  mainCard: {
    height: 130,
    padding: 20,
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  graphIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginRight: 8,
  },
  cardHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#fff',
  },
  mainTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  mainTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  points: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
  pointsUnit: {
    fontSize: 25,
    color: '#F58220',
    fontWeight: 'bold',
  },
  listHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  listHeader: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dropdownToggle: {
    height: 40,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  dropdownList: {
    position: 'absolute',
    top: 42,
    width: 120,
    left: 222,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    zIndex: 10,
    elevation: 10,
  },
  dropdownItem: {
    padding: 10,
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  listCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 1,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 1,
    backgroundColor: '#fff',
  },
  listLeftBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 13,
    backgroundColor: '#FF5c35',
  },
  listContent: {
    flex: 1,
    paddingLeft: 16,
  },
  listTitle: {
    marginTop: -3,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#344bfd',
  },
  listPoints: {
    fontSize: 23,
    color: '#333',
    marginTop: 7,
  },
  listDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 38,
  },
});
