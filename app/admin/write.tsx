import React, { useState } from 'react';
import styled from 'styled-components/native';
import Title from '@/assets/images/login/Logo.png';
import backIcon from '@/assets/images/main/back.png';
import { useRouter } from 'expo-router';
import SaveModal from '../../components/admin/SaveModal';
import axios from 'axios';

const BASE_URL = process.env.REACT_NATIVE_BASE_URL || 'http://35.216.61.56:8080';

const WritePost: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const router = useRouter();

  const handleSave = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/posts/add`, {
        title,
        body: content,
      });

      if (response.status === 200 && response.data.success) {
        console.log('Post Saved:', { title, content });
        setModalVisible(true);
      } else {
        console.error('Failed to save post:', response.data.message);
        alert('글 저장에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('Error while saving post:', error);
      alert('글 저장 중 오류가 발생했습니다.');
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    router.back();
  };

  return (
    <Container>
      {/* Header */}
      <Header>
        <BackButton onPress={() => router.back()}>
          <BackIcon source={backIcon} />
        </BackButton>
        <Logo source={Title} />
      </Header>
      <MainHeader>게시판 글쓰기</MainHeader>

      {/* Title Input */}
      <InputGroupRow>
        <Label>제목</Label>
        <InputRow
          placeholder="제목을 입력해주세요"
          placeholderTextColor="#000"
          value={title}
          onChangeText={setTitle}
        />
      </InputGroupRow>

      {/* Date Input */}
      <InputGroupRow>
        <Label>날짜</Label>
        <DateText>{new Date().toISOString().slice(0, 10)}</DateText>
      </InputGroupRow>

      {/* Content Input */}
      <InputGroup>
        <TextArea
          placeholder="내용을 입력해주세요"
          placeholderTextColor="#000"
          multiline
          numberOfLines={5}
          value={content}
          onChangeText={setContent}
        />
      </InputGroup>

      {/* Save Button */}
      <SaveButton disabled={!title || !content} onPress={handleSave} isDisabled={!title || !content}>
        <SaveButtonText>글 저장하기</SaveButtonText>
      </SaveButton>

      {/* Save Modal */}
      <SaveModal visible={modalVisible} onClose={handleCloseModal} />
    </Container>
  );
};

export default WritePost;

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 16px;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding-vertical: 40px;
  margin-bottom: 20px;
`;

const BackButton = styled.TouchableOpacity``;

const BackIcon = styled.Image`
  width: 24px;
  height: 24px;
`;

const Logo = styled.Image`
  flex: 1;
  width: 140px;
  height: 50px;
  resize-mode: contain;
`;

const MainHeader = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: #1c6cf9;
  border-bottom-width: 2px;
  border-bottom-color: #1c6cf9;
  margin-bottom: 20px;
`;

const InputGroup = styled.View`
  margin-bottom: 20px;
`;

const InputGroupRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const Label = styled.Text`
  font-size: 14px;
  font-weight: 100;
  margin-right: 10px;
  border-bottom-width: 2px;
  border-bottom-color: #cfcfcf;
  padding-bottom: 10px;
`;

const InputRow = styled.TextInput`
  flex: 1;
  font-size: 14px;
  padding: 0;
  color: #333;
  border-bottom-width: 2px;
  border-bottom-color: #cfcfcf;
  padding-bottom: 14px;
  font-weight: 500;
`;

const DateText = styled.Text`
  flex: 1;
  font-size: 14px;
  color: #333;
  border-bottom-width: 2px;
  border-bottom-color: #cfcfcf;
  padding-bottom: 14px;
  font-weight: 500;
`;

const TextArea = styled.TextInput`
  border-radius: 10px;
  padding: 10px;
  font-size: 14px;
  color: #333;
  height: 300px;
  text-align-vertical: top;
`;

const SaveButton = styled.TouchableOpacity<{ isDisabled: boolean }>`
  background-color: ${(props) => (props.isDisabled ? '#cfcfcf' : '#1c6cf9')};
  padding: 15px;
  border-radius: 10px;
  align-items: center;
`;

const SaveButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;
