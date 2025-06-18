import { Modal, TouchableWithoutFeedback, View, StyleSheet, Text, TextInput, TouchableOpacity, Platform } from "react-native";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

export default function AddNote(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const formattedDate = moment(date).format('ddd, D [de] MMMM [de] YYYY');

  const handleSave = () => {
    if (!title.trim() || !description.trim()) return;

    props.onSave({ title, description, date });
    setTitle("");
    setDescription("");
    setDate(new Date());
  };

  return (
    <Modal
      transparent={true}
      visible={props.isVisible}
      onRequestClose={props.onCancel}
      animationType="fade"
    >
      <TouchableWithoutFeedback onPress={props.onCancel}>
        <View style={styles.background} />
      </TouchableWithoutFeedback>

      <View style={styles.container}>
        <Text style={styles.header}>Nova Nota</Text>

        <TextInput
          style={styles.input}
          placeholder="Título da nota"
          onChangeText={setTitle}
          value={title}
        />

        <TextInput
          style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
          placeholder="Descrição"
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          value={description}
        />

        {Platform.OS === 'android' && (
          <View>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <Text style={styles.date}>{formattedDate}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>
        )}

        <View style={styles.buttons}>
          <TouchableOpacity onPress={props.onCancel}>
            <Text style={styles.button}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.button}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableWithoutFeedback onPress={props.onCancel}>
        <View style={styles.background} />
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 20,
  },
  background: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  header: {
    backgroundColor: '#0084ff',
    color: '#fff',
    textAlign: 'center',
    padding: 15,
    fontSize: 18,
    borderRadius: 6,
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  button: {
    marginHorizontal: 10,
    color: '#0084ff',
    fontSize: 16,
  },
  date: {
    marginTop: 10,
    fontSize: 16,
    color: '#0084ff',
    textAlign: 'right',
    marginRight: 10,
  },
});
