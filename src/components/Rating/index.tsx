import React from "react";
import TextInput from "src/components/TextInput";
import Button from "src/components/Button";
import "./style.scss";

/**
 * @interface IRatingProps component Rating
 */
interface IRatingProps {
  handleMinChange: (value: any) => void;
  handleMaxChange: (value: any) => void;
  handleFilter: () => void;
  handleResetFilter?: () => void;
  minInputDefaultValue: string;
  maxInputDefaultValue: string;
  className?:string;
  title?:string;
}

/**
 * @function Rating
 * @description Rating page
 * @param props
 */
const Rating: React.FC<IRatingProps> = (props: IRatingProps) => {
  const {
    handleMinChange,
    handleMaxChange,
    handleFilter,
    handleResetFilter,
    minInputDefaultValue,
    maxInputDefaultValue,
    className,
    title,
  } = props;

  return (
    <div className={`gj-Rating${className?` ${className}`:''}`}>

      {title&&<div  className='gj-Rating__title'>{title}</div>}

      <TextInput
        label="Enter Minimun Rate:"
        onChange={(e) => handleMinChange(e)}
        value={minInputDefaultValue}
        className='gj-Rating__input'
      />
      <TextInput
        label="Enter Maximun Rate:"
        onChange={(e) => handleMaxChange(e)}
        value={maxInputDefaultValue}
        className='gj-Rating__input'
      />

      <div className="gj-Rating__btn-container">
        <Button title="Filter" onClick={handleFilter} />
        <Button title="Reset Filter" onClick={handleResetFilter} />
      </div>
      
    </div>
  );
};
export default Rating;
