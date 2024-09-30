import { baseUrl } from "../../utils/shared.js";
import { isLogin } from "../../utils/utils.js";

window.addEventListener("load", async () => {
  const loading = document.querySelector("#loading-container");
  const showCategoies = document.querySelector(".show-categoies");
  const categoriesContainer = document.querySelector("#categories-container");
  const categoriesSection = document.querySelector("#categories");
  const descriptionCheckbox = document.querySelector("#description-checkbox");
  const searchInput = document.querySelector("#search-input");
  const resultContainerModal = document.querySelector("#result-container");
  const removeIcon = document.querySelector("#remove-icon");

  const isUserLogin = await isLogin();

  if (!isUserLogin) {
    return (location.href = "/pages/posts.html");
  }

  const res = await fetch(`${baseUrl}/v1/category`);
  const response = await res.json();
  const categories = response.data.categories;

  loading.style.display = "none";

  showCategoies.addEventListener("click", () => {
    showCategoies.classList.remove("active");
    categoriesContainer.classList.add("active");
  });

  const generateCategoriesTemplate = (categories, title, id) => {
    categoriesSection.innerHTML = "";

    if (title) {
      categoriesSection.insertAdjacentHTML(
        "beforeend",
        `
          <div class="back" onclick="${
            id ? `categoryClickHandler('${id}')` : `backToAllCategories()`
          }">
            <i class="bi bi-arrow-right"></i>
            <p>بازگشت به ${title}</p>
          </div>
        `
      );
    }

    categories.map((category) => {
      categoriesSection.insertAdjacentHTML(
        "beforeend",
        `
            <div class="box" onclick="categoryClickHandler('${category._id}')">
                <div class="details">
                <div>
                    <i class="bi bi-house-door"></i>
                    <p>${category.title}</p>
                </div>
            
                ${
                  descriptionCheckbox.checked
                    ? `<span>${category.description}</span>`
                    : ""
                }
                
                </div>
                <i class="bi bi-chevron-left"></i>
            </div>
        `
      );
    });
  };

  window.categoryClickHandler = async (categoryID) => {
    const category = categories.find((category) => category._id === categoryID);

    if (category) {
      generateCategoriesTemplate(category.subCategories, "همه دسته‌ها", null);
    } else {
      const allSubCategories = categories.flatMap(
        (category) => category.subCategories
      );

      const subCategory = allSubCategories.find(
        (subCategory) => subCategory._id === categoryID
      );

      if (subCategory) {
        const subCategoryParent = categories.find(
          (category) => category._id === subCategory.parent
        );

        generateCategoriesTemplate(
          subCategory.subCategories,
          subCategoryParent.title,
          subCategoryParent._id
        );
      } else {
        location.href = `/pages/new/registerPost.html?subCategoryID=${categoryID}`;
      }
    }
  };

  window.backToAllCategories = () => {
    generateCategoriesTemplate(categories);
  };

  generateCategoriesTemplate(categories);

  descriptionCheckbox.addEventListener("change", () => {
    generateCategoriesTemplate(categories);
  });

  const subCategoriesResult = await fetch(`${baseUrl}/v1/category/sub`);
  const subCategoriesResponse = await subCategoriesResult.json();
  const subCategories = subCategoriesResponse.data.categories;

  console.log("subCategories ->", subCategories);

  searchInput.addEventListener("keyup", (event) => {
    if (event.target.value.trim()) {
      const filteredCategories = subCategories.filter((subCategory) =>
        subCategory.title.includes(event.target.value.trim())
      );

      resultContainerModal.classList.add("active");
      removeIcon.classList.add("active");
      resultContainerModal.innerHTML = "";

      if (filteredCategories.length) {
        filteredCategories.map((category) => {
          resultContainerModal.insertAdjacentHTML(
            "beforeend",
            `
              <a href="/pages/new/registerPost.html?subCategoryID=${category._id}" class="search-result">
                <p>${category.title}</p>
                <i class="bi bi-chevron-left"></i>
              </a>          
            `
          );
        });
      } else {
        resultContainerModal.insertAdjacentHTML(
          "beforeend",
          `
            <div class="empty">
              <img src="https://support-faq.divarcdn.com/web/2024/03/static/media/magnifier.7f88b2e3f8ae30f4333986d0b0fbcf1d.svg" />
              <p>نتیجه‌ای برای جستجوی شما یافت نشد</p>
            </div>
          `
        );
      }

      console.log("filteredCategories ->", filteredCategories);
    } else {
      searchInput.value = "";
      resultContainerModal.innerHTML = "";
      resultContainerModal.classList.remove("active");
      removeIcon.classList.remove("active");
    }
  });

  removeIcon.addEventListener("click", () => {
    searchInput.value = "";
    resultContainerModal.innerHTML = "";
    resultContainerModal.classList.remove("active");
    removeIcon.classList.remove("active");
  });
});
