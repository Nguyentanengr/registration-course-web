import { ContentContainer } from "./Content.styled";


const Content = ({ children, status }) => {
    return (
        <ContentContainer status={status}>
            {children}
        </ContentContainer>
    );
};

export default Content;
