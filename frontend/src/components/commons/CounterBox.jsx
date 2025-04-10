import { Icons } from '../../assets/icons/Icon';
import { CounterBoxContainer } from './CounterBox.styled';

const CounterBox = ({ value, onChange, width = "100%" }) => {
    const handleOnChange = (e) => {
        if (e.target.value === '' || /^[0-9]*$/.test(e.target.value)) {
            const numericValue = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
            if (onChange) onChange(numericValue);
        }
    };

    const handleClickUp = () => {
        if (onChange) onChange(value + 1);
    };

    const handleClickDown = () => {
        if (onChange) onChange(value - 1 < 0 ? 0 : value - 1);
    };

    return (
        <CounterBoxContainer width={width}>
            <input type="text" value={value} onChange={handleOnChange} />
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