// app/index.js
import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { CASA_CENTER, USER_POSITION, AVAILABLE_TAXIS } from '../data/taxiData';
import { Link } from 'expo-router'; 

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={CASA_CENTER}
        
      >
        <Marker coordinate={USER_POSITION} pinColor="blue" title="Vous" />
        {AVAILABLE_TAXIS.map((taxi) => (
          <Marker
            key={taxi.id}
            coordinate={taxi}
            pinColor="red"
            title={`Taxi ${taxi.id}`}
          />
        ))}
      </MapView>

      
      <View style={styles.buttonContainer}>
        <Link href="/booking" asChild>
          <Button title="Réserver un Taxi" color="#e53935" />
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
});