import React from 'react';
import { StyleSheet, Text, View, Button, Image, Alert, Vibration, Clipboard   } from 'react-native';
import CameraScreen from './CameraScreen';
//import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Icon } from 'react-native-elements';
import { Token } from '../resources/Token';
import Loader from './Loader';
import Display from './Display';
import Prompt from 'rn-prompt';
import { Camera, Permissions  } from 'expo';

import { getVinFromLicensePlateNumber, getVehicleHistoryReportFromVin, getRecallsFromVin } from '../ApiCalls';

export default class App extends React.Component {

    state = {
        isReady: false,

        licensePlateText: "BMPV554",
        prompt: false,
        image: null,
        loading: false,
        modalVisible: false,
        permissionsGranted: null,
        ratio: '4:3',
        flash: false,
    }

    
    async _CheckClipBoard() {
        var content = await Clipboard.getString();

        if(content.length > 2 && content.length < 9 && /^[a-z0-9]+$/.test(content)){
            Alert.alert(
                'License Plate Detected',
                'We have detected a possible license plate number in your clipboard. Do you want to use it?',
                [
                    {text: 'No', onPress: () => null},
                    {text: 'Yes', onPress: () => this.getVinFromLicensePlate(content)},
                ],
                { cancelable: true }
            )
        }
        
    }

    async componentWillMount() {
        this._CheckClipBoard()
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ permissionsGranted: status === 'granted', isReady: true });
    }

    getCamera(){
        if(this.state.permissionsGranted == true) cameraScreenContent = this.renderCamera()
        else if(this.state.permissionsGranted == false) cameraScreenContent = this.renderNoPermissions()
        else cameraScreenContent = <Text>Loading</Text>    
    
        return cameraScreenContent
    }

    renderCamera(){
        if(this.state.image !== null){
            return(
                <Image source={{uri: this.state.image}} style={{flex: 3}} />
            )
        }

        return(
            <Camera
                ref={ref => {
                    this.camera = ref;
                }}
                style={{
                    flex: 3,
                }}
                type='back'
                flashMode={this.state.flash ? 'on' : 'off'}
                ratio={this.state.ratio}
            />
        )
    }

    renderNoPermissions() {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10 }}>
            <Text style={{ color: 'white' }}>
              Camera permissions not granted - cannot open camera preview.
            </Text>
          </View>
        );
      }

    error(message){
        this.setState({loading: false})
        Alert.alert(
            'Error',
            message,
            [
                {text: 'Ok', onPress: () => this.setState({image: null})},
            ],
            { cancelable: false }
          )
    }

    /**
     * gets recalls from vin
     * @param {vin of car} vin 
     */
    getRecalls(vin){
        getRecallsFromVin(Token._webServiceToken, vin, (recalls) => {
            this.recalls = recalls
            this.setState({loading: false, modalVisible: true})
        }, (err) => this.error(err));
    }

    /**
     * gets vhr from car's vin
     * @param {vin of car} vin 
     */
    getVehicleHistoryReport(vin){
        getVehicleHistoryReportFromVin(Token._webServiceToken, vin, (vhr) => {
            this.vhr = vhr
            this.getRecalls(vin)
        }, (err) => this.error(err))
    }

    /**
     * Gets vin from license plate number
     * @param {license plate number} licensePlate 
     */
    getVinFromLicensePlate(licensePlate){
        this.setState({loading: true})

        getVinFromLicensePlateNumber(Token._webServiceToken, 
                                    licensePlate, 
                                    'on', 
                                    (vin) => this.getVehicleHistoryReport(vin), 
                                    (err) => this.error(err));
    }

    /**
     * Use Sighthound to get plate number
     * @param {image url from cloudinary} url 
     */
    getLicensePlateFromImage(url){
        console.log(url)
        var image = {image: url};
        var xmlhttp = new XMLHttpRequest();
        var result;
        
        xmlhttp.onreadystatechange = (function () {
          if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            result = JSON.parse(xmlhttp.responseText);

            if(result.objects.length == 0 || result.objects[0].vehicleAnnotation.recognitionConfidence === 0){
                this.setState({prompt: true, loading: false})
                return
            }
    
            try{ licensePlate = result.objects[0].vehicleAnnotation.licenseplate.attributes.system.string.name } 
            catch(error) { licensePlate = 'Not Found' }
    
            console.log("License plate: " + licensePlate)
            
            if(licensePlate !== 'Not Found'){
                this.getVinFromLicensePlate(licensePlate)
            } else {
                this.setState({prompt: true, loading: false})
            }
          }
        }).bind(this)
        
        xmlhttp.open("POST", "https://dev.sighthoundapi.com/v1/recognition?objectType=vehicle,licenseplate");
        xmlhttp.setRequestHeader("Content-type", "application/json");
        xmlhttp.setRequestHeader("X-Access-Token", "zGYv5QFWLWQuGuXW54FsP6pzIyq9oCtQyqpa");
        xmlhttp.send(JSON.stringify(image));
    }

    /**
     * Uploads the image to cloudinary, and send link to sighthound
     * @param {URI of image} uri 
     */
    uploadImage(uri){
        this.setState({loading: true})

        var fd = new FormData();
        var xmlhttp = new XMLHttpRequest();
        var result;
        
        xmlhttp.onreadystatechange = (function () {
          if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            result = JSON.parse(xmlhttp.responseText);
            this.getLicensePlateFromImage(result.url)
          } else if(xmlhttp.readyState === 4 && xmlhttp.status !== 200){
            console.log("ERROR: " + xmlhttp)
            this.setState({loading: false})
          }
        }).bind(this)
        
        xmlhttp.open("POST", "https://api.cloudinary.com/v1_1/dlic95ed5/image/upload", true);
        xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xmlhttp.setRequestHeader("Content-type", "multipart/form-data");
        xmlhttp.setRequestHeader("X-Access-Token", "zGYv5QFWLWQuGuXW54FsP6pzIyq9oCtQyqpa");
    
        fd.append('upload_preset', 'tqcsiwue');
        fd.append('file', {
          uri: uri,
          type: 'image/jpeg',
          name: 'file',
        });
        xmlhttp.send(fd);
    }

    takePicture = async function() {
        if (this.camera) {
            this.camera.takePictureAsync({quality: 0.75}).then(data => {
                Vibration.vibrate()
                this.setState({loading: true, image: data.uri})        
                this.uploadImage(data.uri)
            });
        }
    };

    render() {

        //show loader until camera is ready
        if (!this.state.isReady) {
            return (
                <View>
                    <Loader loading={!this.state.isReady}/>
                </View>
            );
        }


        if(this.state.modalVisible==true) {
            return(
                <Display vhrReport={this.vhr} recalls={this.recalls} onClose={()=>this.setState({modalVisible:false, image:null})} />
            )
        }

        return(
            <View style={{flex: 1, backgroundColor: 'white'}}>

                <Prompt
                    title="License Plate"
                    defaultValue={this.state.licensePlateText}
                    visible={this.state.prompt}
                    placeholder="License Plate"
                    onChangeText={(text) => {
                        this.setState({licensePlateText: text})
                    }}
                    onCancel={() => {
                        this.setState({prompt: false, licensePlateText: '', image: null})
                    }}
                    onSubmit={() => {
                        this.getVinFromLicensePlate(this.state.licensePlateText)
                        this.setState({prompt: false, licensePlateText: '', image: 'white'})
                    }}
                />

                <Loader loading={this.state.loading}/>
                {this.getCamera()}
                <View style={styles.container}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                        <Icon
                            reverse
                            containerStyle={{margin: 25}}
                            size={30}
                            name={this.state.flash ? 'flash-on' : 'flash-off'}
                            onPress={() => {
                                this.state.flash ? this.setState({flash: false}) : this.setState({flash: true})
                            }} 
                        />
                        <Icon
                            reverse
                            containerStyle={{margin: 25}}
                            size={30}
                            name='camera-alt'
                            onPress={this.takePicture.bind(this)} 
                        />
                        <Icon
                            reverse
                            containerStyle={{margin: 25}}
                            size={30}
                            name='info-outline' 
                            onPress={() => this.setState({prompt: true})}
                        />
                    </View>
                </View>
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
      margin: 20
  }
});
