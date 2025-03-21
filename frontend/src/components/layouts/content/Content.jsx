import { ContentContainer } from "./Content.styled";


const Content = ({ children }) => {
    return (
        <ContentContainer>
            {children}
        </ContentContainer>
    );
};

export default Content;
