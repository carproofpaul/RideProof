import React from 'react';
import { StyleSheet, Text, View, Button, Image, Modal } from 'react-native';
import CameraScreen from './CameraScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { Token } from '../resources/Token';
import Loader from './Loader';

export default class App extends React.Component {

    state = {
        camera: false,
        licensePlateText: "",
        image: null,
        loading: false
    }
//TOKEN: 5bd73da3-1a7a-4dc4-9680-afc7b9faaae0
    

    render() {
        console.log("let's try this again");
        console.log(this.props.vhrReport.ServiceEvents.length)
        console.log(this.props.vhrReport.ServiceEvents[this.props.vhrReport.ServiceEvents.length-1].Date)
        // console.log(JSON.stringify(this.props.vhrReport));
        
        //Find last service date
        var lastServ = new Date(this.props.vhrReport.ServiceEvents[this.props.vhrReport.ServiceEvents.length-1].Date);
        lastServ = lastServ.toString();

        return(
            <Modal
            animationType="slide"
            visible={true}
            onRequestClose={() => {
                this.props.onClose()
            }}>
            <View style={{marginTop: 22, marginLeft:10}}>
              <View>
              <Text>{this.props.recalls.Vin}</Text>
              <Text>{this.props.recalls.ModelYear + " " + this.props.recalls.Make + " " + this.props.recalls.Model}</Text>
              <Text> </Text>
                {this.props.vhrReport.AccidentEvents===null ? null : <Text>{this.props.vhrReport.AccidentEvents.length} accident(s) reported</Text>}
                {this.props.vhrReport.StolenEvents===null ? null : <Text>Vehicle reported stolen</Text>}
                {this.props.vhrReport.ServiceEvents===null ? null : <Text>Last serviced {lastServ.split(' ').slice(1,4).join(' ')}</Text>}
                {this.props.recalls.Recalls===null ? null : <Text>Recalls reported</Text>}
              </View>
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
      margin: 30
  }
});
