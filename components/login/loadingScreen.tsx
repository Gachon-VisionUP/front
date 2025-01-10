// LoadingScreen.tsx
import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#1c6cf9" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
});
