import FilterArea from '../../features/open-section/FilterArea';
import { OpenSectionContainer } from './OpenSection.styled';

const OpenSection = () => {
    return (
        <OpenSectionContainer>
            <div className="filter-area">
                <FilterArea />
            </div>
        </OpenSectionContainer>
    );
};

export default OpenSection;