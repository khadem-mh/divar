import { baseUrl, getPostDetails } from "../../utils/shared.js";
import {
  calcuteRelativeTimeDifference,
  getFromLocalStorage,
  getToken,
  getUrlParam,
  isLogin,
  saveInLocalStorage,
  showModal,
  showSwal,
} from "../../utils/utils.js";

window.addEventListener("load", () => {
  getPostDetails().then(async (post) => {
    console.log("Post Location ->", post.map);
    const loading = document.querySelector("#loading-container");
    loading.style.display = "none";

    const isUserLogin = await isLogin();
    const token = getToken();

    let noteID = null;
    let bookmarkStatus = null;

    const recentSeens = getFromLocalStorage("recent-seens");
    const isPostSeen = recentSeens?.some((postID) => postID === post._id);

    if (!isPostSeen && recentSeens) {
      saveInLocalStorage("recent-seens", [...recentSeens, post._id]);
    } else {
      if (recentSeens) {
        if (!isPostSeen) {
          saveInLocalStorage("recent-seens", [...recentSeens, post._id]);
        }
      } else {
        saveInLocalStorage("recent-seens", [post._id]);
      }
    }

    const postTitle = document.querySelector("#post-title");
    const postDescription = document.querySelector("#post-description");
    const postLocation = document.querySelector("#post-location");
    const postBreadcrumb = document.querySelector("#breadcrumb");
    const shareIcon = document.querySelector("#share-icon");
    const postInfos = document.querySelector("#post-infoes-list");
    const postPreview = document.querySelector("#post-preview");
    const mainSlider = document.querySelector("#main-slider-wrapper");
    const secendSlider = document.querySelector("#secend-slider-wrapper");
    const noteTextarea = document.querySelector("#note-textarea");
    const postFeedbackIcons = document.querySelectorAll(".post_feedback_icon");
    const phoneInfoBtn = document.querySelector("#phone-info-btn");
    const noteTrashIcon = document.querySelector("#note-trash-icon");
    const bookmarkIconBtn = document.querySelector("#bookmark-icon-btn");
    const bookmarkIcon = bookmarkIconBtn.querySelector(".bi");

    postTitle.innerHTML = post.title;
    postDescription.innerHTML = post.description;

    const date = calcuteRelativeTimeDifference(post.createdAt);
    postLocation.innerHTML = `${date} در ${post.city.name}، ${
      post.neighborhood ? post?.neighborhood?.name : ""
    }`;

    postBreadcrumb.insertAdjacentHTML(
      "beforeend",
      `
        <li class="main__breadcrumb-item">
          <a href='/pages/posts.html?categoryID=${post.breadcrumbs.category._id}' id="category-breadcrumb">${post.breadcrumbs.category.title}</a>
          <i class="main__breadcrumb-icon bi bi-chevron-left"></i>
        </li>
        <li class="main__breadcrumb-item">
          <a href='/pages/posts.html?categoryID=${post.breadcrumbs.subCategory._id}' id="category-breadcrumb">${post.breadcrumbs.subCategory.title}</a>
          <i class="main__breadcrumb-icon bi bi-chevron-left"></i>
        </li>
        <li class="main__breadcrumb-item">
          <a href='/pages/posts.html?categoryID=${post.breadcrumbs.subSubCategory._id}' id="category-breadcrumb">${post.breadcrumbs.subSubCategory.title}</a>
          <i class="main__breadcrumb-icon bi bi-chevron-left"></i>
        </li>
        <li class="main__breadcrumb-item">${post.title}</li>    
      `
    );

    shareIcon.addEventListener("click", async () => {
      await navigator.share(location.href);
    });

    postInfos.insertAdjacentHTML(
      "beforeend",
      `
        <li class="post__info-item">
          <span class="post__info-key">قیمت</span>
          <span class="post__info-value">${post.price.toLocaleString()} تومان</span>
        </li>
      `
    );

    post.dynamicFields.map((filed) => {
      postInfos.insertAdjacentHTML(
        "beforeend",
        `
          <li class="post__info-item">
            <span class="post__info-key">${filed.name}</span>
            <span class="post__info-value">${
              typeof filed.data === "boolean"
                ? filed.data === true
                  ? "دارد"
                  : "ندارد"
                : filed.data
            }</span>
          </li>
        `
      );
    });

    phoneInfoBtn.addEventListener("click", () => {
      showSwal(
        `شماره تماس: ${post.creator.phone}`,
        null,
        "تماس گرفتن",
        () => {}
      );
    });

    // Init map with leaflet.js
    let map = L.map("map").setView([post.map.x, post.map.y], 13);

    let icon = L.icon({
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjciIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAyNyA0OCI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9InBpbi1hIiB4MT0iNTAlIiB4Mj0iNTAlIiB5MT0iMCUiIHkyPSIxMDAlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI0E2MjYyNiIgc3RvcC1vcGFjaXR5PSIuMzIiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjQTYyNjI2Ii8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPHBhdGggaWQ9InBpbi1jIiBkPSJNMTguNzk0MzMzMywxNC40NjA0IEMxOC43OTQzMzMzLDE3LjQwNTQ1OTkgMTYuNDA3NDQ5NiwxOS43OTM3MzMzIDEzLjQ2MDEwNDcsMTkuNzkzNzMzMyBDMTAuNTE0NTUwNCwxOS43OTM3MzMzIDguMTI3NjY2NjcsMTcuNDA1NDU5OSA4LjEyNzY2NjY3LDE0LjQ2MDQgQzguMTI3NjY2NjcsMTEuNTE1MzQwMSAxMC41MTQ1NTA0LDkuMTI3MDY2NjcgMTMuNDYwMTA0Nyw5LjEyNzA2NjY3IEMxNi40MDc0NDk2LDkuMTI3MDY2NjcgMTguNzk0MzMzMywxMS41MTUzNDAxIDE4Ljc5NDMzMzMsMTQuNDYwNCIvPgogICAgPGZpbHRlciBpZD0icGluLWIiIHdpZHRoPSIyMzEuMiUiIGhlaWdodD0iMjMxLjIlIiB4PSItNjUuNiUiIHk9Ii00Ni45JSIgZmlsdGVyVW5pdHM9Im9iamVjdEJvdW5kaW5nQm94Ij4KICAgICAgPGZlT2Zmc2V0IGR5PSIyIiBpbj0iU291cmNlQWxwaGEiIHJlc3VsdD0ic2hhZG93T2Zmc2V0T3V0ZXIxIi8+CiAgICAgIDxmZUdhdXNzaWFuQmx1ciBpbj0ic2hhZG93T2Zmc2V0T3V0ZXIxIiByZXN1bHQ9InNoYWRvd0JsdXJPdXRlcjEiIHN0ZERldmlhdGlvbj0iMiIvPgogICAgICA8ZmVDb2xvck1hdHJpeCBpbj0ic2hhZG93Qmx1ck91dGVyMSIgdmFsdWVzPSIwIDAgMCAwIDAgICAwIDAgMCAwIDAgICAwIDAgMCAwIDAgIDAgMCAwIDAuMjQgMCIvPgogICAgPC9maWx0ZXI+CiAgPC9kZWZzPgogIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICA8cGF0aCBmaWxsPSJ1cmwoI3Bpbi1hKSIgZD0iTTEzLjA3MzcsMS4wMDUxIEM1LjgwMzIsMS4yMTUxIC0wLjEzOTgsNy40Njg2IDAuMDAyNywxNC43MzkxIEMwLjEwOTIsMjAuMTkwMSAzLjQ1NTcsMjQuODQ2MSA4LjE5NTcsMjYuODYzNiBDMTAuNDUzMiwyNy44MjUxIDExLjk3MTIsMjkuOTc0NiAxMS45NzEyLDMyLjQyODYgTDExLjk3MTIsMzkuNDExNTUxNCBDMTEuOTcxMiw0MC4yMzk1NTE0IDEyLjY0MTcsNDAuOTExNTUxNCAxMy40NzEyLDQwLjkxMTU1MTQgQzE0LjI5OTIsNDAuOTExNTUxNCAxNC45NzEyLDQwLjIzOTU1MTQgMTQuOTcxMiwzOS40MTE1NTE0IEwxNC45NzEyLDMyLjQyNTYgQzE0Ljk3MTIsMzAuMDEyMSAxNi40MTcyLDI3LjgzNDEgMTguNjQ0NywyNi45MDU2IEMyMy41MTY3LDI0Ljg3NzYgMjYuOTQxMiwyMC4wNzYxIDI2Ljk0MTIsMTQuNDcwNiBDMjYuOTQxMiw2Ljg5ODYgMjAuNjkzNywwLjc4NjEgMTMuMDczNywxLjAwNTEgWiIvPgogICAgPHBhdGggZmlsbD0iI0E2MjYyNiIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMTMuNDcwNiw0Ny44MTIgQzEyLjU1NTYsNDcuODEyIDExLjgxNDYsNDcuMDcxIDExLjgxNDYsNDYuMTU2IEMxMS44MTQ2LDQ1LjI0MSAxMi41NTU2LDQ0LjUgMTMuNDcwNiw0NC41IEMxNC4zODU2LDQ0LjUgMTUuMTI2Niw0NS4yNDEgMTUuMTI2Niw0Ni4xNTYgQzE1LjEyNjYsNDcuMDcxIDE0LjM4NTYsNDcuODEyIDEzLjQ3MDYsNDcuODEyIFoiLz4KICAgIDx1c2UgZmlsbD0iIzAwMCIgZmlsdGVyPSJ1cmwoI3Bpbi1iKSIgeGxpbms6aHJlZj0iI3Bpbi1jIi8+CiAgICA8dXNlIGZpbGw9IiNGRkYiIHhsaW5rOmhyZWY9IiNwaW4tYyIvPgogIDwvZz4KPC9zdmc+Cg==",
      iconSize: [45, 45],
    });

    L.marker([post.map.x, post.map.y], { icon }).addTo(map);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);

    postFeedbackIcons.forEach((icon) => {
      icon.addEventListener("click", () => {
        postFeedbackIcons.forEach((icon) => icon.classList.remove("active"));
        icon.classList.add("active");
      });
    });

    if (isUserLogin) {
      // Bookmard
      if (post.bookmarked) {
        bookmarkIcon.style.color = "red";
        bookmarkStatus = true;
      } else {
        bookmarkStatus = false;
      }

      bookmarkIconBtn.addEventListener("click", async () => {
        const postID = getUrlParam("id");

        if (bookmarkStatus) {
          const res = await fetch(`${baseUrl}/v1/bookmark/${postID}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (res.status === 200) {
            bookmarkStatus = false;
            bookmarkIcon.style.color = "gray";
          }
        } else {
          const res = await fetch(`${baseUrl}/v1/bookmark/${postID}`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (res.status === 201) {
            bookmarkStatus = true;
            bookmarkIcon.style.color = "red";
          }
        }
      });

      // Note
      if (post.note) {
        noteTextarea.value = post.note.content;
        noteTrashIcon.style.display = "block";
        noteID = post.note._id;
      }
      noteTextarea.addEventListener("keyup", (event) => {
        if (event.target.value.trim()) {
          noteTrashIcon.style.display = "block";
        } else {
          noteTrashIcon.style.display = "none";
        }
      });

      noteTextarea.addEventListener("blur", async (event) => {
        if (noteID) {
          await fetch(`${baseUrl}/v1/note/${noteID}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              content: event.target.value,
            }),
          });
        } else {
          await fetch(`${baseUrl}/v1/note`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              postId: post._id,
              content: event.target.value,
            }),
          });
        }
      });

      noteTrashIcon.addEventListener("click", () => {
        noteTextarea.value = "";
        noteTrashIcon.style.display = "none";
      });
    } else {
      noteTextarea.addEventListener("focus", (event) => {
        event.preventDefault();
        showModal("login-modal", "login-modal--active");
      });
    }

    if (post.pics.length) {
      post.pics.map((pic) => {
        mainSlider.insertAdjacentHTML(
          "beforeend",
          `
            <div class="swiper-slide">
              <img src="${baseUrl}/${pic.path}" />
            </div>
          `
        );

        secendSlider.insertAdjacentHTML(
          "beforeend",
          `
            <div class="swiper-slide">
              <img src="${baseUrl}/${pic.path}" />
            </div>
          `
        );
      });
    } else {
      postPreview.style.display = "none";
    }

    const mainSliderConfigs = new Swiper(".mySwiper", {
      spaceBetween: 10,
      rewind: true,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
    });

    const secondSliderConfigs = new Swiper(".mySwiper2", {
      spaceBetween: 10,
      rewind: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      thumbs: {
        swiper: mainSliderConfigs,
      },
    });
  });
});
