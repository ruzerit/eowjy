// 모달 초기 상태 숨기기
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("modalCompCard").style.display = "none";
    document.getElementById("modalVideoCheck").style.display = "none";
});

// 모달 닫기 함수
function closeModal(id) {
    document.getElementById(id).style.display = "none";
}

// 모달 열기 이벤트 추가
document.getElementById('compCardBtn').addEventListener('click', function () {
    document.getElementById('modalCompCard').style.display = 'flex';
});

document.getElementById('videoCheckBtn').addEventListener('click', function () {
    document.getElementById('modalVideoCheck').style.display = 'flex';
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
