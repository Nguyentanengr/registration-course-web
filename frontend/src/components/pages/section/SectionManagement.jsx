import FilterArea from '../../features/section/FilterArea';
import SectionArea from '../../features/section/SectionArea';
import { SectionManagementContainer } from './SectionManagement.styled';

const SectionManagement = () => {
    return (
        <SectionManagementContainer>
            <div className="filter-area">
                <FilterArea />
            </div>
            <div className="section-area">
                <SectionArea />
            </div>

        </SectionManagementContainer>
    );
};

export default SectionManagement;