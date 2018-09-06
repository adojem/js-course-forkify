import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base';

/** Global state of the app
 * - Search object
 * - Current object
 * - Shopping list object
 * - Liked receipe
 */
const state = {};

const controlSearch = async () => {
   // Get query from view
   const query = searchView.getInput();

   if (query) {
      // New search object and to state
      state.search = new Search(query);

      // Prepqre UI for results
      searchView.clearInput();
      searchView.clearResults();
      renderLoader(elements.searchRes);

      try {
         // Search for recipes
         await state.search.getResults();

         // Render results on UI
         clearLoader();
         searchView.renderResults(state.search.result);
      }
      catch (err) {
         alert('Something wrong with the search...');
      }
   }
};

elements.searchForm.addEventListener('submit', (e) => {
   e.preventDefault();
   controlSearch();
});

elements.searchResPages.addEventListener('click', (e) => {
   const btn = e.target.closest('.btn-inline');
   if (btn) {
      const goToPage = parseInt(btn.dataset.goto, 10);
      searchView.clearResults();
      searchView.renderResults(state.search.result, goToPage);
   }
});

/**
 * RECIPE CONTROLLLER
 */
const controlRecipe = async () => {
   const id = window.location.hash.replace('#', '');

   if (id) {
      recipeView.clearRecipe();
      renderLoader(elements.recipe);

      if (state.search) searchView.highlightSelected(id);

      state.recipe = new Recipe(id);

      try {
         await state.recipe.getRecipe();
         state.recipe.parseIngredients();

         state.recipe.calcTime();
         state.recipe.calcServings();

         clearLoader();
         recipeView.renderRecipe(state.recipe);
      }
      catch (err) {
         console.log(err);
         alert('Error processing recipe!');
      }
   }
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));
