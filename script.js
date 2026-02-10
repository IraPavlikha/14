
let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

document.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 30;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 30;
});

function animateParallax() {
    currentX += (mouseX - currentX) * 0.05;
    currentY += (mouseY - currentY) * 0.05;

    document.querySelector(".center-card")?.style.setProperty(
        'transform',
        `translate(${currentX * 0.3}px, ${currentY * 0.3}px)`
    );

    requestAnimationFrame(animateParallax);
}

animateParallax();


const imageCards = document.querySelectorAll('.card.image[data-modal]');

imageCards.forEach(card => {
    card.addEventListener('click', () => {
        const modalId = card.getAttribute('data-modal');
        const modal = document.getElementById(`modal-${modalId}`);

        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});


const modalOverlays = document.querySelectorAll('.modal-overlay');
const closeButtons = document.querySelectorAll('.modal-close');

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

closeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const modal = btn.closest('.modal-overlay');
        closeModal(modal);
    });
});

modalOverlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeModal(overlay);
        }
    });
});


document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal-overlay.active');
        if (activeModal) {
            closeModal(activeModal);
        }
    }
});


function createPersik() {
    const persik = document.createElement("div");
    persik.classList.add("persik");

    const size = Math.random() * 180 + 90;
    persik.style.width = size + "px";
    persik.style.height = size + "px";

    persik.style.left = Math.random() * window.innerWidth + "px";

    const duration = Math.random() * 4 + 7;
    persik.style.animationDuration = duration + "s";

    const drift = (Math.random() - 0.5) * 100;
    persik.style.setProperty('--drift', drift + 'px');

    document.body.appendChild(persik);

    setTimeout(() => {
        persik.style.opacity = '0';
        setTimeout(() => persik.remove(), 500);
    }, (duration - 0.5) * 1000);
}


setInterval(createPersik, 400);


const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('mouseenter', function(e) {
        this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    card.addEventListener('mouseleave', function(e) {
        this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// Smooth scroll reveal for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);


let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchmove', (e) => {
    if (!e.touches[0]) return;

    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;

    mouseX = (touchX / window.innerWidth - 0.5) * 20;
    mouseY = (touchY / window.innerHeight - 0.5) * 20;
});


document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.body.style.animationPlayState = 'paused';
    } else {
        document.body.style.animationPlayState = 'running';
    }
});


const flowers = document.querySelectorAll('.flower');
flowers.forEach((flower, index) => {
    flower.style.animationDelay = `-${index * 4}s`;
});
function createFlowers(num = 9) {
    const page = document.querySelector('.page');

    for (let i = 0; i < num; i++) {
        const flower = document.createElement('div');
        flower.classList.add('flower');

        const size = Math.random() * 120 + 80;
        flower.style.width = size + 'px';
        flower.style.height = size + 'px';


        flower.style.top = Math.random() * 90 + '%';
        flower.style.left = Math.random() * 90 + '%';

        flower.style.animationDelay = '-' + Math.random() * 20 + 's';

        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        flower.style.setProperty('--flower-color', `rgba(${r},${g},${b},0.4)`);

        page.appendChild(flower);
    }
}

createFlowers(9);
console.log('✨ Enhanced Emotional Layout loaded successfully');