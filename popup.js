document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("PromoPopup");
  const closeBtn = document.querySelector(".close-btn");
  const claimBtn = document.querySelector(".promo-btn");
  const content = document.querySelector(".promo-popup-content");

  // hide initially
  popup.style.display = "none";

  // show after 1.5s
  setTimeout(() => {
    popup.style.display = "flex";
  }, 1500);

  // move popup into peek mode
  function peekPopup() {
    popup.classList.add("peek");
  }

  // bring popup back to center
  function showCenterPopup() {
    popup.classList.remove("peek");
  }

  // clicking background → peek
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      peekPopup();
    }
  });

  // clicking × → peek (fixed with stopPropagation)
  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    peekPopup();
  });

  // clicking Claim Offer → peek
  claimBtn.addEventListener("click", peekPopup);

  // clicking the box while peeking → bring back to center
  content.addEventListener("click", (e) => {
    if (popup.classList.contains("peek") && !e.target.classList.contains("close-btn")) {
      showCenterPopup();
    }
  });
});
