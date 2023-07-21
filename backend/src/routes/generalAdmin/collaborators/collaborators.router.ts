import { Router } from "express";
import Authentication from "../../../utils/authentication";
import { DBRoles } from "../../../db/enums";
import { ApiPathEndpointsGeneralAdmin } from "../../apiPaths";
import { withErrorHandler } from "../../helpers";
import { GenerateResponseBody } from "../../../utils/response/generateResponseBody";
import { ResponseCodes, ResponseMessages } from "../../../utils/response/enums";
import { User } from "../../../entities/user/User";
import CollaboratorController from "../../../controllers/collaboratorController/collaborator.controller";
import SearchedCollaboratorPayload from "./utils/entities/SearchedCollaboratorPayload";
import BasicCollaboratorUser from "../../../entities/collaborator/BasicCollaboratorUser";
import { parseToCollaboratorName } from "../projects/parsers";

const router = Router();
router.use("/", Authentication.checkTokenInEndpoints(DBRoles.GeneralAdmin));
router.get(
    ApiPathEndpointsGeneralAdmin.SearchCollaborator,
    withErrorHandler(async (req, res) => {
        const username: string = parseToCollaboratorName(req.params);
        const collaboratorUserList: BasicCollaboratorUser[] = await CollaboratorController.searchCollaborator(username);
        GenerateResponseBody.sendResponse<BasicCollaboratorUser[]>(res, {
            code: ResponseCodes.Ok,
            message: ResponseMessages.Success,
            data: collaboratorUserList
        });
    }));
router.get(
    ApiPathEndpointsGeneralAdmin.GetCollaborators, 
    withErrorHandler(async (req, res) => {     
        const searchedCollaboratorPayload: SearchedCollaboratorPayload = new SearchedCollaboratorPayload(req.body);
        const collaboratorList: User[] = await CollaboratorController.getCollaboratorList(searchedCollaboratorPayload);
        GenerateResponseBody.sendResponse<User[]>(res, {
            code: ResponseCodes.Ok,
            message: ResponseMessages.Success,
            data: collaboratorList
        });
    })); 
router.get(
    ApiPathEndpointsGeneralAdmin.CreateCollaborator, 
    withErrorHandler(async (req, res) => {     
        const searchedCollaboratorPayload: SearchedCollaboratorPayload = new SearchedCollaboratorPayload(req.body);
        const collaboratorList: User[] = await CollaboratorController.getCollaboratorList(searchedCollaboratorPayload);
        GenerateResponseBody.sendResponse<User[]>(res, {
            code: ResponseCodes.Ok,
            message: ResponseMessages.Success,
            data: collaboratorList
        });
    })); 

export default router;