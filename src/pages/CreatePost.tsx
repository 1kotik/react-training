import React, {useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import {postService} from '../service/api/PostService';
import {AuthContext} from '../context/AuthContext';
import {RoutePaths} from "../router/routes.ts";

function CreatePost() {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [titleError, setTitleError] = useState('');
    const [textError, setTextError] = useState('');
    const [submitError, setSubmitError] = useState('');
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTitle(value);
        if (value.length > 100) {
            setTitleError('Title cannot be longer than 100 symbols');
        } else {
            setTitleError('');
        }
    };

    const handleTitleBlur = () => {
        if (!title.trim()) {
            setTitleError('Title cannot be empty');
        }
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setText(value);
        setTextError('');
    };

    const handleTextBlur = () => {
        if (!text.trim()) {
            setTextError('Text cannot be empty');
        }
    };

    const isFormValid = title.trim().length > 0 && title.length <= 100 && text.trim().length > 0;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid || !user) return;

        try {
            setSubmitError('');
            await postService.create(title, text);
            navigate(RoutePaths.POSTS);
        } catch (e) {
            setSubmitError('Failed to create post. Please try again');
        }
    };

    return (
        <div className="create-post-page">
            <h2 className="create-post-title">Create New Post</h2>
            {submitError && <div className="auth-error">{submitError}</div>}
            <form onSubmit={handleSubmit} className="create-post-form">
                <div className="create-post-input-wrapper">
                    <Input
                        id="post-title-input"
                        placeholder="Title"
                        value={title}
                        onChange={handleTitleChange}
                        error={Boolean(titleError)}
                        onBlur={handleTitleBlur}
                    />
                    {titleError && <div className="input-error-message">{titleError}</div>}
                </div>
                <div className="create-post-textarea-wrapper">
                    <textarea
                        className={`create-post-textarea ${textError ? 'input-error' : ''}`}
                        placeholder="Text"
                        value={text}
                        onChange={handleTextChange}
                        onBlur={handleTextBlur}
                    />
                    {textError && <div className="input-error-message">{textError}</div>}
                </div>
                <div className="create-post-btn-container">
                    <Button
                        label="Create Post"
                        disabled={!isFormValid}
                        type="submit"
                    />
                </div>
            </form>
        </div>
    );
}

export default CreatePost;