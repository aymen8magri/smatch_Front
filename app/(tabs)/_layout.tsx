import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // For icons
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserService from '@/services/UserService';

const _layout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkLogin = async () => {
      const result = await UserService.isLoggedIn();
      setIsLoggedIn(result);
    };
    checkLogin();
  }, []);

  if (isLoggedIn === null) return null;

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#1e1e32', // Dark background to match the login line
          borderTopWidth: 0, // Remove the top border
          height: 70, // Increased height to accommodate larger central button
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarActiveTintColor: '#1e90ff', // Blue accent for active tab
        tabBarInactiveTintColor: '#888', // Gray for inactive tabs
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
          marginBottom: 5,
        },
        tabBarIconStyle: {
          marginTop: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="listTournoi"
        options={{
          title: 'Tournois',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="trophy-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="boutique"
        options={{
          title: 'Boutique',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                top: -15, // Move the button upward to make it appear elevated
                width: 60,
                height: 60,
                backgroundColor: focused ? '#1e90ff' : '#1e90ff', // Blue background like the hexagon
                borderRadius: 30, // Circular shape to approximate hexagon
                borderWidth: 2,
                borderColor: '#fff', // White border for contrast
              }}
            >
              <Ionicons
                name="cart-outline"
                size={focused ? 32 : 28} // Larger icon when focused
                color="#fff" // White icon to contrast with blue background
              />
            </View>
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
          },
        }}
      />
      <Tabs.Screen
        name="listMatches"
        options={{
          title: 'Matches',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: isLoggedIn ? 'Profil' : 'Connexion',
          headerShown: false,
          tabBarIcon: ({ color, size }) =>
            isLoggedIn ? (
              <Ionicons name="person-outline" size={size} color={color} />
            ) : (
              <Ionicons name="log-in-outline" size={size} color={color} />
            ),
        }}
      />



    </Tabs>
  );
};

export default _layout;

const styles = StyleSheet.create({});