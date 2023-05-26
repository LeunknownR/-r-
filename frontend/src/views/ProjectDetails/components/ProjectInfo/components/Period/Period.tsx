import CustomButton from "src/components/CustomButton/CustomButton";
import { Row } from "src/components/styles";
import { Dates } from "./styles";
import { PeriodProps } from "./types";

const Period = ({ period, openUpdateDateModal }: PeriodProps) => {
    return (
        <Row align="center" gap="16px" padding="0 0 0 65px">
            <Dates>
                <b>Período</b> {period}
            </Dates>
            <CustomButton
                content="Finalización"
                icon="material-symbols:edit"
                size="supersmall"
                onClick={openUpdateDateModal}
            />
        </Row>
    );
};

export default Period;