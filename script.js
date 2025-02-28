// 갤러리 컨테이너 한 번만 선언
const galleryContainer = document.querySelector(".gallery-container");
const galleryItems = document.querySelectorAll(".gallery-item");

let isDown = false;
let startX;
let scrollLeft;

// 마우스 드래그 기능 (PC)
galleryContainer.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - galleryContainer.offsetLeft;
    scrollLeft = galleryContainer.scrollLeft;
});

galleryContainer.addEventListener("mouseleave", () => isDown = false);
galleryContainer.addEventListener("mouseup", () => isDown = false);

galleryContainer.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - galleryContainer.offsetLeft;
    const walk = (x - startX) * 2; // 스크롤 속도 조절
    galleryContainer.scrollLeft = scrollLeft - walk;
});

// 터치 이벤트 (모바일)
galleryContainer.addEventListener("touchstart", (e) => {
    isDown = true;
    startX = e.touches[0].pageX - galleryContainer.offsetLeft;
    scrollLeft = galleryContainer.scrollLeft;
});

galleryContainer.addEventListener("touchmove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.touches[0].pageX - galleryContainer.offsetLeft;
    const walk = (x - startX) * 2;
    galleryContainer.scrollLeft = scrollLeft - walk;
});

galleryContainer.addEventListener("touchend", () => {
    isDown = false;
});

// 중앙 이미지 강조 효과
function updateCenterImage() {
    let scrollLeft = galleryContainer.scrollLeft;
    let itemWidth = galleryItems[0].offsetWidth + 10; // 이미지 너비 + 갭 크기
    let centerIndex = Math.round(scrollLeft / itemWidth);

    galleryItems.forEach((item, index) => {
        if (index === centerIndex) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });
}

// 초기에 중앙 정렬 효과 적용
document.addEventListener("DOMContentLoaded", updateCenterImage);
galleryContainer.addEventListener("scroll", updateCenterImage);

// 모달 닫기 함수 (더 확실하게 적용)
function closeModal(id) {
    let modal = document.getElementById(id);
    if (modal) {
        modal.style.opacity = "0";
        modal.style.visibility = "hidden";
        setTimeout(() => {
            modal.style.display = "none";
        }, 300); // 강제 숨김 적용
    }
}

// 모달 열기 이벤트 수정
document.getElementById("videoCheckBtn")?.addEventListener("click", function () {
    let videoModal = document.getElementById("modalVideoCheck");
    if (videoModal) {
        videoModal.style.display = "flex";
        setTimeout(() => {
            videoModal.style.opacity = "1";
            videoModal.style.visibility = "visible";
        }, 50);
    }
});

document.getElementById("compCardBtn")?.addEventListener("click", function () {
    let compCardModal = document.getElementById("modalCompCard");
    if (compCardModal) {
        compCardModal.style.display = "flex";
        setTimeout(() => {
            compCardModal.style.opacity = "1";
            compCardModal.style.visibility = "visible";
        }, 50);
    }
});

// 비디오 자동 재생 방지
document.addEventListener("DOMContentLoaded", function () {
    let videoElement = document.querySelector("#modalVideoCheck video");
    if (videoElement) {
        videoElement.removeAttribute("autoplay");
        videoElement.pause();
    }
});