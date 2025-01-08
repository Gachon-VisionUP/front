import React from 'react'; 
import { View, Image, StyleSheet } from 'react-native'; 
import image from "../../assets/images/main/icon1.png"; 
import background from "../../assets/images/main/background.png";  

export default function HomeIcon() {  
  return (  
    <View style={styles.container}>  
      <Image source={background} style={styles.backgroundImage} />  
      <Image source={image} style={styles.image} />  
    </View>  
  ); 
}  

const styles = StyleSheet.create({  
  container: {  
    justifyContent: "flex-start",
    alignItems: 'center',
    width: '45%',
    height: '20%',
    // borderWidth: 2,  
    // borderRadius: 5,  
    // borderStyle: 'solid'  
  },  
  
  backgroundImage: {  
    position: 'absolute',
    width: '90%',
    height: '90%',
    borderRadius: 999, 
    resizeMode: 'cover',
  },  
  
  image: {  
    position: 'absolute',
    width: '90%',
    height: '90%', 
    resizeMode: 'contain',
    borderRadius: 999,
    aspectRatio: 1, 
  },  
});
