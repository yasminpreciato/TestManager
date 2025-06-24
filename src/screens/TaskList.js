import { useEffect, useState } from "react"
import { 
    View, 
    Text, 
    ImageBackground, 
    StyleSheet, 
    TouchableOpacity, 
    FlatList,
    Alert
} from "react-native"

import moment from 'moment-timezone'
import 'moment/locale/pt-br'
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"


import todayImage from '../../assets/imgs/today.jpg'
import Task from "../components/Task"
import AddTask from "./AddTask"

const taskDB = [
    {
        id: Math.random(),
        desc: 'Elaborar o MER do TCC',
        estimateAt: new Date(),
        doneAt: new Date()
    },
    {
        id: Math.random(),
        desc: 'Ajustar o FIGMA',
        estimateAt: new Date(),
        doneAt: null
    },
    {
        id: Math.random(),
        desc: 'Revisar a documentação do projeto',
        estimateAt: new Date(),
        doneAt: new Date()
    },
    {
        id: Math.random(),
        desc: 'Organizar o Trello',
        estimateAt: new Date(),
        doneAt: null
    }
]

export default function TaskList() {

    const today = moment().tz("America/Sao_Paulo")
        .locale("pt-br").format('ddd, D [de] MMMM')

    const [tasks, setTasks] = useState([])

    const [visibleTasks, setVisibleTasks] = useState([...tasks])
    const [showDoneTasks, setShowDoneTasks] = useState(true)
    const [showAddTask, setShowAddTask] = useState(false)

    const [contador, setContador] = useState(0)

    useEffect(() => {
        if(contador == 0){
            getTasks()
        }
        setContador(contador + 1)
        filterTasks()

    }, [showDoneTasks])

    useEffect(() => {
        filterTasks()
    }, [tasks])

    async function getTasks() {
        try {
            const response = await axios.get('https://67f51ca7913986b16fa349ce.mockapi.io/meditime/api/v1/tasks')
            setTasks(response.data)

        } catch(erro) {
            console.error('Erro ao carregar os dados', error)
        }
    }

    const toggleTask = (taskId) => {
        const taskList = [...visibleTasks]

        for (let i = 0; i < taskList.length; i++) {
            const task = taskList[i];
            if(task.id === taskId){
                task.doneAt = task.doneAt ? null : new Date()
                break
            }
        }

        setVisibleTasks([...taskList])
        filterTasks()
    }

    const toggleFilter = () => {
        setShowDoneTasks(!showDoneTasks)
    }

    const filterTasks = () => {
        let visibleTasks = null
        if(showDoneTasks){
            visibleTasks = [...tasks]
        } else {
            visibleTasks = tasks.filter(task => task.doneAt === null)
        }
        setVisibleTasks(visibleTasks)
    }

    const addTask = newTask => {
      
        if(!newTask.desc || !newTask.desc.trim()){
            Alert.alert('Dados inválidos', 'Descrição não informada!')
            return
        }

        const tempTasks = [...tasks]
        tempTasks.push({
            id: Math.random(),
            desc: newTask.desc,
            estimateAt: newTask.date,
            doneAt: null
        })

        setTasks(tempTasks)
        setShowAddTask(false)

        AsyncStorage.setItem('tasksState', JSON.stringify(tempTasks))
        
    }
    
    const deleteTask = id => {
        const tempTasks = tasks.filter(task => task.id !== id)
        setTasks(tempTasks)
        
        AsyncStorage.setItem('tasksState', JSON.stringify(tempTasks))

    }
    
    return(
        <View style={styles.container}>

            <AddTask isVisible={showAddTask} 
                onCancel={() => setShowAddTask(false)}
                onSave={addTask}
            />
            
            <ImageBackground size={30} source={todayImage} style={styles.background}>

                <View style={styles.iconBar}>
                    <TouchableOpacity onPress={toggleFilter}>
                        <Icon name={showDoneTasks ? "eye" : "eye-slash"} 
                          size={20} color={'#fff'} />
                    </TouchableOpacity>
                </View>

                <View style={styles.titleBar}>
                    <Text style={styles.title}>Hoje</Text>
                    <Text style={styles.subtitle}>{today}</Text>
                </View>

            </ImageBackground>

            <View style={styles.taskList}>
                <FlatList 
                    data={visibleTasks}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({item}) => 
                        <Task {...item} 
                            onToggleTask={toggleTask} 
                            onDelete={deleteTask}/>}
                />
            </View>

            <TouchableOpacity style={styles.addButton}
                activeOpacity={0.7}
                onPress={() => setShowAddTask(true)}>
                
                <Icon name="plus" size={20} color={"#fff"} />

            </TouchableOpacity>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        flex: 3,

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
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconBar: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'flex-end',
        marginTop: 20
    }
})