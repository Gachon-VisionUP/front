import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Svg, Path, G, Text as SvgText } from "react-native-svg";
import { useRouter } from "expo-router";

const screenWidth = Dimensions.get("window").width;
const chartSize = screenWidth * 0.6; // 차트 크기
const donutWidth = 20; // 도넛 그래프의 두께

const backIcon = require("../../assets/images/exp/back.png");
const logoImage = require("../../assets/images/login/Logo.png");

const sectionsData = [
  { label: "상반기 인사평가", value: 1500, color: "#FF5C35" },
  { label: "하반기 인사평가", value: 3000, color: "#F59E0B" },
  { label: "직무별 퀘스트", value: 2640, color: "#3B82F6" },
  { label: "리더 부여 퀘스트", value: 517, color: "#10B981" },
  { label: "전사 프로젝트", value: 0, color: "#6366F1" },
];

export default function ExpGraph2() {
  const total = sectionsData.reduce((sum, section) => sum + section.value, 0); // 전체 값
  const [selectedSection, setSelectedSection] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState("2024년");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [displayText, setDisplayText] = useState(""); // 고정 텍스트 상태
  const router = useRouter();

  const handleSectionPress = (index: number) => {
    setSelectedSection(index === selectedSection ? null : index);
    setDisplayText(`${sectionsData[index].value.toLocaleString()} do`); // 클릭한 섹션의 텍스트 업데이트
  };

  const renderChartSections = () => {
    let cumulativePercentage = 0;

    return sectionsData.map((section, index) => {
      const percentage = (section.value / total) * 100;
      const startAngle = (cumulativePercentage / 100) * 2 * Math.PI - Math.PI / 2;
      cumulativePercentage += percentage;
      const endAngle = (cumulativePercentage / 100) * 2 * Math.PI - Math.PI / 2;

      const cx = chartSize / 2;
      const cy = chartSize / 2;

      const outerRadius = chartSize / 2;
      const innerRadius =
        chartSize / 2 - donutWidth - (selectedSection === index ? 10 : 0); // 안쪽 확대

      const largeArc = percentage > 50 ? 1 : 0;

      const outerStartX = cx + outerRadius * Math.cos(startAngle);
      const outerStartY = cy + outerRadius * Math.sin(startAngle);
      const outerEndX = cx + outerRadius * Math.cos(endAngle);
      const outerEndY = cy + outerRadius * Math.sin(endAngle);

      const innerStartX = cx + innerRadius * Math.cos(endAngle);
      const innerStartY = cy + innerRadius * Math.sin(endAngle);
      const innerEndX = cx + innerRadius * Math.cos(startAngle);
      const innerEndY = cy + innerRadius * Math.sin(startAngle);

      const pathData = `
        M ${outerStartX} ${outerStartY}
        A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${outerEndX} ${outerEndY}
        L ${innerStartX} ${innerStartY}
        A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${innerEndX} ${innerEndY}
        Z
      `;

      return (
        <G key={index}>
          <Path
            d={pathData}
            fill={section.color}
            opacity={
              selectedSection === null || selectedSection === index ? 1 : 0.5
            }
            onPress={() => handleSectionPress(index)}
          />
        </G>
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Image source={backIcon} style={styles.backIcon} />
        </TouchableOpacity>
        <Image source={logoImage} style={styles.logo} />
      </View>

      <View style={styles.levelContainer}>
        <View style={styles.levelInfo}>
          <Text style={styles.subtitle}>오늘의 나의 레벨</Text>
          <Text style={styles.levelText}>F1-I</Text>
        </View>
        <DropDownPicker
          open={isDropdownOpen}
          value={selectedYear}
          items={[
            { label: "2024년", value: "2024년" },
            { label: "2023년", value: "2023년" },
            { label: "2022년", value: "2022년" },
          ]}
          setOpen={setIsDropdownOpen}
          setValue={setSelectedYear}
          style={[styles.dropdown, { width: 90, height: 30, paddingHorizontal: 8 }]}
          textStyle={{ fontSize: 12 }}
          dropDownContainerStyle={[styles.dropdownContainer, { width: 90 }]}
        />
      </View>

      <View style={styles.chartContainer}>
        {/* 항상 차트 상단 중앙에 텍스트 표시 */}
        <Text style={styles.fixedText}>{displayText || "섹션을 클릭하세요"}</Text>
        <Svg width={chartSize} height={chartSize}>
          {renderChartSections()}
        </Svg>
        <Text style={styles.totalText}>{total.toLocaleString()} do</Text>
        <Text style={styles.chartLabel}>{selectedYear} 누적 경험치</Text>
      </View>

      <View style={styles.legend}>
        {sectionsData.map((section, index) => (
          <View style={styles.legendItem} key={index}>
            <View style={[styles.legendDot, { backgroundColor: section.color }]} />
            <Text style={styles.legendText}>{section.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  backButton: {
    position: "absolute",
    left: 0,
    zIndex: 10,
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  logo: {
    width: 120,
    height: 45,
    resizeMode: "contain",
  },
  levelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  levelInfo: {
    alignItems: "flex-start",
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
  },
  levelText: {
    marginTop: 8,
    fontSize: 28,
    fontWeight: "bold",
    color: "#344BFD",
  },
  dropdown: {
    marginLeft: 160,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  dropdownContainer: {
    marginLeft: 160,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  chartContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  fixedText: {
    position: "absolute",
    top: -30, // 텍스트를 차트 상단으로 이동
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  totalText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    position: "absolute",
    top: chartSize / 2 - 18,
  },
  chartLabel: {
    fontSize: 16,
    color: "#555",
    marginTop: 10,
  },
  legend: {
    marginTop: 20,
    alignItems: "flex-start",
    width: "100%",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  legendDot: {
    marginLeft: 10,
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  legendText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#555",
  },
});
