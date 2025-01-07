import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import image from "../../assets/images/main/icon1.png";
import background from "../../assets/images/main/background.png";

export default function HomeIcon() {
  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image source={background} style={styles.backgroundImage} />
      
      {/* Overlay Image */}
      <Image source={image} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Takes up all available space
    justifyContent: "flex-start", // Aligns content at the top
    alignItems: 'center', // Centers horizontally
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    position: 'absolute', // This makes the background image fill the container
    width: '55%', // Set width as a percentage or use a fixed value
    height: '40%', // Set height as a percentage or use a fixed value
    borderRadius: 999, // Make the background image circular (radius is large enough to form a full circle)
    resizeMode: 'cover', // Ensures the background image covers the area without stretching
  },
  image: {
    position: 'absolute', // Position the image absolutely over the background
    width: '50%', // Adjust width as a percentage or use a fixed value like 100
    height: '40%', // Adjust height to match the width and maintain aspect ratio
    resizeMode: 'contain', // Ensures the image is fully visible and not cropped
    borderRadius: 999, // Make the image circular
    aspectRatio: 1, // Maintain the aspect ratio of the image
  },
});
