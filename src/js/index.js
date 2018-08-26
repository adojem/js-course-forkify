import axios from 'axios';
import apiKey from '../config/config';

async function getResults(query) {
   const res = await axios(
      `http://food2fork.com/api/search?key=${apiKey}&q=${query}`
   );
   const { recipes } = res.data;
   console.log(recipes);
}

getResults('pizza');
