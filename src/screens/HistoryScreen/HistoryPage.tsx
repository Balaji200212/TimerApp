import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { scaleSize } from '../../commonutils/commonutils';
import { COLORS } from '../../components/colors';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const storedHistory = await AsyncStorage.getItem('finishedTimers');
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      } else {
        setHistory([]);
      }
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  const clearHistory = async () => {
    try {
      await AsyncStorage.removeItem('finishedTimers');
      setHistory([]);
      Alert.alert('History Cleared', 'All timer history has been cleared.');
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const renderItem = ({ item }:any) => (
    <View style={styles.historyItem}>
      <Text style={styles.historyText}>
        <Text style={styles.label}>Category:</Text> {item.category}
      </Text>
      <Text style={styles.historyText}>
        <Text style={styles.label}>Timer Name:</Text> {item.timerName}
      </Text>
      <Text style={styles.historyText}>
        <Text style={styles.label}>Duration:</Text> {item.duration} sec
      </Text>
      <Text style={styles.historyText}>
        <Text style={styles.label}>Finished At:</Text>{' '}
        {new Date(item.finishedAt).toLocaleString()}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={history}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No history available.</Text>
        }
      />
      <TouchableOpacity style={styles.clearButton} onPress={clearHistory}>
        <Text style={styles.clearButtonText}>Clear History</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HistoryPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:COLORS.white,
    padding: scaleSize(10),
  },
  historyItem: {
    backgroundColor: COLORS.white,
    padding: scaleSize(7),
    borderRadius: scaleSize(10),
    shadowColor: COLORS.black,
    shadowOpacity: 0.1,
    shadowRadius: scaleSize(5),
    elevation: 3,
    marginVertical:scaleSize(5)
  },
  historyText: {
    fontSize: 16,
    color: '#333',
  },
  label: {
    fontWeight: 'bold',
    color: '#555',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: scaleSize(100),
    flex:1
  },
  clearButton: {
    backgroundColor: COLORS.gradientColor2,
    padding: scaleSize(5),
    borderRadius: scaleSize(10),
    alignItems: 'center',
    marginTop: scaleSize(5),
  },
  clearButtonText: {
    color:COLORS.white,
    fontSize: 15,
    fontWeight: 'bold',
  },
});
