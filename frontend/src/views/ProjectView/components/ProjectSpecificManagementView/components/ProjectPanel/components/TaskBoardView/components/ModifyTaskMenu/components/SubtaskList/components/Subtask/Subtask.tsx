//#region Libraries
import { Icon } from "@iconify/react/dist/iconify.js";
import { ChangeEvent, useState, useRef } from "react";
//#endregion
//#region Styles
import { FlexFlow } from "src/components/styles";
import { Container, Skull, SubtaskTextField } from "./styles";
//#endregion
//#region Types
import { SubtaskProps } from "./types";
import useTaskBoardContext from "../../../../../../utils/contexts/useTaskBoardContext";
import WSProjectTaskServiceEvents from "src/services/websockets/services/projectTasks/events";
import { WSProjectSubtaskToBeSwitchedCheckStatus } from "src/services/websockets/services/projectTasks/utils/entities";
import { Check } from "../../styles";
//#endregion

const Subtask = ({ subtask }: SubtaskProps) => {
    const { socketIo } = useTaskBoardContext();
    const { name, checked, id } = subtask;
    const subtaskTextFieldRef = useRef<HTMLInputElement>(null);
    const { canEditTask } = useTaskBoardContext();
    //#region States
    const [timeoutToTaskUpdateId, setTimeoutToTaskUpdateId] = useState<
        NodeJS.Timeout | undefined
    >();
    const [subtaskNameForm, setSubtaskNameForm] = useState<string | null>(null);
    //#endregion
    //#region Functions
    const getClassName = (): string => {
        const classList = [];
        checked && classList.push("checked");
        return classList.join(" ");
    };
    const updateSubtask = (subtaskName: string): void => {
        clearTimeout(timeoutToTaskUpdateId);
        const newTimeoutToTaskUpdateId: NodeJS.Timeout = setTimeout(() => {
            const subtaskToBeUpdated = {
                subtaskId: id,
                name: subtaskName,
            };
            socketIo?.emit(
                WSProjectTaskServiceEvents.Collaborator.UpdateSubtask,
                subtaskToBeUpdated
            );
        }, 350);
        setTimeoutToTaskUpdateId(newTimeoutToTaskUpdateId);
    };
    const deleteSubtask = (): void => {
        if (!socketIo) return;
        socketIo.emit(
            WSProjectTaskServiceEvents.Collaborator.DeleteSubtask,
            subtask.id
        );
    };
    const changeSubtaskName = ({
        target: { value },
    }: ChangeEvent<HTMLInputElement>) => {
        if (!canEditTask) return;
        setSubtaskNameForm(value);
        updateSubtask(value);
    };
    const switchCheckStatus = () => {
        const subtaskToBeSwitchedCheckStatus: WSProjectSubtaskToBeSwitchedCheckStatus =
            {
                subtaskId: id,
                checked: !checked,
            };
        socketIo?.emit(
            WSProjectTaskServiceEvents.Collaborator.SwitchCheckStatusSubtask,
            subtaskToBeSwitchedCheckStatus
        );
    };
    const cancelSubtaskEditing = (): void => {
        setSubtaskNameForm(null);
    };
    const startSubtaskEditing = (): void => {
        setSubtaskNameForm(name);
    };
    const keyDownHandler: React.KeyboardEventHandler<HTMLInputElement> = e => {
        if (e.key === "Enter") {
            subtaskTextFieldRef.current?.blur();
            return;
        }
        if (e.key === "Backspace" && !subtaskNameForm) {
            socketIo?.emit(
                WSProjectTaskServiceEvents.Collaborator.DeleteSubtask,
                id
            );
            return;
        }
    };
    //#endregion
    return (
        <Container
            className={getClassName()}
            justify="space-between"
            align="center"
            padding="8px 15px"
        >
            <FlexFlow gap="12px" align="center">
                <Check onClick={switchCheckStatus}>
                    <Icon icon={checked ? "material-symbols:check-circle" : "gg:check-o"}/>
                </Check>
                <SubtaskTextField
                    ref={subtaskTextFieldRef}
                    value={subtaskNameForm === null ? name : subtaskNameForm}
                    onFocus={startSubtaskEditing}
                    onBlur={cancelSubtaskEditing}
                    onKeyDown={keyDownHandler}
                    onChange={changeSubtaskName}
                    disabled={!canEditTask}
                />
            </FlexFlow>
            {canEditTask && (
                <Skull onClick={deleteSubtask}>
                    <Icon icon="ion:skull" />
                </Skull>
            )}
        </Container>
    );
};

export default Subtask;
