import { useState, useEffect, useCallback } from 'react';
import type { Post, PostsResponse } from '../types';

export function usePosts(
    fetchFn: (page: number, limit: number) => Promise<PostsResponse>,
    dependencies: any[] = [],
    initialLimit: number = 10,
    infiniteScroll: boolean = false
) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState<number>(1);
    const [limit] = useState<number>(initialLimit);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const loadPage = useCallback(async (currentPage: number) => {
        try {
            setError(null);
            if (infiniteScroll) {
                if (currentPage === 1) {
                    setIsLoading(true);
                } else {
                    setIsFetchingMore(true);
                }
            } else {
                setIsLoading(true);
            }

            const response = await fetchFn(currentPage, limit);
            if (infiniteScroll) {
                if (currentPage >= response.last) {
                    setHasMore(false);
                } else {
                    setHasMore(true);
                }
                setPosts(prevPosts => currentPage === 1 ? response.data : [...prevPosts, ...response.data]);
            } else {
                setPosts(response.data);
                setTotalPages(response.last || 1);
            }
        } catch (e) {
            setError("Failed to load posts. Try again later");
            if (infiniteScroll) {
                setHasMore(false);
            }
        } finally {
            setIsLoading(false);
            setIsFetchingMore(false);
        }
    }, [fetchFn, limit, infiniteScroll]);

    useEffect(() => {
        if (infiniteScroll) {
            setPage(1);
            setHasMore(true);
        }
    }, [infiniteScroll, ...dependencies]);

    useEffect(() => {
        loadPage(page);
    }, [page, loadPage, ...dependencies]);

    return {
        posts,
        setPosts,
        page,
        setPage,
        limit,
        totalPages,
        hasMore,
        isLoading,
        isFetchingMore,
        error,
        setError,
        refetch: () => loadPage(page)
    };
}