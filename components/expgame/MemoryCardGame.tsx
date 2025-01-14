import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const CARD_DATA = [
  { id: 1, label: "+2 do", value: 2 },
  { id: 2, label: "+2 do", value: 2 },
  { id: 3, label: "+1 do", value: 1 },
  { id: 4, label: "+1 do", value: 1 },
  { id: 5, label: "꽝", value: 0 },
  { id: 6, label: "꽝", value: 0 },
];

type CardInfo = {
  id: number;
  label: string;
  value: number;
  isFlipped: boolean;
  isMatched: boolean;
};

interface Props {
  onFinish: (totalDo: number) => void;
}

const cardBackImage = require("@/assets/images/expgame/card-002.png"); // 카드 뒤집기 전 이미지

export default function MemoryCardGame({ onFinish }: Props) {
  const [cards, setCards] = useState<CardInfo[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [totalDo, setTotalDo] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    initGame();
  }, []);

  const initGame = () => {
    const shuffled = shuffleArray(CARD_DATA);
    const initialCards = shuffled.map((c) => ({
      ...c,
      isFlipped: false,
      isMatched: false,
    }));
    setCards(initialCards);
    setFlippedIndices([]);
    setTotalDo(0);
    setGameOver(false);
  };

  const handleFlipCard = (index: number) => {
    if (gameOver || flippedIndices.length >= 2) return;

    const newCards = [...cards];
    if (newCards[index].isFlipped || newCards[index].isMatched) return;

    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      checkMatch(newFlipped[0], newFlipped[1]);
    }
  };

  const checkMatch = (idx1: number, idx2: number) => {
    const newCards = [...cards];
    const card1 = newCards[idx1];
    const card2 = newCards[idx2];

    if (card1.label === card2.label) {
      card1.isMatched = true;
      card2.isMatched = true;
      setTotalDo((prev) => prev + card1.value);
      setCards(newCards);
    }

    setTimeout(() => {
      endGame(); // 게임 종료
    }, 800);
  };

  const endGame = () => {
    setGameOver(true);
    setTimeout(() => {
      onFinish(totalDo);
    }, 500);
  };

  const shuffleArray = (arr: typeof CARD_DATA) => {
    const array = [...arr];
    for (let i = array.length - 1; i > 0; i--) {
      const r = Math.floor(Math.random() * (i + 1));
      [array[i], array[r]] = [array[r], array[i]];
    }
    return array;
  };

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {cards.map((card, index) => (
          <TouchableOpacity
            key={card.id}
            style={styles.card}
            onPress={() => handleFlipCard(index)}
            activeOpacity={0.8}
          >
            {card.isFlipped || card.isMatched ? (
              <View style={styles.cardFront}>
                <Image source={cardBackImage} style={styles.cardImage} />
                <Text style={styles.cardText}>{card.label}</Text>
              </View>
            ) : (
              <View style={styles.cardBack}>
                <Image source={cardBackImage} style={styles.cardImage} />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 300,
  },
  card: {
    width: 90,
    height: 120,
    margin: 5,
    borderRadius: 8,
    overflow: "hidden",
  },
  cardBack: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ddd", // 카드 뒤 배경색 (필요 시 제거)
  },
  cardFront: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  cardText: {
    position: "absolute",
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
});




















