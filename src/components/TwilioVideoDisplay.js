import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  PermissionsAndroid,
  TouchableHighlight,
  Alert,
} from 'react-native';
import {
  TwilioVideoLocalView,
  TwilioVideoParticipantView,
  TwilioVideo,
} from 'react-native-twilio-video-webrtc';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import InputWithLabel from './Input/TextInputWithLabel';
import OfflineNotice from './OfflineNotice';
import {getVideoToken} from 'service/api';

export async function getAllPermissions() {
  try {
    const userResponse = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ]);
    return userResponse;
  } catch (err) {
    console.log(err);
  }
  return null;
}

const TwilioVideoDisplay = () => {
  const [state, setState] = useState({
    isAudioEnabled: true,
    isVideoEnabled: true,
    isButtonDisplay: true,
    status: 'disconnected',
    participants: new Map(),
    videoTracks: new Map(),
    roomName: '',
    identity: '',
    token: '',
  });

  const twilioVideoRef = useRef(null);

  useEffect(() => {
    getAllPermissions();
  }, []);

  const updateState = (newState) => {
    setState({...state, ...newState});
  };

  const onConnectButtonPress = async () => {
    try {
      const accessToken = await getVideoToken({
        identity: state.identity,
        room: state.roomName,
      });
      console.log({accessToken});
      twilioVideoRef.current.connect({
        roomName: state.roomName,
        accessToken,
      });
      updateState({status: 'connecting'});
    } catch (e) {
      console.log({e});
      Alert.alert('Error', e.message);
    }
  };

  const onEndButtonPress = () => {
    twilioVideoRef.current.disconnect();
  };

  const onMuteButtonPress = () => {
    twilioVideoRef.current
      .setLocalAudioEnabled(!state.isAudioEnabled)
      .then((isEnabled) => updateState({isAudioEnabled: isEnabled}));
  };

  const onFlipButtonPress = () => {
    twilioVideoRef.current.flipCamera();
  };

  const onRoomDidConnect = () => {
    updateState({status: 'connected'});
    console.log('onRoomDidConnect: ');
  };

  const onRoomDidDisconnect = ({roomName, error}) => {
    console.log('ERROR: ', error);
    updateState({status: 'disconnected'});
  };

  const onRoomDidFailToConnect = (error) => {
    console.log('ERROR: ', error);
    updateState({status: 'disconnected'});
  };

  const onParticipantAddedVideoTrack = ({participant, track}) => {
    updateState({
      videoTracks: new Map([
        ...state.videoTracks,
        [
          track.trackSid,
          {participantSid: participant.sid, videoTrackSid: track.trackSid},
        ],
      ]),
    });
  };

  const onParticipantRemovedVideoTrack = ({participant, track}) => {
    console.log('onParticipantRemovedVideoTrack: ', participant, track);
    // const videoTracks = new Map(state.videoTracks);
    const videoTracks = state.videoTracks;
    videoTracks.delete(track.trackSid);
    updateState({videoTracks: {...videoTracks}});
  };

  console.log({...{status: state.status}});

  return (
    <View style={styles.container}>
      <OfflineNotice />
      {state.status === 'disconnected' && (
        <View>
          <InputWithLabel
            label="Room Name"
            placeholder="Room Name"
            defaultValue={state.roomName}
            onChangeText={(text) => updateState({roomName: text})}
          />
          <InputWithLabel
            label="Name"
            placeholder="Name"
            defaultValue={state.identity}
            onChangeText={(text) => updateState({identity: text})}
          />
          <TwilioVideoLocalView
            enabled={true}
            style={{width: wp(100), height: hp(35)}}
          />
          <TouchableOpacity
            style={[
              styles.buttonStyle(state.isButtonDisplay),
              {marginLeft: wp(60)},
            ]}
            onPress={onFlipButtonPress}>
            <MCIcon name="rotate-3d" size={28} color="#fff" />
          </TouchableOpacity>
          <TouchableHighlight
            style={[styles.buttonContainer, styles.loginButton]}
            onPress={onConnectButtonPress}>
            <Text style={styles.Buttontext}>Connect</Text>
          </TouchableHighlight>
        </View>
      )}
      {(state.status === 'connected' || state.status === 'connecting') && (
        <View style={styles.callContainer}>
          {state.status === 'connected' && (
            <View style={styles.remoteGrid}>
              <TouchableOpacity
                style={styles.remoteVideo}
                onPress={() => {
                  updateState({
                    isButtonDisplay: !state.isButtonDisplay,
                  });
                }}>
                {Array.from(
                  state.videoTracks,
                  ([trackSid, trackIdentifier]) => {
                    return (
                      <TwilioVideoParticipantView
                        style={styles.remoteVideo}
                        key={trackSid}
                        trackIdentifier={trackIdentifier}
                      />
                    );
                  },
                )}
              </TouchableOpacity>
              <TwilioVideoLocalView
                enabled={true}
                style={[styles.localVideo(state.isButtonDisplay)]}
              />
            </View>
          )}
          <View
            style={[styles.callScreenButtonContainer(state.isButtonDisplay)]}>
            <TouchableOpacity
              style={[styles.buttonStyle(state.isButtonDisplay)]}
              onPress={onMuteButtonPress}>
              <MIcon
                name={state.isAudioEnabled ? 'mic' : 'mic-off'}
                size={24}
                color="#fff"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonStyle(state.isButtonDisplay)]}
              onPress={onEndButtonPress}>
              <MIcon name="call-end" size={28} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonStyle(state.isButtonDisplay)]}
              onPress={onFlipButtonPress}>
              <MCIcon name="rotate-3d" size={28} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      )}
      <TwilioVideo
        ref={twilioVideoRef}
        onRoomDidConnect={onRoomDidConnect}
        onRoomDidDisconnect={onRoomDidDisconnect}
        onRoomDidFailToConnect={onRoomDidFailToConnect}
        onParticipantAddedVideoTrack={onParticipantAddedVideoTrack}
        onParticipantRemovedVideoTrack={onParticipantRemovedVideoTrack}
      />
    </View>
  );
};

export default TwilioVideoDisplay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  buttonStyle: (isButtonDisplay) => ({
    width: 60,
    height: 60,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 100 / 2,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    display: isButtonDisplay ? 'flex' : 'none',
  }),
  callContainer: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    minHeight: '100%',
  },
  headerStyle: {
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 40,
  },
  localVideo: (isButtonDisplay) => ({
    width: '35%',
    left: '64%',
    height: '25%',
    zIndex: 2,
    bottom: isButtonDisplay ? '40%' : '30%',
  }),
  remoteGrid: {
    flex: 1,
    flexDirection: 'column',
  },
  remoteVideo: {
    width: wp('100%'),
    height: hp('100%'),
    zIndex: 1,
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: wp('90%'),
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: '#1E3378',
    width: wp('90%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 10,
  },
  Buttontext: {
    color: 'white',
    fontWeight: '500',
    fontSize: 18,
  },
  callScreenButtonContainer: (isButtonDisplay) => ({
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    display: isButtonDisplay ? 'flex' : 'none',
    zIndex: isButtonDisplay ? 2 : 0,
  }),
});
