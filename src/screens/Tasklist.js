import { View, Text, ImageBackground, StyleSheet} from "react-native"


export default function Tasklist() {
    return(
        <View style={styles.container}>
            <ImageBackground source={{}} style={StyleSheet.background}>

            </ImageBackground>
            <View style={styles.tasklist}>
                <Text>Task #01</Text>
            </View>
            
        </View> 
   )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background:{
        flex: 3,
        backgroundColor: "blue"
    },
    tasklist:{
        flex: 7,
        backgroundColor: "pink"
    }
})