import React from "react";
import './style.scss'

/**
 * @interface ITextInputProps  TextInput Component Props
 */
interface ITextInputProps extends React.HTMLProps<HTMLInputElement> {
  id?: string;
  label?: string;
  placeholder?: string;
  type?: "text" | "password" | "number";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  className?: string;
  containerClassName?: string;
}

/**
 * @description TextInput component
 * @param props: ITextInputProps
 */
const TextInput: React.FC<ITextInputProps> = (props: ITextInputProps) => {
  const {
    id,
    label,
    placeholder,
    className = "",
    containerClassName = "",
    onBlur,
    onChange,
    ...rest
  } = props;

  return (
    <div
      className={`gj-text-input${className ? ` ${className}` : ""}`}
    >
      <div
        className={`gj-text-input-label__container${
          containerClassName ? ` ${containerClassName}` : ""
        }`}
      >
        {label && (
          <label htmlFor={id} className={`gj-text-input__label`}>
            {label}
          </label>
        )}
        
        <input
          id={id}
          type="text"
          placeholder={placeholder}
          onBlur={onBlur}
          onChange={onChange}
          {...rest}
        />
      </div>
    </div>
  );
};

export default TextInput;
