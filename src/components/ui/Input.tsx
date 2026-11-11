import React from 'react';

interface InputProps {
    id: string;
    label?: string;
    placeholder?: string;
    name?: string;
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    type?: string;
    error?: boolean;
    onBlur?: React.ChangeEventHandler<HTMLInputElement>;
}

function Input({ id, label, placeholder, name, value, onChange, type, error, onBlur }: InputProps) {
    return (
        <div className="input-container">
            {label &&
                <label className="input-container__label" htmlFor={id}>
                    {label}
                </label>
            }
            <input id={id}
                   className={`input-container__input ${error ? 'input-error' : ''}`}
                   value={value}
                   placeholder={placeholder}
                   name={name}
                   onChange={onChange}
                   type={type}
                   onBlur={onBlur}
            />
        </div>
    );
}

export default Input;