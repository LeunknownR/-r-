export type SizeModalProps = {
    minWidth?: string;
    maxWidth?: string;
    width?: string;
    padding?: string;
    borderRadius?: string;
};
export type ModalProps = {
    children?: React.ReactNode;
    isOpen: boolean;
    sizeProps?: SizeModalProps;
    open(value: boolean): void;
    handleClose?: () => void;
};
