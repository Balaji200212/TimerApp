import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {scaleSize} from '../commonutils/commonutils';
import {COLORS} from './colors';
import * as Progress from 'react-native-progress';

const TimerItem = ({
  timer,
  categoryName,
  isStartAll,
  isPauseAll,
  onPauseAllFinished,
  isResetAll,
  onResetAllFinished,
  onResetComplete,
}:any) => {
  const [remainingTime, setRemainingTime] = useState(Number(timer.duration));
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(1); // 1 = 100%, 0 = 0%

  useEffect(() => {
    if (isStartAll && !isRunning) {
      startTimer();
    }
  }, [isStartAll]);

  useEffect(() => {
    if (isPauseAll) {
      pauseTimer();
      onPauseAllFinished && onPauseAllFinished();
    }
  }, [isPauseAll]);

  useEffect(() => {
    if (isResetAll) {
      resetTimer(true);
    }
  }, [isResetAll]);

  useEffect(() => {
    let interval:any = null;

    if (isRunning && !isPaused && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime(prevTime => prevTime - 1);
        setProgress(remainingTime / timer.duration); 
      }, 1000);
    } else if (remainingTime === 0) {
      clearInterval(interval);
      setIsRunning(false);
      setProgress(0);

      Alert.alert(
        'Timer Finished',
        `${timer.timerName} in ${categoryName} finished!`,
      );
      (async () => {
        try {
          const record = {
            category: categoryName,
            timerName: timer.timerName,
            duration: timer.duration,
            finishedAt: new Date().toISOString(),
          };
          const existingRecords = await AsyncStorage.getItem('finishedTimers');
          const records = existingRecords ? JSON.parse(existingRecords) : [];
          records.push(record);
          await AsyncStorage.setItem('finishedTimers', JSON.stringify(records));
        } catch (error) {
          console.error('Error saving finished timer', error);
        }
      })();
    }

    return () => clearInterval(interval);
  }, [isRunning, isPaused, remainingTime]);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      setIsPaused(false);
    } else if (isPaused) {
      setIsPaused(false);
    }
  };

  const pauseTimer = () => {
    setIsPaused(true);
  };

  const resetTimer = async (fromResetAll = false) => {
    setRemainingTime(Number(timer.duration));
    setIsRunning(false);
    setIsPaused(false);
    setProgress(1);

    try {
      const existingRecords = await AsyncStorage.getItem('finishedTimers');
      const records = existingRecords ? JSON.parse(existingRecords) : [];

      const updatedRecords = records.filter(
        (record:any) =>
          !(
            record.timerName === timer.timerName &&
            record.category === categoryName
          ),
      );

      await AsyncStorage.setItem(
        'finishedTimers',
        JSON.stringify(updatedRecords),
      );

      if (!fromResetAll) {
        Alert.alert(
          'Reset Successful',
          `Timer "${timer.timerName}" has been reset and removed.`,
        );
      } else {
        onResetAllFinished && onResetAllFinished();
      }
    } catch (error) {
      console.error('Error resetting timer', error);
    }
  };

  return (
    <View style={styles.timerItem}>
      <Text style={styles.timerText}>{timer.timerName}</Text>

      <Progress.Bar
        progress={progress}
        width={scaleSize(90)}
        height={scaleSize(10)}
        color="#3b82f6"
        borderWidth={1}
        borderColor="#ccc"
        unfilledColor="#e0e0e0"
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.startButton} onPress={startTimer}>
          <Text style={styles.buttonText}>
            {isRunning && !isPaused ? 'Running' : 'Start'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.pauseButton} onPress={pauseTimer}>
          <Text style={styles.buttonText}>Pause</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.resetButton}
          onPress={() => resetTimer(false)}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


export const TimerList = ({categories}: any) => {
  const [refresh, setRefresh] = useState(false);
  const [startAll, setStartAll] = useState<any>({});
  const [pauseAll, setPauseAll] = useState<any>({});
  const [resetAll, setResetAll] = useState<any>({});

  const handleStartAll = (categoryName: any) => {
    setStartAll((prev: any) => ({...prev, [categoryName]: true}));
    setTimeout(() => {
      setStartAll((prev: any) => ({...prev, [categoryName]: false}));
    }, 500);
  };

  const handlePauseAll = (categoryName: any) => {
    setPauseAll((prev: any) => ({...prev, [categoryName]: true}));
    setTimeout(() => {
      setPauseAll((prev: any) => ({...prev, [categoryName]: false}));
    }, 500);
  };

  const handleResetAll = (categoryName: any) => {
    setResetAll((prev: any) => ({...prev, [categoryName]: true}));
    setTimeout(() => {
      setResetAll((prev: any) => ({...prev, [categoryName]: false}));
    }, 500);
  };

  const handleResetComplete = () => {
    setRefresh(!refresh);
  };

  return (
    <FlatList
      data={Object.keys(categories)}
      extraData={refresh}
      keyExtractor={item => item}
      renderItem={({item: categoryName}) => (
        <View style={styles.categoryContainer}>
          <View style={styles.categoryHeader}>
            <Text style={styles.categoryTitle}>{categoryName}</Text>

            <View style={styles.categoryButtons}>
              <TouchableOpacity
                style={styles.startAllButton}
                onPress={() => handleStartAll(categoryName)}>
                <Text style={styles.buttonText}>Start All</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.pauseAllButton}
                onPress={() => handlePauseAll(categoryName)}>
                <Text style={styles.buttonText}>Pause All</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.resetAllButton}
                onPress={() => handleResetAll(categoryName)}>
                <Text style={styles.buttonText}>Reset All</Text>
              </TouchableOpacity>
            </View>
          </View>

          {categories[categoryName].map((timer: any, index: any) => (
            <TimerItem
              key={index}
              timer={timer}
              categoryName={categoryName}
              isStartAll={startAll[categoryName]}
              isPauseAll={pauseAll[categoryName]}
              isResetAll={resetAll[categoryName]}
              onResetComplete={handleResetComplete}
              onResetAllFinished={() => handleResetComplete()}
            />
          ))}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    marginVertical: scaleSize(7),
    padding: scaleSize(3),
    backgroundColor: '#f0f0f0',
    borderRadius: scaleSize(8),
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: scaleSize(1),
  },
  timerItem: {
    marginVertical: scaleSize(1),
    padding: scaleSize(1),
  },
  timerText: {
    fontSize: 16,
  },
  timerIndicator: {
    fontSize: 14,
    color: COLORS.green,
  },
  startButton: {
    backgroundColor: '#007BFF',
    padding: scaleSize(2),
    borderRadius: scaleSize(5),
    alignItems: 'center',
    flex: 1,
    marginRight: 5,
  },
  pauseButton: {
    backgroundColor: '#007BFF',
    padding: scaleSize(2),
    borderRadius: scaleSize(5),
    alignItems: 'center',
    flex: 1,
    marginRight: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  resetButton: {
    backgroundColor: COLORS.gradientColor1,
    padding: scaleSize(2),
    borderRadius: scaleSize(5),
    alignItems: 'center',
    flex: 1,
  },
  buttonRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: scaleSize(2),
    marginVertical: scaleSize(5),
  },
  categoryHeader: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryButtons: {
    flexDirection: 'row',
    marginTop: scaleSize(3),
    marginBottom: scaleSize(3),
  },
  startAllButton: {
    backgroundColor: COLORS.gradientColor2,
    padding: scaleSize(2),
    borderRadius: scaleSize(5),
    marginRight: scaleSize(2),
  },
  pauseAllButton: {
    backgroundColor: COLORS.gradientColor2,
    padding: scaleSize(2),
    borderRadius: scaleSize(5),
    marginRight: scaleSize(2),
  },
  resetAllButton: {
    backgroundColor: COLORS.gradientColor1,
    padding: scaleSize(2),
    borderRadius: scaleSize(5),
    marginRight: scaleSize(5),
  },
});

export default TimerList;
