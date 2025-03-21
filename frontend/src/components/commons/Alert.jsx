
import { AlertContainer } from "./Alert.styled";
import { useState, useEffect } from "react";
import { Icons } from "../../assets/icons/Icon";

const Alert = ({ message, type="error" }) => {

    const [show, setShow] = useState(false);

    useEffect(() => {
        if (message) {
            setShow(true);
            const timer = setTimeout(() => {
                setShow(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);


    return (
        <AlertContainer show={show} type={type}>
            <div className="error-content">
                <div className="error-message">{message}</div>
                <div className="close-btn" onClick={() => setShow(false)}>
                    <Icons.Time />
                </div>
            </div>
        </AlertContainer>
    );
};

export default Alert;