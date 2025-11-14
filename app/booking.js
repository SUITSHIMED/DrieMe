import React, { useState } from "react";
import { View, Text, Pressable, Button, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useStore } from "../store";
import { haversine } from "../utils";

const places = [
  { id: 1, name: "Maarif", lat: 33.588, lng: -7.63 },
  { id: 2, name: "Sidi Maarouf", lat: 33.566, lng: -7.61 },
  { id: 3, name: "Ain Sebaa", lat: 33.607, lng: -7.51 },
  { id: 4, name: "Oasis", lat: 33.580, lng: -7.64 },
  { id: 5, name: "Anfa", lat: 33.585, lng: -7.66 },
  { id: 6, name: "Derb Sultan", lat: 33.577, lng: -7.60 },
];

export default function BookingScreen() {
  
  const [departure, setDeparture] = useState(null);
  const [destination, setDestination] = useState(null);

  const [showDeparture, setShowDeparture] = useState(false);
  const [showDestination, setShowDestination] = useState(false);

  const startTrip = useStore((s) => s.startTrip);
  const isDay = useStore((s) => s.isDay());

  const handleConfirm = () => {
    if (!departure || !destination) return;

    // Calculate distance
    const distance = haversine(
      departure.lat,
      departure.lng,
      destination.lat,
      destination.lng
    );

    // Simple pricing
    const price = distance * (isDay ? 7 : 10);

    // Save trip in Zustand
    startTrip({
      departure,
      destination,
      distance,
      price,
      isDay,
    });

    // Navigate to trip screen
    router.push("/trip");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>

        {/* ----- DEPARTURE DROPDOWN ----- */}
        <Pressable
          onPress={() => setShowDeparture(!showDeparture)}
          style={{
            padding: 15,
            backgroundColor: "#eee",
            borderRadius: 10,
            marginBottom: 10,
          }}
        >
          <Text>{departure ? departure.name : "Select Departure"}</Text>
        </Pressable>

        {showDeparture && (
          <View style={{ backgroundColor: "#fafafa", padding: 10, borderRadius: 10 }}>
            {places.map((p) => (
              <Pressable
                key={p.id}
                onPress={() => {
                  setDeparture(p);
                  setShowDeparture(false);
                }}
                style={{
                  padding: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: "#ccc",
                }}
              >
                <Text>{p.name}</Text>
              </Pressable>
            ))}
          </View>
        )}

        {/* ----- DESTINATION DROPDOWN ----- */}
        <Pressable
          onPress={() => setShowDestination(!showDestination)}
          style={{
            padding: 15,
            backgroundColor: "#eee",
            borderRadius: 10,
            marginVertical: 10,
          }}
        >
          <Text>{destination ? destination.name : "Select Destination"}</Text>
        </Pressable>

        {showDestination && (
          <View style={{ backgroundColor: "#fafafa", padding: 10, borderRadius: 10 }}>
            {places.map((p) => (
              <Pressable
                key={p.id}
                onPress={() => {
                  setDestination(p);
                  setShowDestination(false);
                }}
                style={{
                  padding: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: "#ccc",
                }}
              >
                <Text>{p.name}</Text>
              </Pressable>
            ))}
          </View>
        )}

        {/* ----- CONFIRM ----- */}
        <Button
          title="Confirm"
          color="#e53935"
          disabled={!departure || !destination}
          onPress={handleConfirm}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
