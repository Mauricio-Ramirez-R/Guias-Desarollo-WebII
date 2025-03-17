export const createFavoritesSlice = (set, get) => ({
    //estado inicial: una lista vacia de favoritos
    favorites: [],

    //funcion para verificar si una receta ya esta en favoritos 
    favoritesExists: (id) => {
        return get().favorites.some(favorite => favorite.idDrink === id);
    },

    //maneja el click en el boton de favoritos (agregar o eliminar)
    handleClickFavorite: (recipe) => {
        if (get().favoritesExists(recipe.idDrink)) {
            //si la receta ya esta en favoritos, la eliminamos de la lista
            set((sate) => ({
                favorites: sate.favorites.filter(favorite => favorite.idDrink !== recipe.idDrink)
            }));
        } else {
            //si no esta en favoritos, la agreamos
            set((state) => ({
                favorites: [...state.favorites, recipe],
            }));
        }

        //guardamos la lista actualizada de favoritos en localStorage
        localStorage.setItem('favorites', JSON.stringify(get().favorites));
    },

    // carga la lista de favoritos desde localStorage al iniciar la aplicacion 
    loadFromStorage: () => {
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            set({
                favorites: JSON.parse(storedFavorites),
            });
        }
    }
});