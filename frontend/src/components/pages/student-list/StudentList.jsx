import FilterArea from '../../features/student-list/FilterArea';
import TableArea from '../../features/student-list/TableArea';
import { StudentListContainer } from './StudentList.styled';

const StudentList = () => {
    return (
        <StudentListContainer>
            
            <div className="filter-area">
                <FilterArea />
            </div>

            <div className="table-area">
                <TableArea />
            </div>
        </StudentListContainer>
    );
};

export default StudentList;
