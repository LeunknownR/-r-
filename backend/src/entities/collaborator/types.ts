export type UserBase = {
	name: string,
	surname: string,
	urlPhoto: string | null,
	email: string
}
export type CollaboratorUser = UserBase & {
	id: number
};
export type ProjectRole = {
    id: number;
    name: string;
};
export type ProjectCollaborator = UserBase & {
    id: number,
	projectHasCollaboratorId: number,
    projectRole: ProjectRole
};
export type ProjectTasksPriorities =  {
    id: number,
	urlPhoto: string,
};