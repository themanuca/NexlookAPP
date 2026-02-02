import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useUser } from '../context/UserContext';
import { API_URL } from '../config';

export default function ContextScreen({ navigation }) {
  const { user, setResultadoLook, setPromptUser } = useUser();
  const [context, setContext] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerateLook = async () => {
    if (context.length < 10) {
      Alert.alert('Erro', 'Por favor, descreva melhor a ocasião (mínimo 10 caracteres)');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/IAIService/GerarDescricaoImagemcomFoto`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          promptUsuario: context,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao gerar look');
      }

      const responseData = await response.json();
      const lookData = responseData.descricao ? responseData.descricao : responseData;
      
      const lookResponse = {
        ocasiao: lookData.ocasiao || context,
        descricaoIA: lookData.descricaoIA || '',
        look: lookData.look || [],
        calcado: lookData.calcado || lookData.calçado || '',
        acessorio: lookData.acessorio || lookData.acessório || '',
      };

      setResultadoLook(lookResponse);
      setPromptUser(context);
      navigation.navigate('Result');
    } catch (error) {
      console.error('Erro ao gerar look:', error);
      Alert.alert('Erro', 'Não foi possível gerar o look. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Qual a ocasião?</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Ex: Reunião de trabalho, festa casual..."
          value={context}
          onChangeText={setContext}
          multiline
          numberOfLines={4}
        />
        
        <TouchableOpacity
          style={styles.button}
          onPress={handleGenerateLook}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Gerar look</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  form: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#6366f1',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
