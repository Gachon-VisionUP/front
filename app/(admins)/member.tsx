import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import logo from "@/assets/images/login/Logo.png";
import membersData, { Member } from "@/data/membersData";
import { useRouter } from "expo-router";

const itemsPerPage = 8;

const MemberScreen: React.FC = () => {
  const [department, setDepartment] = useState<string>(""); // 부서 선택
  const [team, setTeam] = useState<string>(""); // 소속 선택
  const [currentPage, setCurrentPage] = useState<number>(1);
  const router = useRouter();

  // 필터링된 데이터
  const filteredData = membersData.filter((member) => {
    const departmentMatch = department === "" || member.department === department;
    const teamMatch = team === "" || member.team === team;
    return departmentMatch && teamMatch;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleRowPress = (member: Member) => {
    router.push({
      pathname: "/admin/MemberDetail",
      params: { id: member.id },
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Image source={logo} style={styles.logo} />
      <Text style={styles.header}>구성원 조회</Text>

      {/* Dropdown Section */}
      <View style={styles.dropdownContainer}>
        <Picker
          selectedValue={department}
          onValueChange={(itemValue: string) => {
            setDepartment(itemValue);
            setCurrentPage(1); // 드롭다운 변경 시 첫 페이지로 초기화
          }}
          style={styles.dropdown}
        >
          <Picker.Item label="부서 선택" value="" />
          <Picker.Item label="음성 1센터" value="음성 1센터" />
          <Picker.Item label="음성 2센터" value="음성 2센터" />
        </Picker>

        <Picker
          selectedValue={team}
          onValueChange={(itemValue: string) => {
            setTeam(itemValue);
            setCurrentPage(1); // 드롭다운 변경 시 첫 페이지로 초기화
          }}
          style={styles.dropdown}
        >
          <Picker.Item label="소속 선택" value="" />
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
        </Picker>
      </View>

      {/* Table Section */}
      <ScrollView style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>부서</Text>
          <Text style={styles.tableHeaderText}>소속</Text>
          <Text style={styles.tableHeaderText}>사번</Text>
          <Text style={styles.tableHeaderText}>이름</Text>
        </View>
        {paginatedData.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.tableRow}
            onPress={() => handleRowPress(item)}
          >
            <Text style={styles.tableRowText}>{item.department}</Text>
            <Text style={styles.tableRowText}>{item.team}</Text>
            <Text style={styles.tableRowText}>{item.id}</Text>
            <Text style={styles.tableRowText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Pagination Section */}
      <View style={styles.paginationContainer}>
        <TouchableOpacity onPress={() => handlePageChange(currentPage - 1)}>
          <Text style={styles.paginationText}>&lt;</Text>
        </TouchableOpacity>
        {Array.from({ length: totalPages }, (_, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => handlePageChange(i + 1)}
          >
            <Text
              style={[
                styles.paginationText,
                currentPage === i + 1 && styles.activePageText,
              ]}
            >
              {i + 1}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={() => handlePageChange(currentPage + 1)}>
          <Text style={styles.paginationText}>&gt;</Text>
        </TouchableOpacity>
      </View>

      {/* Buttons Section */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push("../../admin/RegisterMember")}
        >
          <Text style={styles.buttonText}>신규 등록</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MemberScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingVertical: 50,
  },
  logo: {
    width: 150,
    height: 50,
    resizeMode: "contain",
    marginBottom: 20,
    marginLeft: -15,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1C6CF9",
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#344BFD",
  },
  dropdownContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  dropdown: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  tableContainer: {
    flex: 1,
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    backgroundColor: "#F6F6F6",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  tableHeaderText: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    color: "#333",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  tableRowText: {
    flex: 1,
    textAlign: "center",
    fontSize: 14,
    color: "#333",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  paginationText: {
    fontSize: 14,
    color: "#333",
    marginHorizontal: 5,
  },
  activePageText: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 15,
    backgroundColor: "#1C6CF9",
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});