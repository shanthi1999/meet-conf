import React, { Component } from "react";
import "./App.css";
import { withRouter } from "react-router-dom";

class JitsiComponent extends Component {
  domain = "meet.jit.si/shanthi";
  api = {};

  constructor(props) {
    super(props);
    this.state = {
      room: "Interview",
      user: {
        name: "shanthi",
      },
      isAudioMuted: false,
      isVideoMuted: false,
      password: 123456789,
      start: false,
    };
  }

  startMeet = () => {
    const options = {
      roomName: this.state.room,
      width: "100%",
      height: 750,
      // jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOiJKcmE5RF9SSlRSenhyNFpFaWk4akY0SndXNUFReVppSSIsImZ1bGxfbmFtZSI6InNoYW50aGkiLCJ1c2VyX2VtYWlsIjoic2hhbnRoaUB5b3BtYWlsLmNvbSIsInVzZXJfaWQiOiI2MGYxMjEzMDgzZGU5MDM2NTg3ZjM1NzIiLCJ1c2VyX3R5cGUiOiJlbXBsb3llciIsImlhdCI6MTYyODg0MDM2MSwiZXhwIjoxNjI4ODY5MTYxfQ.yeC4KmegH5p98GKZX3lpeodRyAnswWGB9ZoX5Z9WE5Y',
      configOverwrite: { prejoinPageEnabled: false },
      password: this.state.password,
      // disableInviteFunctionForPrejoin:false,
      interfaceConfigOverwrite: {
        // overwrite interface properties
        // disableInviteFunctionForPrejoin:true,
        SHOW_BRAND_WATERMARK: true,
        SHOW_WATERMARK_FOR_GUESTS: false,
        JITSI_WATERMARK_LINK: "https://cdn.logo.com/hotlink-ok/logo-social.png",
        TOOLBAR_BUTTONS: [
          "microphone",
          "camera",
          "closedcaptions",
          "desktop",
          "fullscreen",
          "fodeviceselection",
          "hangup",
          "info",
          "recording",
          "livestreaming",
          "etherpad",
          "sharedvideo",
          "settings",
          "raisehand",
          "videoquality",
          "filmstrip",
          "stats",
          "shortcuts",
          "tileview",
          "videobackgroundblur",
          "download",
          "mute-everyone",
          "e2ee",
          //   "Participants",
          //   "invite",
        ],
        //   "chats","invite",
      },
      parentNode: document.querySelector("#jitsi-iframe"),
      userInfo: {
        displayName: this.state.user.name,
      },
    };
    this.api = new window.JitsiMeetExternalAPI(this.domain, options);

    this.api.addEventListeners({
      readyToClose: this.handleClose,
      participantLeft: this.handleParticipantLeft,
      participantJoined: this.handleParticipantJoined,
      videoConferenceJoined: this.handleVideoConferenceJoined,
      videoConferenceLeft: this.handleVideoConferenceLeft,
      audioMuteStatusChanged: this.handleMuteStatus,
      videoMuteStatusChanged: this.handleVideoStatus,
    });
  };

  handleClose = () => {
    console.log("handleClose");
  };

  handleParticipantLeft = async (participant) => {
    console.log("handleParticipantLeft", participant); // { id: "2baa184e" }
    const data = await this.getParticipants();
  };

  handleParticipantJoined = async (participant) => {
    console.log("handleParticipantJoined", participant); // { id: "2baa184e", displayName: "Shanu Verma", formattedDisplayName: "Shanu Verma" }
    const data = await this.getParticipants();
  };

  handleVideoConferenceJoined = async (participant) => {
    console.log("handleVideoConferenceJoined", participant); // { roomName: "bwb-bfqi-vmh", id: "8c35a951", displayName: "Akash Verma", formattedDisplayName: "Akash Verma (me)"}
    const data = await this.getParticipants();
  };

  handleVideoConferenceLeft = () => {
    console.log("handleVideoConferenceLeft");
    // return this.props.history.push('/thank-you');
    this.setState({ start: false });
    // this.api.dispose();
  };

  handleMuteStatus = (audio) => {
    console.log("handleMuteStatus", audio); // { muted: true }
  };

  handleVideoStatus = (video) => {
    console.log("handleVideoStatus", video); // { muted: true }
  };

  getParticipants() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.api.getParticipantsInfo()); // get all participants
      }, 500);
    });
  }

  // custom events
  executeCommand(command) {
    this.api.executeCommand(command);
    if (command == "hangup") {
      this.setState({ start: false });
      this.api.dispose();
      // return this.props.history.push('/thank-you');
    }

    if (command == "toggleAudio") {
      this.setState({ isAudioMuted: !this.state.isAudioMuted });
    }

    if (command == "toggleVideo") {
      this.setState({ isVideoMuted: !this.state.isVideoMuted });
    }
  }

  async componentDidMount() {
 
    await new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://meet.jit.si/external_api.js";
      script.async = true;
      script.onload = resolve;
      document.body.appendChild(script);
    });
    console.log("meetid", this.props.match.params.meetid);
    await this.setState({
      room: this.props.match.params.meetid,
      user: { name: this.props.match.params.name },
    });
    await this.startMeet();
  setInterval(() => {
       console.log("document.querySelector('.watermark') ",document.getElementsByClassName('watermark') )

  // document.querySelector('.watermark').style.display = 'none' 
  // document.querySelector('.watermark').style.visibility = 'hidden'
},1000)
     
  }
  handleToggle = () => {
    this.setState({ start: true, room: this.state.room });
  };
  handleOnChange = (e) => {
    this.setState({ ...this.state, room: e.target.value });
  };
  handleStartMeeting = () => {
    this.setState({ start: true });
    this.startMeet();
  };

  render() {
    const { isAudioMuted, isVideoMuted } = this.state;
    return (
      <div>
        <div id="jitsi-iframe"></div>

        {/* <div class="item-center">
          <span>Custom Controls</span>
        </div>
        <div class="item-center">
          <span>&nbsp;&nbsp;</span>
          <button onClick={() => this.executeCommand("toggleAudio")}>
            toggleAudio
          </button>
          <button onClick={() => this.executeCommand("hangup")}>hangup</button>
          <button onClick={() => this.executeCommand("toggleVideo")}>
            toggleVideo
          </button>
          <button onClick={() => this.executeCommand("toggleShareScreen")}>
            toggleShareScreen
          </button>

          <i
            onClick={() => this.executeCommand("toggleAudio")}
            className={`fas fa-2x grey-color ${
              isAudioMuted ? "fa-microphone-slash" : "fa-microphone"
            }`}
            aria-hidden="true"
            title="Mute / Unmute"
          ></i>
          <i
            onClick={() => this.executeCommand("hangup")}
            className="fas fa-phone-slash fa-2x red-color"
            aria-hidden="true"
            title="Leave"
          ></i>
          <i
            onClick={() => this.executeCommand("toggleVideo")}
            className={`fas fa-2x grey-color ${
              isVideoMuted ? "fa-video-slash" : "fa-video"
            }`}
            aria-hidden="true"
            title="Start / Stop camera"
          ></i>
          <i
            onClick={() => this.executeCommand("toggleShareScreen")}
            className="fas fa-film fa-2x grey-color"
            aria-hidden="true"
            title="Share your screen"
          ></i>
        </div> */}
      </div>
    );
  }
}

export default withRouter(JitsiComponent);
