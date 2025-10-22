document.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("intro-scene");
  const main = document.getElementById("main-scene");
  const charImg = document.getElementById("character-img");

  if (intro && main) {
    setTimeout(() => {
      intro.classList.remove("active");
      main.classList.add("active");
    }, 2000);
  }

  if (charImg) {
    const img1 = "image/aboutme1.png";
    const img2 = "image/aboutme2.png";
    let current = true;
    setInterval(() => {
      charImg.src = current ? img2 : img1;
      current = !current;
    }, 500);
  }
});


let slideInterval;

const data = {
  ambassador: {
    title: "AMS AMBASSADOR WINNER OF 2024",
    images: [
      ["image/ambassador1.jpg", "image/ambassador2.jpg"],
      ["image/ambassador3.jpg", "image/ambassador4.jpg"],
    ],
    text: `
      The Ams Ambassador Competition is one of the most celebrated sub-events of our school’s art showcase NHAT.
      Hundreds of competitors from 14 Specialized Classes compete through five rounds
      (Application, Interview, Top 20—Talent Round, Top 10—Traditional and Evening gowns, Top 3—Final question).
      During the Grand Finale Night, I was crowned the Winner of Ams Ambassador—the Competition’s highest honor.
    `
  },
  explorer: {
    title: "CULTURE EXPLORER",
    images: ["image/explorer1.jpg", "image/explorer2.jpg"],
    text: `
      Ever since I was young, I have always had a flair for Vietnamese cultural beauty. With this passion and the purpose
      of preserving and conveying our heritage to the young generation in mind, I founded Tu Su History Project—one of many
      that I have worked on. In our Viet Palette project, I worked with peers and professionals to preserve the beauty of
      Vietnamese art. On another note, I also combined my love for arts to incorporate Vietnamese minorities’ cultural
      elements into the dances of G’LAMS Musical 2025.
    `
  }
};

function showInfo(type) {
  clearInterval(slideInterval);

  document.getElementById("introBox").classList.add("hidden");
  document.getElementById("infoBox").classList.remove("hidden");

  const { title, images, text } = data[type];

  document.getElementById("infoTitle").textContent = title;

  document.getElementById("infoSubTitle").textContent = title;

 
  document.getElementById("infoDescription").innerHTML = text;

  const img1 = document.getElementById("slideImg1");
  const img2 = document.getElementById("slideImg2");

  if (type === "ambassador") {
    let index = 0;
    function updateSlide() {
      img1.src = images[index][0];
      img2.src = images[index][1];
      index = (index + 1) % images.length;
    }
    updateSlide();
    slideInterval = setInterval(updateSlide, 2000);
  } else {
    img1.src = images[0];
    img2.src = images[1];
  }
}
// ============================
// TỰ ĐỘNG HIỂN THỊ KHI VÀO URL CÓ HASH
// ============================
window.addEventListener("load", () => {
  const hash = window.location.hash.substring(1);
  if (hash && data[hash]) {
    showInfo(hash);
  }
});

window.addEventListener("hashchange", () => {
  const hash = window.location.hash.substring(1);
  if (hash && data[hash]) {
    showInfo(hash);
  }
});


function showContent(id) {
  document.querySelectorAll('.content-box').forEach(box => box.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

// ============================
// SLIDER - DÙNG NÚT NHẤN TIẾN / LÙI
// ============================

function initSlider(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const slides = container.querySelectorAll(".slide");
  const dotsContainer = container.querySelector(".dots");
  const arrows = container.querySelectorAll(".arrow");

  if (!slides.length) return;

  let currentSlide = 0;

  // Thêm dots nếu chưa có
  if (slides.length > 1 && dotsContainer && dotsContainer.children.length === 0) {
    slides.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", (e) => {
        e.stopPropagation();
        goToSlide(containerId, i);
      });
      dotsContainer.appendChild(dot);
    });
  }

  const dots = container.querySelectorAll(".dot");

  function showSlide(index) {
    slides.forEach((s, i) => {
      s.classList.toggle("active", i === index);
      dots[i]?.classList.toggle("active", i === index);
    });
  }

  // Lưu thông tin slider vào dataset để gọi ngoài
  container.dataset.currentSlide = 0;
  container.dataset.totalSlides = slides.length;

  // Hàm khởi tạo hiển thị
  showSlide(currentSlide);
}

// Hàm toàn cục dùng cho tất cả slider
function changeSlide(direction, id = null) {
  const activeId = id || document.querySelector(".content-box:not(.hidden)")?.id;
  if (!activeId) return;

  const container = document.getElementById(activeId);
  if (!container) return;

  const slides = container.querySelectorAll(".slide");
  const dots = container.querySelectorAll(".dot");
  let current = parseInt(container.dataset.currentSlide || 0, 10);
  const total = slides.length;

  current = (current + direction + total) % total;
  container.dataset.currentSlide = current;

  slides.forEach((s, i) => {
    s.classList.toggle("active", i === current);
    dots[i]?.classList.toggle("active", i === current);
  });
}

function goToSlide(id, index) {
  const container = document.getElementById(id);
  if (!container) return;

  const slides = container.querySelectorAll(".slide");
  const dots = container.querySelectorAll(".dot");
  container.dataset.currentSlide = index;

  slides.forEach((s, i) => {
    s.classList.toggle("active", i === index);
    dots[i]?.classList.toggle("active", i === index);
  });
}

// ===== KHỞI TẠO TẤT CẢ SLIDER =====
document.addEventListener("DOMContentLoaded", () => {
  [
    "tuSuBox",
    "newspaperBox",
    "galleryBox",
    "cheerleadingBox",
    "musicalsBox",
    "filmBox",
    "visualsBox"
  ].forEach(initSlider);
});


function openFilmReview() {
  window.location.href = "/film-review";
}

let reviewCurrentSlide = 0;
const reviewSlides = document.querySelectorAll(".review-slide");
const reviewDots = document.querySelectorAll(".review-dots span");

function showReviewSlide(index) {
  if (index < 0) index = reviewSlides.length - 1;
  if (index >= reviewSlides.length) index = 0;
  reviewSlides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
    reviewDots[i].classList.toggle("active", i === index);
  });
  reviewCurrentSlide = index;
}

function changeReviewSlide(step) {
  showReviewSlide(reviewCurrentSlide + step);
}

function goToReviewSlide(index) {
  showReviewSlide(index);
}

