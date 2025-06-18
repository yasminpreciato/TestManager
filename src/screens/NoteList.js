import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, FlatList, Alert } from "react-native";
import moment from 'moment';
import 'moment/locale/pt-br';

import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from "@react-native-async-storage/async-storage";

import todayImage from '../../assets/imgs/today.jpg';
import Note from "./components/Note";
import { useEffect, useState } from "react";
import AddNote from "./AddNote";

const STORAGE_KEY = "@MyNotesApp:notes";

export default function NoteList() {
  const today = moment().locale("pt-br").format('ddd, D [de] MMMM');
  const [notes, setNotes] = useState([]);
  const [showAddNote, setShowAddNote] = useState(false);

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) setNotes(JSON.parse(saved));
    })();
  }, []);

  const persistNotes = async (newNotes) => {
    setNotes(newNotes);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newNotes));
  };

  const addNote = async (newNote) => {
    if (!newNote.title.trim() || !newNote.description.trim()) {
      Alert.alert('Dados inválidos', 'Título e descrição são obrigatórios!');
      return;
    }
    const noteToAdd = { id: Date.now(), ...newNote };
    const updated = [noteToAdd, ...notes];
    await persistNotes(updated);
    setShowAddNote(false);
  };

  const deleteNote = async (id) => {
    const updated = notes.filter(n => n.id !== id);
    await persistNotes(updated);
  };

  return (
    <View style={styles.container}>
      <AddNote isVisible={showAddNote} onCancel={() => setShowAddNote(false)} onSave={addNote} />

      <ImageBackground source={todayImage} style={styles.background}>
        <View style={styles.titleBar}>
          <Text style={styles.title}>Minhas Notas</Text>
          <Text style={styles.subtitle}>{today}</Text>
        </View>
      </ImageBackground>

      <View style={styles.noteList}>
        <FlatList
          data={notes}
          keyExtractor={item => `${item.id}`}
          renderItem={({ item }) => <Note item={item} onDelete={deleteNote} />}
        />
      </View>

      <TouchableOpacity style={styles.addButton} activeOpacity={0.7} onPress={() => setShowAddNote(true)}>
        <Icon name="plus" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { flex: 3 },
  noteList: { flex: 7, padding: 20 },
  titleBar: { flex: 1, justifyContent: 'flex-end', padding: 20 },
  title: { color: 'white', fontSize: 50 },
  subtitle: { color: 'white', fontSize: 20 },
  addButton: {
    position: 'absolute', right: 30, bottom: 30,
    width: 50, height: 50, borderRadius: 25,
    backgroundColor: '#0084ff', justifyContent: 'center', alignItems: 'center'
  },
});
