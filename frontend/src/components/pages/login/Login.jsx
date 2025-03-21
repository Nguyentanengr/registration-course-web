import { useEffect, useState } from "react";
import { LoginContainer } from "./Login.styled"
import { Icons } from "../../../assets/icons/Icon";
import CircleSpinner from "../../commons/CircleSpinner"
import Alert from "../../commons/Alert";
import { useNavigate } from "react-router-dom";


const Login = () => {

    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginState, setLoginState] = useState({
        isError: null,
        isSuccess: null,
        isLoading: false,
        user: null,
    });

    const [validate, setValidate] = useState({
        username: "",
        password: "",
    });

    const handlOnSubmitLogin = (e) => {
        e.preventDefault();

        if (handleValidateInput()) {
            // fake call api
            setLoginState((prev) => ({
                ...prev,
                isLoading: true,
                isError: null,
                isSuccess: null
            }))
            setTimeout(() => {
                
                if (username === "username" && password === "password") {
                    console.log("login success");
                    setLoginState((prev) => ({
                        ...prev,
                        isLoading: false,
                        isError: null,
                        isSuccess: "Đăng nhập thành công",
                        user: {id: "N22DCCN156", fullname: "Phạm Tấn Nguyên"}
                    }));
                } else {
                    console.log("login error");
                    
                    setLoginState((prev) => ({
                        ...prev,
                        isLoading: false,
                        isError: "Username hoặc mật khẩu chưa đúng",
                        isSuccess: null,
                    }));
                }
            }, 1000);
        }
    }

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

    const handleOnKeyDown = (e) => {
        setValidate((prev) => ({
            ...prev,
            [e.target.name]: ""
        }))
    };

    useEffect(() => {
        setLoginState({
            isError: null,
            isSuccess: null,
            isLoading: false,
        });
    }, []);

    useEffect(() => {
        if (loginState.user) navigate("/register");
    }, [loginState.user])

    return (
        <LoginContainer>
            { loginState.isError && <Alert message={loginState.isError}/>}
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
                                    placeholder="Mã sinh viên"
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
                                    placeholder="Mật khẩu"
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
                            {loginState.isLoading ? <CircleSpinner size={25}/> : "Đăng nhập ngay"}
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