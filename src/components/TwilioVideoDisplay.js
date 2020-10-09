import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  PermissionsAndroid,
  TouchableHighlight,
  TextInput,
  Button,
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
    token: '',
  });

  const twilioVideoRef = useRef();

  useEffect(() => {
    getAllPermissions();
  }, []);

  const updateState = (newState) => {
    setState({...state, ...newState});
  };

  const onConnectButtonPress = () => {
    twilioVideoRef.connect({
      roomName: state.roomName,
      accessToken: state.token,
    });
    updateState({status: 'connecting'});
  };

  const onEndButtonPress = () => {
    twilioVideoRef.disconnect();
  };

  const onMuteButtonPress = () => {
    twilioVideoRef
      .setLocalAudioEnabled(!state.isAudioEnabled)
      .then((isEnabled) => updateState({isAudioEnabled: isEnabled}));
  };

  const onFlipButtonPress = () => {
    twilioVideoRef.flipCamera();
  };

  const onRoomDidConnect = () => {
    updateState({status: 'connected'});
  };

  const onRoomDidDisconnect = ({roomName, error}) => {
    updateState({status: 'disconnected'});
  };

  const onRoomDidFailToConnect = (error) => {
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
    const videoTracks = state.videoTracks;
    videoTracks.delete(track.trackSid);
    updateState({videoTracks: {...videoTracks}});
  };

  return (
    <View style={styles.container}>
      <OfflineNotice />
      {state.status === 'disconnected' && (
        <View>
          <Text style={styles.headerStyle}>React Native Twilio Video</Text>
          <InputWithLabel
            label="Room Name"
            placeholder="Room Name"
            defaultValue={state.roomName}
            onChangeText={(text) => updateState({roomName: text})}
          />
          <InputWithLabel
            label="Token"
            placeholder="Token"
            defaultValue={state.token}
            onChangeText={(text) => updateState({token: text})}
          />
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
                style={[
                  styles.localVideo,
                  {bottom: state.isButtonDisplay ? '40%' : '30%'},
                ]}
              />
            </View>
          )}
          <View
            style={[
              styles.callScreenButtonContainer,
              {
                display: state.isButtonDisplay ? 'flex' : 'none',
                zIndex: state.isButtonDisplay ? 2 : 0,
              },
            ]}>
            <TouchableOpacity
              style={[
                styles.buttonStyle,
                {display: state.isButtonDisplay ? 'flex' : 'none'},
              ]}
              onPress={onMuteButtonPress}>
              <MIcon
                name={state.isAudioEnabled ? 'mic' : 'mic-off'}
                size={24}
                color="#fff"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.buttonStyle,
                {display: state.isButtonDisplay ? 'flex' : 'none'},
              ]}
              onPress={onEndButtonPress}>
              <MIcon name="call-end" size={28} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.buttonStyle,
                {display: state.isButtonDisplay ? 'flex' : 'none'},
              ]}
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

export {TwilioVideoDisplay};

export default class Example extends React.Component {
  state = {
    isAudioEnabled: true,
    isVideoEnabled: true,
    status: 'disconnected',
    participants: new Map(),
    videoTracks: new Map(),
    token: '',
  };

  _onConnectButtonPress = () => {
    this.refs.twilioVideo.connect({accessToken: this.state.token});
    this.setState({status: 'connecting'});
  };

  _onEndButtonPress = () => {
    this.refs.twilioVideo.disconnect();
  };

  _onMuteButtonPress = () => {
    this.refs.twilioVideo
      .setLocalAudioEnabled(!this.state.isAudioEnabled)
      .then((isEnabled) => this.setState({isAudioEnabled: isEnabled}));
  };

  _onFlipButtonPress = () => {
    this.refs.twilioVideo.flipCamera();
  };

  _onRoomDidConnect = ({roomName, error}) => {
    console.log('onRoomDidConnect: ', roomName);

    this.setState({status: 'connected'});
  };

  _onRoomDidDisconnect = ({roomName, error}) => {
    console.log('ERROR: ', error);

    this.setState({status: 'disconnected'});
  };

  _onRoomDidFailToConnect = (error) => {
    console.log('ERROR: ', error);

    this.setState({status: 'disconnected'});
  };

  _onParticipantAddedVideoTrack = ({participant, track}) => {
    console.log('onParticipantAddedVideoTrack: ', participant, track);

    this.setState({
      videoTracks: new Map([
        ...this.state.videoTracks,
        [
          track.trackSid,
          {participantSid: participant.sid, videoTrackSid: track.trackSid},
        ],
      ]),
    });
  };

  _onParticipantRemovedVideoTrack = ({participant, track}) => {
    console.log('onParticipantRemovedVideoTrack: ', participant, track);

    const videoTracks = new Map(this.state.videoTracks);
    videoTracks.delete(track.trackSid);

    this.setState({videoTracks});
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.status === 'disconnected' && (
          <View>
            <Text style={styles.welcome}>React Native Twilio Video</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              value={this.state.token}
              onChangeText={(text) => this.setState({token: text})}></TextInput>
            <Button
              title="Connect"
              style={styles.button}
              onPress={this._onConnectButtonPress}></Button>
          </View>
        )}

        {(this.state.status === 'connected' ||
          this.state.status === 'connecting') && (
          <View style={styles.callContainer}>
            {this.state.status === 'connected' && (
              <View style={styles.remoteGrid}>
                {Array.from(
                  this.state.videoTracks,
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
              </View>
            )}
            <View style={styles.optionsContainer}>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={this._onEndButtonPress}>
                <Text style={{fontSize: 12}}>End</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={this._onMuteButtonPress}>
                <Text style={{fontSize: 12}}>
                  {this.state.isAudioEnabled ? 'Mute' : 'Unmute'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={this._onFlipButtonPress}>
                <Text style={{fontSize: 12}}>Flip</Text>
              </TouchableOpacity>
              <TwilioVideoLocalView enabled={true} style={styles.localVideo} />
            </View>
          </View>
        )}

        <TwilioVideo
          ref="twilioVideo"
          onRoomDidConnect={this._onRoomDidConnect}
          onRoomDidDisconnect={this._onRoomDidDisconnect}
          onRoomDidFailToConnect={this._onRoomDidFailToConnect}
          onParticipantAddedVideoTrack={this._onParticipantAddedVideoTrack}
          onParticipantRemovedVideoTrack={this._onParticipantRemovedVideoTrack}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  buttonStyle: {
    width: 60,
    height: 60,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 100 / 2,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  localVideo: {
    width: '35%',
    left: '64%',
    height: '25%',
    zIndex: 2,
  },
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
  callScreenButtonContainer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
