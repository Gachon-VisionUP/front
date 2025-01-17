import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ExpStatus from '../exp/exp-status';
import ExpGrowth from '../exp/exp-growth';
import axios from 'axios';

const logoImage = require('../../assets/images/login/Logo.png');
const graphIcon = require('../../assets/images/exp/graph.png');

const baseUrl = '35.216.61.56'; // Replace with your base URL

export default function Exp() {
  const [activeTab, setActiveTab] = useState('경험치 목록');
  const [selectedYear, setSelectedYear] = useState('2025');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [experienceData, setExperienceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [latestExpDate, setLatestExpDate] = useState('');
  const [latestExp, setLatestExp] = useState('');

  const fetchHomeData = async () => {
    try {
      console.log(' 홈 API 요청을 시작합니다...');
      const response = await axios.get(`http://${baseUrl}:8080/api/home`);
      console.log(' 홈 API 응답:', response.data);

      if (response.data) {
        console.log(' latestExpDate:', response.data.latestExpDate || '값 없음');
        console.log('latestExp:', response.data.latestExp || '값 없음');

        setLatestExpDate(response.data.latestExpDate || '');
        setLatestExp(response.data.latestExp || '');
      } else {
        console.log(' 홈 API에서 데이터를 찾을 수 없습니다.');
      }
    } catch (error) {
      console.error(' 홈 API 요청 중 오류 발생:', error);
    }
  };

  const fetchExperienceData = async (year) => {
    setLoading(true);
    try {
      console.log(`Fetching data for year: ${year}`);
      const response = await axios.get(`http://${baseUrl}:8080/api/experience/list?year=${year}`);
      console.log('API Response:', response.data);

      if (response.data && response.data.allExperiences && response.data.allExperiences.length > 0) {
        setExperienceData(response.data.allExperiences);
      } else {
        console.log('No data found.');
        setExperienceData([]); // 데이터를 비워줌
      }
    } catch (error) {
      console.error('Error fetching experience data:', error);
      console.log('Clearing data due to error.');
      setExperienceData([]); // 데이터를 비워줌
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('🔄 컴포넌트가 마운트되었습니다.');
    fetchHomeData(); // 홈 API 호출
    fetchExperienceData(selectedYear); // 경험치 데이터 호출
  }, [selectedYear]);

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
              <Text style={styles.cardSubtitle}>
                {latestExpDate ? `${latestExpDate} 기준` : `${selectedYear}.01.04 기준`}
              </Text>
            </View>
            <View style={styles.mainTitleRow}>
              <Text style={styles.mainTitle}>
                {latestExp ? `+${latestExp}` : ''} <Text style={styles.cardHeaderText}>최신 경험치</Text>
              </Text>
            </View>
          </LinearGradient>

          {/* 드롭다운 */}
          <View style={styles.listHeaderContainer}>
            <Text style={styles.listHeader}>{selectedYear}년</Text>
            <TouchableOpacity
              style={styles.dropdownToggle}
              onPress={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <Text style={styles.dropdownText}>{selectedYear}</Text>
            </TouchableOpacity>

            {isDropdownOpen && (
              <View style={styles.dropdownList}>
                {['2025', '2024', '2023', '2022'].map((year) => (
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
          {loading ? (
            <ActivityIndicator size="large" color="#0681E7" style={{ marginTop: 20 }} />
          ) : experienceData.length === 0 ? (
            <Text style={{ marginTop: 20, textAlign: 'center', color: '#555' }}>
              데이터를 찾을 수 없습니다.
            </Text>
          ) : (
            <FlatList
              data={experienceData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.listCard}>
                  <View style={styles.listLeftBar} />
                  <View style={styles.listContent}>
                    <Text style={styles.listTitle}>{item.expType}</Text>
                    <Text style={styles.listPoints}>+{item.exp}</Text>
                  </View>
                  <Text style={styles.listDate}>{item.obtainedDate}</Text>
                </TouchableOpacity>
              )}
            />
          )}
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
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 15,
    color: '#F16E27',
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