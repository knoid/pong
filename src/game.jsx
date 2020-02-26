import * as preact from 'preact';
import Canvas from './canvas';

export default class Game extends preact.Component {
  state = {
    dataChannel: null,
    nickname: localStorage.getItem('nickname') || '',
    player: null,
  };

  async componentWillMount() {
    if (!this.state.nickname) {
      await this.loadNicknameComponent();
    }
    this.setState({
      PeersList: (await import(/* webpackChunkName: "peers-list" */ './peers-list')).default,
    });
    this.setState({
      Pong: (await import(/* webpackChunkName: "pong" */ './pong')).default,
    });
    if (!this.state.Nickname) {
      await this.loadNicknameComponent();
    }
  }

  setNickname = (nickname) => {
    localStorage.setItem('nickname', nickname);
    this.setState({ nickname });
  }

  changeNickname = () => {
    this.setState({ nickname: '' });
  }

  async loadNicknameComponent() {
    this.setState({
      Nickname: (await import(/* webpackChunkName: "nickname" */ './nickname')).default,
    });
  }

  connectTo = (oponent, dataChannel) => {
    this.setState({ oponent, dataChannel });
  }

  render(_, {
    Nickname, PeersList, Pong, dataChannel, nickname, oponent,
  }) {
    return (
      <Canvas>
        {!nickname &&
          <Nickname setNickname={this.setNickname} />
        }
        {nickname && !oponent &&
          <PeersList
            nickname={nickname}
            connectTo={this.connectTo}
            changeNickname={this.changeNickname}
          />
        }
        {dataChannel && oponent &&
          <Pong dataChannel={dataChannel} />
        }
      </Canvas>
    );
  }
}
