import { ProjectTask } from "src/entities/projectTasks/entities";

export type ModifyTaskMenuProps = {
    currentProjectTask: ProjectTask | null;
    isTaskMenuOpen: boolean;
    hideTaskMenu: () => void;
}
export type ProjectTaskForm = {
    id?: number;
    responsibleId?: number | null;
    name: string;
    description: string | null;
    deadline: number;
    priorityId: number | null;
    [key: string]: any;
}