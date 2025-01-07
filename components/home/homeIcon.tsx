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
    justifyContent: "flex-start", // Aligns content at the top  
    alignItems: 'center', // Centers horizontally  
    width: '55%', // Match the width of the background image  
    height: '27%', // Match the height of the background image  
    borderWidth: 2,  
    borderRadius: 5,  
    borderStyle: 'solid'  
  },  
  
  backgroundImage: {  
    position: 'absolute', // This makes the background image fill the container  
    width: '100%', // Set width to 100% of the container  
    height: '100%', // Set height to 100% of the container  
    borderRadius: 999, // Make the background image circular (radius is large enough to form a full circle)  
    resizeMode: 'cover', // Ensures the background image covers the area without stretching  
  },  
  
  image: {  
    position: 'absolute', // Position the image absolutely over the background  
    width: '100%', // Adjust width to fit within the container  
    height: '100%', // Adjust height to fit within the container  
    resizeMode: 'contain', // Ensures the image is fully visible and not cropped  
    borderRadius: 999, // Make the image circular  
    aspectRatio: 1, // Maintain the aspect ratio of the image  
  },  
});
