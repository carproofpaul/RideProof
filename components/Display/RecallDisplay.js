import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class RecallDisplay extends React.Component {
    
    render() {

        iconColour = this.props.vhrReport.RecallEvents === null ? 'green' : 'red'
        iconName = this.props.vhrReport.RecallEvents === null ? 'check' : 'warning'
        text = this.props.vhrReport.RecallEvents === null ? 'No Recalls Found' : 'Recall(s) Reported'

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
        margin: 10,
    },
    text: {
        color: 'black',
        fontSize: 18,
        margin: 10,
        flexWrap: 'wrap'
    },
});

