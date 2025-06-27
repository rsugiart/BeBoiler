import { AntDesign } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

type MarkerData = {
  id: number;
  title: string;
  description: string;
  coordinate: { latitude: number; longitude: number };
  color: string;
  shape: 'circle' | 'square' | 'star' | 'cookie';
};

export default function HomeScreen() {
  const [location, setLocation] = useState<null | {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  }>(null);

  const [nearbyMarkers, setNearbyMarkers] = useState<MarkerData[]>([]);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location access is required.');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      const currentLocation = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };

      setLocation(currentLocation);
      const generated = generateNearbyLocations(loc.coords.latitude, loc.coords.longitude);
      setNearbyMarkers(generated);
    })();
  }, []);

  function generateNearbyLocations(lat: number, lon: number, count = 1): MarkerData[] {
    const nearby: MarkerData[] = [];
    for (let i = 0; i < count; i++) {
      const latOffset = (Math.random() - 0.5) * 0.002;
      const lonOffset = (Math.random() - 0.5) * 0.002;
      nearby.push({
        id: i + 1,
        title: `Special Event`,
        description: 'ReXCH event: Come over and learn about the world!',
        coordinate: {
          latitude: lat + latOffset,
          longitude: lon + lonOffset,
        },
        color: 'yellow',
        shape: 'star',
      });
    }

    // cookie
    nearby.push({
      id: count + 1,
      title: `SWE Center`,
      description: 'Free Cookies',
      coordinate: {
        latitude: lat + 0.002,
        longitude: lon + 0.002,
      },
      color: 'brown',
      shape: 'cookie',
    });

    nearby.push({
      id: count + 2,
      title: `Honours College`,
      description: 'Attend the Hogwarts ball',
      coordinate: {
        latitude: lat - 0.001,
        longitude: lon - 0.004,
      },
      color: 'yellow',
      shape: 'star',
    });



    return nearby;
  }

  const renderCustomMarker = (marker: MarkerData) => (
    <Marker
      key={marker.id}
      coordinate={marker.coordinate}
      title={marker.title}
      description={marker.description}
    >
      {marker.shape === 'star' ? (
        <AntDesign name="star" size={24} color={marker.color} />
      ) : marker.shape === 'cookie' ? (
        <Image
          source={require('../../assets/images/cookie.png')} // adjust path if needed
          style={{ width: 36, height: 36 }}
          resizeMode="contain"
        />
      ) : (
        <View
          style={[
            styles.pin,
            {
              backgroundColor: marker.color,
              borderRadius: marker.shape === 'circle' ? 50 : 4,
            },
          ]}
        />
      )}
    </Marker>
  );

  if (!location) {
    return (
      <View style={styles.centered}>
        <Text>Fetching location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        style={styles.map}
        initialRegion={location}
        showsUserLocation
      >
        {nearbyMarkers.map(renderCustomMarker)}
      </MapView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  pin: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#fff',
  },
});
