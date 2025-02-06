import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  Modal,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {scaleSize} from '../../commonutils/commonutils';
import HomeScreenController from './HomeScreenController';
import {COLORS} from '../../components/colors';
import {TimerInput} from '../../components/ModalTextInput';
import {TimerList} from '../../components/FlatList';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const navigation:any = useNavigation();
  const {
    addTimer,
    categories,
    modalVisible,
    setModalVisible,
    timerName,
    setTimerName,
    duration,
    setDuration,
    category,
    setCategory,
  } = HomeScreenController();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Timer App</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Add Timer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: COLORS.gradientColor1}]}
          onPress={() => navigation.navigate('HistoryPage')}>
          <Text style={styles.buttonText}>View History</Text>
        </TouchableOpacity>
      </View>
      <TimerInput
        visible={modalVisible}
        onSave={addTimer}
        onCancel={() => setModalVisible(false)}
        timerName={timerName}
        setTimerName={setTimerName}
        duration={duration}
        setDuration={setDuration}
        category={category}
        setCategory={setCategory}
      />
      <TimerList categories={categories} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scaleSize(5),
    backgroundColor: COLORS.white,
  },
  categoryContainer: {
    marginTop: scaleSize(10),
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  timerText: {
    fontSize: 14,
    marginLeft: scaleSize(10),
  },
  button: {
    backgroundColor: COLORS.gradientColor2,
    padding: scaleSize(4),
    borderRadius: scaleSize(10),
    alignItems: 'center',
    flex: 1,
    marginHorizontal: scaleSize(2),
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {},
  headerText: {
    fontSize: 24,
    marginBottom: scaleSize(5),
    marginLeft: scaleSize(3),
    color: COLORS.gradientColor2,
    fontWeight: 'bold',
  },
});
