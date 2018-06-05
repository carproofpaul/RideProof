import React from 'react';
import { StyleSheet, Text, View, Button, Image, Modal, TouchableOpacity } from 'react-native';
import CameraScreen from './CameraScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { Token } from '../resources/Token';
import Loader from './Loader';
import TermsServices from './TermsServices';
import AccidentEvents from './VehicleHistoryReport/AccidentEvents';

export default class Display extends React.Component {

//TOKEN: 5bd73da3-1a7a-4dc4-9680-afc7b9faaae0

    state = {
        component: null,
        modalVisible: false,
    }


    getContent(){
        //Find last service date
        var serv = null
        var currentDate = new Date();
        var yearAgo = new Date();
        var inRange = true
        yearAgo.setFullYear(yearAgo.getFullYear()-1);

        try {
            serv = new Date(this.props.vhrReport.ServiceEvents[this.props.vhrReport.ServiceEvents.length-1].Date);
            lastServ = serv.toString();

            if(serv < currentDate && serv > yearAgo)
                inRange=true;
            else 
                inRange=false;

        } catch(error){}

        // if(serv <= currentDate && serv >= yearAgo)
        // console.log("Within range!")
        // else console.log("not")

        return(
            <View>
                <Text>{this.props.recalls.Vin}</Text>
                <Text style={styles.header}>{this.props.recalls.ModelYear + " " + this.props.recalls.Make + " " + this.props.recalls.Model}</Text>
                <Text> </Text>
                {
                    <TouchableOpacity onPress={() => this.setState({component: <AccidentEvents data={this.props.vhrReport.AccidentEvents}/>})}>
                        {
                            this.props.vhrReport.AccidentEvents === null ? 
                            <Icon raised name='smile-o'color='#3890EA' size={40}>
                            <Text style={styles.list}>No accidents reported</Text></Icon> : 
                            <Icon raised name='warning'color='#E2001D' size={40}>
                            <Text style={styles.list}>{this.props.vhrReport.AccidentEvents.length} accident(s) reported</Text> </Icon>
                        }
                    </TouchableOpacity>
                }
                {
                    this.props.vhrReport.StolenEvents === null ? 
                    <Icon name='check' color='#3890EA' size={40}>
                    <Text style={styles.list}>Not reported stolen</Text></Icon> : 
                    <Icon raised name='warning'color='#E2001D' size={40}>
                    <Text style={styles.danger}>Vehicle reported stolen</Text></Icon>
                }
                {
                    this.props.vhrReport.ServiceEvents === null ? 
                    null : 
                    inRange==true ? 
                    <Icon name='wrench' color='#3890EA' size={40}>
                    <Text style={styles.list}>Last service reported {lastServ.split(' ').slice(1,4).join(' ')}</Text></Icon> :
                    <Icon name='warning' color='#E2001D' size={40}>
                <Text style={styles.list}>Vehicle has no reported service in the last year</Text></Icon> }
                {
                    this.props.recalls.Recalls === null ?
                    null : 
                    <Icon raised name='warning'color='#E2001D' size={40}>
                    <Text style={styles.list}>Recall(s) reported</Text></Icon>
                }
                {
                    <TouchableOpacity onPress={() => this.setState({component: <TermsServices/>})}>
                        {
                            <Text>Information on Reports</Text>
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
  list: {
      color: 'black',
      fontSize: 18,
  },
  info: {
      fontSize: 18,
      textAlign: 'center',
  }
});
