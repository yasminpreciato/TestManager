import { View, Text, ImageBackground, StyleSheet} from "react-native"

import todayImage from '../../assets/imgs/today.jpg'

export default function Tasklist() {
    return(
        <View style={styles.container}>
            <ImageBackground source={todayImage} style={styles.background}>

                <View style={styles.titleBar}>
                    <Text style={styles.title}>Hoje</Text>
                    <Text style={styles.subtitle}>24 de Fevereiro</Text>
                </View>

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
        flex: 3
    },
    tasklist:{
        flex: 7,
        backgroundColor: "#F5DEB3"
    },
    titleBar:{
        flex: 1,
        justifyContent:'flex-end'

    },
    title: {
        color: 'white',
        fontSize: 50, 
        marginLeft: 20,
        marginBottom: 20

    },
    subtitle: {
        color: 'white',
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30
    }
})