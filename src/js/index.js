import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import { elements, renderLoader, clearLoader } from './views/base';

/** Global state of the app
 * - Search object
 * - Current object
 * - Shopping list object
 * - Liked receipe
 */
const state = {};
window.state = state;

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
 * RECIPE CONTROLLER
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

/**
 * LIST CONTROLLER
 */
const controlList = () => {
   if (!state.list) state.list = new List();

   state.recipe.ingredients.forEach((el) => {
      const item = state.list.addItem(el.count, el.unit, el.ingredient);
      listView.renderItem(item);
   });
};

elements.shopping.addEventListener('click', (e) => {
   const id = e.target.closest('.Shopping__item').dataset.itemid;

   if (e.target.matches('.Shopping__delete, .Shopping__delete *')) {
      state.list.deleteItem(id);
      listView.deleteItem(id);
   }
   else if (e.target.matches('.Shopping__count-value')) {
      const val = e.target.value;
      state.list.updateCount(id, val);
   }
});

[('hashchange', 'load')].forEach(event => window.addEventListener(event, controlRecipe));

elements.recipe.addEventListener('click', (e) => {
   if (e.target.matches('.btn-decrease, .btn-decrease *')) {
      if (state.recipe.servings > 1) {
         state.recipe.updateServings('dec');
         recipeView.updateServingsIngredients(state.recipe);
      }
   }
   else if (e.target.matches('.btn-increase, .btn-increase *')) {
      state.recipe.updateServings('inc');
      recipeView.updateServingsIngredients(state.recipe);
   }
   else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
      controlList();
   }
});
