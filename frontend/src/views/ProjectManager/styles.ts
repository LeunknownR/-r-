import styled from "styled-components";

export const Container = styled.section`
    background-color: var(--darkblue-4);
`;
export const TemporalMain = styled.main`
    display: flex;
    flex-direction: column;
    gap: 50px;
    min-height: calc(100vh - 75px);
    margin-left: 75px;
`;
export const CloseButtonProjectForm = styled.div`
    position: absolute;
    top: 4%;
    right: 2.5%;
    color: var(--darkblue-2);
    cursor: pointer;
    .iconify {
        width: max-content;
        font-size: 34px;
    }
    &.update {
        color: var(--white-1);
    }
`;
