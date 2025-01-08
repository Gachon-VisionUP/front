import React, { useState } from 'react';
import { FlatList, Text, View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import logo from '@/assets/images/login/Logo.png'; // 로고 이미지 import

interface ItemType {
  id: string;
  title: string;
  description: string;
  date: string;
}

const initialData: ItemType[] = [
  { id: '185', title: '잡초이스 공고', description: '신청 마감 ~11/20', date: '2024.11.04' },
  { id: '184', title: 'AAA 프로젝트 신설', description: '경험치 500 do, 신청 마감 ~10/15', date: '2024.10.07' },
  { id: '183', title: 'BBB 프로젝트 추가', description: '신청 마감 ~09/30', date: '2024.09.30' },
  { id: '182', title: 'CCC 이벤트', description: '경험치 300 do, 신청 마감 ~08/15', date: '2024.08.15' },
  { id: '181', title: 'DDD 공지사항', description: '중요 공지, 신청 마감 ~07/20', date: '2024.07.20' },
];

const parseDate = (dateString: string) => {
  const parts = dateString.split('.');
  return `${parts[0]}-${parts[1].padStart(2, '0')}-${parts[2].padStart(2, '0')}`;
};

const Board = () => {
  const [data, setData] = useState<ItemType[]>(initialData);
  const [searchText, setSearchText] = useState(''); // 검색 텍스트 상태
  const [selectedSort, setSelectedSort] = useState<'latest' | 'oldest'>('latest');

  const sortData = (order: 'latest' | 'oldest') => {
    const sortedData = [...data].sort((a, b) => {
      const dateA = new Date(parseDate(a.date)).getTime();
      const dateB = new Date(parseDate(b.date)).getTime();

      return order === 'latest' ? dateB - dateA : dateA - dateB;
    });

    setData(sortedData);
    setSelectedSort(order);
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text.trim() === '') {
      setData(initialData);
    } else {
      const filteredData = initialData.filter(
        (item) =>
          item.title.toLowerCase().includes(text.toLowerCase()) ||
          item.description.toLowerCase().includes(text.toLowerCase())
      );
      setData(filteredData);
    }
  };

  const renderItem = ({ item }: { item: ItemType }) => (
    <View style={styles.itemContainer}>
      <View style={styles.row}>
        <Text style={styles.itemNumber}>{item.id}</Text>
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemDate}>{item.date}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* 로고 이미지 추가 */}
      <Image source={logo} style={styles.logo} />
      <Text style={styles.header}>게시판</Text>
      <View style={styles.searchInputContainer}>
        <Ionicons name="search" size={16} color="#888888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="제목, 키워드로 검색"
          placeholderTextColor="#888888"
          value={searchText} // 입력값과 상태 연결
          onChangeText={handleSearch} // 입력값 변경 시 필터링 실행
        />
      </View>
      <View style={styles.sortRow}>
        <TouchableOpacity onPress={() => sortData('latest')} style={styles.sortOption}>
          <Text style={selectedSort === 'latest' ? styles.selectedSortText : styles.sortText}>최신순</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => sortData('oldest')} style={styles.sortOption}>
          <Text style={selectedSort === 'oldest' ? styles.selectedSortText : styles.sortText}>오래된 순</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={() => (
          <View style={styles.listHeader}>
            <Text style={styles.columnNumber}>번호</Text>
            <Text style={styles.columnTitle}>제목</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
    paddingVertical: 50,
  },
  logo: {
    width: 150,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 20,
    marginLeft: -15,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1C6CF9',
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#344BFD',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333333',
  },
  searchIcon: {
    marginRight: 8,
  },
  sortRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  sortOption: {
    marginLeft: 10,
  },
  sortText: {
    fontSize: 14,
    color: '#888888',
  },
  selectedSortText: {
    fontSize: 14,
    color: '#FF5C35',
  },
  listHeader: {
    flexDirection: 'row',
    paddingBottom: 8,
  },
  columnNumber: {
    width: '15%',
    fontWeight: 'bold',
    color: '#333333',
    backgroundColor: '#d9d9d9',
    marginRight: 15,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  columnTitle: {
    width: '80%',
    fontWeight: 'bold',
    color: '#333333',
    backgroundColor: '#d9d9d9',
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
    paddingVertical: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemNumber: {
    width: '20%',
    fontSize: 14,
    color: '#666666',
    marginLeft: 13,
  },
  itemTextContainer: {
    width: '80%',

  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  itemDate: {
    fontSize: 12,
    color: '#888888',
    marginTop: 2,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default Board;
