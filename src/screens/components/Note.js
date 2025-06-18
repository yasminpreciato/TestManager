import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';

export default function Note({ item, onDelete }) {
  const formattedDate = moment(item.date).locale('pt-br').format('DD/MM/YYYY');

  const renderRightAction = () => (
    <RectButton style={styles.deleteButton} onPress={() => onDelete(item.id)}>
      <MaterialIcons name="delete" size={24} color="#fff" />
    </RectButton>
  );

  return (
    <Swipeable renderRightActions={renderRightAction}>
      <View style={styles.card}>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff', padding: 15,
    borderRadius: 8, marginBottom: 10,
    elevation: 2,
  },
  title: { fontSize: 16, fontWeight: 'bold' },
  description: { marginTop: 4, color: '#555' },
  date: { marginTop: 8, fontSize: 12, color: '#999' },
  deleteButton: {
    backgroundColor: '#ff3b30', justifyContent: 'center',
    alignItems: 'center', width: 60, borderRadius: 8, margin: 4,
  },
});
