import classNames from 'classnames';
import preact from 'preact';
import styles from './form-group.scss';

const FormGroup = ({
  label, name, inputRef, children, className = '', ...inputProps
}) => (
  <div class={classNames(styles.wrapper, className)}>
    <label class={styles.label} for={name}>{label}</label>
    {(children.length && children) ||
      <input class={styles.input} type="text" name={name} id={name} ref={inputRef} {...inputProps} />
    }
  </div>
);

export default FormGroup;