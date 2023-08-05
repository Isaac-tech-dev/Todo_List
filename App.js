import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Task from './components/Task';

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    console.log(task)
    setTaskItems([...taskItems, task])
    setTask(null);
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems]
    itemsCopy.splice(index, 1)
    setTaskItems(itemsCopy)
  }

  return (
    <View style={styles.container}>
      {/* TODAYS TASK */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's Task</Text>

        <View style={styles.items}>
          {/* This is where the tasks will go! */}
          {
            taskItems.map((item, index) => {
              return(
                <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                  <Task text={item}/>
                </TouchableOpacity>
              )
            })
          }
          {/* <Task text={"Task 1"}/>
          <Task text={"Task 2"}/> */}
        </View>
      </View>

      {/* Write a Task */}
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.writeTask}>
        <TextInput style={styles.input} placeholder={"Write a Task"} value={task} onChangeText={text => setTask(text)}/>

        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addtext}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8eafd',
  },
  tasksWrapper : {
    paddingTop: 80,
    paddingHorizontal:20,
  },
  sectionTitle : {
    fontSize:24,
    fontWeight:'bold'
  },
  items : {
    marginTop: 30
  },
  writeTask: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    width: 250,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 60,
    borderColor: '#c0c0c0',
    borderWidth: 1
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#c0c0c0',
    borderWidth: 1
  },
  addtext: {},
});
