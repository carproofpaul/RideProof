import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
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

    getCamera(){
        return (
            <CameraScreen onBack={() => this.setState({camera: false})} onImage={(image) => this.setState({image: image, camera: false})} />
        )
    }

    getRecalls(vin){
        var xmlhttp = new XMLHttpRequest();
        var result;
    
        xmlhttp.onreadystatechange = (function () {
          if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            //DATA
            recalls = JSON.parse(xmlhttp.responseText)

            console.log("RECALLS: \n" + JSON.stringify(recalls))

            this.setState({loading: false}) //STOP LOADER, LAST ONE
    
          } else if(xmlhttp.readyState === 4 && xmlhttp.status !== 200){
            //ERROR
            console.log("ERROR: " + xmlhttp)
            this.setState({loading: false})
          }
        }).bind(this)
        
        xmlhttp.open("GET", "https://carfaxapi.carproof.com/Recall/Get?vin="+vin, true);
        xmlhttp.setRequestHeader("User-Agent", "request");
        xmlhttp.setRequestHeader("webServiceToken", Token._webServiceToken);
    
        xmlhttp.send();
    }

    getVehicleHistoryReport(vin){
        var xmlhttp = new XMLHttpRequest();
        var result;
    
        xmlhttp.onreadystatechange = (function () {
          if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            //DATA
            vhr = JSON.parse(xmlhttp.responseText)

            console.log("VHR: \n" + JSON.stringify(vhr))
    
          } else if(xmlhttp.readyState === 4 && xmlhttp.status !== 200){
            //ERROR
            console.log("ERROR: " + xmlhttp)
            this.setState({loading: false})
          }
        }).bind(this)
        
        xmlhttp.open("GET", "https://carfaxapi.carproof.com/Vhr/Get?vin="+vin, true);
        xmlhttp.setRequestHeader("User-Agent", "request");
        xmlhttp.setRequestHeader("webServiceToken", Token._webServiceToken);
    
        xmlhttp.send();
    }

    getVinFromLicensePlate(licensePlate){
        this.setState({loading: true})

        var xmlhttp = new XMLHttpRequest();
        var result;
    
        xmlhttp.onreadystatechange = (function () {
          if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            //DATA
            json = JSON.parse(xmlhttp.responseText)
    
            //NO VIN
            if(json.QuickVINPlus.VINInfo.VIN.length == 0){
                console.log("NO VIN")
                return
            } 

            vin = json.QuickVINPlus.VINInfo.VIN[0] //VIN
            console.log("VIN: " + vin)

            //GETTING OTHER DATA
            this.getVehicleHistoryReport(vin)
            this.getRecalls(vin)
    
          } else if(xmlhttp.readyState === 4 && xmlhttp.status !== 200){
            //ERROR
            console.log("ERROR: " + xmlhttp)
            this.setState({loading: false})
          }
        }).bind(this)
        
        xmlhttp.open("GET", "http://carfaxapi.carproof.com/api/QuickVIN?licensePlate="+licensePlate+"&province=on", true);
        xmlhttp.setRequestHeader("User-Agent", "request");
        xmlhttp.setRequestHeader("webServiceToken", Token._webServiceToken);
    
        xmlhttp.send();
    }

    render() {
        this.state.camera == true 
        ?   content = this.getCamera()
        :   content =
                <View style={styles.container}>
                    <Loader loading={this.state.loading}/>
                    <Image source={{uri: this.state.image}} style={{width: 90, height: 160}} />
                    <Input
                        containerStyle={styles.component} 
                        placeholder='License Plate'
                        rightIcon=  {{ 
                                        type: 'font-awesome', 
                                        name: 'search',
                                        onPress: () => this.getVinFromLicensePlate(this.state.licensePlateText)
                                    }}
                        onChangeText={(text) => this.setState({licensePlateText: text})}
                        onSubmitEditing={() => this.getVinFromLicensePlate(this.state.licensePlateText)}
                    />
                    <Button 
                        style={styles.component} 
                        title='Use Camera to Capture License Plate' 
                        onPress={() => this.setState({camera: true})} 
                    />
                </View>

        return(
            <View style={{flex: 1}}>
                {content}
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
