import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Svg, Path, G } from "react-native-svg";
import { useRouter } from "expo-router";

type SectionData = {
  label: string;
  value: number;
  color: string;
};

const screenWidth = Dimensions.get("window").width;
const chartSize = screenWidth * 0.6; // 차트 크기
const donutWidth = 20; // 도넛 그래프의 두께

const backIcon = require("../../assets/images/exp/back.png");
const logoImage = require("../../assets/images/login/Logo.png");

const baseUrl = "http://35.216.61.56"; // 백엔드 기본 URL

export default function ExpGraph2() {
  const [sectionsData, setSectionsData] = useState<SectionData[]>([
    { label: "상반기 인사평가", value: 200, color: "#FF5C35" },
    { label: "하반기 인사평가", value: 30, color: "#F59E0B" },
    { label: "직무별 퀘스트", value: 40, color: "#3B82F6" },
    { label: "리더 부여 퀘스트", value: 0, color: "#10B981" },
    { label: "전사 프로젝트", value: 0, color: "#6366F1" },
  ]);

  const [filteredData, setFilteredData] = useState<SectionData[]>([]);
  const [levelName, setLevelName] = useState("F1-I"); // 현재 레벨
  const [selectedSection, setSelectedSection] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState("2025");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [displayText, setDisplayText] = useState("섹션을 클릭하세요");
  const router = useRouter();

  useEffect(() => {
    const filtered = sectionsData.filter((section) => section.value > 0);
    setFilteredData(filtered);
  }, [sectionsData]);

  useEffect(() => {
    const fetchData = async () => {
      console.log("[LOG] Fetching data for year:", selectedYear);
      try {
        const response = await fetch(
          `${baseUrl}:8080/api/exp-bar/ring/year?sessionUserId=1&year=${selectedYear}`
        );
        console.log("[LOG] API response status:", response.status);
        if (!response.ok) {
          throw new Error("API 요청 실패");
        }
        const result = await response.json();
        console.log("[LOG] API response data:", result);

        setLevelName(result.levelName);
        const updatedSections = sectionsData.map((section) => ({
          ...section,
          value: result.expByType[section.label] || 0,
        }));
        setSectionsData(updatedSections);
      } catch (error) {
        console.error("[LOG] 서버 연동 실패:", error);
      }
    };

    fetchData();
  }, [selectedYear]);

  const total = filteredData.reduce((sum, section) => sum + section.value, 0);

  const handleSectionPress = (index: number) => {
    if (index === selectedSection) {
      setSelectedSection(null);
      setDisplayText("섹션을 클릭하세요");
    } else {
      setSelectedSection(index);
      setDisplayText(
        `${filteredData[index].label}\n${filteredData[index].value.toLocaleString()} do`
      );
    }
  };

  const renderChartSections = () => {
    if (filteredData.length === 0 || total === 0) {
      return (
        <Text style={styles.chartLabel}>
          표시할 데이터가 없습니다. (총합: {total})
        </Text>
      );
    }

    let cumulativePercentage = 0;

    return filteredData.map((section, index) => {
      const percentage = (section.value / total) * 100;

      if (!isFinite(percentage)) {
        return null;
      }

      const startAngle = (cumulativePercentage / 100) * 2 * Math.PI - Math.PI / 2;
      cumulativePercentage += percentage;
      const endAngle = (cumulativePercentage / 100) * 2 * Math.PI - Math.PI / 2;

      const cx = chartSize / 2;
      const cy = chartSize / 2;

      const outerRadius = chartSize / 2;
      const innerRadius =
        chartSize / 2 - donutWidth - (selectedSection === index ? 10 : 0);

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
        <Text style={styles.subtitle}>{selectedYear} 나의 레벨</Text>
          <Text style={styles.levelText}>{levelName}</Text>
        </View>
        <DropDownPicker
          open={isDropdownOpen}
          value={selectedYear}
          items={[
            { label: "2025년", value: "2025" },
            { label: "2024년", value: "2024" },
            { label: "2023년", value: "2023" },
            { label: "2022년", value: "2022" },
          ]}
          setOpen={setIsDropdownOpen}
          setValue={setSelectedYear}
          style={[styles.dropdown, { width: 100, height: 30, paddingHorizontal: 8 }]}
          textStyle={{ fontSize: 12 }}
          dropDownContainerStyle={[styles.dropdownContainer, { width: 100 }]}
        />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.centralText}>{displayText}</Text>
        <Svg width={chartSize} height={chartSize}>{renderChartSections()}</Svg>
        <Text style={styles.chartLabel}>{selectedYear} 누적 경험치</Text>
        <Text style={styles.totalText}>{total.toLocaleString()} do</Text>
      </View>

      <View style={styles.legend}>
        {filteredData.map((section, index) => (
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
  centralText: {
    position: "absolute",
    top: chartSize / 2 - 30, // 중앙 위치
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  chartLabel: {
    fontSize: 16,
    color: "#555",
    marginTop: 20,
  },
  totalText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 5,
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
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 20,
    marginLeft: 20,
  },
  legendText: {
    fontSize: 20,
    color: "#555",
  },
});