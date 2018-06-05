import React from 'react';
import { StyleSheet, Text, View, Button, Image, Modal, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { Token } from '../../resources/Token';
import Loader from '../Loader';
import { ListItem } from 'react-native-elements';
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
        return (
        <View>
            {
                this.props.data.map((value, i) => (
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
        </View>
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
