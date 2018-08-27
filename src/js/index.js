import Search from './models/Search';

/** Global state of the app
 * - Search object
 * - Current object
 * - Shopping list object
 * - Liked receipe
 */
const state = {};

const controlSearch = async () => {
   // Get query from view
   const query = 'pizza'; // Todo

   if (query) {
      // New search object and to state
      state.search = new Search(query);

      // Prepqre UI for results

      // Search for recipes
      await state.search.getResults();

      // Render results on UI
      console.log(state.search.result);
   }
};

document.querySelector('.search').addEventListener('submit', (e) => {
   e.preventDefault();
   controlSearch();
});
