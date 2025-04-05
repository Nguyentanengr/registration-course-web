import { useState } from 'react';
import { Icons } from '../../assets/icons/Icon';
import { CounterBoxContainer } from './CounterBox.styled';

const CounterBox = ({ init = 1, min = 1, onChange, width = "100%" }) => {

    const [number, setNumber] = useState(init);

    const handleOnChange = (e) => {
        
        if (e.target.value === '' || /^[0-9]*$/.test(e.target.value)) {
            
            const numericValue = e.target.value === '' ? 0 : parseInt(e.target.value, 10); // Chuyển thành số
            setNumber(numericValue); // Cập nhật state
            if (onChange) onChange(numericValue); // Gọi callback onChange nếu có
        }
    };

    const handleClickUp = () => {
        if (onChange) onChange(number + 1);
        setNumber(number + 1);
    };

    const handleClickDown = () => {
        if (onChange) onChange(number - 1 < min ? min : number - 1);
        setNumber(number - 1 < min ? min : number - 1);
    };

    return (
        <CounterBoxContainer width={width}>
            <input type="text" value={number} onChange={handleOnChange} />
            <div className="updown">
                <div className="wrap-center" onClick={handleClickUp}>
                    <Icons.RecUp />
                </div>
                <div className="wrap-center" onClick={handleClickDown}>
                    <Icons.RecDown />
                </div>
            </div>
        </CounterBoxContainer>
    );
};

export default CounterBox;