import Article from "./Article";


export default class ArticleOfCart{
    constructor(article, quantity) {
        this.articleId = article.id;
        this.article = new Article(article.id, article.code, article.articleName, article.quantity, article.price);
        this.cartQuantity = quantity;
    }
}