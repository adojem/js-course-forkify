import axios from 'axios';
import apiKey from '../../config/config';

export default class Search {
   constructor(query) {
      this.query = query;
   }

   async getResults() {
      try {
         const res = await axios(
            `http://food2fork.com/api/search?key=${apiKey}&q=${this.query}`
         );
         this.result = res.data.recipes;
      } catch (error) {
         alert(error);
      }
   }
}
