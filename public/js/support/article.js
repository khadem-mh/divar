import {
  getArticleByID,
  getArticlesByCategory,
} from "../../../utils/shared.js";
import { getUrlParam } from "../../../utils/utils.js";

window.addEventListener("load", () => {
  const articleID = getUrlParam("id");

  const loading = document.querySelector("#loading-container");
  const breadcumbSpan = document.querySelector("#breadcumb span");
  const articleTitle = document.querySelector("#article-title");
  const articleBody = document.querySelector("#article-body");
  const sameArticles = document.querySelector("#same-articles");

  getArticleByID(articleID).then((article) => {
    loading.style.display = "none";

    document.title = article.title;
    breadcumbSpan.innerHTML = article.title;
    articleTitle.innerHTML = article.title;
    articleBody.innerHTML = article.body;

    getArticlesByCategory(article.categories[0]).then((articles) => {
      articles.map((article) => {
        sameArticles.insertAdjacentHTML(
          "beforeend",
          `
            <a href="/pages/support/article.html?id=${article._id}">${article.title}</a>
          `
        );
      });
    });
  });
});
