import { useState, useEffect } from 'react';

export interface WishlistItem {
    id: number;
    name: string;
    price: number;
    image: string;
}

export const useWishlist = () => {
    const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Load wishlist from localStorage on initial render
    useEffect(() => {
        const storedWishlist = localStorage.getItem('wishlist');
        if (storedWishlist) {
            setWishlist(JSON.parse(storedWishlist));
        }
        setIsInitialized(true);
    }, []);

    // Save wishlist to localStorage whenever it changes
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
        }
    }, [wishlist, isInitialized]);

    const addToWishlist = (item: Omit<WishlistItem, 'id'> & { id?: number }) => {
        // Ensure we have all required fields
        if (!item.id || !item.name || item.price === undefined || !item.image) {
            console.error('Invalid wishlist item:', item);
            return false;
        }

        setWishlist(prevItems => {
            // Check if item already exists in wishlist
            const exists = prevItems.some(wishlistItem => wishlistItem.id === item.id);
            if (exists) {
                return prevItems;
            }
            return [...prevItems, item as WishlistItem];
        });
        return true;
    };

    const removeFromWishlist = (id: number) => {
        setWishlist(prevItems => prevItems.filter(item => item.id !== id));
    };

    const isInWishlist = (id: number) => {
        return wishlist.some(item => item.id === id);
    };

    const toggleWishlistItem = (item: WishlistItem) => {
        if (isInWishlist(item.id)) {
            removeFromWishlist(item.id);
            return false;
        } else {
            addToWishlist(item);
            return true;
        }
    };

    return {
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        toggleWishlistItem,
        wishlistCount: wishlist.length
    };
};
