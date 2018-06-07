import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class AccidentDisplay extends React.Component {
    
    render() {
        iconColour = this.props.vhrReport.AccidentEvents === null ? 'green' : 'red'
        iconName = this.props.vhrReport.AccidentEvents === null ? 'check' : 'warning'
        text = this.props.vhrReport.AccidentEvents === null 
            ? 'No Accidents Reported' 
            : this.props.vhrReport.AccidentEvents.length + ' Accident(s) Reported'  

        return (
            <View style={styles.rows} >
                <Icon raised name={iconName} color={iconColour} size={40} />
                <Text style={styles.text}>{text}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    rows: {
        flexDirection: 'row', 
        margin: 10
    },
    text: {
        color: 'black',
        fontSize: 18,
        margin: 10,
    },
});
