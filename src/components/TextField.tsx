import React, { HTMLInputTypeAttribute } from 'react';

interface TextFieldProps {
  label: string;
  name: string;
  value: string | number;
  type?: HTMLInputTypeAttribute;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * @default false
   */
  required?: boolean;
  /**
   * @default false
   */
  readOnly?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({ label, value, name, onChange, required = false, readOnly = false, type = 'text' }) => {

  return (
    <div className="form-group">
      <label htmlFor={`txt${name}`} className="form-label">
        {label}
      </label>
      <input
        type={type}
        className="form-control"
        id={`txt${name}`}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        readOnly={readOnly}
      />
      {required && (
        <>
          <div className="invalid-feedback">Campo `{label}` é obrigatorio</div>
          <div className="valid-feedback">Campo `{label}` OK</div>
        </>
      )}
    </div>
  )
}

export default TextField;