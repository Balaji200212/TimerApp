import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

const HomeScreenController = () => {
  const [categories, setCategories] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [timerName, setTimerName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');

  const addTimer = () => {
    if (!timerName || !duration || !category) {
      return;
    }

    setCategories((prevCategories: any) => {
      const updatedTimers = prevCategories[category]
        ? [...prevCategories[category], {timerName, duration}]
        : [{timerName, duration}];

      return {...prevCategories, [category]: updatedTimers};
    });
    setTimerName('');
    setDuration('');
    setCategory('');
    setModalVisible(false);
  };
  return {
    addTimer,
    categories,
    modalVisible,
    setCategories,
    setModalVisible,
    timerName,
    setTimerName,
    duration,
    setDuration,
    category,
    setCategory
  };
};

export default HomeScreenController;

const styles = StyleSheet.create({});
