import React from 'react';
import Icon from 'react-icons-kit';
import { basic_eye } from 'react-icons-kit/linea/basic_eye'
import { basic_eye_closed } from 'react-icons-kit/linea/basic_eye_closed'

interface ShowPassProps {
showPassword: boolean,
setShowPassword: (open: boolean) => void;
}

const ShowPassBtn = ({showPassword, setShowPassword}: ShowPassProps) => {
    const handleEyeIconClick = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div className="relative">
            <span
                className='cursor-pointer bi bi-eye absolute top-1/2 right-2 transform -translate-y-1/3'
                onClick={handleEyeIconClick}
            >
                {showPassword ? (
                    <Icon icon={basic_eye} size={18} />
                ) : (
                    <Icon icon={basic_eye_closed} size={18} />
                )}
            </span>
        </div>
    )
}

export default ShowPassBtn;