import { useEffect, useRef, useState } from 'react';
import { EditSectionDialogContainer } from './EditSectionDialog.styled';
import SelectOption from '../../commons/SelectOption';
import CounterBox from '../../commons/CounterBox';
import { useDispatch, useSelector } from 'react-redux';
import { resetFetchState, setEditSectionForm, setEditSectionFormItem } from '../../../stores/slices/editSectionSlice';
import { fetchActiveClassIds } from '../../../apis/classApi';
import { generateFromCurrentYears } from '../open-section/AddPeriod';
import { fetchCourseBySemester } from '../../../apis/courseApi';
import { dowEngToVie } from '../../../stores/slices/scheduleSlice';
import { convertToDayMonthYear } from '../schedule/FilterArea';
import { fetchScheduleOnSection } from '../../../apis/scheduleApi';
import { Icons } from '../../../assets/icons/Icon';
import DatePicker from '../../commons/DatePicker';
import { fetchSections, fetchSectionsBySemester, updateSectionInfo } from '../../../apis/sectionApi';
import Alert from '../../commons/Alert';
import { current } from '@reduxjs/toolkit';

const EditSectionDialog = ({ setEditSection, section }) => {

    const dispatch = useDispatch();
    const thisRef = useRef(null);
    const [invalidInput, setInvalidInput] = useState('');
    const { editSectionForm, postLoading, postError } = useSelector((state) => state.editSection);
    const {
        groupNumber,
        minStudents,
        maxStudents,
    } = useSelector((state) => state.editSection.editSectionForm);
    const {
        filter, searchKey, currentPage, itemPerPage
    } = useSelector((state) => state.section);

    const handleClickCancel = () => {
        setEditSection(null);
    };

    // khi click update -> gọi api cập nhật
    const handleClickConfirm = () => {
        dispatch(updateSectionInfo({ sessionId: section.sessionId, editSectionForm: editSectionForm}))
            .unwrap()
            .then((action) => {
                // khi update thành công -> đóng form, xóa trạng thái.
                dispatch(fetchSections({ filter, searchKey, currentPage, itemPerPage }));
                setEditSection(null);
            });
    };

    const validateInput = () => {
        if (groupNumber <= 0 || groupNumber > 10) {
            return 'Số thứ tự nhóm nằm trong khoảng 1 - 10';
        }
        if (minStudents < 1) {
            return 'Số sinh viên tối thiểu phải lớn hơn 0';
        }
        if (maxStudents > 200) {
            return 'Số sinh viên tối đa không được vượt quá 200';
        }
        if (minStudents > maxStudents) {
            return 'Số sinh viên tối thiểu phải nhỏ hơn hoặc bằng số sinh viên tối đa';
        }
        return '';
    };

    useEffect(() => {
        setInvalidInput(validateInput());
    }, [groupNumber, minStudents, maxStudents]);

    // Tải dữ liệu
    useEffect(() => {

        dispatch(setEditSectionFormItem({
            clazzId: section.clazzId,
            year: section.year,
            semester: section.semester,
            courseId: section.courseInfo.courseId,
            groupNumber: section.groupNumber,
            minStudents: section.minStudents,
            maxStudents: section.maxStudents,
        }));
        return () => {
            dispatch(setEditSectionForm({}));
            dispatch(resetFetchState());
        };
    }, []);

    // Nếu click ra ngoài
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (thisRef.current && !thisRef.current.contains(e.target)) {
                setEditSection(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        console.log("editSectionForm");
        console.log(editSectionForm);
    }, [editSectionForm])

    return (
        <EditSectionDialogContainer ref={thisRef}>
            <div className="title-cont">
                <h2>Chỉnh sửa lớp học phần </h2>
                <small>Điền đầy đủ thông tin để cập nhật lớp học phần {section.sessionId}</small>
            </div>
            <div className="section-1">
                <div className="option-box">
                    <div className="o-title">
                        Lớp sinh viên
                    </div>
                    <div className="select-option disable">
                        <SelectOption
                            value={section.clazzId}
                        />
                    </div>
                </div>
                <div className="option-box">
                    <div className="o-title">
                        Năm học
                    </div>
                    <div className="select-option disable">
                        <SelectOption
                            value={section.year}
                        />
                    </div>
                </div>
                <div className="option-box">
                    <div className="o-title">
                        Học kì
                    </div>
                    <div className="select-option disable">
                        <SelectOption
                            value={section.semester}
                        />
                    </div>
                </div>
            </div>
            <div className="section-2">
                <div className="option-box">
                    <div className="o-title">
                        Môn học
                    </div>
                    <div className="select-option disable">
                        <SelectOption
                            value={section.courseInfo.courseId + ' - ' + section.courseInfo.courseName}
                        />
                    </div>
                </div>
            </div>
            <div className="section-3">
                <div className="counter-box">
                    <div className="c-title">
                        Số thứ tự nhóm
                    </div>
                    <div className="counter">
                        <CounterBox
                            value={groupNumber}
                            onChange={(value) => dispatch(setEditSectionFormItem({ groupNumber: value }))}
                        />
                    </div>
                </div>
                <div className="counter-box">
                    <div className="c-title">
                        Số sinh viên tối thiểu
                    </div>
                    <div className="counter">
                        <CounterBox
                            value={minStudents}
                            onChange={(value) => dispatch(setEditSectionFormItem({ minStudents: value }))}
                        />
                    </div>
                </div>
                <div className="counter-box">
                    <div className="c-title">
                        Số sinh viên tối đa
                    </div>
                    <div className="counter">
                        <CounterBox
                            value={maxStudents}
                            onChange={(value) => dispatch(setEditSectionFormItem({ maxStudents: value }))}
                        />
                    </div>
                </div>
            </div>
            {<span
                className={`error ${invalidInput ? 'visible' : ''}`}
            >
                {invalidInput}
            </span>}
            <div className="footer">
                <button className="cancel-btn" onClick={handleClickCancel}>Hủy</button>
                <button className={`confirm-btn ${invalidInput ? 'disable' : ''}`} onClick={handleClickConfirm}>{postLoading ? 'Đang xử lý..' : 'Xác nhận'}</button>
                {postError && <Alert message={postError.message} />}
            </div>
        </EditSectionDialogContainer>
    );
};

export default EditSectionDialog;