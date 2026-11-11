import axios from "axios";
import {API_URL} from "../../utils/contants.ts";
import type {PostsResponse, Post, PostSearchParams} from "../../types";
import {SortCriteria, SortDirection} from "../../types";

class PostService {
    entityName: string = "posts";

    async getAll(
        limit: number = 10,
        page: number = 1,
        sort?: SortCriteria,
        order?: SortDirection,
        query?: string
    ): Promise<PostsResponse> {
        const params: PostSearchParams = {
            _page: page,
            _per_page: limit
        };

        if (sort) {
            params._sort = (order === SortDirection.DESC && sort) ? `-statistics.${sort}` : `statistics.${sort}`;
        }

        if (query && query.trim() !== "") {
            params["text:contains"] = query.trim();
        }

        const response = await axios.get(`${API_URL}${this.entityName}`, { params });
        return {
            data: response.data.data,
            last: response.data.last,
        };
    }

    async delete(id: string): Promise<void> {
        await axios.delete(`${API_URL}${this.entityName}/${id}`);
    }

    async update(id: string, updatedData: Partial<Post>): Promise<Post> {
        const response = await axios.patch(`${API_URL}${this.entityName}/${id}`, updatedData);
        return response.data;
    }

    async create(title: string, text: string): Promise<Post> {
        let newPost = {
            title: title,
            text: text,
            statistics: {
                views: 0,
                likes: 0,
                dislikes: 0
            }
        };
        const response = await axios.post(`${API_URL}${this.entityName}`, newPost);
        return response.data;
    }

    async getByIds(ids: string[], limit: number, page: number): Promise<PostsResponse> {
        if (!ids || ids.length === 0) {
            return { data: [], last: 0 };
        }

        const response = await axios.get(`${API_URL}${this.entityName}`, {
            params: {
                'id:in': ids.join(','),
                _page: page,
                _per_page: limit,
            }
        });
        return {
            data: response.data.data,
            last: response.data.last
        };
    }
}

export const postService = new PostService();