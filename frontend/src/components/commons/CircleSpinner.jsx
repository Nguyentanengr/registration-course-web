import { CircleSpinnerContainer } from "./CircleSpinner.styled";

const CircleSpinner = ({ size = 40 }) => {
    return (
        <CircleSpinnerContainer className="spinner" size={size}>
            <div className="circle"></div>
        </CircleSpinnerContainer>
    );
};

export default CircleSpinner;