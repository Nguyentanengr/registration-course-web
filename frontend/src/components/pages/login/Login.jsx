import { useEffect, useState } from "react";
import { LoginContainer } from "./Login.styled"
import { Icons } from "../../../assets/icons/Icon";
import CircleSpinner from "../../commons/CircleSpinner"
import Alert from "../../commons/Alert";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../stores/slices/authSlice";
import { loginUser } from "../../../apis/authApi";


const Login = () => {


    // khai báo biến
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [validate, setValidate] = useState({
        username: "",
        password: "",
    });

    const { loading, error, user } = useSelector((state) => state.auth);

    // Nếu người dùng đã đăng nhập -> điều hướng
    // useEffect(() => {
    //     console.log("user trong redux", user);
    //     if (user) {
    //         navigate("/portal/dang-ky");
    //     }
    // }, [user]);

    // khi nhấn login
    const handlOnSubmitLogin = (e) => {
        e.preventDefault();
        if (handleValidateInput()) {
            dispatch(loginUser({ username, password }))
                .then(({ payload }) => {
                    if (payload.data.user) {
                        navigate("/portal/dang-ky", { replace: true });
                    }
                });
        }
    };

    // xử lý dữ liệu đầu vào
    const handleValidateInput = () => {
        if (!username) {
            setValidate((prev) => ({ ...prev, username: "Vui lòng nhập mã sinh viên" }));
            return false;
        } else if (!password) {
            setValidate((prev) => ({ ...prev, password: "Vui lòng nhập mật khẩu" }));
            return false;
        }
        return true;
    }

    // Xóa bỏ validate khi nhấn phím
    const handleOnKeyDown = (e) => {
        setValidate((prev) => ({
            ...prev,
            [e.target.name]: ""
        }));
    };

    const getMessageError = (error) => {
        console.log(error);

        switch (error.code) {
            case 9015: {
                return "Tài khoản đã bị khóa";
            };
            case 9017: {
                return "Tài khoản hoặc mật khẩu không đúng";
            }
            case 9039: {
                return "Tài khoản hoặc mật khẩu không đúng";
            }
            default: {
                return "Đăng nhập thất bại";
            }
        };
    };

    return (
        <LoginContainer>
            {error && <Alert message={getMessageError(error)} />}
            <div className="login-container">
                <div className="left-gap">
                    <img src="/images/background-login.png" alt="" />
                </div>
                <div className="right-gap">
                    <div className="title">
                        <div className="text">
                            THÔNG BÁO <br /> ĐĂNG KÝ MÔN HỌC
                        </div>
                        <div className="line"></div>
                    </div>
                    <form className="login-form" onSubmit={handlOnSubmitLogin}>
                        <div className="username-container">
                            <div className="username-input">
                                <div className="icon">
                                    <Icons.User />
                                </div>
                                <input
                                    name="username"
                                    type="text"
                                    placeholder="Vd:n22dccn156"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    onKeyDown={handleOnKeyDown}
                                />
                            </div>
                            {validate.username && <div className="username-error">
                                {validate.username}
                            </div>}
                        </div>

                        <div className="password-container">
                            <div className="password-input">
                                <div className="icon">
                                    <Icons.Lock />
                                </div>
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Vd: n22dccn156@"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyDown={handleOnKeyDown}
                                />
                            </div>
                            {validate.password && <div className="password-error">
                                {validate.password}
                            </div>}
                        </div>

                        <button className="login-btn" type="submit">
                            {loading ? <CircleSpinner size={15} /> : "Đăng nhập ngay"}
                        </button>
                    </form>
                </div>
            </div>
            <div className="footer-container">
                <div className="address">
                    HỌC VIỆN CÔNG NGHỆ BƯU CHÍNH VIỄN THÔNG CƠ SỞ TẠI TP.HCM
                </div>
                <div className="address">
                    Cơ sở Quận 1: 11 Nguyễn Đình Chiểu, Phường Đa Kao, Quận 1, TP. Hồ Chí Minh
                </div>
                <div className="address">
                    Cơ sở Thủ Đức: 97 Man Thiện, Phường Hiệp Phú, Thủ Đức, TP. Hồ Chí Minh
                </div>
                <div className="copyright">
                    Copyright © 2025 Học viện Công nghệ Bưu chính Viễn thông
                </div>
            </div>
        </LoginContainer>
    );
};

export default Login;