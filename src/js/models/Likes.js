export default class Likes {
   constructor() {
      this.likes = [];
   }

   addLike(id, title, author, img) {
      const like = {
         id,
         title,
         author,
         img,
      };
      this.likes.push(like);
      return like;
   }

   deleteLikes(id) {
      const index = this.likes.findIndex(el => el.id === id);
      return this.likes.splice(index, 1);
   }

   isLiked(id) {
      return this.likes.findIndex(el => el.id === id) !== -1;
   }

   getNumLikes() {
      return this.likes.length;
   }
}
