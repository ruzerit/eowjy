// 갤러리 및 모달 요소 가져오기
const galleryContainer = document.querySelector(".gallery-container");
const galleryItems = document.querySelectorAll(".gallery-item");
const videoModal = document.getElementById("modalVideoCheck");
const compCardModal = document.getElementById("modalCompCard");
const videoElement = document.querySelector("#modalVideoCheck video");

// 페이지 로드 시 초기 설정
document.addEventListener("DOMContentLoaded", function () {
    // 비디오 모달 자동 숨김
    if (videoModal) {
        videoModal.style.display = "none";
        videoModal.style.opacity = "0";
        videoModal.style.visibility = "hidden";
    }
    if (compCardModal) {
        compCardModal.style.display = "none";
        compCardModal.style.opacity = "0";
        compCardModal.style.visibility = "hidden";
    }

    // 비디오 자동 재생 방지
    if (videoElement) {
        videoElement.removeAttribute("autoplay");
        videoElement.pause();
    }

    // 갤러리 중앙 정렬 적용
    updateCenterImage();
});

// 갤러리 중앙 정렬 및 강조 효과 적용
function updateCenterImage() {
    let scrollLeft = galleryContainer.scrollLeft;
    let containerCenter = galleryContainer.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Infinity;

    galleryItems.forEach((item, index) => {
        let itemCenter = item.offsetLeft + item.offsetWidth / 2 - galleryContainer.offsetLeft;
        let distance = Math.abs(itemCenter - (scrollLeft + containerCenter));

        if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
        }
    });

    // 강조 효과 적용
    galleryItems.forEach((item, index) => {
        if (index === closestIndex) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });
}

// 가로 스크롤 이벤트 감지하여 중앙 정렬 적용
galleryContainer.addEventListener("scroll", updateCenterImage);

// 모달 열기 이벤트
document.getElementById("videoCheckBtn")?.addEventListener("click", function () {
    if (videoModal) {
        videoModal.style.display = "flex";
        setTimeout(() => {
            videoModal.style.opacity = "1";
            videoModal.style.visibility = "visible";
        }, 50);
    }
});

document.getElementById("compCardBtn")?.addEventListener("click", function () {
    if (compCardModal) {
        compCardModal.style.display = "flex";
        setTimeout(() => {
            compCardModal.style.opacity = "1";
            compCardModal.style.visibility = "visible";
        }, 50);
    }
});

// 갤러리 마우스 드래그 & 터치 슬라이드 기능
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

// ✅ ESC 키를 누르면 열린 모달만 닫기
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        if (videoModal && videoModal.style.display === "flex") {
            closeModal("modalVideoCheck");
        } else if (compCardModal && compCardModal.style.display === "flex") {
            closeModal("modalCompCard");
        }
    }
});

// ✅ 모달 바깥 클릭 시 닫기 기능 추가
document.addEventListener("DOMContentLoaded", function () {
    if (videoModal) {
        videoModal.addEventListener("click", function (event) {
            if (event.target === this) {
                closeModal("modalVideoCheck");
            }
        });
    }

    if (compCardModal) {
        compCardModal.addEventListener("click", function (event) {
            if (event.target === this) {
                closeModal("modalCompCard");
            }
        });
    }
});