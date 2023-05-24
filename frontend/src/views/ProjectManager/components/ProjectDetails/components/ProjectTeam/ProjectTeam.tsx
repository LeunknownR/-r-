import { Column } from "src/components/styles";
import MemberList from "./components/MemberList/MemberList";
import Header from "./components/Header/Header";

const ProjectTeam = () => {
    
    return (
        <Column align="center" margin="15px 0 0" gap="20px">
            <Header />
            <MemberList />
        </Column>
    );
};

export default ProjectTeam;
