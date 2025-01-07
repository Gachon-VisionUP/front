import React, { useState } from "react";
import { useRouter } from "expo-router";  // Import useRouter from expo-router
import styled from "styled-components/native";
import userIcon from "../../assets/images/login/user.png";
import lockIcon from "../../assets/images/login/lock.png";
import eyeIcon from "../../assets/images/login/eye.png";
import eyeOffIcon from "../../assets/images/login/noeye.png";

export default function InputScreen() {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // 에러 메시지를 저장할 상태

  const router = useRouter();  // Initialize the router

  const validateInputs = () => {
    let valid = true;

    // 아이디가 올바르지 않은 경우
    if (username !== "123") {
      setError("올바른 아이디를 입력해주세요");
      valid = false;
    }
    // 아이디는 올바르나 비밀번호가 올바르지 않은 경우
    else if (username === "123" && password !== "123") {
      setError("비밀번호를 다시 확인해주세요");
      valid = false;
    }
    // 아이디와 비밀번호가 모두 올바른 경우, 에러 메시지 삭제
    else {
      setError("");
    }

    return valid;
  };

  const handleLogin = () => {
    if (validateInputs()) {
      // 검증이 통과하면 로그인 성공
      console.log("Login successful");
      
      // Navigate to /home after successful login
      router.push("/home");
    }
  };

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

        {/* 비밀번호 입력란 아래에만 에러 메시지 표시 */}
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
  border: 1px solid ${(props: any) => props.borderColor}; /* dynamic border color */
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
  padding: 5px; /* 터치 영역 확보 */
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
