import { FlexFlow } from "src/components/styles";
import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px;
    padding: 20px 0 20px 30px;
    border-radius: 10px;
    background: linear-gradient(180deg, #051e2f 10%, #0f2a3d 50%, #041825 100%);
    height: 100%;
    overflow: hidden;
`;
export const AdditionalChatInfoWrapper = styled(FlexFlow)`

    span {
        color: var(--white-1);
        font-size: 16px;
    }
`;
export const Separator = styled.hr`
    width: 70%;
    background-color: var(--darkblue-0);
    margin-bottom: 30px;
`;
export const MessageList = styled(FlexFlow.withComponent("ul"))`
    margin-top: auto;
    padding-right: 30px;
`;
