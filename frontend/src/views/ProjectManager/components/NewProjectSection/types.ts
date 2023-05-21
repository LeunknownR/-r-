import { ModalProps } from "src/components/Modal/types";
import { ProjectForm } from "src/entities/project/types";
import { FormCompanyTypes } from "../../types";

export type NewProjectSectionProps = {
    modal: ModalProps
    form: FormCompanyTypes;
    getProjectFromForm: () => ProjectForm | null;
};