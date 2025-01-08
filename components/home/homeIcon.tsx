import React from 'react'; 
import { View, Image, StyleSheet } from 'react-native'; 
import { useIcon } from "@/context/IconContext";// 전역관리 아이콘 
import background from "../../assets/images/main/background.png";  

export default function HomeIcon() {  
  const { icon } = useIcon();

  return (  
    <View style={styles.container}>  
      <Image source={background} style={styles.backgroundImage} />  
      <Image source={icon || background} style={styles.image} /> 
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
