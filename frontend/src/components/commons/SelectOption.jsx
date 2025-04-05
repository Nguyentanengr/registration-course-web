import { useEffect, useRef, useState } from 'react';
import { SelectOptionContainer } from './SelectOption.styled';
import { Icons } from '../../assets/icons/Icon';

const SelectOption = ({ options = [], placeholder = '', width='100%', onSelect }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const selectRef = useRef();

    useEffect(() => {
        if (!placeholder || placeholder === '') {
            if (options.length > 0 && selected === null) {
                setSelected(options[0]);
                if (onSelect) onSelect(options[0]);
            }
        }
    }, [options]);

    useEffect(() => {
        const handleClickOutSide = (e) => {
            if (selectRef.current && !selectRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutSide);
        return (() => document.removeEventListener('mousedown', handleClickOutSide));
    });

    const handleSelect = (option) => {
        setSelected(option);
        setIsOpen(false);
        if (onSelect) onSelect(option);
    };

    return (
        <SelectOptionContainer ref={selectRef} width={width}>
            <button className='btn-select' onClick={() => setIsOpen(!isOpen)}>
                {selected || placeholder}
                <div className="wrap-center">
                    <Icons.ShowMore />
                </div>
            </button>
            {isOpen && (<div className='dropdown'>
                {options.map((opt, index) => (
                    <div
                        key={index}
                        className='dd-item'
                        onClick={() => { handleSelect(opt) }}
                    >
                        {opt}
                    </div>
                ))}
            </div>)}
        </SelectOptionContainer>
    );
};

export default SelectOption;