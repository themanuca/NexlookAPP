import React from 'react';
import { View, Text, Button, StyleSheet, Linking } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao</Text>
      <Text style={styles.logo}>NexLook</Text>
      <Text style={styles.subtitle}>Envie suas roupas e deixe a IA montar a combinação ideal.</Text>
      <Button title="Começar" onPress={() => navigation.navigate('Login')} />

      <View style={styles.footer}>
        <View style={styles.icons}>
          <Entypo name="instagram" size={24} onPress={() => Linking.openURL('https://www.instagram.com/dev.manuca')} />
        </View>
        <Text style={styles.copy}>© 2025 NexLook. Todos os direitos reservados.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: '700', textAlign: 'center' },
  logo: { fontSize: 36, fontWeight: '800', color: '#2563EB', marginTop: 6, marginBottom: 12 },
  subtitle: { fontSize: 16, textAlign: 'center', marginBottom: 20, color: '#374151' },
  footer: { position: 'absolute', bottom: 24, alignItems: 'center' },
  icons: { flexDirection: 'row', gap: 12 },
  copy: { fontSize: 12, color: '#6B7280', marginTop: 8 }
});
