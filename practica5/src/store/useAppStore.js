import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createRecipeSlice } from './recipeSlice';
import { createFavoritesSlice } from './favoritesSlice';
import { createNotificacion } from './notificacion';

export const useAppStore = create(devtools((...args) => ({
    ...createRecipeSlice(...args),
    ...createFavoritesSlice(...args),
    ...createNotificacion(args[0], args[1])
})))