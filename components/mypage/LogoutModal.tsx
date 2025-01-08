import React, { FC } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

interface LogoutModalProps {
  visible: boolean;
  onClose: () => void;
}

const LogoutModal: FC<LogoutModalProps> = ({ visible, onClose }) => {
  const router = useRouter();

  const handleLogout = () => {
    onClose();
    router.push('/login');
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
              <Text style={styles.buttonText}>아니오</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.yesButton]} onPress={handleLogout}>
              <Text style={styles.buttonText}>예</Text>
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
    backgroundColor: '#E0E0E0',
  },
  yesButton: {
    backgroundColor: '#FF6B48',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LogoutModal;
