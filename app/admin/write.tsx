import React, { useState } from 'react';
import styled from 'styled-components/native';
import Title from '@/assets/images/login/Logo.png';
import backIcon from '@/assets/images/main/back.png';
import { useRouter } from 'expo-router';

const WritePost = () => {
  const [title, setTitle] = useState('');
  const router = useRouter();

  const handleSave = () => {
    console.log('Post Saved:', { title });
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

      {/* Save Button */}
      <SaveButton onPress={handleSave}>
        <SaveButtonText>글 저장하기</SaveButtonText>
      </SaveButton>
    </Container>
  );
};

export default WritePost;

// Styled Components
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

const InputGroupRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const Label = styled.Text`
  font-size: 16px;
  font-weight: 100;
  margin-right: 10px;
  border-bottom-width: 2px;
  border-bottom-color: #CFCFCF;
  padding-bottom: 10px;
`;

const InputRow = styled.TextInput`
  flex: 1;
  font-size: 14px;
  padding: 0;
  color: #333;
  border-bottom-width: 2px;
  border-bottom-color: #CFCFCF;
  padding-bottom: 14px;
  font-weight: 500;
`;

const SaveButton = styled.TouchableOpacity`
  background-color: #1c6cf9;
  padding: 15px;
  border-radius: 10px;
  align-items: center;
`;

const SaveButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;