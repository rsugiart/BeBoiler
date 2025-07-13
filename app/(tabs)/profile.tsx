import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getAuth, signOut } from 'firebase/auth';
import { getActionFromState } from '@react-navigation/native';

const PersonalProfile = () => {
  const [profilePic, setProfilePic] = useState<string | null>(null);

  const userInfo = {
    accountName: 'John Doe',
    totalPoints: 1200,
    eventsAttended: 8,
    dailyStreak: 5,
  };

  const userPosts = [
    { id: '1', title: 'BeBoilers', content: 'Winners' },
    { id: '2', title: 'Cool squirrel', content: 'noice' },
    { id: '3', title: 'train', content: 'points' },
  ];

  // Function to handle user logout: no need to reroute to login screen manually (firebase already takes care of this)
  const handleLogout = async () => {
    const auth = getAuth();
    try{
      await signOut(auth);
      Alert.alert('Logged out successfully');
    } catch (error) {
      console.error('Logout failed:', error);
      Alert.alert('Logout failed', 'Please try again later.');
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Please enable photo library access in settings.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePic(result.assets[0].uri);
    }
  };

  const renderPost = ({ item }: { item: typeof userPosts[0] }) => (
    <View style={styles.postContainer}>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postContent}>{item.content}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={
              profilePic
                ? { uri: profilePic }
                : require('../../assets/images/avatar_ash.png')
            }
            style={styles.profilePic}
          />
        </TouchableOpacity>
        <Text style={styles.accountName}>{userInfo.accountName}</Text>
      </View>

       <View style={styles.logOutContainer}>
      <Text style={styles.title}>Profile</Text>
      <Button title="Sign Out" onPress={handleLogout} />
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Total Points</Text>
          <Text style={styles.statValue}>{userInfo.totalPoints}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Events Attended</Text>
          <Text style={styles.statValue}>{userInfo.eventsAttended}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Daily Streak</Text>
          <Text style={styles.statValue}>{userInfo.dailyStreak}</Text>
        </View>
      </View>

      <View style={styles.postsContainer}>
        <Text style={styles.postsHeader}>My Posts</Text>
        <FlatList data={userPosts} renderItem={renderPost} keyExtractor={(item) => item.id} />
      </View>
    </View>
  );
};

export default PersonalProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#ccc',
    marginBottom: 15,
  },
  accountName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  logOutContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title:{
    fontSize: 24,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
    width: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  statLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
    textAlign: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  postsContainer: {
    flex: 1,
    marginTop: 10,
  },
  postsHeader: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  postContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  postContent: {
    fontSize: 14,
    color: '#555',
  },
});
