import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { useRouter } from 'expo-router'; // useRouter import

export default function HomeTitle() {
  const router = useRouter(); // useRouter 훅 사용

  return (
    <Container>
      <Text style={styles.levelText}>LV. F1 - I</Text>
      <Text style={styles.welcomeText}>
        <Text style={styles.nameText}>박나영</Text>님 환영합니다
      </Text>
      <Text style={styles.supportText}>당신의 빛나는 내일을 두핸즈가 응원합니다</Text>

      {/* 내 정보 확인하기 버튼 */}
      {/* @ts-ignore */}
      <TouchableOpacity
        onPress={() => router.push('/mypage' as any)} // 경로 이동
        style={styles.button}
      >
        <Text style={styles.infoText}>내 정보 확인하기 &gt;</Text>
      </TouchableOpacity>
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
  levelText: {
    color: '#FF6B48',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '900',
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
    fontWeight: 'bold',
  },
  button: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
  },
});

const Container = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
