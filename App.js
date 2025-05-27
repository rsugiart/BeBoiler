import React from 'react';
import { Text, Card, SafeAreaView, StyleSheet } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import{createBottomTabNavigator} from '@react-navigation/bottom-tabs';


// You can import supported modules from npm
// import { Text, Card } from 'react-native-paper';


// or any files within the Snack
// import ProfileScreen from './screens/ProfileScreen';
import AssetExample from './components/AssetExample';


//placeholder screens!! - CHANGE THESE TO MATCH LINE 12 ONCE YOU ADD YOUR JS FILE
function ProfileScreen(){
  return (
    <SafeAreaView style={styles.center}>
      <Text>Feed View</Text>
    </SafeAreaView>
  );
}
function FeedScreen() {
  return (
    <SafeAreaView style={styles.center}>
      <Text>Feed View</Text>
    </SafeAreaView>
  );
}
function TasksScreen() {
  return (
    <SafeAreaView style={styles.center}>
      <Text>Tasks View</Text>
    </SafeAreaView>
  );
}
function MapScreen() {
  return (
    <SafeAreaView style={styles.center}>
      <Text>Map View</Text>
    </SafeAreaView>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions = {{
          headerShown: false,
          tabBarLabelStyle: {fontSize:12},
        }}
      >
        <Tab.Screen name ="Feed" component ={FeedScreen}/>
        <Tab.Screen name="Tasks"  component={TasksScreen} />
        <Tab.Screen name="Map"    component={MapScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
