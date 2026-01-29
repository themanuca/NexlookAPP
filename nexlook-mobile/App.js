import React, { Component, useEffect } from 'react';
import { DevSettings, View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Register from './src/screens/Register';

const Stack = createNativeStackNavigator();

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info);
    this.setState({ hasError: true, error, info });
  }

  render() {
    if (this.state.hasError) {
      return (
        <ScrollView contentContainerStyle={styles.errorContainer}>
          <Text style={styles.errorTitle}>Erro capturado no App</Text>
          <Text style={styles.errorMessage}>{String(this.state.error)}</Text>
          <Text style={styles.errorStack}>{this.state.info?.componentStack}</Text>
          <View style={{ height: 12 }} />
          <Button title="Recarregar (Dev)" onPress={() => DevSettings.reload()} />
        </ScrollView>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  useEffect(() => {
    console.log('App mounted');
  }, []);

  return (
    <ErrorBoundary>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  errorContainer: { flex: 1, padding: 20, backgroundColor: '#fff7f7' , justifyContent: 'center' },
  errorTitle: { fontSize: 20, fontWeight: '700', color: '#7f1d1d', marginBottom: 8 },
  errorMessage: { color: '#7f1d1d', marginBottom: 8 },
  errorStack: { color: '#333', fontSize: 12 }
});

