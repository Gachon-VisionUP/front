import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import membersData from "@/data/membersData";
import backIcon from '@/assets/images/main/back.png';
import Title from '@/assets/images/login/Logo.png';
import styled from 'styled-components/native';
import { useRouter } from 'expo-router';
import { Picker } from "@react-native-picker/picker";
import EditSuccessModal from "@/components/admin/EditSuccessModal";

const MemberDetail: React.FC = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const member = membersData.find((m) => m.id === id);

  if (!member) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>구성원을 찾을 수 없습니다.</Text>
      </View>
    );
  }

  const [department, setDepartment] = useState(member.department);
  const [team, setTeam] = useState(member.team);
  const [idValue, setIdValue] = useState(member.id);
  const [name, setName] = useState(member.name);
  const [hireYear, setHireYear] = useState(member.hireDate.year);
  const [hireMonth, setHireMonth] = useState(member.hireDate.month);
  const [hireDay, setHireDay] = useState(member.hireDate.day);
  const [level, setLevel] = useState(member.level);
  const [username, setUsername] = useState(member.username);
  const [password, setPassword] = useState(member.password);

  const [modalVisible, setModalVisible] = useState(false);

  const handleSave = () => {
    // 수정 저장 로직 추가
    setModalVisible(true);
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
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
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
          <View style={styles.dateContainer}>
            <Picker
              style={styles.yearPicker}
              selectedValue={hireYear}
              onValueChange={(value) => setHireYear(Number(value))}
            >
              <Picker.Item label="년" value="" />
              {[...Array(30)].map((_, i) => (
                <Picker.Item key={i} label={(2000 + i).toString()} value={2000 + i} />
              ))}
            </Picker>

            <Picker
              style={styles.datePicker}
              selectedValue={hireMonth}
              onValueChange={(value) => setHireMonth(Number(value))}
            >
              <Picker.Item label="월" value="" />
              {Array.from({ length: 12 }, (_, i) => (
                <Picker.Item key={i + 1} label={(i + 1).toString()} value={i + 1} />
              ))}
            </Picker>

            <Picker
              style={styles.datePicker}
              selectedValue={hireDay}
              onValueChange={(value) => setHireDay(Number(value))}
            >
              <Picker.Item label="일" value="" />
              {Array.from({ length: 31 }, (_, i) => (
                <Picker.Item key={i + 1} label={(i + 1).toString()} value={i + 1} />
              ))}
            </Picker>
          </View>
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
            <Picker.Item label="F1-I" value="F1-I" />
            <Picker.Item label="F1-II" value="F1-II" />
            <Picker.Item label="F2-I" value="F2-I" />
            <Picker.Item label="F2-II" value="F2-II" />
            <Picker.Item label="F2-III" value="F2-III" />
            <Picker.Item label="F3-I" value="F3-I" />
            <Picker.Item label="F3-II" value="F3-II" />
            <Picker.Item label="F3-III" value="F3-III" />
            <Picker.Item label="F4-I" value="F4-I" />
            <Picker.Item label="F4-II" value="F4-II" />
            <Picker.Item label="F4-III" value="F4-III" />
            <Picker.Item label="F5" value="F5" />
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
        <View style={styles.buttonContainer} >
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
