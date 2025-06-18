import 'react-native-gesture-handler'; 
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import NoteList from "./src/screens/NoteList"; 
import { StyleSheet } from "react-native";

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <NoteList />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
