import {useCallback, useContext, useEffect, useState} from 'react';
import {AuthContext} from '../context/AuthContext';
import {postService} from '../service/api/PostService';
import type {Post} from '../types';
import {SortCriteria, SortDirection} from '../types';
import PostItem from '../components/posts/PostItem';
import Loader from '../components/ui/Loader';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import '../index.css';
import {useToggleFavorite} from "../hooks/useToggleFavorite.ts";

function AboutMe() {
    const {user} = useContext(AuthContext);
    const [popularPosts, setPopularPosts] = useState<Post[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTopPosts = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await postService.getAll(3, 1, SortCriteria.VIEWS, SortDirection.DESC);
            setPopularPosts(response.data || []);
        } catch (e) {
            setError("Failed to load popular posts. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTopPosts();
    }, [fetchTopPosts]);

    const handlePrevSlide = () => {
        if (popularPosts.length === 0) return;
        setCurrentIndex((prev) => (prev === 0 ? popularPosts.length - 1 : prev - 1));
    };

    const handleNextSlide = () => {
        if (popularPosts.length === 0) return;
        setCurrentIndex((prev) => (prev === popularPosts.length - 1 ? 0 : prev + 1));
    };

    const {handleToggleFavorite} = useToggleFavorite(setError);

    const renderCurrentPost = () => {
        const currentPost = popularPosts[currentIndex];
        if (!currentPost) return null;

        const isFavorite = user?.favorites?.includes(currentPost.id) || false;
        return (
            <PostItem
                key={currentPost.id}
                post={currentPost}
                onToggleFavorite={handleToggleFavorite}
                isFavorite={isFavorite}
                isEditable={false}
            />
        );
    };

    return (
        <div className="about-me-page">
            <h2 className="about-me-title">About Me</h2>

            {user && (
                <div className="about-me-email-container">
                    <p className="about-me-email">{user.email}</p>
                </div>
            )}

            <div className="about-me-section">
                <h3 className="about-me-subtitle">TOP 3 POPULAR</h3>
                {error && <div className="posts-page__error">{error}</div>}
                {isLoading
                    ? (<Loader/>)
                    : popularPosts.length === 0
                        ? (<div className="end-message">Posts not found.</div>)
                        : (<div className="slider-container">
                                <button
                                    className="slider-arrow slider-arrow--left"
                                    onClick={handlePrevSlide}
                                    title="Previous post"
                                >
                                    <FontAwesomeIcon icon={faChevronLeft}/>
                                </button>

                                <div className="slider-content">
                                    {renderCurrentPost()}
                                </div>

                                <button
                                    className="slider-arrow slider-arrow--right"
                                    onClick={handleNextSlide}
                                    title="Next post"
                                >
                                    <FontAwesomeIcon icon={faChevronRight}/>
                                </button>
                            </div>
                        )}
            </div>
        </div>
    );
}

export default AboutMe;