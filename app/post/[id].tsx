import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import backIcon from "@/assets/images/main/back.png";
import Title from "@/assets/images/login/Logo.png";
const PostDetail = () => {
  const { id, title, description, date } = useLocalSearchParams(); // Retrieve dynamic parameters
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={backIcon} style={styles.backIcon} />
        </TouchableOpacity>
        <Image source={Title} style={styles.logo} />
      </View>
      {/* Title */}
      <Text style={styles.mainHeader}>게시판</Text>

      {/* Detail Section */}
      <View style={styles.detailContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.itemId}>{id}</Text>
          <Text style={styles.itemTitle}>{title}</Text>
        </View>
        <Text style={styles.itemDate}>날짜: {date}</Text>
        <View style={styles.contentContainer}>
          <Text style={styles.contentText}>{description}</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>첨부파일</Text>
        <View style={styles.pagination}>
          <Text style={styles.paginationText}>◀ 이전글</Text>
          <Text style={styles.paginationText}>다음글 ▶</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    paddingVertical: 20,
  },
  mainHeader: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1C6CF9',
    borderBottomWidth: 2,
    borderBottomColor: '#1C6CF9',
    marginBottom: 20,
  },
  detailContainer: {
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  itemId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1C6CF9',
    marginRight: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemDate: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  contentContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 30,
    paddingBottom: 250,
  },
  contentText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 10,
  },
  footerText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,

  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 10,
  },
  paginationText: {
    fontSize: 14,
    color: '#1C6CF9',
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 40,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  logo: {
    flex: 1,
    width: 140,
    height: 50,
    resizeMode: "contain",
  },
});

export default PostDetail;
