import {useCallback, useContext, useEffect, useRef, useState} from 'react';
import FilterSection from "../components/filtering/FilterSection.tsx";
import PostList from "../components/posts/PostList.tsx";
import Loader from "../components/ui/Loader.tsx";
import "../index.css";
import type {FilterParams} from "../types";
import {postService} from "../service/api/PostService.ts";
import {useNavigate, useSearchParams} from "react-router-dom";
import {getSortCriteria, getSortDirection} from "../utils/contants.ts";
import {AuthContext} from "../context/AuthContext";
import {usePosts} from "../hooks/usePosts";
import {useToggleFavorite} from "../hooks/useToggleFavorite.ts";
import {RoutePaths} from "../router/routes.ts";

function Posts() {
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    const observerRef = useRef<HTMLDivElement>(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const [filter, setFilter] = useState<FilterParams>({
        query: searchParams.get("query") || "",
        criteria: getSortCriteria(searchParams.get("sort")),
        direction: getSortDirection(searchParams.get("order"))
    });

    const fetchPosts = useCallback(async (currentPage: number, limit: number) => {
        return await postService.getAll(
            limit,
            currentPage,
            filter.criteria,
            filter.direction,
            filter.query
        );
    }, [filter.criteria, filter.direction, filter.query]);

    const {
        posts,
        setPosts,
        page,
        setPage,
        hasMore,
        isLoading,
        isFetchingMore,
        error,
        setError
    } = usePosts(fetchPosts, [filter.criteria, filter.direction, filter.query], 10, true);

    const handleDeletePost = async (id: string) => {
        try {
            setError(null);
            await postService.delete(id);
            setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
        } catch (e) {
            setError("Failed to delete post. Try again later");
        }
    };

    const handleUpdatePost = async (id: string, newTitle: string, newText: string) => {
        try {
            setError(null);
            const updatedPost = await postService.update(id, {title: newTitle, text: newText});
            setPosts(prevPosts => prevPosts.map(p => p.id === id ? updatedPost : p));
        } catch (e) {
            setError("Failed to update post. Try again later");
        }
    };

    const {handleToggleFavorite} = useToggleFavorite(setError);

    useEffect(() => {
        setSearchParams({
            query: filter.query,
            sort: filter.criteria,
            order: filter.direction,
        });
    }, [filter, setSearchParams]);

    useEffect(() => {
        if (isLoading || isFetchingMore || !hasMore) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setPage(prev => prev + 1);
            }
        }, {threshold: 1.0});

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
        };
    }, [isLoading, isFetchingMore, hasMore, setPage]);

    return (
        <div className="posts-page">
            {user && (
                <div className="posts-page__actions-top">
                    <button className="posts-page__add-btn" onClick={() => {
                        navigate(RoutePaths.ADD_POST)
                    }}>
                        Create post
                    </button>
                </div>
            )}

            <FilterSection
                filter={filter}
                setFilter={setFilter}
            />

            {error && <div className="posts-page__error">{error}</div>}

            {isLoading
                ? (<Loader/>)
                : (<>
                        <PostList
                            posts={posts}
                            onDelete={handleDeletePost}
                            onUpdate={handleUpdatePost}
                            onToggleFavorite={handleToggleFavorite}
                            isPostEditable={true}
                        />
                        <div ref={observerRef} className="observer-marker"/>
                        {isFetchingMore && <Loader/>}
                        {!hasMore && !error && <div className="end-message">End</div>}
                    </>
                )}
        </div>
    );
}

export default Posts;