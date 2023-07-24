/* eslint-disable no-constant-condition */
import useMainContext from "src/utils/contexts/main-context/useMainContext";
import { BackButton, Container, FormButton, NextButton } from "./styles";
import { FlexFlow } from "src/components/styles";
import { ActionButtonsProps } from "./types";

const ActionButtons = ({ tabIdx, moveTab }: ActionButtonsProps) => {
    const { isMobile } = useMainContext();
    return (
        <Container width="100%">
            {isMobile && (
                <FlexFlow gap="20px">
                    <BackButton
                        icon="memory:bow-arrow"
                        disabled={tabIdx === 0}
                        onClick={() => moveTab(0)}
                    />
                    <NextButton
                        icon="memory:bow-arrow"
                        disabled={tabIdx === 1}
                        onClick={() => moveTab(1)}
                    />
                </FlexFlow>
            )}
            <FormButton
                onClick={() => console.log("GNOMO")}
                content={true ? "Actualizar" : "Crear"}
                variant="main"
            />
        </Container>
    );
};

export default ActionButtons;