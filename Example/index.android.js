/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Animated,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import Animation from 'lottie-react-native'
import FingerPrintIdentify from 'react-native-fingerprint-identify'

export default class Example extends Component {

  state = {
    progress: new Animated.Value(0),
    isSensorAvailable: false,
    identifyStatus: null,
    error: ''
  }

  componentWillMount() {
    this.scanFingerPrint()
  }

  componentDidMount() {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 3000,
    }).start();
    this.emoji.play();
  }

  runAnimation = () => {
    this.state.progress.setValue(0)
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 3000,
    }).start();
  }

  scanFingerPrint = async () => {
    try {
      const initFingerPrintIdentify = await FingerPrintIdentify.initFingerPrintIdentify()
      const isSensorAvailable = await FingerPrintIdentify.isSensorAvailable()
      this.setState({isSensorAvailable})
      if (initFingerPrintIdentify && isSensorAvailable) {
        await FingerPrintIdentify.startIdentify((identifyStatus) => {
          this.setState({identifyStatus})
          if(identifyStatus && identifyStatus.status === 'ok') {
            this.runAnimation()
          }
        })
      }
    } catch (error) {
      this.setState({error})
    }
  }

  render() {
    const { isSensorAvailable, identifyStatus, error } = this.state
    const success = ((identifyStatus != null)
                    && (identifyStatus.status === 'ok')) ? true : false

    console.log('error', error)

    return (
      <View style={styles.container}>
        <Animation
           ref={animation => { this.emoji = animation; }}
           loop
           style={{
             width: 200,
             height: 100,
           }}
           source={require('./App/Json/emoji_tongue.json')}
        />
        <Text style={styles.welcome}>
          Touch sensor to verify identity
        </Text>
        <Animation
           ref={animation => { this.animation = animation; }}
           progress={this.state.progress}
           style={{
             width: 200,
             height: 100,
           }}
           source={require('./App/Json/android_fingerprint.json')}
        />
       {success &&
         <Text style={styles.success}>Authenticated successfully!</Text>
       }
       {!success &&
         <View>
           <Text style={styles.text}>
             Sensor Available: {isSensorAvailable.toString()}
           </Text>
           {identifyStatus != null &&
             <View style={styles.status}>
               <Text style={styles.text}>
                Scan Status: {identifyStatus.status}
               </Text>
               <Text style={styles.text}>
                 Error code: {identifyStatus.message}
               </Text>
             </View>
           }
         </View>
       }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  status: {
    width: 300,
    height: 60
  },
  success: {
    fontSize: 18,
    color: '#28da6a'
  },
  welcome: {
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Example', () => Example);
