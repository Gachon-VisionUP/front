import { Image, StyleSheet, View, Text, StatusBar, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Title from "../../assets/images/login/Logo.png";
import bell from "../../assets/images/main/bell.png";
import styled from 'styled-components/native';

import HomeIcon from "@/components/home/homeIcon";
import HomeTitle from "@/components/home/homeTitle";
import HomeExp from '@/components/home/homeExp';
import HomeQuest from '@/components/home/homeQuset';
import mypage from '@/assets/images/mypage.png';
import gameIcon from '@/assets/images/main/gameIcon.png';

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
          <Link href={{ pathname: "../mypage" }}>
            <Image
              source={mypage}
              resizeMode="contain"
              style={styles.mypageIconImage}
            />
          </Link>

          {/* 아이콘 간격 추가 */}
          <View style={{ width: 10 }}/>{/* 두 아이콘 사이 간격을 설정 */}

          {/* 알람 벨 */}
          <Link href={{ pathname: "../alarm" }}>
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

      {/* 보라색 게임 배너 */}
      <Link href={{ pathname: "../expgame" }} style={styles.gameBanner}>
        <LinearGradient
          colors={['#3456FD', '#542EDF', '#7127C0', '#951F97']}
          style={styles.gradient}
        >
          <Text style={styles.bannerText}>더 많은 do를 얻고 싶다면?</Text>
          <Image source={gameIcon} style={styles.bannerIcon} />
          <Text style={styles.bannerCTA}>게임하러 가기</Text>
        </LinearGradient>
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
  },
  mypageIconImage: {
    width: 20, // 아이콘 너비 조정
    height: 20, // 아이콘 높이 조정
  },
  gameBanner: {
    width: '90%',
    marginTop: 7,
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  bannerText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
    flex: 1,
  },
  bannerIcon: {
    width: 30,
    height: 24,
    marginHorizontal: 10,
  },
  bannerCTA: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
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
  padding-right: 10px;
`;
