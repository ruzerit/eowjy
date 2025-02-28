// 갤러리 가로 슬라이드 기능 추가 (터치 및 마우스 드래그 지원)
const galleryContainer = document.querySelector('.gallery-container');

let isDown = false;
let startX;
let scrollLeft;

galleryContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    galleryContainer.classList.add('active');
    startX = e.pageX - galleryContainer.offsetLeft;
    scrollLeft = galleryContainer.scrollLeft;
});

galleryContainer.addEventListener('mouseleave', () => {
    isDown = false;
    galleryContainer.classList.remove('active');
});

galleryContainer.addEventListener('mouseup', () => {
    isDown = false;
    galleryContainer.classList.remove('active');
});

galleryContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - galleryContainer.offsetLeft;
    const walk = (x - startX) * 2; // 스크롤 속도 조절
    galleryContainer.scrollLeft = scrollLeft - walk;
});

// 모바일 터치 이벤트 추가
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


// 기존 갤러리 이미지 클릭 이벤트 제거 후 새로 추가
document.querySelectorAll(".gallery-item img").forEach(img => {
    img.addEventListener("click", function () {
        let modal = document.createElement("div");
        modal.classList.add("modal");
        modal.innerHTML = `<div class="modal-content">
                            <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
                            <img src="${this.src}" alt="Portfolio Image">
                           </div>`;
        document.body.appendChild(modal);
        modal.style.display = "flex";
    });
});

// 갤러리 중앙 정렬 및 강조 효과 적용
const galleryContainer = document.querySelector(".gallery-container");
const galleryItems = document.querySelectorAll(".gallery-item");

function updateCenterImage() {
    let scrollLeft = galleryContainer.scrollLeft;
    let itemWidth = galleryItems[0].offsetWidth + 10; // 이미지 너비 + 갭 크기
    let centerIndex = Math.round(scrollLeft / itemWidth); // 정확한 중앙 이미지 찾기

    galleryItems.forEach((item, index) => {
        if (index === centerIndex) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });
}

// 가로 스크롤 이벤트 감지하여 중앙 정렬 적용
galleryContainer.addEventListener("scroll", updateCenterImage);

// 이미지 확장자 자동 인식 (jpg, JPG, png, PNG, jpeg 등)
document.querySelectorAll(".gallery-item img").forEach(img => {
    let regex = /\.(jpg|jpeg|png|JPG|JPEG|PNG)$/;
    if (!regex.test(img.src)) {
        console.warn("이미지 파일이 올바르지 않음:", img.src);
    }
});

document.addEventListener("DOMContentLoaded", function () {
    let videoModal = document.getElementById("modalVideoCheck");
    let compCardModal = document.getElementById("modalCompCard");
    let videoElement = document.querySelector("#modalVideoCheck video");

    if (videoModal) {
        videoModal.style.display = "none";
        videoModal.style.opacity = "0";
        videoModal.style.visibility = "hidden"; // 완전히 숨김
    }
    if (compCardModal) {
        compCardModal.style.display = "none";
        compCardModal.style.opacity = "0";
        compCardModal.style.visibility = "hidden";
    }
    if (videoElement) {
        videoElement.removeAttribute("autoplay"); // 자동 재생 방지
        videoElement.pause();
    }
});

// 모달 닫기 기능 수정
function closeModal(id) {
    let modal = document.getElementById(id);
    if (modal) {
        modal.style.opacity = "0";
        modal.style.visibility = "hidden";
        modal.addEventListener("transitionend", () => {
            modal.style.display = "none";
        }, { once: true }); // 한 번만 실행되도록 설정
    }
}

// 모달 열기 이벤트 수정 (부드럽게 나타나도록)
document.getElementById('videoCheckBtn')?.addEventListener('click', function () {
    let videoModal = document.getElementById("modalVideoCheck");
    if (videoModal) {
        videoModal.style.display = 'flex';
        setTimeout(() => {
            videoModal.style.opacity = "1";
        }, 50);
    }
});

document.getElementById('compCardBtn')?.addEventListener('click', function () {
    let compCardModal = document.getElementById("modalCompCard");
    if (compCardModal) {
        compCardModal.style.display = 'flex';
        setTimeout(() => {
            compCardModal.style.opacity = "1";
        }, 50);
    }
});