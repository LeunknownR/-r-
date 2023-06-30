import { bufferToBoolean } from "../../db/helpers";
import { RelationCollaboratorChat } from "../../entities/chats/chatMessage/chatCollaboratorRelation";
import FormattedProjectChatMessages from "../../entities/chats/chatMessage/formattedProjectChatMessage";
import PrivateChatMessage from "../../entities/chats/chatMessage/privateChatMessage";
import ProjectChatMessage from "../../entities/chats/chatMessage/projectChatMessage";
import { PrivateChatPreview } from "../../entities/chats/chatPreview/privateChatPreview";
import { ProjectChatPreview } from "../../entities/chats/chatPreview/projectChatPreview";
import ChatModel from "../../models/chatModel/chat.model";
import { IntegerId } from "../../utils/entities/integerId";
import WSPrivateMessage from "../../websockets/services/chats/utils/entities/privateMessage";
import WSSearchPrivateChatPreviewPayload from "../../websockets/services/chats/utils/entities/searchPrivateChatPreviewPayload";
import WSSearchProjectChatPreviewPayload from "../../websockets/services/chats/utils/entities/searchProjectChatPreviewPayload";

export default abstract class ChatController {
    static async searchPrivateChatPreviewList(getPrivateChatPreviewPayload: WSSearchPrivateChatPreviewPayload): Promise<PrivateChatPreview[]> {
        const resultset: any[] = await ChatModel.searchPrivateChatPreviewList(getPrivateChatPreviewPayload);
        return resultset.map(record => new PrivateChatPreview(record));
    }
    static async searchProjectChatPreviewList(
        searchedProject: string,
        collaboratorId: number
    ): Promise<ProjectChatPreview[]> {
        const resultset: any[] = await ChatModel.searchProjectChatPreviewList(searchedProject, collaboratorId);
        return resultset.map(record => new ProjectChatPreview(record));
    }
    static async getPrivateChatPreviewListWithMessages(collaboratorId: number): Promise<PrivateChatPreview[]> {
        const resultset: any[] = await ChatModel.getPrivateChatPreviewListWithMessages(collaboratorId);
        return resultset.map(record => new PrivateChatPreview(record));
    }
    static async getProjectChatPreviewListWithMessages(projectId: number): Promise<ProjectChatPreview[]> {
        const resultset: any[] = await ChatModel.getPrivateChatPreviewListWithMessages(projectId);
        return resultset.map(record => new ProjectChatPreview(record));
    }
    static async getPrivateChatMessages(collaboratorId: number, collaboratorChatId: IntegerId): Promise<PrivateChatMessage[]> {
        const resultset: any[] = await ChatModel.getPrivateChatMessages(
            collaboratorId,
            collaboratorChatId.value
        );
        return resultset.map(record => new PrivateChatMessage(record));
    }
    static async getRelationsWithChatCollaborator(
        collaboratorId: number,
        collaboratorChatId: number
    ): Promise<RelationCollaboratorChat[]> {
        return [];
    }
    static async getProjectChatMessages(projectId: IntegerId): Promise<FormattedProjectChatMessages> {
        const resultset: any[] = await ChatModel.getProjectChatMessages(projectId.value);
        return new FormattedProjectChatMessages(resultset);
    }
    static async markPrivateChatMessagesAsSeen(
        collaboratorId: number,
        collaboratorChatId: number
    ): Promise<void> {
        await ChatModel.markPrivateChatMessagesAsSeen(
            collaboratorId,
            collaboratorChatId
        );
    }
    static async markProjectChatMessagesAsSeen(
        collaboratorId: number,
        projectId: number
    ): Promise<void> {
        await ChatModel.markPrivateChatMessagesAsSeen(
            collaboratorId,
            projectId
        );
    }
    static async sendMessageToPrivateChat(
        senderId: number,
        privateMessage: WSPrivateMessage
    ): Promise<PrivateChatMessage> {
        const record: any = await ChatModel.sendMessageToPrivateChat(
            senderId,
            privateMessage
        );
        return new PrivateChatMessage(record);
    }
    static async collaboratorHasUnreadPrivateChats(
        collaboratorId: number
    ): Promise<boolean> {
        const record: any = ChatModel.collaboratorHasUnreadPrivateChats(collaboratorId);
        return bufferToBoolean(record["has_unread_chats"]);
    }
    static async collaboratorHasUnreadProjectChats(
        collaboratorId: number
    ): Promise<boolean> {
        const record: any = ChatModel.collaboratorHasUnreadProjectChats(collaboratorId);
        return bufferToBoolean(record["has_unread_chats"]);
    }
}