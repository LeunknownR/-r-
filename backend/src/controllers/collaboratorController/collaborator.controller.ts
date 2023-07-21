import BasicCollaboratorUser from "../../entities/collaborator/BasicCollaboratorUser";
import { User } from "../../entities/user/User";
import CollaboratorModel from "../../models/collaboratorModel/collaborator.model";
import { QueryResultWithOutParams } from "../../models/types";
import ChangeCollaboratorPasswordPayload from "../../routes/collaborator/profile/utils/entities/ChangeCollaboratorPasswordPayload";
import UpdateCollaboratorPhotoPayload from "../../routes/collaborator/profile/utils/entities/UpdateCollaboratorPhotoPayload";
import { CollaboratorCreationForm, CollaboratorDeletedForm, CollaboratorUpdatingForm } from "../../routes/generalAdmin/collaborators/utils/entities/CollaboratorForm";
import SearchedCollaboratorPayload from "../../routes/generalAdmin/collaborators/utils/entities/SearchedCollaboratorPayload";
import { HandlerFiles } from "../../utils/files";
import { ResponseMessages } from "../../utils/response/enums";
import { PaginableList } from "../../utils/types";
import { COLLABORATOR_RECORDS_BY_PAGE } from "./utils/constants";

export default abstract class CollaboratorController {
    static async searchCollaborator(username: string): Promise<BasicCollaboratorUser[]> {
        const resultset: any[] = await CollaboratorModel.searchCollaborator(username);
        const collaborators: BasicCollaboratorUser[] = resultset.map(record => new BasicCollaboratorUser(record));
        return collaborators;
    }
    static async getCollaboratorList({
        searchedCollaborator, page
    }: SearchedCollaboratorPayload): Promise<PaginableList<User>> {
        const offset: number = (page - 1) * COLLABORATOR_RECORDS_BY_PAGE;
        const { resultset, outParams } = await CollaboratorModel.getCollaboratorList(searchedCollaborator, offset);
        const userList: User[] = resultset.map(record => new User(record));
        const count: number = outParams["collaborators_count"];
        return {
            list: userList,
            count
        };
    }
    static async updateCollaborator(form: CollaboratorUpdatingForm): Promise<string> {
        const { photo } = form;
        // Creando foto nueva si es que se quiere cambiar la foto y si es que existe base64
        const urlPhoto: string | null =
            photo.changePhoto && photo.base64
                ? await HandlerFiles.createImage(photo.base64)
                : null;
        const { resultset, outParams } = await CollaboratorModel.updateCollaborator(form, urlPhoto);
        const urlPhotoToDestroy: string | null = outParams["url_photo_to_destroy"];
        // Eliminando foto antigua si se quiere cambiar la foto y si es que previamente tenía
        if (photo.changePhoto && urlPhotoToDestroy)
            await HandlerFiles.destroyImage(urlPhotoToDestroy);
        return resultset[0]["message"];
    }
    static async updateCollaboratorPhoto(payload: UpdateCollaboratorPhotoPayload): Promise<string | null> {
        const { photoInBase64 } = payload;
        // Creando foto nueva si es que existe base64
        const urlPhoto: string | null =
            photoInBase64
                ? await HandlerFiles.createImage(photoInBase64)
                : null;
        const record: any = await CollaboratorModel.updateCollaboratorPhoto(payload.collaboratorId, urlPhoto);
        const urlPhotoToDestroy: string | null = record["url_photo_to_destroy"];
        // Eliminando foto antigua si es que previamente tenía una
        if (urlPhotoToDestroy)
            await HandlerFiles.destroyImage(urlPhotoToDestroy);
        return urlPhoto;
    }
    static async createCollaborator(form: CollaboratorCreationForm): Promise<string> {
        const { photoInBase64 } = form;
        // Creando foto si es que existe base64
        const urlPhoto: string | null =
            photoInBase64
                ? await HandlerFiles.createImage(photoInBase64)
                : null;
        const record: any = await CollaboratorModel.createCollaborator(form, urlPhoto);
        if (!record)
            throw new Error("It couldn't be created collaborator");
        const message: string = record["message"];
        return message || ResponseMessages.FatalError;
    }
    static async deleteCollaborator(collaboratorId: CollaboratorDeletedForm): Promise<string> {
        const record: any = await CollaboratorModel.deleteCollaborator(collaboratorId);
        if (!record)
            throw new Error("It couldn't be deleted collaborator");
        const message: string = record["message"];
        return message || ResponseMessages.FatalError;
    }
    static async changeCollaboratorPassword(payload: ChangeCollaboratorPasswordPayload): Promise<string> {
        const record: any = await CollaboratorModel.changeCollaboratorPassword(payload);
        if (!record)
            throw new Error("It couldn't be change collaborator password");
        const message: string = record["message"];
        return message || ResponseMessages.FatalError;
    }
};