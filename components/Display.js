import React from 'react';
import { StyleSheet, Text, View, Button, Image, Modal, TouchableOpacity } from 'react-native';
import CameraScreen from './CameraScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { Token } from '../resources/Token';
import Loader from './Loader';
import AccidentEvents from './VehicleHistoryReport/AccidentEvents';
import RecallEvents from './VehicleHistoryReport/RecallEvents';

export default class Display extends React.Component {

//TOKEN: 5bd73da3-1a7a-4dc4-9680-afc7b9faaae0

    state = {
        component: null
    }


    getContent(){
        //Find last service date
        var lastServ = null
        try {
            lastServ = new Date(this.props.vhrReport.ServiceEvents[this.props.vhrReport.ServiceEvents.length-1].Date);
            lastServ = lastServ.toString();
        } catch(error){}

        return(
            <View style={{alignItems: 'center', margin: 10}}>
                <Text>{this.props.recalls.Vin}</Text>
                <Text style={styles.header}>{this.props.recalls.ModelYear + " " + this.props.recalls.Make + " " + this.props.recalls.Model}</Text>
                <Text> </Text>
                {
                    <TouchableOpacity onPress={() => this.setState({component: <AccidentEvents data={this.props.vhrReport.AccidentEvents}/>})}>
                        {
                            this.props.vhrReport.AccidentEvents === null ? 
                            <Text>No accidents reported</Text> : 
                            <Text style={styles.danger}>{this.props.vhrReport.AccidentEvents.length} accident(s) reported</Text>
                        }
                    </TouchableOpacity>
                }
                {
                    this.props.vhrReport.StolenEvents === null ? 
                    <Text>Not reported stolen</Text> : 
                    <Text style={styles.danger}>Vehicle reported stolen</Text>
                }
                {
                    this.props.vhrReport.ServiceEvents === null ? 
                    null : 
                    <Text>Last service reported {lastServ.split(' ').slice(1,4).join(' ')}</Text>}
                {
                    <TouchableOpacity onPress={() => this.setState({component: <RecallEvents data={this.props.vhrReport.RecallEvents}/>})}>
                        {
                            this.props.recalls.Recalls === null ?
                            null : 
                            <Text style={styles.danger}>Recalls reported</Text>
                        }
                    </TouchableOpacity>
                }
            </View>
        )
    }

    render() {
    
        return(
            <Modal
            animationType="slide"
            visible={true}
            onRequestClose={() => {
                this.state.component ?
                this.setState({component: null}) :
                this.props.onClose()
            }}>
            <View style={{marginTop: 22, marginLeft:10}}>
                {
                    this.state.component ?
                    this.state.component :
                    this.getContent()
                }
            </View>
          </Modal>
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
      margin: 30,
  },
  header: {
      fontSize: 25,
      fontWeight: 'bold',
  },
  danger: {
      color: '#E2001D',
      fontWeight: 'bold',
  },
});
