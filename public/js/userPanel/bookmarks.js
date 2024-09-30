import { baseUrl } from "../../../utils/shared.js";
import {
  calcuteRelativeTimeDifference,
  getToken,
  getUrlParam,
  showSwal,
  paginateItems,
} from "../../../utils/utils.js";

window.addEventListener("load", async () => {
  const token = getToken();
  let posts = [];

  const postsContainer = document.querySelector("#posts-container");
  const loading = document.querySelector("#loading-container");
  const paginationItems = document.querySelector(".pagination-items");
  const emptyContainer = document.querySelector(".empty");

  let page = getUrlParam("page");
  !page ? (page = 1) : null;

  const postGenerator = async () => {
    const res = await fetch(
      `${baseUrl}/v1/user/bookmarks?page=${page}&limit=4`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const response = await res.json();
    posts = response.data.posts;

    if (posts.length) {
      posts.map((post) => {
        const date = calcuteRelativeTimeDifference(post.createdAt);
        postsContainer.insertAdjacentHTML(
          "beforeend",
          `
        <div class="post">
            <div>
                <div>
                <a class="title" href="/pages/post.html?id=${post._id}">${
            post.title
          }</a>
                <div>
                    <p>${post.price.toLocaleString()} تومان</p>
                    <p>${date} در ${post.neighborhood.name}</p>
                </div>
                </div>
                ${
                  post.pics.length
                    ? `<img src="${baseUrl}/${post.pics[0].path}" />`
                    : `<img src="/public/images/main/noPicture.PNG" />`
                }
                
            </div>
            <div>
                <button onclick="sharePost('${post._id}', '${post.title}')">
                اشتراک گذاری
                <i class="bi bi-share"></i>
                </button>
                <button onclick="removeBookmark('${post._id}')">
                حذف نشان
                <i class="bi bi-trash"></i>
                </button>
            </div>
        </div>    
      `
        );
      });

      console.log(response.data);

      paginateItems(
        "/pages/userPanel/bookmarks.html",
        paginationItems,
        page,
        response.data.pagination.totalPosts,
        4
      );
      loading.style.display = "none";
    } else {
      emptyContainer.style.display = "flex";
    }
  };

  postGenerator();

  window.removeBookmark = async (postID) => {
    showSwal(
      "آیا از حذف این نشان مطمئن هستید؟",
      "warning",
      ["خیر", "بله"],
      (result) => {
        if (result) {
          fetch(`${baseUrl}/v1/bookmark/${postID}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          }).then((res) => {
            if (res.status === 200) {
              posts = posts.filter((post) => post._id !== postID);

              postsContainer.innerHTML = "";
              if (posts.length) {
                posts.map((post) => {
                  postGenerator(post);
                });
              } else {
                emptyContainer.style.display = "flex";
              }
            }
          });
        }
      }
    );
  };

  window.sharePost = async (postID, postTitle) => {
    await navigator.share({
      title: postTitle,
      url: `/pages/post.html?id=${postID}`,
    });
  };
});
