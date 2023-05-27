import { Icon } from "@iconify/react/dist/iconify.js";
import { Row } from "../styles";
import {
    CloseIconContainer,
    Container,
    IconContainer,
    TextModal,
    TitleModal,
} from "./styles";
import { NotificationCardProps } from "./types";
import {useEffect, useState} from "react";
import {
    DELTA_SECONDS } from "./utils/constants";

const NotificationCard = ({
    handler: { timeoutToClose, visible, hide },
    variant = "success",
}: NotificationCardProps) => {
    const [timeLeft, setTimeLeft] = useState<number>(timeoutToClose);
    const [progress, setProgress] = useState(0);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | undefined>();
    //#region Effects
    const initChronometer = () => {
        if (!visible) {
            clearInterval(intervalId);
            return;
        }
        let newIntervalId: NodeJS.Timeout | undefined;
        setTimeLeft(timeoutToClose);
        setTimeout(() => {
            newIntervalId = setInterval(() => {
                setTimeLeft(currentTimeLeft => {
                    // Eliminando interval al término del tiempo determinado
                    if (currentTimeLeft <= 0) {
                        clearInterval(newIntervalId);
                        return 0;
                    }
                    return currentTimeLeft - DELTA_SECONDS;
                });
            }, DELTA_SECONDS * 1000);
            setIntervalId(newIntervalId);
        }, 100);
    };
    useEffect(initChronometer, [visible]);
    useEffect(() => {
        fillProgress();
    }, [timeLeft]);
    //#endregion
    //#region Functions
    const fillProgress = () => {
        setProgress((timeLeft / timeoutToClose) * 100);
    };
    const getClassName = (): string => {
        const classList: string[] = [variant];
        visible && classList.push("visible");
        return classList.join(" ");
    };
    return (
        <Container
            className={getClassName()}
            progress={progress}>
            <CloseIconContainer onClick={() => hide()}>
                <Icon icon="mdi:close" />
            </CloseIconContainer>
            <Row align="center" gap="10px">
                <IconContainer>
                    <Icon icon="material-symbols:check-circle-outline" />
                </IconContainer>
                <TitleModal>CAMBIOS GUARDADOS</TitleModal>
            </Row>
            <TextModal>Los cambios realizados se guardaron correctamente.</TextModal>
        </Container>
    );
};

export default NotificationCard;
