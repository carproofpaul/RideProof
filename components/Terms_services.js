import React from 'react';
import { StyleSheet, Text, View, Button, Image, Modal } from 'react-native';
import CameraScreen from './CameraScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { Token } from '../resources/Token';
import Loader from './Loader';

export default class App extends React.Component {

  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType="slide"
          visible={true}
          onRequestClose={() => {
            this.props.onClose()
        }}>
          <View style={{marginTop: 22, marginLeft:10, marginRight:10}}>
            <View>
              <Text style={{fontSize:22, fontWeight: 'bold', textAlign:'center'}}>Information on Reports</Text>
              <Text> </Text>
              <Text>This vehicle history report is compiled from multiple data sources. It is not always possible for CARPROOF or its source data providers to obtain complete information on any one vehicle. For example, there may be other title brands, registrations, declarations, accident information, service records, recall information, odometer readings or other information where discrepancies that apply to this vehicle are not reflected in this report. CARPROOF and its source data providers receive data and information from external sources believed to be reliable, but no responsibility is assumed by CARPROOF, its source data providers or its agents for any errors, inaccuracies or omissions. The reports are provided strictly on an as-is where-is basis, and CARPROOF and its source data providers further expressly disclaim all warranties, express or implied, including any warranties of timeliness, accuracy, merchantability, merchantable quality or fitness for a particular purpose regarding this report or its contents. Neither CARPROOF nor any of its source data providers shall be liable for any losses, expenses or damages in connection with any report or any information contained within a report, including the accuracy thereof or any delay or failure to provide a report or any information. By obtaining, reviewing and/or using this vehicle history report, you agree to be bound by all of the terms and conditions in CARPROOF’s Conditions of Use and any CARPROOF End User License Agreements as each may be amended from time to time by CARPROOF.</Text>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}