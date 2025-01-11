import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

export default function MemberScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.logo}>두손쏙Do전!</Text>
        <Text style={styles.title}>구성원 조회</Text>
      </View>

      {/* Dropdown Section */}
      <View style={styles.dropdownContainer}>
        <TouchableOpacity style={styles.dropdownButton}>
          <Text style={styles.dropdownText}>부서</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dropdownButton}>
          <Text style={styles.dropdownText}>소속</Text>
        </TouchableOpacity>
      </View>

      {/* Table Section */}
      <ScrollView style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>부서</Text>
          <Text style={styles.tableHeaderText}>소속</Text>
          <Text style={styles.tableHeaderText}>사번</Text>
          <Text style={styles.tableHeaderText}>이름</Text>
        </View>
        {Array(8)
          .fill(0)
          .map((_, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableRowText}>음성 1센터</Text>
              <Text style={styles.tableRowText}>1</Text>
              <Text style={styles.tableRowText}>2000000</Text>
              <Text style={styles.tableRowText}>박나영</Text>
              <TouchableOpacity>
                <Text style={styles.tableRowAction}>✔</Text>
              </TouchableOpacity>
            </View>
          ))}
      </ScrollView>

      {/* Pagination Section */}
      <View style={styles.paginationContainer}>
        <Text style={styles.paginationText}>1 / 2 / 3 / 4 / 5 &gt;</Text>
      </View>

      {/* Buttons Section */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.buttonText}>신규 등록</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.buttonText}>조회 및 수정</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1C6CF9",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1C6CF9",
    borderBottomWidth: 2,
    borderBottomColor: "#1C6CF9",
    paddingBottom: 5,
  },
  dropdownContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  dropdownButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    alignItems: "center",
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
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
  tableRowAction: {
    flex: 0.5,
    textAlign: "center",
    fontSize: 14,
    color: "#1C6CF9",
    fontWeight: "bold",
  },
  paginationContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  paginationText: {
    fontSize: 14,
    color: "#333",
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
