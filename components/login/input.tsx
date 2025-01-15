import React, { useState } from "react";
import { useRouter } from "expo-router";
import styled from "styled-components/native";
import axios from "axios"; // axios 추가
import LoadingScreen from "./loadingScreen"; // 로딩 화면 컴포넌트 가져오기
import userIcon from "../../assets/images/login/user.png";
import lockIcon from "../../assets/images/login/lock.png";
import eyeIcon from "../../assets/images/login/eye.png";
import eyeOffIcon from "../../assets/images/login/noeye.png";

const BASE_URL = process.env.REACT_NATIVE_BASE_URL || "http://35.216.61.56:8080"; // Base URL 환경변수화

export default function InputScreen() {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // 에러 메시지를 저장할 상태
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

  const router = useRouter();

  const handleLogin = async () => {
    if (!username || !password) {
      setError("아이디와 비밀번호를 모두 입력해주세요");
      return;
    }

    setIsLoading(true); // 로딩 시작
    setError(""); // 기존 에러 메시지 초기화

    try {
      const response = await axios.post(`${BASE_URL}/api/users/login`, {
        loginId: username,
        password: password,
      });

      if (response.status === 200) {
        setIsLoading(false); // 로딩 종료
        router.push(username === "admin" ? "/admin" : "/home"); // 관리자와 일반 사용자 구분
      }
    } catch (err) {
      setIsLoading(false); // 로딩 종료
      if (err.response && err.response.status === 4005) {
        setError("아이디 또는 비밀번호가 잘못되었습니다");
      } else {
        setError("서버와 통신 중 오류가 발생했습니다");
      }
    }
  };

  if (isLoading) {
    return <LoadingScreen />; // 로딩 화면 표시
  }

  return (
    <Container>
      <InputWrapper>
        {/* 아이디 입력 */}
        <InputContainer borderColor={"#F16E27"}>
          <FrontIcon source={userIcon} />
          <StyledTextInput
            placeholder="아이디를 입력하세요"
            placeholderTextColor="#aaa"
            value={username}
            onChangeText={setUsername}
          />
        </InputContainer>

        {/* 비밀번호 입력 */}
        <InputContainer borderColor={"#F16E27"}>
          <FrontIcon source={lockIcon} />
          <StyledTextInput
            placeholder="비밀번호를 입력하세요"
            placeholderTextColor="#aaa"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableIcon onPress={() => setPasswordVisible((prev) => !prev)}>
            <Icon source={isPasswordVisible ? eyeIcon : eyeOffIcon} />
          </TouchableIcon>
        </InputContainer>

        {error ? <ErrorText>{error}</ErrorText> : null}
      </InputWrapper>

      <LoginButton onPress={handleLogin}>
        <ButtonText>로그인</ButtonText>
      </LoginButton>
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
  font-size: 14px;
  color: #333;
`;

const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 50px;
  border: 1px solid ${(props: any) => props.borderColor};
  border-radius: 8px;
  background-color: #fff;
  padding: 0 10px;
  margin-bottom: 12px;
`;

const Icon = styled.Image`
  width: 21px;
  height: 13px;
  margin-right: 10px;
`;

const FrontIcon = styled(Icon)`
  width: 15px;
  height: 18px;
`;

const TouchableIcon = styled.TouchableOpacity`
  padding: 5px;
`;

const LoginButton = styled.TouchableOpacity`
  background-color: #1c6cf9;
  padding: 20px;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 10px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
`;

const ErrorText = styled.Text`
  color: red;
  font-size: 12px;
  margin-top: 5px;
  text-align: center;
`;
