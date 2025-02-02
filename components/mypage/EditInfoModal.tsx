import React, { FC } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

interface EditInfoModalProps {
  visible: boolean;
  onClose: () => void;
  onEditCharacter: () => void;
  onEditPassword: () => void;
}

const EditInfoModal: FC<EditInfoModalProps> = ({
  visible,
  onClose,
  onEditCharacter,
  onEditPassword,
}) => {
  const router = useRouter();

  const handleEditCharacter = () => {
    router.push('/mypage/CharacterSelectionScreen');
  };

  const handleEditPassword = () => {
    router.push('/mypage/EditPasswordScreen');
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
          <View style={styles.titleRow}>
            <Text style={styles.modalTitle}>수정하기</Text>
            <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
              <Text style={styles.closeIconText}>×</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.modalText}>수정하고 싶은 정보를 선택해주세요</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.characterButton]}
              onPress={handleEditCharacter}
            >
              <Text style={styles.characterButtonText}>캐릭터</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.passwordButton]}
              onPress={handleEditPassword}
            >
              <Text style={styles.passwordButtonText}>비밀번호</Text>
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
    width: '90%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    position: 'relative',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeIcon: {
    width: 30,
    height: 30,
    backgroundColor: '#E5E5E5',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIconText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  modalText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 22,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 5,
  },
  button: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  characterButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#F16E27',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
  },
  passwordButton: {
    backgroundColor: '#F16E27',
    borderColor: '#F16E27',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
  },
  characterButtonText: {
    color: '#F16E27',
    fontSize: 16,
    fontWeight: 'bold',
  },
  passwordButtonText: {
    color: '#F5F5F5',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditInfoModal;