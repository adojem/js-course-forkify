import { elements } from './base';

export const renderItem = (item) => {
   const markup = `
      <li class="Shopping__item" data-item=${item.id}>
         <div class="Shopping__count">
            <input type="number" value="${item.count}" step="${
   item.count
}" class="Shopping__count-value">
            <p>${item.unit}</p>
         </div>
         <p class="Shopping__description">${item.ingredient}</p>
         <button class="Shopping__delete btn-tiny">
            <svg>
               <use href="img/icons.svg#icon-circle-with-cross"></use>
            </svg>
         </button>
      </li>
   `;
   elements.shopping.insertAdjacentHTML('beforeend', markup);
};

export const deleteItem = (id) => {
   const item = document.querySelector(`[data-itemId=${id}]`);
};
