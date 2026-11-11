import type {IconProp} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown, faArrowUp} from "@fortawesome/free-solid-svg-icons";
import "../../index.css";
import {SortCriteria, SortDirection} from "../../types";

interface SortingElementProps {
    icon: IconProp;
    criteria: SortCriteria;
    active: boolean;
    direction: SortDirection;
    onSort: (criteria: SortCriteria) => void;
}

function SortingElement({icon, criteria, active, direction, onSort}: SortingElementProps) {
    return (
        <button className="sorting-element" onClick={() => onSort(criteria)}>
            <FontAwesomeIcon icon={icon}/>
            {active && (
                direction == SortDirection.ASC
                    ? <FontAwesomeIcon icon={faArrowUp}/>
                    : <FontAwesomeIcon icon={faArrowDown}/>
            )}
        </button>
    );
}

export default SortingElement;