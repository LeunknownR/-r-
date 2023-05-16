import { AddProjectMembersRequestBody, SearchCollaboratorRequestBody, UpdateEndDateProjectRequestBody } from "../../../entities/project/types";
import { isPositiveArrayNumber, isPositiveNumber } from "../../../utils/numbers";
import { checkLength } from "../../../utils/string";
import { GetProjectListForCollaboratorRequestBody } from "./types";

export const parseToGetProjectListForCollaboratorRequestBody = (params: any): GetProjectListForCollaboratorRequestBody => {
    const { collaboratorId, projectName } = params;
    if (!isPositiveNumber(collaboratorId) ||
        !checkLength(projectName, 0, 50))
        throw new Error();
    return {
        collaboratorId,
        projectName
    };
}
export const parseToCollaboratorName = (params: any): string => {
    const { collaboratorName } = params;
    if (!checkLength(collaboratorName, 0, 100))
        throw new Error("Invalid collaborator name");
    return collaboratorName;
}
export const parseToSearchCollaboratorRequestBody = (params: any): SearchCollaboratorRequestBody => {
    const { projectId, collaboratorName } = params;
    if (!isPositiveNumber(projectId) || 
        !checkLength(collaboratorName, 0, 100))
        throw new Error("Invalid request body to search collaborator");
    return { projectId, collaboratorName };
}
export const parseToProjectId = (params: any): number => {
    if (!isPositiveNumber(params.projectId))
        throw new Error("Invalid projectId");
    return params.projectId;
}
export const parseToProjectIdToGetDetails = (params: any) => {
    const { projectId } = params;
    if (!isPositiveNumber(projectId))
        throw new Error("Invalid project id");
    return projectId;
}
export const parseToUpdateEndDateProjectRequestBody = (body: any): UpdateEndDateProjectRequestBody => {
    const {
        projectId,
        endDate
    } = body;
    if (!isPositiveNumber(projectId) ||
        !isPositiveNumber(endDate))
        throw new Error("Invalid form to update end date of the project");
    return {
        projectId,
        endDate
    };
}
export const parseToAddProjectMembersRequestBody = (body: any): AddProjectMembersRequestBody => {
    const {
        projectId,
        membersIds
    } = body;
    if (!isPositiveNumber(projectId) ||
        !isPositiveArrayNumber(membersIds))
        throw new Error("Invalid form to add collaborators in the project");
    return {
        projectId,
        membersIds
    };
}