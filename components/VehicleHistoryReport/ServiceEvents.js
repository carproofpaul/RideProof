import React from 'react';
import { StyleSheet, Text, View, Button, Image, Modal, Alert, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { Token } from '../../resources/Token';
import Loader from '../Loader';
import { ListItem, Divider } from 'react-native-elements';
import moment from 'moment';


export default class ServiceEvents extends React.Component {

    displayDetail(message){
        Alert.alert(
            'Detail',
            message,
            [
                {text: 'Ok', onPress: null},
            ],
            { cancelable: false }
          )
    }
    
    render() {
        //null check
        if(this.props.data == null){
            return(
                <View>
                    <Text style={{fontStyle: 'italic', margin: 10, textAlign: 'center'}}>No Service Events Available</Text>
                </View>
            )
        }

        return (
            <ScrollView style={{margin: 10}}>
                <Text style={{fontWeight: 'bold', fontSize: 25}}>Service Events</Text>
                <Divider style={{marginVertical: 10}}/>
                {
                    this.props.data.slice(0).reverse().map((value, i) => (
                    <ListItem
                        key={i}
                        title={value.Date.split('T')[0]}
                        rightTitle={(() => {
                            if(value.Location.City !== null) return value.Location.City + ', ' + value.Location.StateProv;
                            if(value.Location.StateProv !== null) return value.Location.StateProv;
                            else return 'No Location'
                        })()}
                        chevron
                        onPress={() => this.displayDetail(value.Detail)}
                    />
                    ))
                }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  component: {
      margin: 30
  }
});
