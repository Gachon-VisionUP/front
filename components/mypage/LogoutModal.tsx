import React, { FC } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';

const BASE_URL = process.env.REACT_NATIVE_BASE_URL || "http://35.216.61.56:8080"; // Base URL 환경변수화

interface LogoutModalProps {
  visible: boolean;
  onClose: () => void;
}

const LogoutModal: FC<LogoutModalProps> = ({ visible, onClose }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/users/logout`);

      if (response.status === 200) {
        Alert.alert('로그아웃 성공', '성공적으로 로그아웃되었습니다.', [
          { text: '확인', onPress: () => router.push('/login') },
        ]);
      } else {
        Alert.alert('로그아웃 실패', '다시 시도해주세요.');
      }
    } catch (error) {
      console.error('Logout Error:', error);
      Alert.alert('로그아웃 실패', '서버와의 통신 중 문제가 발생했습니다.');
    } finally {
      onClose();
    }
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>로그아웃을 하시겠습니까?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.noButton]} onPress={onClose}>
              <Text style={styles.nobuttonText}>아니오</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.yesButton]} onPress={handleLogout}>
              <Text style={styles.yesbuttonText}>예</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  noButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#F16E27',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
  },
  yesButton: {
    backgroundColor: '#F16E27',
    borderColor: '#F16E27',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
  },
  nobuttonText: {
    color: '#F16E27',
    fontSize: 16,
    fontWeight: 'bold',
  },
  yesbuttonText: {
    color: '#F5F5F5',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LogoutModal;
