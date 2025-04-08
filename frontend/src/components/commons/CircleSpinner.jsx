import { CircleSpinnerContainer } from "./CircleSpinner.styled";

const CircleSpinner = ({ size = 40, color = '#ffffff' }) => {
    return (
        <CircleSpinnerContainer className="spinner" size={size} color={color}>
            <div className="circle"></div>
        </CircleSpinnerContainer>
    );
};

export default CircleSpinner;