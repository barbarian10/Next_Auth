import React from 'react';

interface InputProps {
    id: string,
    placeholder: string,
    type: string,
    onChange: any,
    value: string
}

const Input = ({id, placeholder, type, onChange, value} : InputProps) => {
    return (
        <input
        className="p-2 mt-4 border border-gray-300 rounded-lg
focus:outline-none focus:border-gray-600"
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
    />
    )
}

export default Input;