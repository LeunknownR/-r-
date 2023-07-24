import { Icon } from "@iconify/react/dist/iconify.js";
import { IndividualRequirement, RequirementsList } from "./styles";
import { REQUIREMENTS } from "./utils/constants";

const ContentRequirements = () => {
    return (
        <RequirementsList>
            {REQUIREMENTS.map(({text}, idx) => (
                <IndividualRequirement key={idx}>
                    <Icon icon="emojione-monotone:shield" />
                    {text}
                </IndividualRequirement>
            ))}
        </RequirementsList>
    );
};

export default ContentRequirements;