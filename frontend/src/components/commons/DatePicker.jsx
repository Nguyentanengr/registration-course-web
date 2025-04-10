import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Theme } from '../../assets/styles/Theme';
import { Icons } from '../../assets/icons/Icon';

const DatePickerContainer = styled.div`
  position: relative;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${Theme.border};
  border-radius: 5px;
  padding: 8px;
  cursor: pointer;
  width: 100%;
`;

const Input = styled.input`
  border: none;
  outline: none;
  font-size: 16px;
  width: 100%;
`;

const Icon = styled.div`
  margin-left: 5px;
  font-size: 20px;
`;

const Calendar = styled.div`
  position: absolute;
  top: 110%;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border: 1px solid ${Theme.hover};
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 10;
  padding: 8px;
  width: 240px;
  font-size: 12px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const MonthYear = styled.div`
  font-weight: bold;
  font-size: 12px;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  text-align: center;
`;

const DayLabel = styled.div`
  font-weight: bold;
  color: ${Theme.textSoft};
  padding: 5px;
  font-size: 12px;
`;

const Day = styled.div`
  padding: 5px;
  border-radius: 5px;
  font-size: 12px;
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? '#007bff' : 'transparent')};
  color: ${({ selected }) => (selected ? 'white' : 'black')};
  ${({ disabled }) => disabled && `
    color: ${Theme.textSoft};
    cursor: not-allowed;
  `}

  &:hover {
    background-color: ${({ disabled }) => !disabled && '#e0e0e0'};
  }
`;

const DatePicker = ({ value = '', onChange }) => {
    const thisRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    // Initialize with current date if no value is provided
    useEffect(() => {
        if (!value && onChange) {
            console.log("re-render");
            const today = new Date();
            const todayStr = today.toLocaleDateString('en-GB');
            if (value !== todayStr) { // Chỉ gọi onChange nếu value không phải là ngày hiện tại
                onChange(todayStr);
            }
        }
    }, [value, onChange]);

    const selectedDate = value ? new Date(value) : new Date();

    const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

    const handlePrevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    const handleDateClick = (day) => {
        const newDate = new Date(currentYear, currentMonth, day);
        setIsOpen(false);
        if (onChange) onChange(newDate.toLocaleDateString('en-GB'));
    };

    const renderDays = () => {
        const totalDays = daysInMonth(currentMonth, currentYear);
        const firstDay = firstDayOfMonth(currentMonth, currentYear);
        const days = [];

        for (let i = 0; i < firstDay; i++) {
            days.push(<Day key={`empty-${i}`} disabled />);
        }

        for (let day = 1; day <= totalDays; day++) {
            const isSelected = selectedDate && 
                selectedDate.getDate() === day &&
                selectedDate.getMonth() === currentMonth &&
                selectedDate.getFullYear() === currentYear;
            days.push(
                <Day
                    key={day}
                    selected={isSelected}
                    onClick={() => handleDateClick(day)}
                >
                    {day}
                </Day>
            );
        }

        return days;
    };

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (thisRef.current && !thisRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <DatePickerContainer ref={thisRef}>
            <InputWrapper onClick={() => setIsOpen(!isOpen)}>
                <Input
                    type="text"
                    value={value || selectedDate.toLocaleDateString('en-GB')}
                    readOnly
                />
                <Icon><Icons.Calendar /></Icon>
            </InputWrapper>
            {isOpen && (
                <Calendar>
                    <Header>
                        <NavButton onClick={handlePrevMonth}>←</NavButton>
                        <MonthYear>{monthNames[currentMonth]} {currentYear}</MonthYear>
                        <NavButton onClick={handleNextMonth}>→</NavButton>
                    </Header>
                    <DaysGrid>
                        <DayLabel>Su</DayLabel>
                        <DayLabel>Mo</DayLabel>
                        <DayLabel>Tu</DayLabel>
                        <DayLabel>We</DayLabel>
                        <DayLabel>Th</DayLabel>
                        <DayLabel>Fr</DayLabel>
                        <DayLabel>Sa</DayLabel>
                        {renderDays()}
                    </DaysGrid>
                </Calendar>
            )}
        </DatePickerContainer>
    );
};

export default DatePicker;