export interface PostStatistics {
    views: number;
    likes: number;
    dislikes: number;
}

export interface Post {
    id: string;
    title: string;
    text: string;
    statistics: PostStatistics;
}

export const SortDirection = {
    ASC: "ASC",
    DESC: "DESC",
} as const;

export type SortDirection = (typeof SortDirection)[keyof typeof SortDirection];

export const SortCriteria = {
    VIEWS: "views",
    LIKES: "likes",
} as const;

export type SortCriteria = (typeof SortCriteria)[keyof typeof SortCriteria];

export interface FilterParams {
    query: string;
    criteria: SortCriteria;
    direction: SortDirection;
}

export interface PostsResponse {
    data: Post[];
    last: number;
}

export interface ColorModeContextType {
    mode: 'light' | 'dark';
    toggleColorMode: () => void;
}

export interface User {
    id: string;
    email: string;
    password: string;
    favorites: string[];
}

export interface AuthContextType {
    user: User | null;
    updateAuthContext: (userData: User) => void;
    logout: () => void;
}