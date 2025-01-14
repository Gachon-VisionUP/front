import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import boxImg from "@/assets/images/expgame/box.png";
import truckImg from "@/assets/images/expgame/truck.png";
import flagImg from "@/assets/images/expgame/flag.png";

const TIME_LIMIT = 10;
const ROWS = 10;
const COLS = 10;

async function checkPlayAvailability() {
  const lastPlayedDate = await AsyncStorage.getItem("lastPlayedDate");
  const today = new Date().toISOString().split("T")[0];
  return lastPlayedDate !== today;
}

async function updateLastPlayedDate() {
  const today = new Date().toISOString().split("T")[0];
  await AsyncStorage.setItem("lastPlayedDate", today);
}

async function sendScoreToServer(score: number) {
  try {
    console.log(`Attempting to send score: ${score}`);
    const response = await fetch("https://example.com/api/score", {
      method: "POST", // 서버 메서드 확인 필요
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ score }),
    });
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }
    Alert.alert("서버 전송 성공!", `${score}do가 저장되었습니다.`);
    console.log("Score sent successfully.");
    return true;
  } catch (error) {
    console.error(`Failed to send score: ${error.message}`);
    console.log(`Score (${score}) still intended to send when possible.`);
    // 서버 실패 시에도 게임에 영향을 주지 않음
    return false;
  }
}

function createSolvableMaze(rows: number, cols: number) {
  while (true) {
    const maze = Array.from({ length: rows }, () => Array(cols).fill(1));
    const pathCount = Math.floor(rows * cols * 0.5);
    for (let i = 0; i < pathCount; i++) {
      const r = Math.floor(Math.random() * rows);
      const c = Math.floor(Math.random() * cols);
      maze[r][c] = 0;
    }
    maze[0][0] = 0;
    maze[rows - 1][cols - 1] = 0;
    if (isSolvable(maze, rows, cols)) return maze;
  }
}

function isSolvable(maze: number[][], rows: number, cols: number) {
  if (maze[0][0] === 1 || maze[rows - 1][cols - 1] === 1) return false;
  const queue: [number, number][] = [[0, 0]];
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  visited[0][0] = true;

  while (queue.length > 0) {
    const [r, c] = queue.shift()!;
    if (r === rows - 1 && c === cols - 1) return true;

    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;
      if (
        nr >= 0 &&
        nr < rows &&
        nc >= 0 &&
        nc < cols &&
        maze[nr][nc] === 0 &&
        !visited[nr][nc]
      ) {
        visited[nr][nc] = true;
        queue.push([nr, nc]);
      }
    }
  }
  return false;
}

export default function MazeGame() {
  const [mazeMap, setMazeMap] = useState<number[][]>([]);
  const [position, setPosition] = useState({ row: 0, col: 0 });
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [isGameOver, setIsGameOver] = useState(false);
  const [serverConnected, setServerConnected] = useState(false);
  const [canPlay, setCanPlay] = useState(true);

  useEffect(() => {
    (async () => {
      const serverSuccess = await sendScoreToServer(0); // 테스트 전송
      setServerConnected(serverSuccess);

      if (serverSuccess) {
        const playAvailable = await checkPlayAvailability();
        setCanPlay(playAvailable);
        if (!playAvailable) {
          Alert.alert("게임 제한", "오늘은 이미 플레이하셨습니다.");
        }
      }
    })();
    setMazeMap(createSolvableMaze(ROWS, COLS));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isGameOver) return;
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsGameOver(true);
          Alert.alert("실패!", "시간 초과입니다!");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isGameOver]);

  useEffect(() => {
    if (position.row === ROWS - 1 && position.col === COLS - 1) {
      console.log("Game success! Preparing to send score...");
      sendScoreToServer(1); // 항상 호출, 실패 시에도 무시
      if (serverConnected && canPlay) {
        updateLastPlayedDate();
      }
      Alert.alert("성공!", "배달 완료! 1do 획득!!");
      setIsGameOver(true);
    }
  }, [position]);

  const moveTo = (dr: number, dc: number) => {
    if (isGameOver || (!serverConnected && !canPlay)) return;
    const newRow = position.row + dr;
    const newCol = position.col + dc;
    if (newRow < 0 || newRow >= ROWS || newCol < 0 || newCol >= COLS) return;
    if (mazeMap[newRow][newCol] === 1) return;
    setPosition({ row: newRow, col: newCol });
  };

  return (
    <View style={styles.gameContainer}>
      <Text style={styles.timerText}>남은 시간: {timeLeft}초</Text>
      <View style={styles.mazeContainer}>
        {mazeMap.map((rowArr, rIdx) => (
          <View style={styles.row} key={rIdx}>
            {rowArr.map((cell, cIdx) => {
              const isPlayer = position.row === rIdx && position.col === cIdx;
              const isGoal = rIdx === ROWS - 1 && cIdx === COLS - 1;
              const isWall = cell === 1;
              return (
                <Image
                  key={cIdx}
                  source={
                    isPlayer
                      ? truckImg
                      : isGoal
                      ? flagImg
                      : isWall
                      ? boxImg
                      : undefined
                  }
                  style={styles.cellImage}
                />
              );
            })}
          </View>
        ))}
      </View>
      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={styles.arrowButton}
          onPress={() => moveTo(-1, 0)}
        >
          <Text style={styles.arrowText}>▲</Text>
        </TouchableOpacity>
        <View style={styles.horizontalButtons}>
          <TouchableOpacity
            style={styles.arrowButton}
            onPress={() => moveTo(0, -1)}
          >
            <Text style={styles.arrowText}>◀</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.arrowButton}
            onPress={() => moveTo(0, 1)}
          >
            <Text style={styles.arrowText}>▶</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.arrowButton}
          onPress={() => moveTo(1, 0)}
        >
          <Text style={styles.arrowText}>▼</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  gameContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  timerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  mazeContainer: {
    borderWidth: 1,
    borderColor: "#999",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
  },
  cellImage: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  controlsContainer: {
    alignItems: "center",
    marginTop: 5,
  },
  horizontalButtons: {
    flexDirection: "row",
    marginVertical: 0,
  },
  arrowButton: {
    width: 50,
    height: 40,
    backgroundColor: "#007AFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  arrowText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});







