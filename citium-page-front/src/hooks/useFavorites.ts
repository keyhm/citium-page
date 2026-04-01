'use client';

import { useState, useEffect } from 'react';

const FAVORITES_STORAGE_KEY = 'citium_favorites';

export function useFavorites() {
    const [favorites, setFavorites] = useState<string[]>(() => {
        try {
            const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading favorites:', error);
            return [];
        }
    });
    const [isLoaded, setIsLoaded] = useState(true);

    // Save favorites to localStorage whenever they change
    useEffect(() => {
        if (isLoaded) {
            try {
                localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
            } catch (error) {
                console.error('Error saving favorites:', error);
            }
        }
    }, [favorites, isLoaded]);

    const toggleFavorite = (propertyId: string) => {
        setFavorites((prev) => {
            if (prev.includes(propertyId)) {
                return prev.filter((id) => id !== propertyId);
            } else {
                return [...prev, propertyId];
            }
        });
    };

    const isFavorite = (propertyId: string) => {
        return favorites.includes(propertyId);
    };

    const addFavorite = (propertyId: string) => {
        setFavorites((prev) => {
            if (!prev.includes(propertyId)) {
                return [...prev, propertyId];
            }
            return prev;
        });
    };

    const removeFavorite = (propertyId: string) => {
        setFavorites((prev) => prev.filter((id) => id !== propertyId));
    };

    return {
        favorites,
        isLoaded,
        toggleFavorite,
        isFavorite,
        addFavorite,
        removeFavorite,
    };
}
