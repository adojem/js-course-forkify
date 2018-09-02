import axios from 'axios';
import apiKey from '../../config/config';

export default class Recipe {
   constructor(id) {
      this.id = id;
   }

   async getRecipe() {
      try {
         const res = await axios(
            `https://www.food2fork.com/api/get?key=${apiKey}&rId=${this.id}`
         );
         const { recipe } = res.data;
         this.title = recipe.title;
         this.author = recipe.publisher;
         this.img = recipe.image_url;
         this.url = recipe.source_url;
         this.ingredients = recipe.ingredients;
      } catch (error) {
         console.log(error);
         alert('Something went wrong : (*)');
      }
   }

   calcTime() {
      // Assuming that we need 15 min for each 3 ingredients
      const numIng = this.ingredients.length;
      const periods = Math.ceil(numIng / 3);
      this.time = periods * 15;
   }

   calcServings() {
      this.servings = 4;
   }
}