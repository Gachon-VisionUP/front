import { Image, StyleSheet, Text, View, StatusBar } from 'react-native';
import { Link } from 'expo-router';
import Title from "../../assets/images/login/Logo.png";
import bell from "../../assets/images/main/bell.png";
import styled from 'styled-components/native';

import HomeIcon from "@/components/home/homeIcon";
import HomeTitle from "@/components/home/homeTitle";
import HomeExp from '@/components/home/homeExp';
import HomeQuest from '@/components/home/homeQuset';
import mypage from '@/assets/images/mypage.png';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#000000" barStyle="light-content" animated={true} />
      <ImageContainer>
        {/* 로고 왼쪽 끝 */}
        <Image
          source={Title}
          resizeMode="contain"
          style={styles.imageStyle}
        />

        {/* 아이콘 오른쪽 */}
        <IconsContainer>
          {/* 마이페이지 */}
          <Link
            href={{
              pathname: "../mypage",
            }}
          >
            <Image
              source={mypage}
              resizeMode="contain"
              style={styles.mypageIconImage}
            />
          </Link>

          {/* 알람 벨 */}
          <Link
            href={{
              pathname: "../alarm",
            }}
          >
            <Image
              source={bell}
              resizeMode="contain"
              style={styles.noticeIconImage}
            />
          </Link>
        </IconsContainer>
      </ImageContainer>
      <HomeIcon />
      <HomeTitle />
      <HomeExp />
      <HomeQuest />
      <Link
        style={styles.button}
        href={{
          pathname: "../login",
        }}
      >
        <Text style={styles.buttonText}>로그인 페이지로</Text>
      </Link>
    </View>
  );
}

// 상단바 옵션 추가
HomeScreen.options = {
  headerShown: false, // 상단바 숨기기
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  imageStyle: {
    width: 160, // 로고 너비 조정
    height: 70, // 로고 높이 조정
    marginRight: 'auto', // 로고를 왼쪽 끝으로 이동
  },
  noticeIconImage: {
    width: 30, // 아이콘 너비 조정
    height: 30, // 아이콘 높이 조정
    paddingLeft: 40,
  },
  mypageIconImage: {
    width: 20, // 아이콘 너비 조정
    height: 20, // 아이콘 높이 조정
  },
  button: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "skyblue",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

const ImageContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%; /* 전체 컨테이너 너비를 화면 전체로 설정 */
  margin-top: 30px;
  padding-right: 10px;
`;

const IconsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end; /* 아이콘을 오른쪽으로 정렬 */
`;
