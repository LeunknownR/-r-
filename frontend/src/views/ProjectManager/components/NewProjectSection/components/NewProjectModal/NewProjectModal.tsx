import Modal from "src/components/Modal/Modal";
import { NewProjectModalProps } from "./types";
import { Left, Right, Title } from "./styles";
import ProjectForm from "./components/ProjectForm/ProjectForm";
import CustomInputSearch from "src/components/CustomInputSearch/CustomInputSearch";
import ProjectInfo from "../../../ProjectInfo/ProjectInfo";
import Footer from "./components/Footer/Footer";
import { Column, Row } from "src/components/styles";
import { CloseButtonProjectForm } from "src/views/ProjectManager/styles";
import { Icon } from "@iconify/react/dist/iconify.js";
import LeaderSelector from "./components/LeaderSelector/LeaderSelector";
import { requestCreateProject } from "src/services/projects/relatedToProjects";

const testModalStyles = {
    padding: "0",
    borderRadius: "0",
    maxWidth: "1100px",
};

const NewProjectModal = ({
    modalProps,
    form,
    getProjectFromForm,
}: NewProjectModalProps) => {
    const registerProject = async () => {
        // preloader.show("Registrando empresa...");
        console.log("register")
        const data = await requestCreateProject(getProjectFromForm());
        // preloader.hide();
        // Error inesperado
        console.log(data)
        if (!data) return;
        // Error controlado
        // const { message } = data;
        // Exitoso
        modalProps.open(false);
        // modalNotifyProps.handleOpen(true);
    };
    return (
        <Modal {...modalProps} sizeProps={testModalStyles}>
            <Row width="100%">
                <Left>
                    <Column width="80%" alignSelf="center" gap="40px">
                        <Title>Nuevo Proyecto</Title>
                        <ProjectForm form={form} />
                    </Column>
                </Left>
                <Right>
                    <CloseButtonProjectForm
                        onClick={() => modalProps.open(false)}
                    >
                        <Icon icon="material-symbols:close" />
                    </CloseButtonProjectForm>
                    <Column width="80%" alignSelf="center" gap="35px">
                        <ProjectInfo form={form} variant="create"/>
                        <Column width="85%" alignSelf="center" gap="100px">
                            <LeaderSelector form={form} />
                            <Footer registerProject={registerProject}/>
                        </Column>
                    </Column>
                </Right>
            </Row>
        </Modal>
    );
};

export default NewProjectModal;
