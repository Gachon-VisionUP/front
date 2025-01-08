import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import profileIcon from "@/assets/images/main/icon1.png";

interface IconContextType {
  icon: any; // Current icon
  setIcon: (icon: any) => void; // Function to update the icon
}

const IconContext = createContext<IconContextType | undefined>(undefined);

export const IconProvider = ({ children }: { children: ReactNode }) => {
  // Initialize state with the default icon
  const [icon, setIconState] = useState<any>(profileIcon);

  // Save icon to AsyncStorage
  const saveIconToStorage = async (newIcon: any) => {
    try {
      await AsyncStorage.setItem('selectedIcon', JSON.stringify(newIcon));
    } catch (error) {
      console.error('Failed to save icon:', error);
    }
  };

  // Load icon from AsyncStorage on app start
  useEffect(() => {
    const loadIconFromStorage = async () => {
      try {
        const savedIcon = await AsyncStorage.getItem('selectedIcon');
        if (savedIcon) {
          setIconState(JSON.parse(savedIcon));
        } else {
          setIconState(profileIcon); // Fallback to default icon
        }
      } catch (error) {
        console.error('Failed to load icon:', error);
        setIconState(profileIcon); // Fallback to default icon in case of an error
      }
    };
    loadIconFromStorage();
  }, []);

  const setIcon = (newIcon: any) => {
    setIconState(newIcon);
    saveIconToStorage(newIcon);
  };

  return (
    <IconContext.Provider value={{ icon, setIcon }}>
      {children}
    </IconContext.Provider>
  );
};

export const useIcon = () => {
  const context = useContext(IconContext);
  if (!context) {
    throw new Error('useIcon must be used within an IconProvider');
  }
  return context;
};
