
import React from 'react'

interface InputFieldProps {
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
 const InputField: React.FC<InputFieldProps> = ({type, placeholder, value, onChange}) => {
  return (
     <input   type={type}
     placeholder={placeholder}
     value={value}
     onChange={onChange}
     
   />
  )
}

export default InputField
