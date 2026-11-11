import {useState, useContext} from 'react';
import type {Post} from "../../types";
import IconWithNumber from "../ui/IconWithNumber.tsx";
import Input from "../ui/Input.tsx";
import {
    faEye,
    faThumbsUp,
    faThumbsDown,
    faHeart,
    faPen,
    faTrash,
    faCheck,
    faTimes
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {AuthContext} from "../../context/AuthContext";
import "../../index.css";

interface PostItemProps {
    post: Post;
    onDelete?: (id: string) => void;
    onUpdate?: (id: string, newTitle: string, newText: string) => void;
    onToggleFavorite: (postId: string) => void;
    isFavorite: boolean;
    isEditable?: boolean;
}

function PostItem({post, onDelete, onUpdate, onToggleFavorite, isFavorite, isEditable = true}: PostItemProps) {
    const {user} = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(post.title);
    const [editText, setEditText] = useState(post.text);
    const [error, setError] = useState('');

    const handleSave = () => {
        if (!editTitle.trim() || !editText.trim()) {
            setError('Fields cannot be empty');
            return;
        }
        setError('');
        onUpdate?.(post.id, editTitle, editText);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditTitle(post.title);
        setEditText(post.text);
        setIsEditing(false);
        setError('');
    };

    const handleFavoriteClick = () => {
        if (!user) return;
        onToggleFavorite(post.id);
    };

    return (
        <div className="post-item">
            <div className="post-item__content-wrapper">
                {error && <div className="post-item__error">{error}</div>}

                {isEditing
                    ? (<div className="post-item__edit-container">
                        <Input
                            id={`edit-title-${post.id}`}
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <textarea
                            className="post-item__text-textarea"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                        />
                    </div>)
                    : (<>
                            <span className="post-item__title">{post.title}</span>
                            <span className="post-item__text">{post.text}</span>
                        </>
                    )}

                <div className="post-item__statistics">
                    <IconWithNumber icon={faEye} number={post.statistics.views}/>
                    <div className="post-item__statistics__ratings">
                        <IconWithNumber icon={faThumbsUp} number={post.statistics.likes}/>
                        <IconWithNumber icon={faThumbsDown} number={post.statistics.dislikes}/>
                    </div>
                </div>
            </div>

            <div className="post-item__actions">
                {user && (
                    <button
                        className={`post-item__action-btn ${isFavorite ? 'post-item__action-btn--active' : ''}`}
                        onClick={handleFavoriteClick}
                        title="Add/Remove from favorites"
                    >
                        <FontAwesomeIcon icon={faHeart}/>
                    </button>
                )}

                {user && isEditable && (
                    <>
                        {isEditing ? (<>
                                <button className="post-item__action-btn" onClick={handleSave} title="Save">
                                    <FontAwesomeIcon icon={faCheck}/>
                                </button>
                                <button className="post-item__action-btn" onClick={handleCancel} title="Cancel">
                                    <FontAwesomeIcon icon={faTimes}/>
                                </button>
                            </>)
                            : (<button className="post-item__action-btn" onClick={() => setIsEditing(true)}
                                       title="Edit">
                                    <FontAwesomeIcon icon={faPen}/>
                                </button>
                            )}
                        <button className="post-item__action-btn post-item__action-btn--danger"
                                onClick={() => onDelete(post.id)} title="Delete">
                            <FontAwesomeIcon icon={faTrash}/>
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default PostItem;