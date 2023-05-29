import styled from "styled-components";

export const Container = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    font-weight: bold;
    color: var(--dark-1);
    background-color: var(--cream-1);
    border-radius: 50%;
    width: 2em;
    height: 2em;
    font-size: 24px;
    user-select: none;
    &.big {
        font-size: 32px;
    }
    &.small {
        font-size: 14px;
    }
`;