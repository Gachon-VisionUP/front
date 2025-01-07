import React from 'react';    
import { Text, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

// 컴포넌트 이름을 대문자로 변경
export default function HomeTitle() {  
  return (  
    <Container>  
      <Text style={styles.welcomeText}>
        <Text style={styles.nameText}>박나영</Text>님 환영합니다
      </Text>  
      <Text style={styles.supportText}>당신의 빛나는 내일을 두핸즈가 응원합니다</Text>  
      <Text style={styles.infoText}>내 정보 확인하기 &gt;</Text>  
    </Container>  
  );  
}  

const styles = StyleSheet.create({  
  welcomeText: {
    color: 'blue',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 10,
  },  

  nameText: {
    fontSize: 28,
    fontWeight: 'bold',
  },

  supportText: {
    color: 'gray',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },  

  infoText: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
  },
});

const Container = styled.View`  
  flex-direction: column;  
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;
