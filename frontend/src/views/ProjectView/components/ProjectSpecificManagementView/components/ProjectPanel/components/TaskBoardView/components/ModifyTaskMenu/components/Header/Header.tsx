import { Container, DeleteButton } from "./styles";
import { HeaderProps } from "./types";
import TaskNameField from "./components/TaskNameField/TaskNameField";
import useTaskBoardContext from "../../../../utils/contexts/useTaskBoardContext";

const Header = ({
    form,
    name,
    doUpdateTask,
    openModalDeleteTask,
}: HeaderProps) => {
    const { isTaskLeaderOrResponsible } = useTaskBoardContext();
    return (
        <Container justify="space-between" align="center" gap="15px">
            <TaskNameField
                form={form}
                name={name}
                doUpdateTask={doUpdateTask}
            />
            {isTaskLeaderOrResponsible && (
                <DeleteButton icon="ion:skull" onClick={openModalDeleteTask} />
            )}
        </Container>
    );
};

export default Header;
