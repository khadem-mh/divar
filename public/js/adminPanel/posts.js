import { baseUrl } from "../../../utils/shared.js";
import {
  getToken,
  getUrlParam,
  paginateItems,
  showSwal,
} from "./../../../utils/utils.js";

window.addEventListener("load", async () => {
  const token = getToken();

  let page = getUrlParam("page");
  !page ? (page = 1) : null;

  const postsGenerator = async () => {
    // Codes
    const postsTable = document.querySelector("#posts-table");
    const paginationItems = document.querySelector(".pagination-items");
    const emptyContainer = document.querySelector(".empty");

    const res = await fetch(`${baseUrl}/v1/post/all?page=${page}&limit=4`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const response = await res.json();
    const posts = response.data.posts;

    postsTable.innerHTML = "";

    if (posts.length) {
      postsTable.insertAdjacentHTML(
        `beforeend`,
        `
            <tr>
                <th>عنوان</th>
                <th>کاربر</th>
                <th>وضعیت</th>
                <th>تایید</th>
                <th>رد</th>
                <th>حذف</th>
            </tr>
            ${posts
              .map(
                (post) => `
                <tr>
                    <td>${post.title}</td>
                    <td>${post.creator.phone}</td>
                    <td>
                        ${
                          post.status === "published"
                            ? `<p class="publish">منتشر شده</p>`
                            : ""
                        }
                        ${
                          post.status === "rejected"
                            ? `<p class="reject">رد شده</p>`
                            : ""
                        }
                        ${
                          post.status === "pending"
                            ? `<p class="pending">در صف انتشار</p>`
                            : ""
                        }
                    </td>
                    <td>
                        ${
                          post.status === "published" ||
                          post.status === "rejected"
                            ? "❌"
                            : `<button class="edit-btn" onclick="acceptPost('${post._id}')">تایید</button>`
                        }
                    </td>
                    <td>
                        ${
                          post.status === "published" ||
                          post.status === "rejected"
                            ? "❌"
                            : `<button class="edit-btn" onclick="rejectPost('${post._id}')">رد</button>`
                        }
                    </td>
                    <td>
                        <button class="delete-btn" onclick="deletePost('${
                          post._id
                        }')">حذف</button>
                    </td>
                </tr>
            `
              )
              .join("")}
        `
      );
    } else {
      emptyContainer.style.display = "flex";
    }

    console.log(response);
    paginateItems(
      "/pages/adminPanel/posts.html",
      paginationItems,
      page,
      response.data.pagination.totalPosts,
      4
    );
  };

  await postsGenerator();

  window.deletePost = (postID) => {
    showSwal(
      "آیا از حذف آگهی مطمئن هستید؟",
      "warning",
      ["خیر", "آره"],
      (result) => {
        if (result) {
          fetch(`${baseUrl}/v1/post/${postID}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then(async (res) => {
            if (res.status === 200) {
              await postsGenerator();
              showSwal(
                "پست مورد نظر با موفقیت حذف شد",
                "success",
                "اوکی",
                () => {}
              );
            }
          });
        }
      }
    );
  };

  window.acceptPost = (postID) => {
    showSwal(
      "آیا از تایید آگهی مطمئن هستید؟",
      "warning",
      ["خیر", "آره"],
      (result) => {
        if (result) {
          fetch(`${baseUrl}/v1/post/${postID}/status`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ status: "published" }),
          }).then(async (res) => {
            if (res.status === 200) {
              await postsGenerator();
              showSwal(
                "پست مورد نظر با موفقیت تایید شد",
                "success",
                "اوکی",
                () => {}
              );
            }
          });
        }
      }
    );
  };

  window.rejectPost = (postID) => {
    showSwal(
      "آیا از رد آگهی مطمئن هستید؟",
      "warning",
      ["خیر", "آره"],
      (result) => {
        if (result) {
          fetch(`${baseUrl}/v1/post/${postID}/status`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ status: "rejected" }),
          }).then(async (res) => {
            if (res.status === 200) {
              await postsGenerator();
              showSwal(
                "پست مورد نظر با موفقیت رد شد",
                "success",
                "اوکی",
                () => {}
              );
            }
          });
        }
      }
    );
  };
});
