import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import backIcon from '@/assets/images/main/back.png';
import profileIcon from '@/assets/images/main/icon1.png'; // Placeholder for the profile image
import logo from '@/assets/images/login/Logo.png';

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={backIcon} style={styles.backIcon} />
        </TouchableOpacity>
        <Image source={logo} style={styles.logo} />
      </View>

      {/* Profile Card */}
      <View style={styles.cardContainer}>
        <View style={styles.cardHeader}>
          <Image source={logo} style={styles.cardLogo} />
        </View>
        <Image source={profileIcon} style={styles.profileImage} />
        <Text style={styles.nameText}>김민수</Text>
        <Text style={styles.centerText}>음성1센터 (1)</Text>
        <Text style={styles.levelText}>LV. FI - I</Text>
        <Text style={styles.infoText}>사번: 2023010101</Text>
        <Text style={styles.infoText}>입사일: 2023. 01. 01</Text>
      </View>

      {/* Footer */}
      <View style={styles.footerContainer}>
        <TouchableOpacity>
          <Text style={styles.footerText}>정보 수정하기 &gt;</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.footerText}>로그아웃</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <Text style={styles.navText}>홈</Text>
        <Text style={styles.navText}>경험치 현황</Text>
        <Text style={styles.navText}>퀘스트 현황</Text>
        <Text style={styles.navText}>게시판</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 15,
    backgroundColor: '#FFF',
    justifyContent: 'space-between',
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  logo: {
    width: 120,
    height: 30,
    resizeMode: 'contain',
  },
  cardContainer: {
    backgroundColor: '#FFF',
    width: '90%',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  cardHeader: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  cardLogo: {
    width: 30,
    height: 30,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#344BFD',
  },
  centerText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  levelText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF5722',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#007BFF',
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#DDD',
  },
  navText: {
    fontSize: 14,
    color: '#344BFD',
    fontWeight: 'bold',
  },
});
