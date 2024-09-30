import { baseUrl } from "../../../utils/shared.js";
import {
  calcuteRelativeTimeDifference,
  getFromLocalStorage,
  saveInLocalStorage,
} from "./../../../utils/utils.js";

window.addEventListener("load", async () => {
  const loading = document.querySelector("#loading-container");
  const postsContainer = document.querySelector("#posts-container");
  const emptyContainer = document.querySelector(".empty");

  let recentSeens = getFromLocalStorage("recent-seens");

  let posts = [];

  const postGenerator = () => {
    postsContainer.innerHTML = "";
    posts.map((post) => {
      console.log(post);
      const date = calcuteRelativeTimeDifference(post.createdAt);
      postsContainer.insertAdjacentHTML(
        "beforeend",
        `
            <div class="post">
                <div>
                ${
                  post.pics.length
                    ? `<img src="${baseUrl}/${post.pics[0].path}" />`
                    : `<img src="/public/images/main/noPicture.PNG" />`
                }
                
                <div>
                    <a class="title" href="/pages/post.html?id=${post._id}">${
          post.title
        }</a>
                    <p>${date} در ${post.city.name}، ${
          post.neighborhood.id !== 0 ? post.neighborhood.name : ""
        }</p>
                </div>
                </div>
                <i onclick="sahrePost('${post._id}', '${
          post.title
        }')" class="bi bi-share"></i>
                <i onclick="removeRecentSeen('${
                  post._id
                }')" class="bi bi-trash"></i>
            </div>      
        `
      );
    });
  };

  if (recentSeens) {
    for (const postID of recentSeens) {
      const res = await fetch(`${baseUrl}/v1/post/${postID}`);
      const response = await res.json();
      if (res.status !== 404) {
        posts.push(response.data.post);
      }
    }

    postGenerator();

    loading.style.display = "none";
  } else {
    emptyContainer.style.display = "flex";
  }

  window.sahrePost = (postID, postTitle) => {
    navigator.share({ title: postTitle, url: `/pages/post.html?id=${postID}` });
  };

  window.removeRecentSeen = (postID) => {
    const newRecentSeens = recentSeens.filter((post) => post !== postID);
    recentSeens = newRecentSeens;
    posts = posts.filter((post) => post._id !== postID);

    if (recentSeens.length) {
      saveInLocalStorage("recent-seens", newRecentSeens);
    } else {
      localStorage.removeItem("recent-seens");
      emptyContainer.style.display = "flex";
    }

    postGenerator();
  };
});
