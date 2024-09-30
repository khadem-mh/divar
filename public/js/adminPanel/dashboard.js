import { baseUrl } from "../../../utils/shared.js";
import { getToken } from "./../../../utils/utils.js";

window.addEventListener("load", async () => {
  const token = getToken();

  const articlesCount = document.querySelector("#articles-count");
  const postsCount = document.querySelector("#posts-count");
  const usersCount = document.querySelector("#users-count");
  const postsTable = document.querySelector("#posts-table");
  const usersTable = document.querySelector("#users-table");

  const res = await fetch(`${baseUrl}/v1/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const response = await res.json();

  console.log(response);

  articlesCount.innerHTML = response.data.articlesCount;
  postsCount.innerHTML = response.data.postsCount;
  usersCount.innerHTML = response.data.usersCount;

  response.data.users.forEach((user) => {
    usersTable.insertAdjacentHTML(
      "beforeend",
      `
          <tr>
            <td>${user.phone}</td>
            <td>${user.verified ? "تایید شده" : "تایید نشده"}</td>
            <td>${user.postsCount}</td>
          </tr>
      `
    );
  });

  if (response.data.posts.length) {
    response.data.posts.forEach((post) => {
      postsTable.insertAdjacentHTML(
        "beforeend",
        `
            <tr>
              <td>${post.title}</td>
              <td>${post.creator.phone}</td>
              <td>${post.category.title}</td>
            </tr>
        `
      );
    });
  } else {
    postsTable.innerHTML = '<p class="empty-title">هیچ آگهی‌ای موجود نیست</p>';
  }
});
