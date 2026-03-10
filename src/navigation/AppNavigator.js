import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useUser } from '../context/UserContext';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import WardrobeScreen from '../screens/WardrobeScreen';
import AddPieceScreen from '../screens/AddPieceScreen';
import ContextScreen from '../screens/ContextScreen';
import ResultScreen from '../screens/ResultScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return null; // Ou um componente de loading
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#6366f1' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        {!user ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ title: 'Entrar' }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ title: 'Criar Conta' }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Wardrobe"
              component={WardrobeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddPiece"
              component={AddPieceScreen}
              options={{ title: 'Adicionar Peça' }}
            />
            <Stack.Screen
              name="Context"
              component={ContextScreen}
              options={{ title: 'Gerar Look' }}
            />
            <Stack.Screen
              name="Result"
              component={ResultScreen}
              options={{ title: 'Resultado' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
