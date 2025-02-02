import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WeeklyQuestDetail: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>주별 퀘스트 상세 화면</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default WeeklyQuestDetail;
