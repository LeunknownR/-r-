import { FlexFlow } from "src/components/styles";
import styled from "styled-components";

export const Container = styled(FlexFlow)`
    background-color: var(--darkblue-3);
    border-radius: 8px;
    width: 100%;
    gap: 5px;
`;
export const Tab = styled(FlexFlow)`
    justify-content: center;
    cursor: pointer;
    color: var(--white-1-50);
    font-weight: 700;
    width: 100%;
    padding: 10px;
    font-size: 18px;
    transition: 0.3s;
    border-radius: inherit;
    user-select: none;
    &.active,
    :hover {
        color: var(--white-1);
        background-color: var(--darkblue-2);
    }
    &.has-unread-chat {
        ::after {
            content: "";
            height: 8px;
            width: 8px;
            background-color: var(--red-2);
            margin-left: 3px;
            border-radius: 100%;
        }
    }
`;
