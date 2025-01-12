import React, { useState } from "react";
import styled from 'styled-components/native';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import SuccessModal from "@/components/admin/SuccessModal";
import { useRouter } from 'expo-router';
import backIcon from '@/assets/images/main/back.png';
import Title from '@/assets/images/login/Logo.png';

const RegisterScreen: React.FC = () => {
  const router = useRouter();
  const [department, setDepartment] = useState<string>("");
  const [team, setTeam] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [level, setLevel] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleRegister = () => {
    const newErrors: { [key: string]: string } = {};

    if (!department) newErrors.department = "올바른 정보를 입력하세요";
    if (!team) newErrors.team = "올바른 정보를 입력하세요";
    if (!id) newErrors.id = "올바른 정보를 입력하세요";
    if (!name) newErrors.name = "올바른 정보를 입력하세요";
    if (!year || !month || !day) newErrors.date = "올바른 입사일을 선택하세요";
    if (!level) newErrors.level = "올바른 레벨을 선택하세요";
    if (!username) newErrors.username = "아이디를 입력하세요";


    if (!password) {
      setPassword("1111");
      console.log("비밀번호 미입력 -> 기본값 1111로 설정");
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // 모든 입력란이 유효하면 처리 로직 실행
      setModalVisible(true);
      console.log('등록하기 눌림');
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Header>
          <BackButton onPress={() => router.back()}>
            <BackIcon source={backIcon} />
          </BackButton>
          <Logo source={Title} />
        </Header>
        <Text style={styles.header}>신규 등록</Text>
        {/* 부서 */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>부서</Text>
          <Picker
            style={styles.picker}
            selectedValue={department}
            onValueChange={(value) => setDepartment(value)}
          >
            <Picker.Item label="부서를 선택해주세요" value="" />
            <Picker.Item label="음성 1센터" value="음성 1센터" />
            <Picker.Item label="음성 2센터" value="음성 2센터" />
          </Picker>
          {errors.department && <Text style={styles.errorText}>{errors.department}</Text>}
        </View>

        {/* 소속 */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>소속</Text>
          <Picker
            style={styles.picker}
            selectedValue={team}
            onValueChange={(value) => setTeam(value)}
          >
            <Picker.Item label="소속을 선택해주세요" value="" />
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
          </Picker>
          {errors.team && <Text style={styles.errorText}>{errors.team}</Text>}
        </View>

        {/* 사번 */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>사번</Text>
          <TextInput
            style={styles.input}
            placeholder="사번을 입력해주세요"
            value={id}
            onChangeText={(text) => setId(text)}
          />
          {errors.id && <Text style={styles.errorText}>{errors.id}</Text>}
        </View>

        {/* 이름 */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>이름</Text>
          <TextInput
            style={styles.input}
            placeholder="이름을 입력해주세요"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        </View>

        {/* 입사일 */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>입사일</Text>
          <View style={styles.dateContainer}>
            <Picker
              style={styles.yearPicker}
              selectedValue={year}
              onValueChange={(value) => setYear(value)}
            >
              <Picker.Item label="년" value="" />
              <Picker.Item label="2023" value="2023" />
              <Picker.Item label="2024" value="2024" />
            </Picker>
            <Picker
              style={styles.datePicker}
              selectedValue={month}
              onValueChange={(value) => setMonth(value)}
            >
              <Picker.Item label="월" value="" />
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
            </Picker>
            <Picker
              style={styles.datePicker}
              selectedValue={day}
              onValueChange={(value) => setDay(value)}
            >
              <Picker.Item label="일" value="" />
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
            </Picker>
          </View>
          {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}
        </View>

        {/* 레벨 */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>레벨</Text>
          <Picker
            style={styles.picker}
            selectedValue={level}
            onValueChange={(value) => setLevel(value)}
          >
            <Picker.Item label="레벨을 선택해주세요" value="" />
            <Picker.Item label="F1 - I" value="1" />
            <Picker.Item label="F1 - II" value="2" />
            <Picker.Item label="F2 - I" value="3" />
            <Picker.Item label="F2 - II" value="4" />
            <Picker.Item label="F2 - III" value="5" />
            <Picker.Item label="F3 - I" value="6" />
            <Picker.Item label="F3 - II" value="7" />
            <Picker.Item label="F3 - III" value="8" />
            <Picker.Item label="F4 - I" value="9" />
            <Picker.Item label="F4 - II" value="10" />
            <Picker.Item label="F4 - III" value="11" />
            <Picker.Item label="F5" value="12" />
          </Picker>
          {errors.level && <Text style={styles.errorText}>{errors.level}</Text>}
        </View>

        {/* 아이디 */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>아이디</Text>
          <TextInput
            style={styles.input}
            placeholder="아이디를 입력해주세요"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
          {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
        </View>

        {/* 비밀번호 */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>비밀번호</Text>
          <TextInput
            style={styles.input}
            placeholder="비밀번호를 입력해주세요"
            secureTextEntry={true}
          />
          <Text style={styles.passwordHint}>*비밀번호 미입력시, 1111 자동 저장</Text>
        </View>

        {/* 등록하기 버튼 */}
        <TouchableOpacity style={styles.submitButton} onPress={handleRegister}>
          <Text style={styles.submitButtonText}>등록하기</Text>
        </TouchableOpacity>

        {/* Success Modal */}
        <SuccessModal
          visible={modalVisible}
          onClose={handleModalClose}
        />
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingVertical: 10,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1C6CF9",
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#1C6CF9",
    paddingBottom: 10,
  },
  Headercontainer: {
    flexDirection: "row",

  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 15,
    backgroundColor: "#F9F9F9",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#F9F9F9",
    fontSize: 16,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  datePicker: {
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#F9F9F9",
  },
  yearPicker: {
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#F9F9F9",
    paddingRight: 20,
  },
  submitButton: {
    backgroundColor: "#1C6CF9",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  passwordHint: {
    marginTop: 5,
    fontSize: 12,
    color: "#FF0000",
  },
  errorText: {
    marginTop: 5,
    fontSize: 12,
    color: "#FF0000",
  },
});

const BackButton = styled.TouchableOpacity``;

const BackIcon = styled.Image`
  width: 24px;
  height: 24px;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding-vertical: 40px;
  margin-bottom: 20px;
`;

const Logo = styled.Image`
  flex: 1;
  width: 140px;
  height: 50px;
  resize-mode: contain;
`;
