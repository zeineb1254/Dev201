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