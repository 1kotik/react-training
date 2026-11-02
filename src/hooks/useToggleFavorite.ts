import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { userService } from '../service/api/UserService';

export function useToggleFavorite(
    setError: (error: string | null) => void,
    onSuccess?: (postId: string, isFavorite: boolean) => void
) {
    const { user, updateAuthContext } = useContext(AuthContext);

    const handleToggleFavorite = async (postId: string) => {
        if (!user) return;
        try {
            setError(null);
            const favorites = user.favorites || [];
            const isFavorite = favorites.includes(postId);
            const updatedFavorites = isFavorite
                ? favorites.filter(id => id !== postId)
                : [...favorites, postId];
            const updatedUser = await userService.toggleFavorite(user.id, updatedFavorites);
            updateAuthContext(updatedUser);
            if (onSuccess) {
                onSuccess(postId, !isFavorite);
            }
        } catch (e) {
            setError("Failed to update favorites. Try again later");
        }
    };

    return { handleToggleFavorite };
}