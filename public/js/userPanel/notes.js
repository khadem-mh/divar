import { baseUrl } from "../../../utils/shared.js";
import {
  calcuteRelativeTimeDifference,
  getToken,
  showSwal,
} from "../../../utils/utils.js";

window.addEventListener("load", async () => {
  const postsContainer = document.querySelector("#posts-container");
  const emptyContainer = document.querySelector(".empty");

  const token = getToken();
  let posts = [];

  const postGenerator = (post) => {
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
                <p>${date} در ${post.neighborhood.name}</p>
                <p>${post.note.content}</p>
                </div>
            </div>
            <i class="bi bi-trash" onclick=removeNote('${post.note._id}')></i>
        </div>    
      `
    );
  };

  const res = await fetch(`${baseUrl}/v1/user/notes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const response = await res.json();
  posts = response.data.posts;

  if (posts.length) {
    posts.map((post) => postGenerator(post));
  } else {
    emptyContainer.style.display = "flex";
  }

  window.removeNote = async (noteID) => {
    showSwal(
      "آیا از حذف یادداشت اطمینان دارید؟",
      "warning",
      ["خیر", "بله"],
      (result) => {
        if (result) {
          fetch(`${baseUrl}/v1/note/${noteID}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then((res) => {
            if (res.status === 200) {
              posts = posts.filter((post) => post.note._id !== noteID);
              postsContainer.innerHTML = "";
              if (posts.length) {
                posts.map((post) => postGenerator(post));
              } else {
                emptyContainer.style.display = "flex";
              }
            }
          });
        }
      }
    );
  };
});
