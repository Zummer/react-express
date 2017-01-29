import React from 'react';
import classNames from 'classnames';

const TextFieldGroup = ({
  field,
  value,
  label,
  error,
  type,
  onChange,
  checkUserExists
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
      onChange={onChange}
      onBlur={checkUserExists}
      value={value}
      type={type}
      name={field}
    />
    {error && <span className="help-block">{error}</span>}
  </div>
  );
}

TextFieldGroup.propTypes = {
  field: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  error: React.PropTypes.string,
  type: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  checkUserExists: React.PropTypes.func
}

TextFieldGroup.defaultProps = {
  type: 'text'
}

export default TextFieldGroup;
