import { useEffect, useRef, useState } from 'react';
import { SelectOptionContainer } from './SelectOption.styled';
import { Icons } from '../../assets/icons/Icon';

const SelectOption = ({ options = [], width = '100%', onSelect, value = '' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef();

    // Reset value khi options rỗng
    useEffect(() => {
        if (options.length === 0 && value !== '') {
            if (onSelect) {
                onSelect(''); // Reset value về rỗng
            }
        }
    }, [options, value, onSelect]);
    
    // Set default value when options change and no value is selected
    useEffect(() => {
        console.log("select option ",value);
        if (options.length > 0 && !value && onSelect) {
            onSelect(options[0]);
        }
    }, [options, value, onSelect]);    

    useEffect(() => {
        const handleClickOutSide = (e) => {
            if (selectRef.current && !selectRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutSide);
        return () => document.removeEventListener('mousedown', handleClickOutSide);
    }, []);

    const handleSelect = (option) => {
        setIsOpen(false);
        if (onSelect) onSelect(option);
    };

    return (
        <SelectOptionContainer ref={selectRef} width={width}>
            <button className='btn-select' onClick={() => setIsOpen(!isOpen)}>
                {value}
                <div className="wrap-center">
                    <Icons.ShowMore />
                </div>
            </button>
            {isOpen && (
                <div className='dropdown'>
                    {options.map((opt, index) => (
                        <div
                            key={index}
                            className='dd-item'
                            onClick={() => handleSelect(opt)}
                        >
                            {opt}
                        </div>
                    ))}
                </div>
            )}
        </SelectOptionContainer>
    );
};

export default SelectOption;