// Плавный параллакс для центральной карточки
let mouseX = 0, mouseY = 0;
let currentX = 0, currentY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
});

document.addEventListener('touchmove', (e) => {
    if (e.touches[0]) {
        mouseX = (e.touches[0].clientX / window.innerWidth - 0.5) * 15;
        mouseY = (e.touches[0].clientY / window.innerHeight - 0.5) * 15;
    }
});

function parallax() {
    currentX += (mouseX - currentX) * 0.08;
    currentY += (mouseY - currentY) * 0.08;

    const card = document.querySelector('.center-card');
    if (card) {
        card.style.transform = `translate(${currentX * 0.2}px, ${currentY * 0.2}px)`;
    }
    requestAnimationFrame(parallax);
}
parallax();

// ===== МОДАЛКИ =====
function initModals() {
    const imageCards = document.querySelectorAll('.card.image[data-modal]');
    const overlays = document.querySelectorAll('.modal-overlay');
    const closeBtns = document.querySelectorAll('.modal-close');

    // открытие
    imageCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.stopPropagation();
            const modalId = card.dataset.modal;
            const modal = document.getElementById(`modal-${modalId}`);
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // закрытие (крестик)
    closeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const modal = btn.closest('.modal-overlay');
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // закрытие по клику на фон
    overlays.forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const active = document.querySelector('.modal-overlay.active');
            if (active) {
                active.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
}

// ===== ПАДАЮЩИЕ ПЕРСИКИ =====
function createPersik() {
    const persik = document.createElement('div');
    persik.className = 'persik';

    // случайные размеры, позиция, скорость
    const size = Math.floor(Math.random() * 90 + 70);
    persik.style.width = size + 'px';
    persik.style.height = size + 'px';
    persik.style.left = Math.random() * 100 + '%';

    const duration = Math.random() * 6 + 6;
    persik.style.animationDuration = duration + 's';
    persik.style.opacity = Math.random() * 0.6 + 0.3;

    document.body.appendChild(persik);

    setTimeout(() => {
        persik.remove();
    }, duration * 1000);
}

// запускаем персики с интервалом
setInterval(createPersik, 500);

// ===== ДИНАМИЧЕСКИЕ ЦВЕТЫ (дополнительные, равномерно) =====
function enhanceFlowers() {
    const flowerBg = document.querySelector('.flower-bg');
    if (!flowerBg) return;

    // Удаляем статичные, оставляем 9 но с вариацией позиций
    const existing = flowerBg.querySelectorAll('.flower');
    existing.forEach((f, i) => {
        // уже есть позиции в CSS, но добавим вариативности
        f.style.animationDelay = `-${i * 2.4}s`;
    });
}

// ===== ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener('DOMContentLoaded', () => {
    initModals();
    enhanceFlowers();

    // дополнительная адаптация для мобильных
    if (window.innerWidth <= 600) {
        // уменьшим интенсивность параллакса
        mouseX = 0; mouseY = 0;
    }
});

// ленивая загрузка/возврат
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        // оживить анимации
        document.querySelectorAll('.flower').forEach(f => {
            f.style.animationPlayState = 'running';
        });
    }
});

