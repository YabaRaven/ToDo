import React, { useState } from "react"; 
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    FlatList, 
    StyleSheet, 
} from "react-native"; 
  
const App = () => { 
    const [text, setText] = useState(""); 
    const [tasks, setTasks] = useState([]); 
    const [editIndex, setEditIndex] = useState(-1); 
  
    const AddTask = () => { 
        if (text) { 
            if (editIndex !== -1) { 
                // Edit existing task 
                const updatedTasks = [...tasks]; 
                updatedTasks[editIndex] = text; 
                setTasks(updatedTasks); 
                setEditIndex(-1); 
            } else { 
                // Add new task 
                setTasks([...tasks, text]); 
            } 
            setText(""); 
        }
    }; 
  
    const EditTask = (index) => { 
        const taskToEdit = tasks[index]; 
        setText(taskToEdit); 
        setEditIndex(index); 
    }; 
  
    const DeleteTask = (index) => { 
        const updatedTasks = [...tasks]; 
        updatedTasks.splice(index, 1); 
        setTasks(updatedTasks); 
    };
    
    const clearAllTodos = () => {
        setTasks([]);
    };

  
    const renderItem = ({ item, index }) => ( 
        <View style={styles.task}> 
            <Text 
                style={styles.itemList}>{item}</Text> 
            <View 
                style={styles.taskButtons}> 
                <TouchableOpacity 
                    onPress={() => EditTask(index)}> 
                    <Text 
                        style={styles.editButton}>Edit</Text> 
                </TouchableOpacity> 
                <TouchableOpacity 
                    onPress={() => DeleteTask(index)}> 
                    <Text 
                        style={styles.deleteButton}>Delete</Text> 
                </TouchableOpacity> 
            </View> 
            
        </View> 
    ); 
  
    return ( 
        <View style={styles.container}> 
            <Text style={styles.heading}>ToDo List</Text> 
            <TextInput 
                style={styles.input} 
                placeholder="Tap to add task"
                value={text} 
                onChangeText={(text) => setText(text)} 
            /> 
            <TouchableOpacity 
                style={styles.addButton} 
                onPress={AddTask}> 
                <Text style={styles.addButtonText}> 
                    {editIndex !== -1 ? "Update Task" : "+"} 
                </Text> 
            </TouchableOpacity> 
            <TouchableOpacity 
                onPress={clearAllTodos}> 
                <Text 
                    style={styles.deleteButton}>Clear All</Text> 
            </TouchableOpacity> 
            <FlatList 
                data={tasks} 
                renderItem={renderItem} 
                keyExtractor={(item, index) => index.toString()} 
            /> 
        </View> 
    ); 
}; 
  
const styles = StyleSheet.create({ 
    container: { 
        flex: 1, 
        padding: 40, 
        marginTop: 40, 
    }, 
    heading: { 
        fontSize: 30, 
        fontWeight: "bold", 
        marginBottom: 7, 
        color: "blue", 
        textAlign: "center",
        borderWidth: 1,
        borderRadius: 50,
        borderColor: "blue",
        padding: 25
    }, 
    input: { 
        borderWidth: 3, 
        borderColor: "lightblue", 
        padding: 10, 
        marginTop: 10,
        marginBottom: 20, 
        marginLeft: 10,
        borderRadius: 10, 
        fontSize: 18,
        position: "absolute",
        bottom: 0,
        width: 295,   
    }, 
    addButton: {
        backgroundColor: "darkblue", 
        padding: 10,
        width: 50, 
        borderRadius: 10, 
        marginBottom: 25,
        position: "absolute",
        bottom: 0,
        right: 16,
    }, 
    addButtonText: {  
        textAlign: "center", 
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    }, 
    task: { 
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center", 
        marginBottom: 7,
        marginTop: 7, 
        fontSize: 18,
        padding: 10,
        borderWidth: 1, 
        borderRadius: 10,
        borderColor: "blue"
    }, 
    itemList: { 
        fontSize: 19, 
        borderRadius: 10,

    }, 
    taskButtons: { 
        flexDirection: "row", 
    }, 
    editButton: { 
        marginRight: 10, 
        color: "green", 
        fontWeight: "bold", 
        fontSize: 18, 
    }, 
    deleteButton: { //Clear all tasks
        color: "red", 
        fontWeight: "bold", 
        fontSize: 18, 
    }, 
}); 
  

export default App;