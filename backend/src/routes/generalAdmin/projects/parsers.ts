import { ProjectForm } from "../../../entities/project/types";
import { isPositiveNumber } from "../../../utils/numbers";
import { checkLength } from "../../../utils/string";
import { CreateProjectRequestBody, DeleteProjectRequestBody } from "./types";

export const parseToProjectName = (params: any): string => {
    if (!checkLength(params.projectName, 0, 255))
        throw new Error("Invalid project name");
    return params.projectName;
}
export const parseToCollaboratorName = (params: any): string => {
    if (!checkLength(params.collaboratorName, 0, 100))
        throw new Error("Invalid collaborator name");
    return params.projectName;
}
export const parseToProjectForm = (body: any, withId: boolean): ProjectForm => {
    const {
        id, name, description,
        startDate, endDate, leaderId
    } = body;
    if ((withId && !isPositiveNumber(id)) ||
        !checkLength(name, 1, 255) || 
        !checkLength(description, 1, 200)  ||
        !isPositiveNumber(startDate) || 
        !isPositiveNumber(endDate) ||
        !isPositiveNumber(leaderId))
        throw new Error("Invalid project form");
    const projectForm: ProjectForm = {
        name,
        description,
        startDate,
        endDate,
        leaderId
    };
    if (withId)
        projectForm.id = id;
    return projectForm;
}
export const parseToCreateProjectRequestBody = (body: any): CreateProjectRequestBody => {
    const {
        userId, 
        project
    } = body;
    if (!isPositiveNumber(userId))
        throw new Error("Invalid user id");
    return {
        userId,
        projectForm: parseToProjectForm(project, false)
    };
}
export const parseToProjectFormToUpdate = (body: any): ProjectForm => {
    return parseToProjectForm(body, true);
}
export const parseToDeleteProjectRequestBody = (body: any): DeleteProjectRequestBody => {
    const { userId, projectId } = body;
    if (!isPositiveNumber(userId) || !isPositiveNumber(projectId))
        throw new Error("Invalid form to delete project");
    return { userId, projectId };
}