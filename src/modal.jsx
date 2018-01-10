import preact from 'preact';
import styles from './modal.scss';

const Modal = ({ children }) => (
  <div class={ styles.container }>
    <div class={ styles.bubble }>
      { children }
    </div>
  </div>
);

export default Modal;
