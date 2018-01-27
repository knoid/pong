import preact from 'preact';
import FormGroup from './form-group';
import Modal from './modal';

export default class NicknameModal extends preact.Component {
  componentDidUpdate() {
    if (this.nicknameElem) {
      this.nicknameElem.select();
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.setNickname(this.nicknameElem.value);
  }

  render() {
    return (
      <Modal>
        <form onSubmit={this.onSubmit}>
          <FormGroup
            label="Nick"
            name="nick"
            inputRef={(e) => { this.nicknameElem = e; }}
            autofocus
          />
        </form>
      </Modal>
    );
  }
}
