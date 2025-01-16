import React, { useState } from "react";
import styled from "styled-components/native";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import SuccessModal from "@/components/admin/SuccessModal";
import { useRouter } from "expo-router";
import backIcon from "@/assets/images/main/back.png";
import Title from "@/assets/images/login/Logo.png";
import axios from "axios";

const BASE_URL = process.env.REACT_NATIVE_BASE_URL || "http://35.216.61.56:8080";

const RegisterScreen: React.FC = () => {
  const router = useRouter();
  const [department, setDepartment] = useState<string>("");
  const [team, setTeam] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("1111"); // Default password
  const [year, setYear] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [jobGroup, setJobGroup] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleRegister = async () => {
    const newErrors: { [key: string]: string } = {};

    if (!department) newErrors.department = "부서를 선택해주세요";
    if (!team) newErrors.team = "소속을 선택해주세요";
    if (!id) newErrors.id = "사번을 입력해주세요";
    if (!name) newErrors.name = "이름을 입력해주세요";
    if (!year || !month || !day) newErrors.date = "올바른 입사일을 선택해주세요";
    if (!jobGroup) newErrors.jobGroup = "직군을 선택해주세요";
    if (!username) newErrors.username = "아이디를 입력해주세요";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const joinDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;

      const payload = {
        department,
        part: parseInt(team), // Convert team to number
        employeeId: id,
        name,
        joinDate,
        jobGroup,
        loginId: username,
        password,
      };

      try {
        const response = await axios.post(`${BASE_URL}/api/admins/create`, payload);

        if (response.status === 200) {
          setModalVisible(true);
          Alert.alert("성공", "구성원이 성공적으로 등록되었습니다.");
        }
      } catch (error) {
        console.error(error);
        console.log(payload);
        Alert.alert("오류", "구성원 등록 중 오류가 발생했습니다.");
      }
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
    router.back();
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

        {/* 직군 */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>직군</Text>
          <Picker
            style={styles.picker}
            selectedValue={jobGroup}
            onValueChange={(value) => setJobGroup(value)}
          >
            <Picker.Item label="직군을 선택해주세요" value="" />
            <Picker.Item label="현장직군" value="현장직군" />
            <Picker.Item label="관리직군" value="관리직군" />
            <Picker.Item label="성장전략" value="성장전략" />
            <Picker.Item label="기술직군" value="기술직군" />
          </Picker>
          {errors.jobGroup && <Text style={styles.errorText}>{errors.jobGroup}</Text>}
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
            onChangeText={(text) => setPassword(text)}
          />
          <Text style={styles.passwordHint}>*비밀번호 미입력시, 1111 자동 저장</Text>
        </View>

        {/* 등록하기 버튼 */}
        <TouchableOpacity style={styles.submitButton} onPress={handleRegister}>
          <Text style={styles.submitButtonText}>등록하기</Text>
        </TouchableOpacity>

        {/* Success Modal */}
        <SuccessModal visible={modalVisible} onClose={handleModalClose} />
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
