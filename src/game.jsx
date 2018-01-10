import preact from 'preact';
import Canvas from './canvas';
import FormGroup from './form-group';
import Modal from './modal';

export default class Game extends preact.Component {
  setNickname = (e) => {
    e.preventDefault();
    const nickname = this.nicknameElem.value;
    localStorage.setItem('nickname', this.nicknameElem.value);
    this.setState({ nickname });
  }

  componentDidMount() {
    this.setState({
      nickname: localStorage.getItem('nickname'),
    });
  }

  render({ }, { nickname }) {
    return (
      <Canvas>
        {!nickname && (
          <Modal>
            <form onsubmit={ this.setNickname }>
              <FormGroup label="Nick" name="nick" inputRef={e => this.nicknameElem = e} />
            </form>
          </Modal>
        )}
      </Canvas>
    );
  }
}
