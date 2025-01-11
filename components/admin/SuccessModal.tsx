import React from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

interface SuccessModalProps {
  visible: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ visible, onClose }) => {
  const router = useRouter();

  const handleNavigate = () => {
    onClose();
    router.push("/member");
  };

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>저장이 완료되었습니다.</Text>
          <TouchableOpacity onPress={handleNavigate}>
            <Text style={styles.navigateText}>
              구성원 조회 페이지로 이동 &gt;
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SuccessModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#344BFD",
    marginBottom: 10,
  },
  navigateText: {
    fontSize: 14,
    color: "#000",
    marginTop: 10,
    marginBottom: 20,
    textDecorationLine: "underline",
  },
});
