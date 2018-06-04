import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import CameraScreen from './CameraScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';

export default class App extends React.Component {

    state = {
        camera: false,
        licensePlateText: "",
        image: null
    }

    getCamera(){
        return (
            <CameraScreen onBack={() => this.setState({camera: false})} onImage={(image) => this.setState({image: image, camera: false})} />
        )
    }

    getVinFromLicensePlate(licensePlate){
        console.log(licensePlate)
    }

    render() {
        console.log(this.state.image)
        this.state.camera == true 
        ?   content = this.getCamera()
        :   content =
                <View style={styles.container}>
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
