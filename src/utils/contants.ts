import {SortCriteria, SortDirection} from "../types";

export const API_URL = "http://localhost:3000/"

export const toggleSortDirection = (direction: SortDirection): SortDirection => {
    return direction === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC;
}

export const getSortCriteria = (criteria: string): SortCriteria => {
    switch (criteria) {
        case "views": return SortCriteria.VIEWS;
        case "likes": return SortCriteria.LIKES;
        default: return SortCriteria.VIEWS;
    }
}

export const getSortDirection = (direction: string): SortDirection => {
    switch (direction) {
        case "ASC": return SortDirection.ASC;
        case "DESC": return SortDirection.DESC;
        default: return SortDirection.DESC;
    }
}