import React from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";

// TypeScript에서 props 타입 정의
interface ModalComponentProps {
  visible: boolean;
  onClose: () => void;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>수정이 완료되었습니다</Text>
          <TouchableOpacity style={styles.modalButton} onPress={onClose}>
            <Text style={styles.modalButtonText}>
              구성원 페이지로 돌아가기
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  modalButtonText: {
    color: "#888888", // 텍스트 색상을 연하게 설정
    fontSize: 16,
    fontWeight: "bold",
    textDecorationLine: "underline", // 밑줄 추가
  },
});

export default ModalComponent;
