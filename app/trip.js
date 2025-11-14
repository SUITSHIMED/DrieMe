import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useStore } from '../store'; 
import { useRouter } from 'expo-router'; 

export default function TripScreen() {
  
  const { currentTrip, clearTrip } = useStore();
  const router = useRouter();

  
  if (!currentTrip) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Aucune course active 🚕</Text>
        <Button title="Retour à la carte" onPress={() => router.replace('/')} />
      </View>
    );
  }

  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Votre course</Text>

      <Text>📍 Départ : {currentTrip.departure.name}</Text>
      <Text>🏁 Destination : {currentTrip.destination.name}</Text>
      <Text>💰 Prix : {currentTrip.price.toFixed(2)} DH</Text>
      <Text>🕒 Mode : {currentTrip.isDay ? 'Jour' : 'Nuit'}</Text>

      <Button
        title="Annuler la course"
        color="red"
        onPress={() => {
          clearTrip(); 
          router.replace('/'); 
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  message: { fontSize: 18, marginBottom: 20 },
});
