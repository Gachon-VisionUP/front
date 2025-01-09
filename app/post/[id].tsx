import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import backIcon from "@/assets/images/main/back.png";
import Title from "@/assets/images/login/Logo.png";

const PostDetail = () => {
  const { id, title, description, date } = useLocalSearchParams(); // Retrieve dynamic parameters
  const router = useRouter();

  // Sample initialData used for navigation
  const initialData = [
    { id: '181', title: 'DDD 공지사항', description: '중요 공지, 신청 마감 ~07/20', date: '2024.07.20' },
    { id: '182', title: 'CCC 이벤트', description: '경험치 300 do, 신청 마감 ~08/15', date: '2024.08.15' },
    { id: '183', title: 'BBB 프로젝트 추가', description: '신청 마감 ~09/30', date: '2024.09.30' },
    { id: '184', title: 'AAA 프로젝트 신설', description: '경험치 500 do, 신청 마감 ~10/15', date: '2024.10.07' },
    { id: '185', title: '잡초이스 공고', description: '신청 마감 ~11/20', date: '2024.11.04' },
  ];

  // Find the current post index
  const currentIndex = initialData.findIndex((post) => post.id === id);

  const handleNavigation = (direction: 'previous' | 'next') => {
    if (direction === 'previous' && currentIndex > 0) {
      const previousPost = initialData[currentIndex - 1];
      router.push({
        pathname: '/post/[id]',
        params: {
          id: previousPost.id,
          title: previousPost.title,
          description: previousPost.description,
          date: previousPost.date,
        },
      });
    } else if (direction === 'next' && currentIndex < initialData.length - 1) {
      const nextPost = initialData[currentIndex + 1];
      router.push({
        pathname: '/post/[id]',
        params: {
          id: nextPost.id,
          title: nextPost.title,
          description: nextPost.description,
          date: nextPost.date,
        },
      });
    }
  };

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
          <TouchableOpacity onPress={() => handleNavigation('previous')} disabled={currentIndex === 0}>
            <Text style={[styles.paginationText, currentIndex === 0 && styles.disabledText]}>
              ◀ 이전글
            </Text>
          </TouchableOpacity>
          <View style={styles.separator}/>{/* Separator */}
          <TouchableOpacity onPress={() => handleNavigation('next')} disabled={currentIndex === initialData.length - 1}>
            <Text style={[styles.paginationText, currentIndex === initialData.length - 1 && styles.disabledText]}>
              다음글 ▶
            </Text>
          </TouchableOpacity>
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
    justifyContent: 'space-evenly',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 10,
  },
  paginationText: {
    fontSize: 14,
    color: '#1C6CF9',
  },
  disabledText: {
    color: '#ddd',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
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
    resizeMode: 'contain',
  },
  separator: {
    width: 1,
    height: '100%',
    backgroundColor: '#ddd',
    marginHorizontal: 10,
  },
});

export default PostDetail;
