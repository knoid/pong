import * as preact from 'preact';
import styles from './canvas.scss';

const Canvas = ({ children }) => (
  <div class={styles.wrapper}>
    { children }
  </div>
);

export default Canvas;
