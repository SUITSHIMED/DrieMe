
import React, { useState } from 'react';
import { View, Text, Pressable, Modal, FlatList, StyleSheet } from 'react-native';
import { CASA_LOCATIONS } from '../data/locations';
import { haversine } from '../data/utils';
import { useStore } from '../store.js';
import { useRouter } from 'expo-router';

export default function BookingScreen() {
  const [departure, setDeparture] = useState(CASA_LOCATIONS[0]);
  const [destination, setDestination] = useState(CASA_LOCATIONS[1]);
  const [activeList, setActiveList] = useState(null); 
  const { startTrip } = useStore();
  const router = useRouter();

  const distance = haversine(departure.lat, departure.lng, destination.lat, destination.lng);
  const isDay = new Date().getHours() >= 6 && new Date().getHours() < 20;
  const price = 7.5 + (isDay ? 1.5 : 2.0) * distance;
  const timeMinutes = Math.ceil(distance * 2);

  const handleSelect = (item) => {
    if (activeList === 'departure') setDeparture(item);
    else setDestination(item);
    setActiveList(null);
  };
  const handleConfirm = () => {
  const tripData = {
    id: Date.now().toString(),
    departure,
    destination,
    distance,
    price,
    timeMinutes,
    isDay,
    timestamp: new Date().toISOString(),
  };
  startTrip(tripData);
  router.push('/trip'); 
};

  const LocationModal = () => (
    <Modal transparent visible={!!activeList} animationType="slide">
      <Pressable style={styles.overlay} onPress={() => setActiveList(null)} />
      <View style={styles.listContainer}>
        <FlatList
          data={CASA_LOCATIONS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable style={styles.locationItem} onPress={() => handleSelect(item)}>
              <Text>{item.name}</Text>
            </Pressable>
          )}
        />
      </View>
    </Modal>
  );

  const LocationField = ({ label, value, type }) => (
    <Pressable style={styles.inputField} onPress={() => setActiveList(type)}>
      <Text style={styles.inputLabel}>{label}</Text>
      <Text style={styles.inputValue}>{value}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Réserver un Taxi</Text>

      <LocationField label="Départ" value={departure.name} type="departure" />
      <LocationField label="Destination" value={destination.name} type="destination" />

      <View style={styles.results}>
        <Text>📏 Distance: {distance.toFixed(1)} km</Text>
        <Text>💰 Prix: {price.toFixed(2)} DH</Text>
        <Text>⏱️ Temps: ~{timeMinutes} min</Text>
        <Text style={styles.mode}>
          Mode: {isDay ? 'Jour (6h–20h)' : 'Nuit (20h–6h)'}
        </Text>
      </View>

      <Pressable style={styles.confirmButton} onPress={handleConfirm}>
  <Text style={styles.confirmText}>✅ Confirmer la réservation</Text>
</Pressable>

      <LocationModal />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  inputField: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputLabel: { fontSize: 16, color: '#555' },
  inputValue: { fontSize: 16, fontWeight: '600', color: '#e53935' },
  results: { marginTop: 20, padding: 16, backgroundColor: '#f0f0f0', borderRadius: 10 },
  mode: { fontStyle: 'italic', color: '#e53935', marginTop: 8 },
  confirmButton: {
    backgroundColor: '#e53935',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  confirmText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' },
  listContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 300,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
  },
  locationItem: { padding: 14, borderBottomWidth: 1, borderBottomColor: '#eee' },
});
