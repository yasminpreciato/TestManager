import { GestureHandlerRootView } from "react-native-gesture-handler";
import TaskList from "./src/screens/Tasklist";
import { StyleSheet } from "react-native";

export default function App() {
  return(
    <GestureHandlerRootView style={StyleSheet.container}>
      <TaskList/>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})