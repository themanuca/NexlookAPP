import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useUser } from '../context/UserContext';
import { API_URL } from '../config';
import Toast from '../components/Toast';

export default function WardrobeScreen({ navigation }) {
  const { user, logout } = useUser();
  const [pieces, setPieces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  useEffect(() => {
    loadPieces();
  }, []);

  const loadPieces = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/UploadImagem/Imagens`, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          logout();
          return;
        }
        throw new Error('Erro ao buscar peças');
      }

      const data = await response.json();
      setPieces(data || []);
    } catch (error) {
      console.error('Erro ao carregar peças:', error);
    } finally {
      setLoading(false);
    }
  };

  const deletePiece = (lookId) => {
    Alert.alert(
      'Deletar Peça',
      'Tem certeza que deseja deletar esta peça?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Deletar',
          style: 'destructive',
          onPress: () => confirmDelete(lookId),
        },
      ]
    );
  };

  const confirmDelete = async (lookId) => {
    setDeletingId(lookId);
    try {
      const response = await fetch(`${API_URL}/api/UploadImagem/ExcluirLook/${lookId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          logout();
          return;
        }
        throw new Error('Erro ao deletar peça');
      }

      setPieces(prev => prev.filter(piece => piece.id !== lookId));
      addToast('Peça deletada com sucesso!', 'success');
    } catch (error) {
      console.error('Erro ao deletar peça:', error);
      addToast('Erro ao deletar peça', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deletePiece(item.id)}
        disabled={deletingId === item.id}
      >
        <Text style={styles.deleteText}>✕</Text>
      </TouchableOpacity>
      
      <Image
        source={{ uri: item.images[0]?.imageUrl }}
        style={styles.image}
      />
      <Text style={styles.cardTitle}>{item.titulo}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
      
      <View style={styles.header}>
        <Text style={styles.userName}>👤 {user?.name}</Text>
        <TouchableOpacity onPress={logout}>
          <Text style={styles.logoutButton}>Sair</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.title}>Meu Guarda-Roupa</Text>
      
      {loading ? (
        <ActivityIndicator size="large" color="#6366f1" style={{ marginTop: 20 }} />
      ) : pieces.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>👕</Text>
          <Text style={styles.emptyTitle}>Seu guarda-roupa está vazio</Text>
          <Text style={styles.emptyText}>Adicione suas primeiras peças para começar</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('AddPiece')}
          >
            <Text style={styles.buttonText}>Adicionar primeira peça</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={pieces}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={styles.list}
        />
      )}
      
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddPiece')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
      
      {pieces.length > 0 && (
        <TouchableOpacity
          style={styles.generateButton}
          onPress={() => navigation.navigate('Context')}
        >
          <Text style={styles.generateButtonText}>Gerar look</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  logoutButton: {
    color: '#ef4444',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  list: {
    paddingHorizontal: 8,
    paddingBottom: 100,
  },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 12,
    textAlign: 'center',
    color: '#333',
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#ef4444',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  deleteText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fabText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  generateButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#6366f1',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 5,
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
