import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface PostDetailProps {
  route: {
    params: {
      id: string;
      title: string;
      description: string;
      date: string;
    };
  };
  navigation: {
    goBack: () => void;
  };
}

const PostDetail: React.FC<PostDetailProps> = ({ route, navigation }) => {
  const { id, title, date, description } = route.params;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigation.goBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>{'←'}</Text>
      </TouchableOpacity>
      <Text style={styles.logo}>두손쏙Do전!</Text>
      <Text style={styles.header}>게시판</Text>
      <View style={styles.postContainer}>
        <Text style={styles.postId}>{id}</Text>
        <Text style={styles.postTitle}>{title}</Text>
        <View style={styles.postDateContainer}>
          <Text style={styles.label}>날짜</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.attachmentContainer}>
          <Text style={styles.label}>첨부파일</Text>
        </View>
      </View>
      <View style={styles.pagination}>
        <Text style={styles.paginationText}>이전글</Text>
        <Text style={styles.paginationText}>다음글</Text>
      </View>
      <View style={styles.bottomNav}>
        <Text style={styles.navItem}>홈</Text>
        <Text style={styles.navItem}>경험치 현황</Text>
        <Text style={styles.navItem}>퀘스트 현황</Text>
        <Text style={styles.navItem}>게시판</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  backButton: {
    marginBottom: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: '#333333',
  },
  logo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#344BFD',
    marginBottom: 10,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1C6CF9',
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#344BFD',
  },
  postContainer: {
    marginBottom: 20,
  },
  postId: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 5,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  postDateContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666666',
    marginRight: 10,
  },
  date: {
    fontSize: 14,
    color: '#333333',
  },
  description: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 20,
    marginBottom: 20,
  },
  attachmentContainer: {
    borderTopWidth: 1,
    borderTopColor: '#dddddd',
    paddingTop: 10,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  paginationText: {
    fontSize: 14,
    color: '#1C6CF9',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#dddddd',
    paddingVertical: 10,
  },
  navItem: {
    fontSize: 14,
    color: '#333333',
  },
});

export default PostDetail;
