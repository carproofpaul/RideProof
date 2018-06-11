import React from 'react';
import {View, Modal, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TermsServices from './TermsServices';

import AccidentEvents from './VehicleHistoryReport/AccidentEvents';
import RecallEvents from './VehicleHistoryReport/RecallEvents';
import ServiceEvents from './VehicleHistoryReport/ServiceEvents';
import StolenEvents from './VehicleHistoryReport/StolenEvents';

import AccidentDisplay from './Display/AccidentDisplay';
import StolenDisplay from './Display/StolenDisplay';
import RecallDisplay from './Display/RecallDisplay';
import RatingDisplay from './Display/RatingDisplay';
import ServiceDisplay from './Display/ServiceDisplay';
import RegistrationDisplay from './Display/RegistrationDisplay';

export default class Display extends React.Component {

    state = {
        component: null,
        modalVisible: false,
    }



    getContent(){

        return(
            <ScrollView style={{margin: 10}}>

                <RatingDisplay vhrReport={this.props.vhrReport} recalls={this.props.recalls}/>

                <TouchableOpacity onPress={() => this.setState({component: <AccidentEvents data={this.props.vhrReport.AccidentEvents}/>})}>
                    <AccidentDisplay accidentEvents={this.props.vhrReport.AccidentEvents}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.setState({component: <StolenEvents data={this.props.vhrReport.StolenEvents}/>})}>
                    <StolenDisplay stolenEvents={this.props.vhrReport.StolenEvents}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.setState({component: <RecallEvents data={this.props.vhrReport.RecallEvents}/>})}>
                    <RecallDisplay recall={this.props.vhrReport.RecallEvents}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.setState({component: <ServiceEvents data={this.props.vhrReport.ServiceEvents}/>})}>
                    <ServiceDisplay serviceEvents={this.props.vhrReport.ServiceEvents}/>
                </TouchableOpacity>

                <RegistrationDisplay registration={this.props.vhrReport.TitleOrRegistrationEvents}/>

            </ScrollView>
        )
    }

    render() {
        return(
            <Modal
                animationType="slide"
                visible={true}
                backgroundColor='white'
                onRequestClose={() => {
                    this.state.component ?
                    this.setState({component: null}) :
                    this.props.onClose()
                }}
            >
                    <View style={{marginTop: 22, marginHorizontal: 10}}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Icon
                                name={(this.state.component) ? 'chevron-left' : 'chevron-down'}
                                size={30}
                                style={{marginLeft: 10}}
                                onPress={() => {
                                    this.state.component ?
                                    this.setState({component: null}) :
                                    this.props.onClose()
                                }}
                            />
                            <Icon
                                name='info'
                                size={30}
                                color={(this.state.component) ? 'white' : 'black'}
                                style={{marginRight: 20}}
                                onPress={() => this.setState({component: <TermsServices/>})}
                            />
                        </View>
                        {
                            this.state.component ||
                            this.getContent()
                        }
                    </View>
            </Modal>
        )
    }
}

