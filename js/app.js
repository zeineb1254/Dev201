document.addEventListener('DOMContentLoaded', () => {

    // ==================== 1. DARK / LIGHT MODE ====================
    const themeSelect = document.getElementById('theme-select');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', savedTheme);

    if (themeSelect) {
        themeSelect.value = savedTheme;

        themeSelect.addEventListener('change', (e) => {
            const selectedTheme = e.target.value;
            document.documentElement.setAttribute('data-theme', selectedTheme);
            localStorage.setItem('theme', selectedTheme);
        });
    }

    // ==================== 2. SECTION AVIS ====================
    const reviewForm = document.getElementById('review-form');
    const reviewsList = document.getElementById('reviews-list');

    if (reviewsList) {
        let reviews = JSON.parse(localStorage.getItem('reviews')) || [
            { name: "Sarra B.", rating: 5, comment: "Service très rapide et cabinet très propre!" },
            { name: "Omar K.", rating: 4, comment: "Prise de rendez-vous facile et simple." }
        ];

        function displayReviews() {
            reviewsList.innerHTML = '';
            reviews.forEach(review => {
                const stars = '⭐'.repeat(review.rating);
                reviewsList.innerHTML += `
                    <div class="review-card">
                        <div class="review-header">
                            <strong>${review.name}</strong>
                            <span>${stars}</span>
                        </div>
                        <p>${review.comment}</p>
                    </div>
                `;
            });
        }

        if (reviewForm) {
            reviewForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('patient-name').value;
                const rating = parseInt(document.getElementById('rating').value);
                const comment = document.getElementById('comment').value;

                reviews.unshift({ name, rating, comment });
                localStorage.setItem('reviews', JSON.stringify(reviews));

                displayReviews();
                reviewForm.reset();
            });
        }

        displayReviews();
    }
});