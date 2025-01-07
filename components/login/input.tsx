import React from "react";
import styled from "styled-components/native";
import userIcon from "../../assets/images/login/user.png"; // 유저 아이콘 경로
import lockIcon from "../../assets/images/login/lock.png"; // 자물쇠 아이콘 경로

export default function InputScreen() {
    return (
        <Container>
            <InputWrapper>
                <InputContainer>
                    <Icon source={userIcon} />
                    <StyledTextInput placeholder="아이디를 입력하세요" placeholderTextColor="#aaa" />
                </InputContainer>
                <InputContainer>
                    <Icon source={lockIcon} />
                    <StyledTextInput
                        placeholder="비밀번호를 입력하세요"
                        placeholderTextColor="#aaa"
                        secureTextEntry
                    />
                </InputContainer>
            </InputWrapper>
        </Container>
    );
}

const Container = styled.View`
  justify-content: center;
  align-items: center;
  padding: 20px;
  width: 100%;
`;

const InputWrapper = styled.View`
  width: 100%;
  margin-bottom: 16px;
`;

const StyledTextInput = styled.TextInput`
  flex: 1;
  font-size: 14px; /* 글자 크기를 조금 줄임 */
  color: #333;
`;

const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  padding: 0 10px;
  margin-bottom: 12px;
`;

const Icon = styled.Image`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

