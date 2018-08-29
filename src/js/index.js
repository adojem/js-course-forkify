import Search from './models/Search';
import * as SearchView from './views/searchView';
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
   const query = SearchView.getInput();

   if (query) {
      // New search object and to state
      state.search = new Search(query);

      // Prepqre UI for results
      SearchView.clearInput();
      SearchView.clearResults();
      renderLoader(elements.searchRes);
      // Search for recipes
      await state.search.getResults();

      // Render results on UI
      clearLoader();
      SearchView.renderResults(state.search.result);
   }
};

elements.searchForm.addEventListener('submit', (e) => {
   e.preventDefault();
   controlSearch();
});
