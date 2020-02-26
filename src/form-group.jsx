import classNames from 'classnames';
import * as preact from 'preact';
import styles from './form-group.scss';

const FormGroup = ({
  label, name, inputRef, children, className = '', ...inputProps
}) => (
  <div class={classNames(styles.wrapper, className, { [styles.center]: !label })}>
    {label &&
      <label class={styles.label} for={name}>{label}</label>
    }
    {children ||
      <input class={styles.input} type="text" name={name} id={name} ref={inputRef} {...inputProps} />
    }
  </div>
);

export default FormGroup;
