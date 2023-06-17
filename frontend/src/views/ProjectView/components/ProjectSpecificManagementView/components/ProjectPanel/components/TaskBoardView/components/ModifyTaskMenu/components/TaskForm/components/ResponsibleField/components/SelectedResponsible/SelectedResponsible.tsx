import UserImage from "src/views/components/UserImage/UserImage";
import { SelectedResponsibleProps } from "./types";
import { Container } from "./styles";
import { FlexFlow } from "src/components/styles";
import { Icon } from "@iconify/react/dist/iconify.js";
import { DeleteSelectedDataField } from "../../../../styles";
import useTaskBoardContext from "../../../../../../../../utils/contexts/useTaskBoardContext";

const SelectedResponsible = ({
    selectedResponsible,
    eraseSelectedResponsible
}: SelectedResponsibleProps) => {
    const { name, surname, urlPhoto } = selectedResponsible;
    const { isTaskResponsible } = useTaskBoardContext();
    return (
        <FlexFlow width="100%" align="center" gap="5px">
            <Container>
                <UserImage
                    name={name}
                    surname={surname}
                    urlPhoto={urlPhoto}
                    className="small"
                />
                <span title={`${name} ${surname}`}>
                    {name} {surname}
                </span>
            </Container>
            {isTaskResponsible && <DeleteSelectedDataField onClick={eraseSelectedResponsible}>
                <Icon icon="material-symbols:close" />
            </DeleteSelectedDataField>}
        </FlexFlow>
    );
};

export default SelectedResponsible;
