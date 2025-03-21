import { useEffect, useRef, useState } from "react";
import { RegisterCourseContainer } from "./RegisterCourse.styled";
import { Icons } from "../../../assets/icons/Icon";
import FilterArea from "../../features/register/FilterArea";
import RegisterArea from "../../features/register/RegisterArea";
import SelectedArea from "../../features/register/SelectedArea";

const RegisterCourse = () => {

    const options = [
        "Lớp sinh viên hiện tại",
        "Chương trình đào tạo kế hoạch",
    ];
    const openingSession = [
        {
            id: "INT1210", 
            nameCourse: "An toàn bảo mật hệ thống thông tin",
            class: "D22CQCN02-N",
            group: "01",
            credits: 3,
            quantity: 90,
            empty: 90,
            startDate: "21.03.2025",
            endDate: "14.07.2025",
        },
        {
            id: "INT1210", 
            nameCourse: "An toàn bảo mật hệ thống thông tin",
            class: "D22CQCN02-N",
            group: "02",
            credits: 3,
            quantity: 90,
            empty: 90,
            startDate: "21.03.2025",
            endDate: "14.07.2025",
        },
        {
            id: "INT1210", 
            nameCourse: "Nhập môn trí tuệ nhân tạo",
            class: "D22CQCN02-N",
            group: "01",
            credits: 3,
            quantity: 90,
            empty: 90,
            startDate: "21.03.2025",
            endDate: "14.07.2025",
        },
        {
            id: "INT1210", 
            nameCourse: "Nhập môn trí tuệ nhân tạo",
            class: "D22CQCN02-N",
            group: "02",
            credits: 3,
            quantity: 90,
            empty: 90,
            startDate: "21.03.2025",
            endDate: "14.07.2025",
        },
        {
            id: "INT1210", 
            nameCourse: "An toàn bảo mật hệ thống thông tin",
            class: "D22CQCN02-N",
            group: "01",
            credits: 3,
            quantity: 90,
            empty: 90,
            startDate: "21.03.2025",
            endDate: "14.07.2025",
        },
        {
            id: "INT1210", 
            nameCourse: "An toàn bảo mật hệ thống thông tin",
            class: "D22CQCN02-N",
            group: "02",
            credits: 3,
            quantity: 90,
            empty: 90,
            startDate: "21.03.2025",
            endDate: "14.07.2025",
        },
        {
            id: "INT1210", 
            nameCourse: "Nhập môn trí tuệ nhân tạo",
            class: "D22CQCN02-N",
            group: "01",
            credits: 3,
            quantity: 90,
            empty: 90,
            startDate: "21.03.2025",
            endDate: "14.07.2025",
        },
        {
            id: "INT1210", 
            nameCourse: "Nhập môn trí tuệ nhân tạo",
            class: "D22CQCN02-N",
            group: "02",
            credits: 3,
            quantity: 90,
            empty: 90,
            startDate: "21.03.2025",
            endDate: "14.07.2025",
        },

    ]

    const selectedSession = [
        {
            id: "INT1210", 
            nameCourse: "Nhập môn trí tuệ nhân tạo",
            class: "D22CQCN02-N",
            group: "02",
            credits: 3,
            registerDate: "20.02.2025: 12:30:23",
            startDate: "21.03.2025",
            endDate: "14.07.2025",
            status: "pending",
        },
        {
            id: "INT1210", 
            nameCourse: "An toàn bảo mật hệ thống thông tin",
            class: "D22CQCN02-N",
            group: "01",
            credits: 3,
            registerDate: "20.02.2025: 12:30:33",
            startDate: "21.03.2025",
            endDate: "14.07.2025",
            status: "pending",
        },
        {
            id: "INT1210", 
            nameCourse: "An toàn bảo mật hệ thống thông tin",
            class: "D22CQCN02-N",
            group: "02",
            credits: 3,
            registerDate: "20.02.2025: 14:30:47",
            startDate: "21.03.2025",
            endDate: "14.07.2025",
            status: "confirmed",
        },
    ]

    const [selected, setSelected] = useState(options[0]);


    return (
        <RegisterCourseContainer>
            <div className="filter-area">
                <FilterArea
                    options={options}
                    selected={selected}
                    setSelected={setSelected}
                />
            </div>
            <div className="register-area">
                <RegisterArea sessionList={openingSession}/>
            </div>
            <div className="selected-area">
                <SelectedArea sessionList={selectedSession}/>
            </div>
        </RegisterCourseContainer>
    );
};

export default RegisterCourse;