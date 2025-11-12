
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useStore } from '../store.js';
import { useRouter } from 'expo-router';

export default function TripScreen() {
  const { currentTrip, clearTrip } = useStore();
  const router = useRouter();

  if (!currentTrip) {
    return (
      <View style={styles.container}>
        <Text>Aucune course active</Text>
        <Button title="Retour à la carte" onPress={() => router.replace('/')} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Course en cours</Text>
      <Text>Départ: {currentTrip.departure.name}</Text>
      <Text>Destination: {currentTrip.destination.name}</Text>
      <Text>Prix: {currentTrip.price.toFixed(2)} DH</Text>
      <Text>Mode: {currentTrip.isDay ? 'Jour' : 'Nuit'}</Text>

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
  container: { flex: 1, padding: 30, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
});