import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import logo from "@/assets/images/login/Logo.png";
import { useRouter } from "expo-router";

const BASE_URL = process.env.REACT_NATIVE_BASE_URL || "http://35.216.61.56:8080";
const itemsPerPage = 8;

interface Member {
  userId: number;
  department: string;
  part: number;
  employeeId: string;
  userName: string;
}

const MemberScreen: React.FC = () => {
  const [department, setDepartment] = useState<string>(""); // Selected department
  const [team, setTeam] = useState<string>(""); // Selected team
  const [allMembers, setAllMembers] = useState<Member[]>([]); // Complete member data
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]); // Filtered data
  const [currentPage, setCurrentPage] = useState<number>(1); // Current page
  const [totalPages, setTotalPages] = useState<number>(1); // Total pages
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
  const router = useRouter();

  // Fetch members from the API
  const fetchMembers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/api/admins/user-list`);
      const { userInfoList } = response.data.result;
      setAllMembers(userInfoList);
      setFilteredMembers(userInfoList); // Initially, all members are displayed
      setTotalPages(Math.ceil(userInfoList.length / itemsPerPage));
    } catch (error) {
      Alert.alert("Error", "Failed to fetch member data.");
    } finally {
      setIsLoading(false);
    }
  };

  // Apply filters
  useEffect(() => {
    const filtered = allMembers.filter(
      (member) =>
        (department === "" || member.department === department) &&
        (team === "" || member.part.toString() === team)
    );
    setFilteredMembers(filtered);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setCurrentPage(1); // Reset to the first page on filter change
  }, [department, team, allMembers]);

  // Paginate the filtered data
  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle pagination change
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle row press to navigate to MemberDetail
  const handleRowPress = (member: Member) => {
    router.push({
      pathname: "/admin/MemberDetail",
      params: { id: member.userId },
    });
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <Image source={logo} style={styles.logo} />
      <Text style={styles.header}>구성원 조회</Text>

      {/* Dropdown Section */}
      <View style={styles.dropdownContainer}>
        <Picker
          selectedValue={department}
          onValueChange={(value) => setDepartment(value)}
          style={styles.dropdown}
        >
          <Picker.Item label="부서 선택" value="" />
          <Picker.Item label="음성 1센터" value="음성 1센터" />
          <Picker.Item label="음성 2센터" value="음성 2센터" />
          <Picker.Item label="사업기획팀" value="사업기획팀" />
        </Picker>

        <Picker
          selectedValue={team}
          onValueChange={(value) => setTeam(value)}
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
        {isLoading ? (
          <ActivityIndicator size="large" color="#1C6CF9" />
        ) : (
          paginatedMembers.map((member) => (
            <TouchableOpacity
              key={member.userId}
              style={styles.tableRow}
              onPress={() => handleRowPress(member)}
            >
              <Text style={styles.tableRowText}>{member.department}</Text>
              <Text style={styles.tableRowText}>{member.part}</Text>
              <Text style={styles.tableRowText}>{member.employeeId}</Text>
              <Text style={styles.tableRowText}>{member.userName}</Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Pagination Section */}
      {totalPages > 1 && (
        <View style={styles.paginationContainer}>
          <TouchableOpacity onPress={() => handlePageChange(currentPage - 1)}>
            <Text style={styles.paginationText}>&lt;</Text>
          </TouchableOpacity>
          {Array.from({ length: totalPages }, (_, i) => (
            <TouchableOpacity key={i} onPress={() => handlePageChange(i + 1)}>
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
      )}

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