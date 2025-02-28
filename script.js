// ✅ 요소 가져오기
const galleryContainer = document.querySelector(".gallery-container");
const galleryItems = document.querySelectorAll(".gallery-item");
const videoModal = document.getElementById("modalVideoCheck");
const compCardModal = document.getElementById("modalCompCard");
const galleryModal = document.getElementById("galleryModal");
const galleryImage = document.getElementById("galleryImage");
const videoElement = document.querySelector("#modalVideoCheck video");

// ✅ 컴카드 & 비디오 모달 버튼 클릭 시 열기 (버튼 ID와 연결)
document.getElementById("compCardBtn").addEventListener("click", function () {
    openModal("modalCompCard");
});

document.getElementById("videoCheckBtn").addEventListener("click", function () {
    openModal("modalVideoCheck");
});

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
    
    // ✅ 초기 갤러리 중앙 정렬 (2번 사진을 중앙에 위치)
    setTimeout(() => {
        let initialIndex = 1; // 두 번째 이미지 (0부터 시작)
        let containerCenter = galleryContainer.clientWidth / 2;
        let selectedItem = galleryItems[initialIndex];

        galleryContainer.scrollLeft = selectedItem.offsetLeft - containerCenter + selectedItem.offsetWidth / 2;
        updateCenterImage();
    }, 100); // 레이아웃이 완전히 로드된 후 실행되도록 약간의 지연 추가
});


// ✅ 중앙에 온 사진 강조 및 자동 정렬 유지
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

    // ✅ 자동 중앙 정렬
    let selectedItem = galleryItems[closestIndex];
    galleryContainer.scrollTo({
        left: selectedItem.offsetLeft - containerCenter + selectedItem.offsetWidth / 2,
        behavior: "smooth"
    });
}

// ✅ 모바일 터치 이벤트 추가
galleryContainer.addEventListener("touchstart", (e) => {
    isDown = true;
    startX = e.touches[0].pageX - galleryContainer.offsetLeft;
    startScrollLeft = galleryContainer.scrollLeft;
}, { passive: true });

galleryContainer.addEventListener("touchmove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    let x = e.touches[0].pageX - galleryContainer.offsetLeft;
    let walk = (x - startX) * 2;
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