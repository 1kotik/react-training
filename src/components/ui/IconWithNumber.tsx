import type {IconProp} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "../../index.css";

interface IconWithNumberProps {
    icon: IconProp;
    number: number;
}

function IconWithNumber({icon, number}: IconWithNumberProps) {
    return (
        <div className="icon-container">
            <FontAwesomeIcon icon={icon}/>
            <span className="icon-container__number">{number}</span>
        </div>
    );
}

export default IconWithNumber;