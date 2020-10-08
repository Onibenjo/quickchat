import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import {NetworkConsumer} from 'react-native-offline';
const {width} = Dimensions.get('window');

function OfflineNotice(params) {
  return (
    <>
      <NetworkConsumer>
        {({isConnected}) =>
          isConnected ? null : (
            <View style={[styles.offlineContainer, styles.bg]}>
              <Text style={styles.offlineText}>No Internet Connection</Text>
            </View>
          )
        }
      </NetworkConsumer>
    </>
  );
}

const styles = StyleSheet.create({
  offlineContainer: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    position: 'absolute',
    zIndex: 2,
  },
  offlineText: {color: '#fff'},
  bg: {backgroundColor: '#b52424'},
});

export default OfflineNotice;
