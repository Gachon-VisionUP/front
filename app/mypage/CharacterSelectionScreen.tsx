import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Button } from 'react-native';
import { useRouter } from 'expo-router';
import backIcon from '@/assets/images/main/back.png';
import profileIcon from '@/assets/images/main/icon1.png';

import sampleIcon1 from '@/assets/images/editicon/editicon1.png';
import sampleIcon2 from '@/assets/images/editicon/editicon2.png';
import sampleIcon3 from '@/assets/images/editicon/editicon3.png';
import sampleIcon4 from '@/assets/images/editicon/editicon4.png';
import sampleIcon5 from '@/assets/images/editicon/editicon5.png';
import sampleIcon6 from '@/assets/images/editicon/editicon6.png';

export default function CharacterSelectionScreen() {
  const router = useRouter();
  const [selectedIcon, setSelectedIcon] = useState(profileIcon);

  const icons = [
    sampleIcon1,
    sampleIcon2,
    sampleIcon3,
    sampleIcon4,
    sampleIcon5,
    sampleIcon6,
  ];

  const handleIconSelect = (icon: any) => {
    setSelectedIcon(icon);
  };

  const handleConfirm = () => {
    // Logic to pass selectedIcon back to the index.tsx
    router.push({ pathname: '/mypage', params: { icon: selectedIcon } });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={backIcon} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>두손꼭Do전!</Text>
      </View>

      {/* Current Icon */}
      <View style={styles.currentIconContainer}>
        <Image source={selectedIcon} style={styles.currentIcon} />
        <Text style={styles.instructionsText}>
          캐릭터를 눌러서 변경해주세요!
        </Text>
      </View>

      {/* Icon Selection Grid */}
      <View style={styles.iconGrid}>
        {icons.map((icon, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleIconSelect(icon)}
            style={[
              styles.iconWrapper,
              selectedIcon === icon && styles.selectedIconWrapper,
            ]}
          >
            <Image source={icon} style={styles.icon} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Confirm Button */}
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmButtonText}>변경</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    padding: 20,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  backIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#344BFD',
  },
  currentIconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  currentIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  instructionsText: {
    fontSize: 16,
    color: '#888',
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  iconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  selectedIconWrapper: {
    borderWidth: 2,
    borderColor: '#488EF6',
  },
  icon: {
    width: 60,
    height: 60,
  },
  confirmButton: {
    width: '80%',
    padding: 15,
    backgroundColor: '#488EF6',
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
