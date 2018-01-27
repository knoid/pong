import preact from 'preact';
import Canvas from './canvas';
import NicknameModal from './nickname-modal';
import PeersList from './peers-list';
import Pong from './pong';

export default class Game extends preact.Component {
  state = {
    dataChannel: null,
    nickname: localStorage.getItem('nickname') || '',
    player: null,
  };

  setNickname = (nickname) => {
    localStorage.setItem('nickname', nickname);
    this.setState({ nickname });
  }

  connectTo = (oponent, dataChannel) => {
    this.setState({ oponent, dataChannel });
  }

  render(_, { dataChannel, nickname, oponent }) {
    return (
      <Canvas>
        {!nickname &&
          <NicknameModal setNickname={this.setNickname} />
        }
        {nickname && !oponent &&
          <PeersList nickname={nickname} connectTo={this.connectTo} />
        }
        {dataChannel && oponent &&
          <Pong dataChannel={dataChannel} />
        }
      </Canvas>
    );
  }
}
