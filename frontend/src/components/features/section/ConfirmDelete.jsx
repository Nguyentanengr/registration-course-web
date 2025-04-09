import { useEffect, useRef } from 'react';
import { ConfirmDeleteContainer } from './ConfirmDelete.styled';

const ConfirmDelete = ({ setIsDelete, message, onDelete }) => {
    const thisRef = useRef(null);


    const handleClickCancel = () => {
        setIsDelete(false);
    };

    const handleClickConfirm = () => {
        console.log("handleClickConfirm");
        onDelete();
        setIsDelete(false);
    };


    // Nếu click ra ngoài
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (thisRef.current && !thisRef.current.contains(e.target)) {
                setIsDelete(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (
        <ConfirmDeleteContainer ref={thisRef}>
            <div className="title">Xác nhận xóa</div>
            <div className="ms">{message}</div>
            <div className="footer wrap-center">
                <button className="cancel-btn" onClick={handleClickCancel}>Hủy</button>
                <button className="confirm-btn" onClick={handleClickConfirm}>Xóa</button>
            </div>
        </ConfirmDeleteContainer>
    );
};

export default ConfirmDelete;