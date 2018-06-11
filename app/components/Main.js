import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
    ScrollView,
    TouchableOpacity
} from 'react-native';

import Note from './Note';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class Main extends Component {
    constructor(props){
      super(props);
      this.state = {
          noteArray: [],
          noteText: '',
      };
  }
  
  render() {

    let notes = this.state.noteArray.map((val, key)=>{
      return <Note key={key} keyval={key} val={val}
              deleteMethod={()=>this.deleteNote(key)}/>
    });
   
    return (
      <View style ={styles.container}>
         
         <View style={styles.header}>
            <Text style={styles.headerText}>- NOTER -</Text>
          </View>

          <ScrollView style ={styles.scrollContainer}>
              {/* Where the notes show up when hit the add button*/}
              {notes}
          </ScrollView>

          <View style ={styles.footer}>

            {/* Texting space */}
            <TextInput 
                style={styles.textInput}
                placeholder='>note'
                onChangeText={(noteText)=> this.setState({noteText})}
                value={this.state.noteText}
                placeholderTextColor='white'
                underlineColorAndroid='transparent'>
              </TextInput> 
         
          </View>


          {/* button */}
          <TouchableOpacity onPress={ this.addNote.bind(this) } style={styles.addButton}>
              <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
      </View>
              
    );
  }
  addNote(){
    if(this.state.noteText){
        var d = new Date();
        this.state.noteArray.push({
            'date':d.getFullYear()+
            "/"+(d.getMonth()+1) +
            "/"+ d.getDate(),
           'note': this.state.noteText
        });
        this.setState({ noteArray: this.state.noteArray });
        this.setState({noteText:''});
    }
}

 deleteNote(key){
    this.state.noteArray.splice(key, 1);
    this.setState({noteArray: this.state.noteArray});
  } 
}
const styles = StyleSheet.create({
container: {
    flex: 1,
},
header: {
    backgroundColor: '#E91E63',
    alignItems: 'center',
    justifyContent:'center',
    borderBottomWidth: 10,
    borderBottomColor: '#ddd'
},
headerText: {
    color: 'white',
    fontSize: 18,
    padding: 26
},
scrollContainer: {
    flex: 1,
    marginBottom: 100
},
footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10
},
textInput: {
    alignSelf: 'stretch',
    color: '#fff',
    padding: 20,
    backgroundColor: '#252525',
    borderTopWidth:2,
    borderTopColor: '#ededed'
},
addButton: {
    position: 'absolute',
    zIndex: 11,
    right: 20,
    bottom: 90,
    backgroundColor: '#E91E63',
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8
},
addButtonText: {
    color: '#fff',
    fontSize: 24
}
});