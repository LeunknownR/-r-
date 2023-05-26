import CustomButton from "src/components/CustomButton/CustomButton";
import { Container } from "./styles";
import { FooterProps } from "./types";

const Footer = ({ closeModal, updateProjectEndDate }: FooterProps) => {
    return (
        <Container>
            <CustomButton
                content="Cancelar"
                variant="blue-modal-2"
                onClick={closeModal}
            ></CustomButton>
            <CustomButton
                content="Guardar"
                variant="blue-modal"
                onClick={updateProjectEndDate}
            ></CustomButton>
        </Container>
    );
};

export default Footer;