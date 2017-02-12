import React from 'react';
import classNames from 'classnames';

const TextFieldGroup = ({
  label,
  error,
  ...rest
}) => {
  return (
    <div className={
      classNames("form-group", {
        "has-error": error
      })
    }>
    <label className="control-label">{label}</label>
    <input
      className="form-control"
      {...rest}
    />
    {error && <span className="help-block">{error}</span>}
  </div>
  );
}

TextFieldGroup.propTypes = {
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  error: React.PropTypes.string,
  type: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onBlur: React.PropTypes.func
}

TextFieldGroup.defaultProps = {
  type: 'text'
}

export default TextFieldGroup;
