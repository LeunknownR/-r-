import { useState } from "react";
import { FormattedProjectChatMessages } from "src/entities/chat/entities";
import WSChatServiceEvents from "src/services/websockets/services/chats/events";
import { ProjectChatMessagesHook, SearchChatPayloadHook } from "../types";
import { PreloaderHook } from "src/components/Preloader/types";
import useMasterRouterContext from "src/routes/utils/context/useMasterRouterContext";

const useProjectChatMessages = (
    preloader: PreloaderHook,
    searchChatPayloadHandler: SearchChatPayloadHook
): ProjectChatMessagesHook => {
    const { socketIoChatService } = useMasterRouterContext().chatServiceHandler;
    const [formattedMessages, setFormattedProjectChatMessages] = useState<FormattedProjectChatMessages | null>(null);
    const onDispatchMessages = (): void => {
        socketIoChatService?.on(
            WSChatServiceEvents.Server.DispatchProjectChatMessages,
            (formattedProjectChatMessages: FormattedProjectChatMessages) => {
                setFormattedProjectChatMessages(formattedProjectChatMessages);
                searchChatPayloadHandler.emit();
                preloader.hide();
            });
    };
    const clearMessages = (): void => {
        setFormattedProjectChatMessages(null);
    };
    return {
        formattedMessages, clearMessages,
        onDispatchMessages
    };
}

export default useProjectChatMessages;