import React, { useEffect, useState, useCallback } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import logo from "@/assets/images/login/Logo.png";
import { useRouter, useFocusEffect } from "expo-router";
import axios from "axios";

const BASE_URL = process.env.REACT_NATIVE_BASE_URL || "http://35.216.61.56:8080";

interface ItemType {
  postId: number;
  title: string;
  body: string;
  date: string;
}

const Board = () => {
  const [data, setData] = useState<ItemType[]>([]);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState<ItemType[]>([]);
  const [selectedSort, setSelectedSort] = useState<"latest" | "oldest">("latest");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  // Fetch posts data
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/api/posts`);
      const { previewList } = response.data.result;

      // 기본 정렬: 최신순
      const sortedData = previewList.sort((a: ItemType, b: ItemType) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA;
      });

      setData(sortedData);
      setFilteredData(sortedData);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch posts.");
    } finally {
      setIsLoading(false);
    }
  };

  // Sort data
  const sortData = (order: "latest" | "oldest") => {
    const sortedData = [...filteredData].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return order === "latest" ? dateB - dateA : dateA - dateB;
    });
    setFilteredData(sortedData);
    setSelectedSort(order);
  };

  // Search functionality
  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text.trim() === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter(
        (item) =>
          item.title.toLowerCase().includes(text.toLowerCase()) ||
          item.body.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  // Reload data when the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  // Render each item
  const renderItem = ({ item }: { item: ItemType }) => (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/post/[id]",
          params: {
            id: item.postId.toString(),
            title: item.title,
            body: item.body,
            date: item.date,
          },
        })
      }
    >
      <View style={styles.itemContainer}>
        <Text style={styles.itemNumber}>{item.postId}</Text>
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemDate}>{item.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={logo} style={styles.logo} />
      <Text style={styles.header}>게시판</Text>

      {/* Search Input */}
      <View style={styles.searchInputContainer}>
        <Ionicons name="search" size={16} color="#888888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="제목, 키워드로 검색"
          placeholderTextColor="#888888"
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>

      {/* Sort Options */}
      <View style={styles.sortRow}>
        <TouchableOpacity onPress={() => sortData("latest")} style={styles.sortOption}>
          <Text
            style={selectedSort === "latest" ? styles.selectedSortText : styles.sortText}
          >
            최신순
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => sortData("oldest")} style={styles.sortOption}>
          <Text
            style={selectedSort === "oldest" ? styles.selectedSortText : styles.sortText}
          >
            오래된 순
          </Text>
        </TouchableOpacity>
      </View>

      {/* List Header */}
      <View style={styles.listHeader}>
        <Text style={styles.columnNumber}>번호</Text>
        <Text style={styles.columnTitle}>제목</Text>
      </View>

      {/* List */}
      {isLoading ? (
        <ActivityIndicator size="large" color="#1C6CF9" />
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.postId.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default Board;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
    paddingVertical: 50,
  },
  logo: {
    width: 150,
    height: 50,
    resizeMode: "contain",
    marginBottom: 20,
    marginLeft: -15,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1C6CF9",
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#344BFD",
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#dddddd",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#333333",
  },
  searchIcon: {
    marginRight: 8,
  },
  sortRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  sortOption: {
    marginLeft: 10,
  },
  sortText: {
    fontSize: 14,
    color: "#888888",
  },
  selectedSortText: {
    fontSize: 14,
    color: "#FF5C35",
  },
  listHeader: {
    flexDirection: "row",
    paddingBottom: 8,
  },
  columnNumber: {
    width: "15%",
    fontWeight: "bold",
    color: "#333333",
    backgroundColor: "#d9d9d9",
    marginRight: 15,
    paddingVertical: 5,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    
  },
  columnTitle: {
    width: "80%",
    fontWeight: "bold",
    color: "#333333",
    backgroundColor: "#d9d9d9",
    paddingVertical: 5,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd",
    paddingVertical: 20,
    flexDirection: "row",
  },
  itemNumber: {
    width: "20%",
    fontSize: 14,
    color: "#666666",
    marginLeft: 20,
    marginTop: 5,
  },
  itemTextContainer: {
    width: "80%",
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  itemDate: {
    fontSize: 12,
    color: "#888888",
    marginTop: 2,
  },
  writeButton: {
    backgroundColor: "#1C6CF9",
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  writeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});