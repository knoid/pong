import classNames from 'classnames';
import preact from 'preact';
import styles from './form-group.scss';

const FormGroup = ({ label, name, inputRef, className = '' }) => (
  <div class={ classNames(styles.wrapper, className) }>
    <label class={ styles.label } for={ name }>{ label }</label>
    <input class={ styles.input } type="text" name={ name } id={ name } ref={ inputRef } />
  </div>
);

export default FormGroup;
