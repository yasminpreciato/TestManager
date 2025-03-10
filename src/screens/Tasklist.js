import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";

import moment from "moment-timezone";
import 'moment/locale/pt-br'

import Icon from 'react-native-vector-icons/FontAwesome'

import todayImage from '../../assets/imgs/today.jpg'

export default function TaskList() {

    const today = moment().tz("America/Sao_Paulo").locale("pt-br").format('ddd, D [de] MMMM')

    return(
        <View style={styles.container}>
            <ImageBackground source={todayImage} style={styles.background}>

                <View style={styles.IconBar}>
                    <TouchableOpacity onPress={() => console.log('oi')}>
                        <Icon name="eye" size={20} color={'#fff'}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.titleBar}>
                    <Text style={styles.title}>Hoje</Text>
                    <Text style={styles.subtitle}>{today}</Text>
                </View>

            </ImageBackground>
            <View style={styles.taskList}>
                <Text>Task #01</Text>
            </View>
            <TouchableOpacity style={styles.addButton}
                activeOpacity={0.7}
                onPress={() => console.warn("+")}>

                <Icon name="plus" size={20} color={"#fff"}/>
                

            </TouchableOpacity>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        flex: 3
    },
    taskList: {
        flex: 7
    }, 
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
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
    },
    addButton: {
      position: 'absolute',
      right: 30,
      bottom: 30,
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: '#B13B44',
      justifyContent:'center',
      alignItems:'center'
    },
    IconBar:{
        flexDirection:'row',
        marginHorizontal: 20,
        justifyContent: 'flex-end',
        marginTop: 20
    }
})