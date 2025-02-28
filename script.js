function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

document.getElementById('compCardBtn').addEventListener('click', function() {
    document.getElementById('modalCompCard').style.display = 'flex';
});

document.getElementById('videoCheckBtn').addEventListener('click', function() {
    document.getElementById('modalVideoCheck').style.display = 'flex';
});

document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', function() {
        let modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `<div class="modal-content">
                            <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
                            <img src="${this.src}" alt="Portfolio Image">
                           </div>`;
        document.body.appendChild(modal);
        modal.style.display = 'flex';
    });
});
