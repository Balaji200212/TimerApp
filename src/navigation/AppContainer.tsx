import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import HistoryPage from '../screens/HistoryScreen/HistoryPage';

const AppContainer = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="HistoryPage" component={HistoryPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;

const styles = StyleSheet.create({});
