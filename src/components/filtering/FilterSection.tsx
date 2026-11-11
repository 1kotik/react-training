import {useState} from 'react';
import SortingElement from "./SortingElement.tsx";
import {faEye, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import "../../index.css";
import Button from "../ui/Button.tsx";
import Input from "../ui/Input.tsx";
import {type FilterParams, SortCriteria, SortDirection} from "../../types";
import {toggleSortDirection} from "../../utils/contants.ts";

interface FilterSectionProps {
    filter: FilterParams;
    setFilter: (filter: FilterParams) => void;
}

function FilterSection({filter, setFilter}: FilterSectionProps) {
    const [localQuery, setLocalQuery] = useState(filter.query);

    const handleSort = (criteria: SortCriteria) => {
        let newDirection: SortDirection;
        if (filter.criteria === criteria) {
            newDirection = toggleSortDirection(filter.direction);
            setFilter({...filter, direction: newDirection});
        } else {
            newDirection = SortDirection.DESC;
            setFilter({...filter, direction: newDirection, criteria: criteria});
        }
    };

    return (
        <section className="filters">
            <div className="filters__sorting">
                <span className="filters__sorting__title">Sorting:</span>
                <SortingElement
                    icon={faEye}
                    criteria={SortCriteria.VIEWS}
                    active={filter.criteria === SortCriteria.VIEWS}
                    direction={filter.direction}
                    onSort={handleSort}
                />
                <SortingElement
                    icon={faThumbsUp}
                    criteria={SortCriteria.LIKES}
                    active={filter.criteria === SortCriteria.LIKES}
                    direction={filter.direction}
                    onSort={handleSort}
                />
            </div>
            <div className="filters__search">
                <Button label="Search" onClick={() => setFilter({...filter, query: localQuery})} />
                <Input
                    id="post-search-input"
                    value={localQuery}
                    placeholder="Search"
                    onChange={e => setLocalQuery(e.target.value)}
                />
            </div>
        </section>
    );
}

export default FilterSection;