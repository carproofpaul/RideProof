import React from 'react';
import { StyleSheet, Text, View, Button, Image, Alert, Vibration, Modal, KeyboardAvoidingView  } from 'react-native';
import CameraScreen from './CameraScreen';
//import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Icon } from 'react-native-elements';
import { Token } from '../resources/Token';
import Loader from './Loader';
import Display from './Display';
import Prompt from 'rn-prompt';
import { Constants, Camera, FileSystem, Permissions } from 'expo';

export default class App extends React.Component {

    state = {
        licensePlateText: "",
        prompt: false,
        image: null,
        loading: false,
        modalVisible: false,
        permissionsGranted: null,
        ratio: '4:3',
        flash: false,
    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ permissionsGranted: status === 'granted' });
      }

    getCamera(){
        /*
        return (
            <CameraScreen onBack={() => this.setState({camera: false})} onImage={(image) => {
                this.uploadImage(image)
                this.setState({image: image, camera: false})
            }} />
        )
        */
    
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
        Alert.alert(
            'Error',
            message,
            [
                {text: 'Ok', onPress: () => this.setState({loading: false, image: null})},
            ],
            { cancelable: false }
          )
    }

    /**
     * gets recalls from vin
     * @param {vin of car} vin 
     */
    getRecalls(vin){
        var xmlhttp = new XMLHttpRequest();
        var result;
    
        xmlhttp.onreadystatechange = (function () {
          if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            //DATA
            this.recalls = JSON.parse(xmlhttp.responseText)

            console.log("RECALLS: \n" + JSON.stringify(this.recalls))

            this.setState({loading: false, modalVisible: true}) //STOP LOADER, LAST ONE
    
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

    /**
     * gets vhr from car's vin
     * @param {vin of car} vin 
     */
    getVehicleHistoryReport(vin){
        var xmlhttp = new XMLHttpRequest();
        var result;
    
        xmlhttp.onreadystatechange = (function () {
          if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            //DATA
            this.vhr = JSON.parse(xmlhttp.responseText)

            console.log("VHR: \n" + JSON.stringify(this.vhr))

            this.getRecalls(vin)
    
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

    /**
     * Gets vin from license plate number
     * @param {license plate number} licensePlate 
     */
    getVinFromLicensePlate(licensePlate){
        if(licensePlate === '') return

        this.setState({loading: true})

        var xmlhttp = new XMLHttpRequest();
        var result;
    
        xmlhttp.onreadystatechange = (function () {
          if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            //DATA
            json = JSON.parse(xmlhttp.responseText)
    
            //NO VIN
            if(json.QuickVINPlus.VINInfo.VIN.length == 0){
                this.error('No VIN was found.')
                this.setState({loading: false})
                return
            } 

            vin = json.QuickVINPlus.VINInfo.VIN[0] //VIN
            console.log("VIN: " + vin)

            //GETTING OTHER DATA
            this.getVehicleHistoryReport(vin)
            
    
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
            Vibration.vibrate();        
            this.camera.takePictureAsync({quality: 0.75}).then(data => {
                this.setState({loading: true, image: data.uri})        
                this.uploadImage(data.uri)
            });
        }
    };

    render() {

        if(this.state.modalVisible==true) {
            return(
                <Display vhrReport={this.vhr} recalls={this.recalls} onClose={()=>this.setState({modalVisible:false})} />
            )
        }
        
        /*
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
            */


        return(
            <View style={{flex: 1}}>

                <Prompt
                    title="License Plate"
                    visible={this.state.prompt}
                    placeholder="License Plate"
                    onChangeText={(text) => {
                        this.setState({licensePlateText: text})
                    }}
                    onCancel={() => {
                        this.setState({prompt: false, licensePlateText: ''})
                    }}
                    onSubmit={() => {
                        this.getVinFromLicensePlate(this.state.licensePlateText)
                        this.setState({prompt: false, licensePlateText: ''})
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
