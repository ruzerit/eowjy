// 모달 초기 상태 숨기기 (기존 코드에서 display를 "none"으로 설정)
document.addEventListener("DOMContentLoaded", function () {
    let videoModal = document.getElementById("modalVideoCheck");
    let compCardModal = document.getElementById("modalCompCard");

    if (videoModal) videoModal.style.display = "none";
    if (compCardModal) compCardModal.style.display = "none";
});

// 모달 닫기 함수 수정 (존재 여부 체크 추가)
function closeModal(id) {
    let modal = document.getElementById(id);
    if (modal) modal.style.display = "none";
}

// 모달 열기 이벤트 수정 (존재 여부 체크 추가)
document.getElementById('compCardBtn')?.addEventListener('click', function () {
    let compCardModal = document.getElementById("modalCompCard");
    if (compCardModal) compCardModal.style.display = 'flex';
});

document.getElementById('videoCheckBtn')?.addEventListener('click', function () {
    let videoModal = document.getElementById("modalVideoCheck");
    if (videoModal) videoModal.style.display = 'flex';
});

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
    let centerIndex = Math.round(galleryContainer.scrollLeft / galleryContainer.clientWidth);
    
    galleryItems.forEach((item, index) => {
        if (index === centerIndex) {
            item.classList.add("active"); // 현재 선택된 이미지 강조
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
