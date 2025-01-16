import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { useRouter } from 'expo-router';
import axios from 'axios';

const BASE_URL = process.env.REACT_NATIVE_BASE_URL || "http://35.216.61.56:8080";

export default function HomeTitle() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    userName: '',
    level: '',
    totalExp: 0,
    latestExp: 0,
    imageUrl: '',
    quests: [],
  });

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/home`);
        if (response.status === 200) {
          setUserData(response.data);
        }
      } catch (error) {
        console.error('Error fetching home data:', error);
      }
    };

    fetchHomeData();
  }, []);

  return (
    <Container>
      <Text style={styles.levelText}>LV. {userData.level}</Text>
      <Text style={styles.welcomeText}>
        <Text style={styles.nameText}>{userData.userName}</Text>님 환영합니다
      </Text>
      <Text style={styles.supportText}>당신의 빛나는 내일을 두핸즈가 응원합니다</Text>
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
