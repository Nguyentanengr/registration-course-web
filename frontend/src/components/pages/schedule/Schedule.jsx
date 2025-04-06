import FilterArea from '../../features/schedule/FilterArea';
import TimeTableArea from '../../features/schedule/TimeTableArea';
import { ScheduleContainer } from './Schedule.styled';

const Schedule = () => {
    return (
        <ScheduleContainer>
            <div className="filter-area">
                <FilterArea />
            </div>   
            <div className="timetable-area">
                <TimeTableArea />
            </div>
        </ScheduleContainer>
    );
};

export default Schedule;