import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useUser } from '../context/UserContext';

export default function ResultScreen({ navigation }) {
  const { resultadoLook, promptUser } = useUser();

  if (!resultadoLook?.look || resultadoLook.look.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Nenhum look gerado</Text>
          <Text style={styles.emptyText}>
            Volte e gere um look para ver as sugestões.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Context')}
          >
            <Text style={styles.buttonText}>Gerar look</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Sugestão de Look</Text>
        
        <View style={styles.occasionContainer}>
          <Text style={styles.occasion}>
            {promptUser || resultadoLook.ocasiao || ''}
          </Text>
        </View>
        
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Recomendação:</Text>
          <Text style={styles.descriptionText}>
            {resultadoLook.descricaoIA || ''}
          </Text>
        </View>
        
        {resultadoLook.look && resultadoLook.look.length > 0 && (
          <View style={styles.piecesContainer}>
            <Text style={styles.sectionTitle}>Peças sugeridas:</Text>
            <View style={styles.piecesGrid}>
              {resultadoLook.look.map((item, index) => (
                <View key={index} style={styles.pieceCard}>
                  {item.imagem ? (
                    <Image
                      source={{ uri: item.imagem }}
                      style={styles.pieceImage}
                    />
                  ) : (
                    <View style={styles.pieceImagePlaceholder}>
                      <Text style={styles.placeholderText}>
                        {item.categoria}
                      </Text>
                    </View>
                  )}
                  <Text style={styles.pieceName}>
                    {item.nome || `${item.categoria} ${index + 1}`}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}
        
        {(resultadoLook.calcado || resultadoLook.acessorio) && (
          <View style={styles.accessoriesContainer}>
            {resultadoLook.calcado && (
              <View style={styles.accessoryBox}>
                <Text style={styles.accessoryTitle}>Calçado:</Text>
                <Text style={styles.accessoryText}>{resultadoLook.calcado}</Text>
              </View>
            )}
            
            {resultadoLook.acessorio && (
              <View style={styles.accessoryBox}>
                <Text style={styles.accessoryTitle}>Acessórios:</Text>
                <Text style={styles.accessoryText}>{resultadoLook.acessorio}</Text>
              </View>
            )}
          </View>
        )}
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => navigation.navigate('Context')}
          >
            <Text style={styles.secondaryButtonText}>Novo look</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Wardrobe')}
          >
            <Text style={styles.buttonText}>Guarda-roupa</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
  },
  occasionContainer: {
    backgroundColor: '#e0e7ff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  occasion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6366f1',
    textAlign: 'center',
  },
  descriptionContainer: {
    backgroundColor: '#f3f4f6',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  piecesContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  piecesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  pieceCard: {
    width: '30%',
    alignItems: 'center',
  },
  pieceImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginBottom: 4,
  },
  pieceImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  placeholderText: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
  pieceName: {
    fontSize: 12,
    textAlign: 'center',
    color: '#333',
  },
  accessoriesContainer: {
    gap: 12,
    marginBottom: 20,
  },
  accessoryBox: {
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 8,
  },
  accessoryTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  accessoryText: {
    fontSize: 14,
    color: '#666',
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    backgroundColor: '#6366f1',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#9ca3af',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
