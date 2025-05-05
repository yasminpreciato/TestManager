import { Modal, TouchableWithoutFeedback, View, StyleSheet, Text, TextInput, TouchableOpacity} from "react-native";



export default function AddTask(){
    return(
       <Modal transparent={true} 
       visible={true} 
       onRequestClose={() => console.warn('fechou')}
       animationType="slide">

        <TouchableWithoutFeedback
            onPress={() => console.warn('fechou')}>
            <View style={styles.background}></View>
        </TouchableWithoutFeedback>

        <View style={styles.container}>
            <Text style={styles.header}> Nova Tarefa </Text>
            <TextInput
                style={styles.input}
                placeholder="Informe a descrição"
                onChange={() => console.warn('digitou')}
                value={''}
            />
            <View style={styles.buttons}>
                <TouchableOpacity>
                    <Text style={styles.button}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.button}>Salvar</Text>
                </TouchableOpacity>
            </View>

        </View>

        <TouchableWithoutFeedback
            onPress={() => console.warn('fechou')}>
            <View style={styles.background}></View>
        </TouchableWithoutFeedback>

       </Modal> 
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1
    },
    background: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    header: {
        backgroundColor: '#b13b44',
        color: '#fff',
        textAlign: 'center',
        padding: 15,
        fontSize: 18
    },
    input: {
        height: 40,
        margin: 15,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e3e3e3',
        borderRadius: 6
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    button: {
        margin: 20,
        marginRight: 30,
        color: '#b13b44'
    }
})