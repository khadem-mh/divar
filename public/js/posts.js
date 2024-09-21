import { getCityAdvertisments, getAdvertismentsCategories } from "../../utils/shared.js"
import { getCityInStorage, hiddenLoading, selectElem, insertElemToDom, baseURL, addParamToURL, calculateRelativeTimeDifference, getUrlParam } from "../../utils/utils.js";

window.addEventListener('load', () => {

  const cities = getCityInStorage('cities')

  getCityAdvertisments(cities[0].id).then(res => {

    //Hidden Loading
    hiddenLoading()

    generateAdvertisment(res.data.posts)

  })

  const generateAdvertisment = posts => {

    const postsContainer = selectElem("#posts-container")

    if (posts.length) {

      posts.forEach(post => {

        const date = calculateRelativeTimeDifference(post.createdAt)

        insertElemToDom(
          postsContainer,
          `
                    <div class="col-4">
                      <a href="post.html/id=${post._id}" class="product-card">
                        <div class="product-card__right">
                          <div class="product-card__right-top">
                            <p class="product-card__link">${post.title}</p>
                          </div>
                          <div class="product-card__right-bottom">
                            <span class="product-card__condition">${post.dynamicFields[0].data}</span>
                            <span class="product-card__price">
                              ${post.price === 0 ? "توافقی" : post.price.toLocaleString() + " تومان"}
                            </span>
                            <span class="product-card__time">${date}</span>
                          </div>
                        </div>
                        <div class="product-card__left">
                        ${post.pics.length ? `<img class="product-card__img img-fluid" src="${baseURL}${post.pics[0].path}"/>` : `<img class="product-card__img img-fluid" src="/public/images/main/noPicture.PNG"/>`}
                        </div>
                      </a>
                    </div>
                  `
        )

      })

    }
    else
      postsContainer.innerHTML = "<p class='empty'>آگهی یافت نشد</p>"

  }

  window.categoryClickHandler = categoryID => addParamToURL("categoryID", categoryID)

  getAdvertismentsCategories().then(res => {

    //Hidden Loading
    hiddenLoading()

    const categoryID = getUrlParam("categoryID")
    const categories = res.data.categories
    const categoriesContainer = selectElem("#categories-container");
    categoriesContainer.innerHTML = ""

    if (categoryID) {

      const categoryInfos = categories.filter(category => category._id === categoryID)

      if (!categoryInfos.length) {
        
      } else {
        
      }
      

    } else {

      categories.forEach(category => {

        insertElemToDom(
          categoriesContainer,
          `
          <div class="sidebar__category-link" id="category-${category._id}">
            <div class="sidebar__category-link_details" onclick="categoryClickHandler('${category._id}')">
              <i class="sidebar__category-icon bi bi-house"></i>
              <p class="fw-bold">${category.title}</p>
            </div>
          </div>
          `
        )

      })

    }


  })

})