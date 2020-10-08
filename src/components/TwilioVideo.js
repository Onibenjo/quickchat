import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  PermissionsAndroid,
  TouchableHighlight,
} from 'react-native';
import {
  TwilioVideoLocalView,
  TwilioVideoParticipantView,
  TwilioVideo,
} from 'react-native-twilio-video-webrtc';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import normalize from 'react-native-normalize';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import InputWithLabel from './staticComponents/InputWithLabel';
import OfflineNotice from './staticComponents/OfflineNotice';

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

export default class TwilioVideo extends Component {
  state = {
    isAudioEnabled: true,
    isVideoEnabled: true,
    isButtonDisplay: true,
    status: 'disconnected',
    participants: new Map(),
    videoTracks: new Map(),
    roomName: '',
    token: '',
  };

  componentDidMount() {
    getAllPermissions();
  }

  _onConnectButtonPress = () => {
    this.refs.twilioVideo.connect({
      roomName: this.state.roomName,
      accessToken: this.state.token,
    });
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

  _onRoomDidConnect = () => {
    this.setState({status: 'connected'});
  };

  _onRoomDidDisconnect = ({roomName, error}) => {
    this.setState({status: 'disconnected'});
  };

  _onRoomDidFailToConnect = (error) => {
    this.setState({status: 'disconnected'});
  };

  _onParticipantAddedVideoTrack = ({participant, track}) => {
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
    const videoTracks = this.state.videoTracks;
    videoTracks.delete(track.trackSid);
    this.setState({videoTracks: {...videoTracks}});
  };

  render() {
    return (
      <View style={styles.container}>
        <OfflineNotice />
        {this.state.status === 'disconnected' && (
          <View>
            <Text style={styles.headerStyle}>React Native Twilio Video</Text>
            <InputWithLabel
              label="Room Name"
              placeholder="Room Name"
              defaultValue={this.state.roomName}
              onChangeText={(text) => this.setState({roomName: text})}
            />
            <InputWithLabel
              label="Token"
              placeholder="Token"
              defaultValue={this.state.token}
              onChangeText={(text) => this.setState({token: text})}
            />
            <TouchableHighlight
              style={[styles.buttonContainer, styles.loginButton]}
              onPress={this._onConnectButtonPress}>
              <Text style={styles.Buttontext}>Connect</Text>
            </TouchableHighlight>
          </View>
        )}
        {(this.state.status === 'connected' ||
          this.state.status === 'connecting') && (
          <View style={styles.callContainer}>
            {this.state.status === 'connected' && (
              <View style={styles.remoteGrid}>
                <TouchableOpacity
                  style={styles.remoteVideo}
                  onPress={() => {
                    this.setState({
                      isButtonDisplay: !this.state.isButtonDisplay,
                    });
                  }}>
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
                </TouchableOpacity>
                <TwilioVideoLocalView
                  enabled={true}
                  style={[
                    styles.localVideo,
                    {bottom: this.state.isButtonDisplay ? '40%' : '30%'},
                  ]}
                />
              </View>
            )}
            <View
              style={[
                styles.callScreenButtonContainer,
                {
                  display: this.state.isButtonDisplay ? 'flex' : 'none',
                  zIndex: this.state.isButtonDisplay ? 2 : 0,
                },
              ]}>
              <TouchableOpacity
                style={[
                  styles.buttonStyle,
                  {display: this.state.isButtonDisplay ? 'flex' : 'none'},
                ]}
                onPress={this._onMuteButtonPress}>
                <MIcon
                  name={this.state.isAudioEnabled ? 'mic' : 'mic-off'}
                  size={24}
                  color="#fff"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.buttonStyle,
                  {display: this.state.isButtonDisplay ? 'flex' : 'none'},
                ]}
                onPress={this._onEndButtonPress}>
                <MIcon name="call-end" size={28} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.buttonStyle,
                  {display: this.state.isButtonDisplay ? 'flex' : 'none'},
                ]}
                onPress={this._onFlipButtonPress}>
                <MCIcon name="rotate-3d" size={28} color="#fff" />
              </TouchableOpacity>
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
    height: normalize(45),
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
