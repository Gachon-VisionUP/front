import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import backIcon from "@/assets/images/main/back.png";
import Title from "@/assets/images/login/Logo.png";
import styled from "styled-components/native";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import EditSuccessModal from "@/components/admin/EditSuccessModal";
import axios from "axios";

const BASE_URL = process.env.REACT_NATIVE_BASE_URL || "http://35.216.61.56:8080";

const MemberDetail: React.FC = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [department, setDepartment] = useState<string>("");
  const [team, setTeam] = useState<number | string>("");
  const [idValue, setIdValue] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [hireDate, setHireDate] = useState<string>("");
  const [level, setLevel] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  // Fetch member data from API
  const fetchMemberData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${BASE_URL}/api/admins/user-info/${id}`);
      const result = response.data.result;

      setDepartment(result.department);
      setTeam(result.part);
      setIdValue(result.employeeId);
      setName(result.userName);
      setHireDate(result.joinDate);
      setLevel(result.jobGroup);
      setUsername(result.loginId);
      setPassword(result.changedPW);
    } catch (error) {
      Alert.alert("Error", "구성원 정보를 가져오는 데 실패했습니다.");
      router.back();
    } finally {
      setIsLoading(false);
    }
  };

  // Update member data API
  const updateMemberData = async () => {
    try {
      const payload = {
        department,
        part: team,
        employeeId: idValue,
        name: name,
        joinDate: hireDate,
        jobGroup: level,
        loginId: username,
        changedPW: password,
      };

      await axios.put(`${BASE_URL}/api/admins/user-info/${id}`, payload);
      setModalVisible(true);
    } catch (error) {
      Alert.alert("Error", "구성원 정보를 수정하는 데 실패했습니다.");
    }
  };

  const handleSave = () => {
    updateMemberData();
  };

  useEffect(() => {
    fetchMemberData();
  }, [id]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#1C6CF9" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Header>
          <BackButton onPress={() => router.back()}>
            <BackIcon source={backIcon} />
          </BackButton>
          <Logo source={Title} />
        </Header>
        <Text style={styles.header}>조회 및 수정</Text>

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
            <Picker.Item label="1" value={1} />
            <Picker.Item label="2" value={2} />
          </Picker>
        </View>

        {/* 사번 */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>사번</Text>
          <TextInput
            style={styles.input}
            placeholder="사번을 입력해주세요"
            value={idValue}
            onChangeText={setIdValue}
          />
        </View>

        {/* 이름 */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>이름</Text>
          <TextInput
            style={styles.input}
            placeholder="이름을 입력해주세요"
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* 입사일 */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>입사일</Text>
          <TextInput
            style={styles.input}
            placeholder="입사일을 입력해주세요"
            value={hireDate}
            onChangeText={setHireDate}
          />
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
            <Picker.Item label="기술직군" value="기술직군" />
            <Picker.Item label="관리직군" value="관리직군" />
            <Picker.Item label="성장전략" value="성장전략" />
          </Picker>
        </View>

        {/* 아이디 */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>아이디</Text>
          <TextInput
            style={styles.input}
            placeholder="아이디를 입력해주세요"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        {/* 비밀번호 */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>비밀번호</Text>
          <TextInput
            style={styles.input}
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* 저장 버튼 */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={handleSave}>
            <Text style={styles.buttonText}>수정하기</Text>
          </TouchableOpacity>
        </View>

        <EditSuccessModal
          visible={modalVisible}
          onClose={() => {
            setModalVisible(false);
            router.back();
          }}
        />
      </View>
    </ScrollView>
  );
};

export default MemberDetail;

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
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#344BFD",
    paddingBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  formGroup: {
    marginBottom: 20,
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
  yearPicker: {
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#F9F9F9",
    paddingRight: 20,
  },
  datePicker: {
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#F9F9F9",
  },
  buttonContainer: {
    backgroundColor: "#1C6CF9",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: "#1C6CF9",
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
});

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding-vertical: 30px;
`;

const BackButton = styled.TouchableOpacity``;

const BackIcon = styled.Image`
  width: 24px;
  height: 24px;
`;

const Logo = styled.Image`
  flex: 1;
  width: 140px;
  height: 50px;
  resize-mode: contain;
`;
