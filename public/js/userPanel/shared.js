import { logout } from "../../../utils/auth.js";
import { getMe, isLogin } from "../../../utils/utils.js";

window.addEventListener("load", async () => {
  const sidebarPhoneNumber = document.querySelector("#sidebar-phone-number");
  const logoutBtn = document.querySelector("#logout-btn");

  const isUserLogin = await isLogin();

  if (isUserLogin) {
    getMe().then((user) => {
      sidebarPhoneNumber.innerHTML = `تلفن: ${user.phone}`;
    });

    logoutBtn.addEventListener("click", logout);
  } else {
    location.href = "/pages/posts.html";
  }
});
