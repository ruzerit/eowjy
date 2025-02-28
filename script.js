// ✅ 요소 가져오기
const galleryContainer = document.querySelector(".gallery-container");
const galleryItems = document.querySelectorAll(".gallery-item");
const videoModal = document.getElementById("modalVideoCheck");
const compCardModal = document.getElementById("modalCompCard");
const galleryModal = document.getElementById("galleryModal");
const galleryImage = document.getElementById("galleryImage");
const videoElement = document.querySelector("#modalVideoCheck video");

// ✅ 초기 설정 (모달 숨김 및 비디오 자동 재생 방지)
document.addEventListener("DOMContentLoaded", function () {
    [videoModal, compCardModal, galleryModal].forEach(modal => {
        if (modal) {
            modal.style.display = "none";
            modal.style.opacity = "0";
            modal.style.visibility = "hidden";
        }
    });

    if (videoElement) {
        videoElement.removeAttribute("autoplay");
        videoElement.pause();
    }

    // ✅ 갤러리 중앙 정렬 적용
    updateCenterImage();
});

// ✅ 갤러리 중앙 정렬 및 강조 효과 적용
function updateCenterImage() {
    let containerCenter = galleryContainer.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Infinity;

    galleryItems.forEach((item, index) => {
        let itemCenter = item.offsetLeft + item.offsetWidth / 2 - galleryContainer.offsetLeft;
        let distance = Math.abs(itemCenter - (galleryContainer.scrollLeft + containerCenter));

        if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
        }
    });

    // ✅ 강조 효과 적용
    galleryItems.forEach((item, index) => {
        item.classList.toggle("active", index === closestIndex);
    });

    // ✅ 자동 중앙 정렬
    let selectedItem = galleryItems[closestIndex];
    galleryContainer.scrollTo({
        left: selectedItem.offsetLeft - containerCenter + selectedItem.offsetWidth / 2,
        behavior: "smooth"
    });
}

// ✅ 가로 스크롤 이벤트 감지하여 중앙 정렬 적용
galleryContainer.addEventListener("scroll", updateCenterImage);

// ✅ 갤러리 슬라이드 기능 수정 (PC & 모바일 지원)
let isDown = false;
let startX, startScrollLeft;

galleryContainer.addEventListener("mousedown", (e) => {
    isDown = true;
    galleryContainer.classList.add("active");
    startX = e.pageX - galleryContainer.offsetLeft;
    startScrollLeft = galleryContainer.scrollLeft;
});

galleryContainer.addEventListener("mouseleave", () => {
    isDown = false;
    galleryContainer.classList.remove("active");
});

galleryContainer.addEventListener("mouseup", () => {
    isDown = false;
    galleryContainer.classList.remove("active");
});

galleryContainer.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    let x = e.pageX - galleryContainer.offsetLeft;
    let walk = (x - startX) * 2; // 이동 속도 조절
    galleryContainer.scrollLeft = startScrollLeft - walk;
});

// ✅ 모바일 터치 이벤트 추가
galleryContainer.addEventListener("touchstart", (e) => {
    isDown = true;
    startX = e.touches[0].pageX - galleryContainer.offsetLeft;
    startScrollLeft = galleryContainer.scrollLeft;
}, { passive: true });

galleryContainer.addEventListener("touchmove", (e) => {
    if (!isDown) return;
    e.preventDefault(); // ✅ 기본 스크롤 동작 방지
    let x = e.touches[0].pageX - galleryContainer.offsetLeft;
    let walk = (x - startX) * 2; // 이동 속도 조절
    galleryContainer.scrollLeft = startScrollLeft - walk;
}, { passive: false });

galleryContainer.addEventListener("touchend", () => {
    isDown = false;
});

// ✅ 모달 열기 & 닫기 기능
function openModal(modalId) {
    let modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "flex";
        setTimeout(() => {
            modal.style.opacity = "1";
            modal.style.visibility = "visible";
        }, 50);
    }
}

function closeModal(modalId) {
    let modal = document.getElementById(modalId);
    if (modal) {
        modal.style.opacity = "0";
        modal.style.visibility = "hidden";
        setTimeout(() => {
            modal.style.display = "none";
        }, 300);
    }
}

// ✅ ESC 키로 열린 모달 닫기
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        ["modalVideoCheck", "modalCompCard", "galleryModal"].forEach(modalId => {
            let modal = document.getElementById(modalId);
            if (modal && modal.style.display === "flex") {
                closeModal(modalId);
            }
        });
    }
});

// ✅ 모달 바깥 클릭 시 닫기
document.addEventListener("DOMContentLoaded", function () {
    ["modalVideoCheck", "modalCompCard", "galleryModal"].forEach(modalId => {
        let modal = document.getElementById(modalId);
        if (modal) {
            modal.addEventListener("click", function (event) {
                if (event.target === this) {
                    closeModal(modalId);
                }
            });
        }
    });
});

// 갤러리 이미지 클릭 시 모달 열기 (JPG 확장자 인식 포함)
function openGalleryModal(imgElement) {
    let galleryModal = document.getElementById("galleryModal");
    let galleryImage = document.getElementById("galleryImage");

    if (galleryModal && galleryImage) {
        let imgSrc = imgElement.src;

        // ✅ 확장자를 소문자로 변환하여 .JPG도 인식 가능하게 처리
        let lowerCaseSrc = imgSrc.toLowerCase();
        
        if (lowerCaseSrc.endsWith(".jpg")) { // ".jpg", ".JPG" 둘 다 인식
            galleryImage.src = imgSrc;
            galleryModal.style.display = "flex";
            setTimeout(() => {
                galleryModal.style.opacity = "1";
                galleryModal.style.visibility = "visible";
            }, 50);
        } else {
            console.warn("이미지 파일이 .JPG 확장자가 아닙니다:", imgSrc);
        }
    }
}

// 컴카드 및 비디오 모달에도 확장자 인식 추가
function openCompCardModal(imgElement) {
    let compCardModal = document.getElementById("modalCompCard");
    let compCardImage = document.getElementById("compCardImage");

    if (compCardModal && compCardImage) {
        let imgSrc = imgElement.src;

        // ✅ 확장자 대소문자 구분 없이 인식
        let lowerCaseSrc = imgSrc.toLowerCase();
        
        if (lowerCaseSrc.endsWith(".jpg")) {
            compCardImage.src = imgSrc;
            compCardModal.style.display = "flex";
            setTimeout(() => {
                compCardModal.style.opacity = "1";
                compCardModal.style.visibility = "visible";
            }, 50);
        } else {
            console.warn("컴카드 이미지 파일이 .JPG 확장자가 아닙니다:", imgSrc);
        }
    }
}