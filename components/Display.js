import React from 'react';
import { StyleSheet, Text, View, Button, Image, Modal, TouchableOpacity, Dimensions } from 'react-native';
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
import ServiceDisplay from './Display/ServiceDisplay';

export default class Display extends React.Component {

//TOKEN: 5bd73da3-1a7a-4dc4-9680-afc7b9faaae0

    state = {
        component: null,
        modalVisible: false,
    }
    
    getWindow() {
        return Dimensions.get('window')
    }
    

    getContent(){
        
        return(
            <View style={{marginLeft: 10, marginRight: 10}}>
                <RatingDisplay vhrReport={this.props.vhrReport} recalls={this.props.recalls}/>

                {/* <View style={{left: 10, right: 10}}> */}
                <TouchableOpacity onPress={() => this.setState({component: <AccidentEvents data={this.props.vhrReport.AccidentEvents}/>})}>
                    <AccidentDisplay vhrReport={this.props.vhrReport}/>
                </TouchableOpacity>
                <StolenDisplay vhrReport={this.props.vhrReport}/>
                <TouchableOpacity onPress={() => this.setState({component: <RecallEvents data={this.props.vhrReport.RecallEvents}/>})}>
                    <RecallDisplay vhrReport={this.props.vhrReport}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({component: <ServiceEvents data={this.props.vhrReport.ServiceEvents}/>})}>
                    <ServiceDisplay vhrReport={this.props.vhrReport}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({component: <TermsServices/>})}>
                    <Text>Information on Reports</Text>
                </TouchableOpacity>
                {/* </View> */}

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

