namespace WSChatServiceEvents {
    export enum Server {
        DispatchPrivateChatPreview = "server:dispatch-private-chat-preview",
        DispatchProjectChatPreview = "server:dispatch-project-chat-preview",
        DispatchPrivateChatMessages = "server:dispatch-private-chat-messages",
        DispatchProjectChatMessages = "server:dispatch-project-chat-messages",
        NotifyNewPrivateChatMessages = "server:notify-new-private-chat-messages",
        NotifyNewProjectChatMessages = "server:notify-new-project-chat-messages"
    }
    export enum Collaborator {
        SearchChat = "collaborator:search-chat",
        GetPrivateChatMessages = "collaborator:get-private-chat-messages",
        GetProjectChatMessages = "collaborator:get-project-chat-messages",
        LeavePrivateChat = "collaborator:leave-private-chat",
        LeaveProjectChat = "collaborator:leave-project-chat",
        SendMessageToPrivateChat = "collaborator:send-message-to-private-chat",
    }
}

export default WSChatServiceEvents;