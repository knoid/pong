import preact from 'preact';
import Canvas from './canvas';

export default class Game extends preact.Component {
  state = {
    dataChannel: null,
    nickname: localStorage.getItem('nickname') || '',
    player: null,
  };

  async componentWillMount() {
    if (!this.state.nickname) {
      this.setState({
        NicknameModal: (await import(/* webpackChunkName: "nickname-modal" */ './nickname-modal')).default,
      });
    }
    this.setState({
      PeersList: (await import(/* webpackChunkName: "peers-list" */ './peers-list')).default,
    });
    this.setState({
      Pong: (await import(/* webpackChunkName: "pong" */ './pong')).default,
    });
  }

  setNickname = (nickname) => {
    localStorage.setItem('nickname', nickname);
    this.setState({ nickname });
  }

  connectTo = (oponent, dataChannel) => {
    this.setState({ oponent, dataChannel });
  }

  render(_, {
    NicknameModal, PeersList, Pong, dataChannel, nickname, oponent,
  }) {
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
