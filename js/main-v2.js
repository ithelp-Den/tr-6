document.addEventListener("DOMContentLoaded", () => {
    // Розмір одиниці макета (1px на 428+, 100vw/428 на менших екранах)
    const unit = () => Math.min(1, window.innerWidth / 428);

    // ===== Галерея відгуків: Swiper створює video-slides.js, тут — крапки та gap =====
    const galleryEl = document.querySelector(".gallery-swiper");
    const dots = document.querySelectorAll(".reviews__dots i");

    const initGallery = () => {
        const swiper = galleryEl && galleryEl.swiper;
        if (!swiper) return;

        const total = galleryEl.querySelectorAll(".swiper-slide:not(.swiper-slide-duplicate)").length || 1;
        const syncDots = () => {
            const active = Math.min(dots.length - 1, Math.floor(swiper.realIndex / total * dots.length));
            dots.forEach((d, i) => d.classList.toggle("is-active", i === active));
        };
        const syncGap = () => {
            swiper.params.spaceBetween = 20 * unit();
            swiper.update();
        };

        swiper.on("slideChange", syncDots);
        window.addEventListener("resize", syncGap);
        syncGap();
        syncDots();
    };
    // video-slides.js ініціалізує Swiper у своєму DOMContentLoaded — чекаємо наступного тіку
    setTimeout(initGallery, 0);

    // ===== FAQ: акордеон (за замовчуванням усі відкриті, як у макеті) =====
    document.querySelectorAll(".faq__q").forEach(q => {
        q.addEventListener("click", () => q.parentElement.classList.toggle("is-open"));
    });

    // ===== Sticky-футер з'являється після 600px скролу =====
    const footer = document.getElementById("footer-bg");
    if (footer) {
        const toggleFooter = () => footer.classList.toggle("active", window.scrollY >= 600);
        window.addEventListener("scroll", toggleFooter, { passive: true });
        toggleFooter();
    }
});
