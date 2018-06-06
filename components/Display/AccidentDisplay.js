import React from 'react';
import { StyleSheet, Text, View, Button, Image, Modal, Alert, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { Token } from '../../resources/Token';
import Loader from '../Loader';
import { ListItem, Divider } from 'react-native-elements';
import moment from 'moment';


export default class AccidentDisplay extends React.Component {
    
    render() {

        return (
            <View >
            {
                this.props.vhrReport.AccidentEvents === null 
                ? 
                    <View style={styles.rows} >
                        <Icon raised name='smile-o'color='#3890EA' size={40} />
                        <Text style={styles.list} >No accidents reported</Text>
                    </View>
                : 
                    <View style={styles.rows} >
                        <Icon raised name='warning'color='#E2001D' size={40}></Icon>
                        <Text style={styles.list}>{this.props.vhrReport.AccidentEvents.length} accident(s) reported</Text>
                    </View>
            }
            </View>
        )
    }
}

const styles = StyleSheet.create({
  rows: {
    flexDirection: 'row', 
    paddingBottom: 10
  },
  list: {
    color: 'black',
    fontSize: 18,
    paddingLeft: 10,
},
});
