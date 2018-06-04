import { Constants, Camera, FileSystem, Permissions } from 'expo';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, Text, View, TouchableOpacity, Slider, Vibration, Dimensions, Image, Modal, Alert, ActivityIndicator} from 'react-native';
import Loader from './Loader';
import { ImagePicker } from 'expo';

export default class CameraScreen extends React.Component {
  state = {
    flash: 'off',
    permissionsGranted: null,
    ratio: '16:9',
    image: null,
    loading: false,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ permissionsGranted: status === 'granted' });
  }

  toggleFacing() {
    this.setState({
      type: this.state.type === 'back' ? 'front' : 'back',
    });
  }

  takePicture = async function() {
    this.setState({loading: true})
    if (this.camera) {
      this.camera.takePictureAsync({quality: 0.75}).then(data => {
        this.props.onImage(data.uri)
        Vibration.vibrate();
      });
    }
  };

  renderNoPermissions() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10 }}>
        <Text style={{ color: 'white' }}>
          Camera permissions not granted - cannot open camera preview.
        </Text>
      </View>
    );
  }

  _pickImage = async () => {
    this.setState({loading: true})
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
    });

    if (!result.cancelled) {
      this.props.onImage(result.uri)
      Vibration.vibrate();
    }
  };

  renderCamera() {
    return (
      <Modal
        animationType="fade"
        visible={true}
        onRequestClose={() => this.props.onBack()}>
          <Camera
            ref={ref => {
              this.camera = ref;
            }}
            style={{
              flex: 1,
            }}
            type={this.state.type}
            ratio={this.state.ratio}
            >
            <View
              style={{
                flex: 0.5,
                backgroundColor: 'transparent',
                flexDirection: 'row',
                justifyContent: 'space-around',
                paddingTop: Constants.statusBarHeight / 2,
              }}>
              <TouchableOpacity style={styles.flipButton} onPress={() => this.props.onBack()}>
                <Icon name='arrow-left' size={25} color='#fff'/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.flipButton} onPress={this.toggleFacing.bind(this)}>
                <Text style={styles.flipText}> FLIP </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.flipButton} onPress={() => this._pickImage()}>
                <Text style={styles.flipText}> GALLERY </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
              }}>
              <TouchableOpacity
                style={[styles.flipButton, styles.picButton, { position: 'absolute', left: Dimensions.get('window').width/2-50, bottom: 20 }]}
                onPress={this.takePicture.bind(this)}>
                <Text style={styles.flipText}> SNAP </Text>
              </TouchableOpacity>
            </View>
          </Camera>
      </Modal>
    );
  }
  
  render() {

    //display image
    if(this.state.image != null) {
      return(
        <View style={{flex: 1}}>
          <Image 
            style={{flex: 1, height: Dimensions.get('window').height, width: Dimensions.get('window').width}} 
            source={{uri: this.state.image.uri}}
          />
        </View>
      );
    }

    if(this.state.permissionsGranted == true) cameraScreenContent = this.renderCamera()
    else if(this.state.permissionsGranted == false) cameraScreenContent = this.renderNoPermissions()
    else cameraScreenContent = <Text>Loading</Text>    

    return <View style={styles.container}>{cameraScreenContent}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  gallery: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  flipButton: {
    width: 100,
    flex: 0.3,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 20,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipText: {
    color: 'white',
    fontSize: 15,
  },
  item: {
    margin: 4,
    backgroundColor: 'indianred',
    height: 35,
    width: 80,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  picButton: {
    backgroundColor: 'darkseagreen',
  },
  galleryButton: {
    backgroundColor: 'indianred',
  },
  row: {
    flexDirection: 'row',
  },
});