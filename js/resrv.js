const params =
    new URLSearchParams(window.location.search);

const cabinetId =
    Number(params.get("id"));


const cabinet =
    cabinets.find(c => c.id === cabinetId);


const details =
    document.getElementById("cabinetDetails");


if (!cabinet) {

    details.innerHTML = `
        <h1>Cabinet introuvable</h1>
    `;

} else {

    details.innerHTML = `

        <div class="selected-cabinet">

            <span class="tag">
                ${cabinet.specialty}
            </span>

            <h1>
                ${cabinet.name}
            </h1>

            <p>
                👨‍⚕️ ${cabinet.doctor}
            </p>

            <p>
                📍 ${cabinet.city},
                ${cabinet.address}
            </p>

            <p>
                📞 ${cabinet.phone}
            </p>

        </div>

    `;
}


const form =
    document.getElementById("reservationForm");


form.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const reservation = {

            id: Date.now(),

            cabinetId: cabinet.id,

            cabinetName: cabinet.name,

            name:
                document.getElementById("name").value,

            email:
                document.getElementById("email").value,

            service:
                document.getElementById("service").value,

            date:
                document.getElementById("date").value,

            time:
                document.getElementById("time").value,

            status: "Confirmé"

        };


        const reservations =
            JSON.parse(
                localStorage.getItem("reservations")
            ) || [];


        reservations.push(reservation);


        localStorage.setItem(
            "reservations",
            JSON.stringify(reservations)
        );


        alert(
            "Votre rendez-vous a été réservé avec succès !"
        );


        window.location.href =
            "appointments.html";

    }
);

// ==================== SWITCH THEME (DARK / LIGHT) ====================
const themeSelect = document.getElementById('theme-select');

// 1. Charger le thème sauvegardé
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

if (themeSelect) {
    // Definir la valeur sélectionnée par défaut
    themeSelect.value = savedTheme;

    // 2. Écouter le changement dyal le select
    themeSelect.addEventListener('change', (e) => {
        const selectedTheme = e.target.value;
        document.documentElement.setAttribute('data-theme', selectedTheme);
        localStorage.setItem('theme', selectedTheme);
    });
}

    // 2. Gestion des Avis
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
                    <div class="col-md-6">
                        <div class="review-card h-100">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <h5 class="mb-0 fw-bold">${review.name}</h5>
                                <span>${stars}</span>
                            </div>
                            <p class="mb-0 text-secondary">${review.comment}</p>
                        </div>
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
