import classNames from 'classnames';
import * as preact from 'preact';
import FormGroup from './form-group';
import Modal from './modal';
import styles from './peers-list.scss';
import baseStyles from './base.scss';
import fgStyles from './form-group.scss';
import * as signalingServer from './signaling-server';

function PeerButton({ connectTo, ...props }) {
  function selectPlayer() {
    connectTo(props);
  }

  return (
    <button onClick={selectPlayer}>{props.nickname}</button>
  );
}

export default class PeersList extends preact.Component {
  state = {
    otherPlayers: [],
  };

  async componentDidMount() {
    const pc = new RTCPeerConnection();
    this.peerConnection = pc;

    const eventSource = await signalingServer.discoverPeers(this.props.nickname);
    this.eventSource = eventSource;

    pc.onicecandidate = (e) => {
      if (e.candidate) {
        signalingServer.sendIceCandidate(e.candidate);
      }
    };

    pc.ondatachannel = (e) => {
      eventSource.close();
      this.props.connectTo(this.oponent, e.channel);
    };

    eventSource.onmessage = async (e) => {
      const { action, data, sender } = JSON.parse(e.data);

      if (action === 'add') {
        this.setState(prevState => ({
          otherPlayers: [...prevState.otherPlayers, data],
        }));
      }

      if (action === 'iceCandidate') {
        try {
          await pc.addIceCandidate(new RTCIceCandidate(data));
        } catch (e2) {
          // invalid ICE candidate
        }
      }

      if (action === 'offer') {
        await pc.setRemoteDescription(new RTCSessionDescription(data));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        this.oponent = this.state.otherPlayers.find(p => p.publicId === sender);
        await signalingServer.sendAnswer(sender, answer);
      }

      if (action === 'answer' && sender === this.askedToken) {
        await pc.setRemoteDescription(new RTCSessionDescription(data));
      }

      if (action === 'remove') {
        this.setState(prevState => ({
          otherPlayers: prevState.otherPlayers.filter(player => (
            player.publicId !== data.publicId
          )),
        }));
      }

      eventSource.onerror = () => {
        eventSource.close();
        this.setState({ otherPlayers: [] });
      };
    };
  }

  componentWillUnmount() {
    this.eventSource.close();
  }

  askedToken = null;

  connectTo = async (player) => {
    this.askedToken = player.publicId;
    const pc = this.peerConnection;
    const dataChannel = pc.createDataChannel('data');
    dataChannel.onopen = () => {
      this.eventSource.close();
      this.props.connectTo(player, dataChannel);
    };
    const description = await pc.createOffer();
    await pc.setLocalDescription(description);
    await signalingServer.sendOffer(player.publicId, description);
  }

  render({ changeNickname }, { otherPlayers }) {
    const isLoading = otherPlayers.length === 0;
    return (
      <Modal>
        <FormGroup label="Other players">
          <div class={classNames(styles.list, { [baseStyles.centerContent]: isLoading })}>
            {isLoading ?
              <div class={styles.loader} />
            :
              <div class={styles.uList}>
                {otherPlayers.map(player => (
                  <PeerButton {...player} connectTo={this.connectTo} />
                ))}
              </div>
            }
          </div>
        </FormGroup>
        <FormGroup>
          <button class={fgStyles.button} onClick={changeNickname}>Change my nickname</button>
        </FormGroup>
      </Modal>
    );
  }
}
