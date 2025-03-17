import axios from "axios";

// Función para obtener las categorías de cócteles
export async function getCategories() {
    const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";
    const { data } = await axios(url);
    console.log(data.drinks);
    return data.drinks;
}

// Función para obtener las recetas basadas en filtros
export async function getRecipes(filters) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filters.category}&i=${filters.ingredient}`;
    console.log('url de la api: ', url)// prueba para ver que si sirve
    const { data } = await axios(url);
    console.log('respuesta de la api: ', data)// prueba para ver que si sirve
    return data;
}

// Funcion para obtener una receta por si ID
export async function getRecipeById(id) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const { data } = await axios(url);
    return data.drinks ? data.drinks[0] : null;
}
