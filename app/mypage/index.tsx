import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import LogoutModal from '../../components/mypage/LogoutModal';
import EditInfoModal from '../../components/mypage/EditInfoModal';
import backIcon from '@/assets/images/main/back.png';
import profileIcon from '@/assets/images/main/icon1.png';
import logo from '@/assets/images/login/Logo.png';
import miniLogo from '@/assets/images/mypage/Logo2.png';

export default function ProfileScreen() {
  const router = useRouter();
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const [isEditInfoModalVisible, setEditInfoModalVisible] = useState(false);

  const handleLogoutPress = () => {
    setLogoutModalVisible(true);
  };

  const handleEditInfoPress = () => {
    setEditInfoModalVisible(true);
  };

  const closeLogoutModal = () => {
    setLogoutModalVisible(false);
  };

  const closeEditInfoModal = () => {
    setEditInfoModalVisible(false);
  };

  const handleEditCharacter = () => {
    closeEditInfoModal();
    // Add navigation or logic for editing character
    console.log('Editing Character...');
  };

  const handleEditPassword = () => {
    closeEditInfoModal();
    // Add navigation or logic for editing password
    console.log('Editing Password...');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={backIcon} style={styles.backIcon} />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Image source={logo} resizeMode="contain" style={styles.imageStyle} />
        </View>
      </View>

      {/* Profile Card */}
      <View style={styles.cardContainer}>
        {/* Orange Section */}
        <View style={styles.orangeHeader}>
          <Image source={miniLogo} style={styles.cardLogo} />
        </View>
        <View style={styles.profileContent}>
          <Image source={profileIcon} style={styles.profileImage} />
          {/* Horizontal Row for Name and Center */}
          <View style={styles.nameRow}>
            <Text style={[styles.nameText, { color: '#344BFD', fontSize: 24, fontWeight: 'bold' }]}>
              김민수
            </Text>
            <Text style={[styles.centerText, { marginLeft: 10 }]}>음성1센터 (1)</Text>
          </View>
          <Text style={[styles.levelText, { marginTop: 15 }]}>LV. FI - I</Text>
          <Text style={[styles.infoText, { marginTop: 20 }]}>사번: 2023010101</Text>
          <Text style={[styles.infoText, { marginTop: 10 }]}>입사일: 2023. 01. 01</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footerContainer}>
        <TouchableOpacity onPress={handleEditInfoPress}>
          <Text style={styles.footerText}>정보 수정하기 &gt;</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogoutPress}>
          <Text style={styles.footerText}>로그아웃 &gt;</Text>
        </TouchableOpacity>
      </View>

      {/* Modals */}
      <LogoutModal visible={isLogoutModalVisible} onClose={closeLogoutModal} />
      <EditInfoModal
        visible={isEditInfoModalVisible}
        onClose={closeEditInfoModal}
        onEditCharacter={handleEditCharacter}
        onEditPassword={handleEditPassword}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    paddingVertical: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  backIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#344BFD',
  },
  cardContainer: {
    backgroundColor: '#FFF',
    width: '90%',
    borderRadius: 15,
    paddingBottom: 50,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  orangeHeader: {
    backgroundColor: '#FF6B48',
    width: '100%',
    height: 50,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 15,
  },
  cardLogo: {
    width: 30,
    height: 30,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 40,
    marginTop: -80, // Move the profile image to overlap the orange section
    marginBottom: 10,
  },
  nameRow: {
    flexDirection: 'row', // Align horizontally
    alignItems: 'center', // Vertically center
    marginBottom: 10, // Spacing below this row
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7A7777',
  },
  centerText: {
    fontSize: 16,
    color: '#7A7777',
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
    marginBottom: 10, // Add more spacing between 사번 and 입사일
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#424753',
    fontWeight: 'bold',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center', // Center horizontally
    justifyContent: 'center', // Center vertically
  },
  imageStyle: {
    width: 160, // Adjust logo width
    height: 70, // Adjust logo height
  },
  profileContent: {
    marginTop: 120, // Adjust this value to move the block further down
    alignItems: 'center', // Keep content centered
  },
});
