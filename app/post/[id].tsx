import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import backIcon from '@/assets/images/main/back.png';
import Title from '@/assets/images/login/Logo.png';

const BASE_URL = process.env.REACT_NATIVE_BASE_URL || 'http://35.216.61.56:8080';

const PostDetail = () => {
  const { id } = useLocalSearchParams(); // postId from route params
  const router = useRouter();
  const [post, setPost] = useState<{ title: string; body: string; date: string } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch post details
  const fetchPostDetails = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/api/posts/${id}`);
      setPost(response.data.result);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch post details.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchPostDetails();
  }, [id]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#1C6CF9" />
      </View>
    );
  }

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
          <Text style={styles.itemTitle}>{post?.title}</Text>
        </View>
        <Text style={styles.itemDate}>날짜: {post?.date}</Text>
        <View style={styles.contentContainer}>
          <Text style={styles.contentText}>{post?.body}</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>첨부파일</Text>
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
});

export default PostDetail;
