import type { Post } from "../../types";
import PostItem from "./PostItem.tsx";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "../../index.css";

interface PostListProps {
    posts: Post[];
    onDelete?: (id: string) => void;
    onUpdate?: (id: string, newTitle: string, newText: string) => void;
    onToggleFavorite: (postId: string) => void;
    isPostEditable?: boolean;
}

function PostList({ posts, onDelete, onUpdate, onToggleFavorite, isPostEditable = true }: PostListProps) {
    const { user } = useContext(AuthContext);

    return (
        <div className="post-list">
            {posts.map((post) => {
                const isFavorite = user?.favorites?.includes(post.id) || false;
                return (
                    <PostItem
                        key={post.id}
                        post={post}
                        onDelete={onDelete}
                        onUpdate={onUpdate}
                        onToggleFavorite={onToggleFavorite}
                        isFavorite={isFavorite}
                        isEditable={isPostEditable}
                    />
                );
            })}
        </div>
    );
}

export default PostList;