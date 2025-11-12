// app/index.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { CASA_CENTER, USER_POSITION, AVAILABLE_TAXIS } from '../data/taxiData';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={CASA_CENTER}
        showsUserLocation={false}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});