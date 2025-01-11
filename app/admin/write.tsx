import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Title from '@/assets/images/login/Logo.png';
import backIcon from '@/assets/images/main/back.png';
import { useRouter } from 'expo-router';


const WritePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [attachment, setAttachment] = useState('');
  const router = useRouter();

  const handleSave = () => {
    console.log('Post Saved:', { title, content, attachment });
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={backIcon} style={styles.backIcon} />
        </TouchableOpacity>
        <Image source={Title} style={styles.logo} />
      </View>
      <Text style={styles.mainHeader}>게시판 글쓰기</Text>

      {/* Title Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>제목</Text>
        <TextInput
          style={styles.input}
          placeholder="제목을 입력해주세요"
          placeholderTextColor="#888"
          value={title}
          onChangeText={setTitle}
        />
      </View>

      {/* Date */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>날짜</Text>
        <TextInput
          style={styles.input}
          value={new Date().toISOString().slice(0, 10)}
          editable={false}
        />
      </View>

      {/* Content Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>내용</Text>
        <TextInput
          style={styles.textArea}
          multiline
          numberOfLines={5}
          placeholder="내용을 입력해주세요"
          placeholderTextColor="#888"
          value={content}
          onChangeText={setContent}
        />
      </View>

      {/* Attachment */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>첨부파일</Text>
        <TextInput
          style={styles.input}
          placeholder="첨부파일을 추가해주세요"
          placeholderTextColor="#888"
          value={attachment}
          onChangeText={setAttachment}
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>글 저장하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  logo: {
    flex: 1,
    width: 140,
    height: 50,
    resizeMode: 'contain',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 40,

    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
    color: '#333',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
    color: '#333',
    height: 100,
  },
  saveButton: {
    backgroundColor: '#1C6CF9',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  mainHeader: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1C6CF9',
    borderBottomWidth: 2,
    borderBottomColor: '#1C6CF9',
    marginBottom: 20,
  },
  
});

export default WritePost;
