import React from 'react';
import { StyleSheet, Text, View, Button, Image, Modal, TouchableOpacity } from 'react-native';
import CameraScreen from './CameraScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { Token } from '../resources/Token';
import Loader from './Loader';
import TermsServices from './TermsServices';
import AccidentEvents from './VehicleHistoryReport/AccidentEvents';
import RecallEvents from './VehicleHistoryReport/RecallEvents';
import ServiceEvents from './VehicleHistoryReport/ServiceEvents';

import AccidentDisplay from './Display/AccidentDisplay';
import StolenDisplay from './Display/StolenDisplay';
import RecallDisplay from './Display/RecallDisplay';
import RatingDisplay from './Display/RatingDisplay';

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
            <View style={{alignItems: 'center', margin: 10}}>
                <RatingDisplay recalls={this.props.recalls}/>
                <Text> </Text>
                <TouchableOpacity onPress={() => this.setState({component: <AccidentEvents data={this.props.vhrReport.AccidentEvents}/>})}>
                    <AccidentDisplay vhrReport={this.props.vhrReport}/>
                </TouchableOpacity>
                <StolenDisplay vhrReport={this.props.vhrReport}/>
                <TouchableOpacity onPress={() => this.setState({component: <RecallEvents data={this.props.vhrReport.RecallEvents}/>})}>
                    <RecallDisplay vhrReport={this.props.vhrReport}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({component: <ServiceEvents data={this.props.vhrReport.ServiceEvents}/>})}>
                    <ServiceEvents vhrReport={this.props.vhrReport}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({component: <TermsServices/>})}>
                    <Text>Information on Reports</Text>
                </TouchableOpacity>
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
                <Icon
                    name={(this.state.component) ? 'chevron-left' : 'chevron-down'}
                    size={20}
                    style={{margin: 10}}
                    onPress={() => {
                        this.state.component ?
                        this.setState({component: null}) :
                        this.props.onClose()
                    }}
                />
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
