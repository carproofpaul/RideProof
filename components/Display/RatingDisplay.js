import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import moment from 'moment';
import { AnimatedGaugeProgress } from 'react-native-simple-gauge';



export default class RatingDisplay extends React.Component {
    
    render() {

        scale = 0

        /**
         * REGISTRATION
         * 0.5 points for being registered
         * + 0.5 point for being commercial use
         * - 4 for not being registered
         */
        if(this.props.vhrReport.TitleOrRegistrationEvents !== null){
            isRegistered = false
            isCommercial = false
            now = moment()
            
            for(i = 0; i < this.props.vhrReport.TitleOrRegistrationEvents.length; i++){
                then = moment(this.props.vhrReport.TitleOrRegistrationEvents[i].Date.split('T')[0])
                if( now.diff(then, 'years', true) <= 2 ){
                    isRegistered = true
                    isCommercial = this.props.vhrReport.TitleOrRegistrationEvents[i].UseType == 'Commercial_Use'
                }
            }

            if(isCommercial == true) {scale = scale + 0.5}
            if(isRegistered == true) {scale = scale + 0.5}
            else {scale = scale - 4}
        }
        console.log(scale);

        /**
         * ACCIDENTS
         * 4 points for 0 accidents within 1 year
         * 1.5 points for 1 accidnet witnin 1 year
         * 0 points for more than 1 accident witin 1 year
         */
        if(this.props.vhrReport.AccidentEvents !== null){
            numberOfAccidents = 0
            for(i = 0; i < this.props.vhrReport.AccidentEvents.length; i++){
                now = moment()
                then = moment(this.props.vhrReport.AccidentEvents[i].Date.split('T')[0])
                if( now.diff(then, 'years', true) <= 1 ){
                    numberOfAccidents++
                }
            }

            if(numberOfAccidents == 0) scale = scale + 3
            else if(numberOfAccidents == 1) scale = scale + 1.5
            //numberOfAccidents > 1, bad 
        } else {scale = scale + 4}
        console.log(scale);

        /**
         * RECALLS
         * 1 points for 0 outstanding or unkown (status) recalls
         * null == no recalls
         */
        if(this.props.vhrReport.RecallEvents !== null){
            numberOfRecalls = 0
            for(i = 0; i < this.props.vhrReport.RecallEvents.length; i++){
                if( this.props.vhrReport.RecallEvents[i].Status === 'Outstanding' || this.props.vhrReport.RecallEvents[i].Status === 'Unknown'){
                    numberOfRecalls++
                }
            }
            if(numberOfRecalls == 0) scale = scale + 1
            //more than one gets no points
        } else {scale = scale + 1}
        console.log(scale);

        /**
         * SERVICE
         * 4 points for 3 or more service events in the pass year
         * 3 points for 2 service events in the pass year
         * 2 points for 1 service events in the pass year
         * 3 points if service records is null / not reported
         */
        if(this.props.vhrReport.ServiceEvents !== null){
            numberOfService = 0
            now = moment()
            for(i = 0; i < this.props.vhrReport.ServiceEvents.length; i++){
                then = moment(this.props.vhrReport.ServiceEvents[i].Date.split('T')[0])
                if( now.diff(then, 'years', true) <= 1 ){
                    numberOfService++
                }
            }
            if(numberOfService >= 3) scale = scale + 4
            else if(numberOfService == 2) scale = scale + 3
            else if(numberOfService == 1) scale = scale + 2
        } else {scale = scale + 3}
        console.log(scale);

        circleColor = ''
        if(scale < 6){
            circleColor = 'red'
        } else if(scale <= 8){
            circleColor = 'orange'
        } else {
            circleColor = 'green'
        }

        percent = scale/10*100

        return (
            <View style={{alignItems: 'center'}}>
                <AnimatedGaugeProgress
                    size={200}
                    width={20}
                    fill={percent}
                    rotation={90}
                    cropDegree={180}
                    tintColor={circleColor}
                    backgroundColor="#999999"
                    stroke={[2, 2]} //For a equaly dashed line
                    strokeCap="circle"
                    style={{marginBottom:-60}}>
                    <View style={styles.textView}>
                        <Text style={styles.text}>{percent.toFixed(0)}%</Text>
                        <Text style={{fontSize: 15, fontStyle: 'italic'}}>Safety Score</Text>
                    </View>
                </AnimatedGaugeProgress>
                <Text style={{fontSize: 25, fontWeight: 'bold', paddingBottom:10}}>{this.props.recalls.ModelYear + " " + this.props.recalls.Make + " " + this.props.recalls.Model}</Text>              
            </View>
        )
    }
}

const size = 200;
const width = 20;
const cropDegree = 90;
const textOffset = width;
const textWidth = size - (textOffset*2);
const textHeight = size*(1 - cropDegree/360) - (textOffset*2);

const styles = StyleSheet.create({
    textView: {
        position: 'absolute',
        top: textOffset,
        left: textOffset,
        width: textWidth,
        height: textHeight,
        alignItems: 'center',
        justifyContent: 'center',
      },
      text: {
        fontSize: 50,
        fontWeight: 'bold'
      },
});
