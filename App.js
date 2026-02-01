import React from 'react';
import { StyleSheet, Text, View, Button, Image, FlatList, Alert, TouchableOpacity, TextInput, ActivityIndicator, Modal, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'GARMENTS_V1';

export default function App() {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [prompt, setPrompt] = React.useState('');
  const [aiResponse, setAiResponse] = React.useState(null);
  const [aiLoading, setAiLoading] = React.useState(false);
  const [apiKey, setApiKey] = React.useState(null);
  const [showKeyModal, setShowKeyModal] = React.useState(false);

  React.useEffect(() => {
    loadApiKey();
  }, []);

  async function loadApiKey() {
    try {
      const k = await AsyncStorage.getItem('OPENAI_KEY');
      if (k) setApiKey(k);
    } catch (e) {
      console.warn('could not load api key', e);
    }
  }

  async function saveApiKey(k) {
    try {
      await AsyncStorage.setItem('OPENAI_KEY', k);
      setApiKey(k);
      setShowKeyModal(false);
    } catch (e) {
      console.warn('could not save api key', e);
    }
  }

  React.useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      setItems(parsed);
    } catch (e) {
      console.error('failed to load items', e);
    } finally {
      setLoading(false);
    }
  }

  async function saveItems(newItems) {
    setItems(newItems);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
  }

  async function pickImage() {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert('Permissão necessária', 'Permita acesso às imagens para adicionar peças.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (result.canceled) return;
    const asset = result.assets ? result.assets[0] : result;
    const uri = asset.uri || asset;

    try {
      const filename = `${Date.now()}.jpg`;
      const dest = FileSystem.documentDirectory + filename;
      await FileSystem.copyAsync({ from: uri, to: dest });

      const newItem = { id: Date.now().toString(), uri: dest, createdAt: new Date().toISOString() };
      const newItems = [newItem, ...items];
      await saveItems(newItems);
    } catch (e) {
      console.error('save image failed', e);
      Alert.alert('Erro', 'Não foi possível salvar a imagem localmente.');
    }
  }

  async function callAI() {
    if (!prompt || prompt.trim().length === 0) {
      Alert.alert('Digite um prompt', 'Descreva o look que deseja obter.');
      return;
    }

    setAiResponse(null);
    setAiLoading(true);

    // If API key available, call OpenAI Chat Completions; otherwise fallback to local heuristic
    if (apiKey) {
      try {
        const garmentDescriptions = items.map((it, idx) => `#${idx + 1} arquivo:${it.uri.split('/').pop()}`).join('\n');
        const system = `Você é um estilista digital que sugere combinações de roupas usando apenas as peças fornecidas. Responda em português de forma curta e indique os índices das peças usadas.`;
        const userContent = `Peças:\n${garmentDescriptions}\nUsuário: ${prompt}\nSugira a melhor combinação.`;

        const res = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              { role: 'system', content: system },
              { role: 'user', content: userContent }
            ],
            max_tokens: 300,
          }),
        });

        if (!res.ok) {
          const txt = await res.text();
          throw new Error(`OpenAI error: ${res.status} ${txt}`);
        }

        const data = await res.json();
        const text = data.choices && data.choices[0] && data.choices[0].message ? data.choices[0].message.content : JSON.stringify(data);
        setAiResponse(text);
      } catch (e) {
        console.error('AI call failed', e);
        Alert.alert('Erro IA', String(e));
      } finally {
        setAiLoading(false);
      }
    } else {
      // fallback: pick up to 3 items and return a simple suggestion
      const suggestion = localSuggest(prompt, items);
      setAiResponse(suggestion);
      setAiLoading(false);
    }
  }

  function localSuggest(promptText, itemsList) {
    if (!itemsList || itemsList.length === 0) return 'Seu guarda-roupa está vazio.';
    // Simple heuristic: choose up to 3 items — most recent first — and craft a textual suggestion
    const chosen = itemsList.slice(0, 3);
    const parts = chosen.map((it, i) => `${i + 1}) ${it.uri.split('/').pop()}`);
    return `Sugestão (heurística): combine ${parts.join(', ')} para um look que atende: "${promptText}".`;
  }

  async function removeItem(id) {
    const toRemove = items.find(i => i.id === id);
    if (!toRemove) return;

    Alert.alert('Remover peça', 'Deseja remover esta peça?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover',
        style: 'destructive',
        onPress: async () => {
          try {
            if (toRemove.uri && (await FileSystem.getInfoAsync(toRemove.uri)).exists) {
              await FileSystem.deleteAsync(toRemove.uri, { idempotent: true });
            }
          } catch (e) {
            console.warn('could not delete file', e);
          }
          const newItems = items.filter(i => i.id !== id);
          await saveItems(newItems);
        }
      }
    ]);
  }

  function renderItem({ item }) {
    return (
      <View style={styles.card}>
        <Image source={{ uri: item.uri }} style={styles.image} />
        <View style={styles.cardFooter}>
          <Text style={styles.small}>{new Date(item.createdAt).toLocaleString()}</Text>
          <TouchableOpacity onPress={() => removeItem(item.id)}>
            <Text style={styles.remove}>Remover</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Guarda-Roupa — NexlookMobile</Text>
      <View style={{ width: '90%' }}>
        <Button title="Adicionar peça (galeria)" onPress={pickImage} />
      </View>

      <View style={styles.aiBox}>
        <TextInput
          value={prompt}
          onChangeText={setPrompt}
          placeholder="Descreva o look desejado (ex: evento casual, frio, cores escuras)"
          style={styles.input}
          multiline
        />
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Button title="Pedir look" onPress={callAI} />
          <Button title={apiKey ? 'Chave AI definida' : 'Definir chave AI'} onPress={() => setShowKeyModal(true)} />
        </View>
        {aiLoading && <ActivityIndicator style={{ marginTop: 8 }} />}
        {aiResponse ? (
          <View style={styles.aiResponse}>
            <Text style={{ fontWeight: '600' }}>Resposta da IA:</Text>
            <Text>{aiResponse}</Text>
          </View>
        ) : null}
      </View>
      {loading ? (
        <Text style={{ marginTop: 12 }}>Carregando...</Text>
      ) : (
        <FlatList
          data={items}
          keyExtractor={i => i.id}
          renderItem={renderItem}
          style={{ width: '100%', marginTop: 12 }}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 40,
  },
  title: {
    fontSize: 20,
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    alignItems: 'center',
  },
  small: {
    color: '#444',
  },
  remove: {
    color: '#d00',
  }
  ,
  aiBox: {
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 8,
    minHeight: 44,
    marginBottom: 8,
    backgroundColor: '#fff'
  },
  aiResponse: {
    marginTop: 8,
    backgroundColor: '#f1f1f1',
    padding: 8,
    borderRadius: 6,
  }
});

