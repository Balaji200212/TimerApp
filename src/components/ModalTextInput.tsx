import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {scaleSize} from '../commonutils/commonutils';
import {COLORS} from './colors';

export const TimerInput = ({
  visible,
  onSave,
  onCancel,
  timerName,
  setTimerName,
  duration,
  setDuration,
  category,
  setCategory,
}: any) => {
  const handleInputChangeOne = (input: any) => {
    setTimerName(input.toUpperCase());
  };
  const handleInputChangeTwo = (input: any) => {
    setDuration(input.toUpperCase());
  };
  const handleInputChangeThree = (input: any) => {
    setCategory(input.toUpperCase());
  };
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Enter Timer Details</Text>
          <TextInput
            style={styles.input}
            placeholder="Timer Name"
            value={timerName}
            onChangeText={handleInputChangeOne}
          />
          <TextInput
            style={styles.input}
            placeholder="Duration (seconds)"
            value={duration}
            onChangeText={handleInputChangeTwo}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Category"
            value={category}
            onChangeText={handleInputChangeThree}
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.touchableButton} onPress={onSave}>
              <Text style={styles.buttonText}>Save Timer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.touchableButton, styles.cancelButton]}
              onPress={onCancel}>
              <Text style={[styles.buttonText, styles.cancelButtonText]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    marginHorizontal: scaleSize(10),
    padding: scaleSize(2),
    backgroundColor: '#fff',
    borderRadius: scaleSize(10),
    elevation: 5,
  },
  modalTitle: {
    fontSize: 25,
    marginTop: scaleSize(5),
    marginBottom: scaleSize(4),
    textAlign: 'center',
    color: COLORS.gradientColor2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: scaleSize(3),
    marginVertical: scaleSize(2),
    marginHorizontal: scaleSize(5),
    borderRadius: scaleSize(5),
  },
  categoryContainer: {
    marginTop: scaleSize(20),
  },
  categoryTitle: {
    fontSize: scaleSize(20),
    fontWeight: 'bold',
  },
  timerText: {
    fontSize: scaleSize(16),
    marginLeft: scaleSize(10),
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: scaleSize(5),
    marginBottom: scaleSize(5),
  },
  touchableButton: {
    backgroundColor: COLORS.gradientColor2,
    paddingVertical: scaleSize(3),
    paddingHorizontal: scaleSize(5),
    borderRadius: scaleSize(5),
  },
  cancelButton: {
    backgroundColor: COLORS.gradientColor1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  cancelButtonText: {},
});
