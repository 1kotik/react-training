import {useCallback, useContext, useMemo} from 'react';
import PostList from "../components/posts/PostList.tsx";
import Loader from "../components/ui/Loader.tsx";
import {AuthContext} from "../context/AuthContext";
import {postService} from "../service/api/PostService";
import {usePosts} from "../hooks/usePosts";
import "../index.css";
import {useToggleFavorite} from "../hooks/useToggleFavorite.ts";

function FavoritePosts() {
    const {user} = useContext(AuthContext);
    const favoriteIds = useMemo(() => user?.favorites || [], [user?.favorites]);
    const POSTS_PER_PAGE = 3;

    const fetchFavorites = useCallback(async (page: number, limit: number) => {
        return await postService.getByIds(favoriteIds, limit, page);
    }, [favoriteIds]);

    const {
        posts,
        setPosts,
        page,
        setPage,
        totalPages,
        isLoading,
        error,
        setError
    } = usePosts(fetchFavorites, [favoriteIds], POSTS_PER_PAGE, false);

    const {handleToggleFavorite} = useToggleFavorite(setError, (postId, isFavorite) => {
        if (!isFavorite) {
            setPosts(prev => prev.filter(p => p.id !== postId));
        }
    });

    return (
        <div className="posts-page">
            <h2 className="favorites-title">Favorite Posts</h2>
            {error && <div className="posts-page__error">{error}</div>}
            {isLoading
                ? (<Loader/>)
                : posts.length === 0
                    ? (<div className="end-message">No favorite posts yet.</div>)
                    : (
                        <>
                            <PostList
                                posts={posts}
                                onToggleFavorite={handleToggleFavorite}
                                isPostEditable={false}
                            />

                            {totalPages > 1 && (
                                <div className="pagination">
                                    {Array.from({length: totalPages}, (_, index) => {
                                        const pageNumber = index + 1;
                                        return (
                                            <button
                                                key={pageNumber}
                                                className={`pagination__btn ${page === pageNumber ? 'pagination__btn--active' : ''}`}
                                                onClick={() => setPage(pageNumber)}
                                            >
                                                {pageNumber}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </>
                    )}
        </div>
    );
}

export default FavoritePosts;