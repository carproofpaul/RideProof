import React from 'react';
import { StyleSheet, Text, View, Alert, ScrollView } from 'react-native';
import { ListItem, Divider } from 'react-native-elements';


export default class RecallEvents extends React.Component {

    displayDetail(message){
        Alert.alert(
            'More Information',
            message,
            [
                {text: 'Ok', onPress: null},
            ],
            { cancelable: false }
          )
    }
    
    render() {
        //null check
        if(this.props.data == null){
            return(
                <View>
                    <Text style={{fontStyle: 'italic', margin: 10, textAlign: 'center'}}>No Recall Events Available</Text>
                </View>
            )
        }


        return (
        <ScrollView style={{margin: 10}}>
            <Text style={{fontWeight: 'bold', fontSize: 25}}>Recall Events</Text>
            <Divider style={{marginVertical: 10}}/>
            {
                this.props.data.slice(0).reverse().map((value, i) => (
                <ListItem
                    key={i}
                    title={'Campaign Number: ' + value.CampaignNumber}
                    subtitle={value.Date.split('T')[0]}
                    rightTitle={(() => {
                        if(value.Location.City !== null) return value.Location.City;
                        if(value.Location.StateProv !== null) return value.Location.StateProv;
                        else return 'No Location'
                    })()}
                    chevron
                    onPress={() => this.displayDetail(  'Description: ' + (value.Description || 'not available') + '\n\n' +
                                                        'Detail: ' + (value.Detail || 'not available') + '\n\n' +
                                                        'Safety Risk: ' + (value.SafetyRisk || 'not available')  + '\n\n' +
                                                        'Status: ' + (value.Status || 'not available')
                                                    )}
                />
                ))
            }
        </ScrollView>
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
