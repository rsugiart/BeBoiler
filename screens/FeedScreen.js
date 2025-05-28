import React from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  Image
} from 'react-native';


import Constants from 'expo-constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const posts = [
  {
    id: '1',
    userName: 'hilalatpurdue',
    userAvatar: require('../assets/avatar_hilal.png'),
    postImage: require('../assets/gala_food.png'),
    description: "There's a fancy event happening at WALC!",
    location: 'Wilmeth Active Learning Center',
  },
  {
    id: '2',
    userName: 'ashy',
    userAvatar: require('../assets/avatar_ash.png'),
    postImage: require('../assets/spring.png'),
    description: "spring on campus",
    location: 'Pickett Park',
  },
  {
    id: '3',
    userName: 'ruthless',
    userAvatar: require('../assets/avatar_ruth.png'),
    postImage: require('../assets/IMG_3006.jpg'),
    description: 'Completed fountain run... Stacking up those points',
    location: 'Engineering Fountain',
  },
  {
    id: '4',
    userName: 'yashvihi',
    userAvatar: require('../assets/avatar_yashvi.png'),
    postImage: require('../assets/IMG_5052.jpg'),
    description: '50 points for walking under the bell tower??',
    location: 'Bell Tower',
  },
];

export default function FeedScreen() {
  const renderItem = ({ item }) => (
    <View style={styles.postContainer}>
      {/* Header: Avatar + User info */}
      <View style={styles.postHeader}>
        <Image source={item.userAvatar} style={styles.avatar} resizeMode="cover" />
        <View style={{ marginLeft: 10 }}>
          <Text style={[styles.userName, { marginBottom: 5 }]}>
          {item.userName}
          </Text>
          <View style={styles.postTime}>
          <MaterialCommunityIcons name="google-maps" size={10} color="black" />
          <Text style={styles.postTime}>{item.location}</Text>
          </View>
        </View>
      </View>

      {/* Main Post Image */}
      <Image source={item.postImage} style={styles.postImage} resizeMode="cover" />

      {/* Description */}
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },

  // Post styling
  postContainer: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden', // ensures rounded corners if post image
    // Shadow (iOS) / Elevation (Android)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 2,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userName: {
    fontWeight: 'bold',
  },

    postTime: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    fontSize: 7,
    color: '#777',
  },

  postImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#e2e2e2',
  },
  description: {
    padding: 8,
    fontSize: 14,
    color: '#333',
  },
  // Bottom nav

});