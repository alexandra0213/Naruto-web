function generateUrl() {
    let id = Math.round(Math.random() * 500);
    return `https://narutodb.xyz/api/character/${id}`;
}

function getPersonajes() {
    return $.ajax({
        type: "GET",
        url: generateUrl(),
        dataType: "json",
        async: true,
        success: function (data) {
            renderPersonajes(data);
        },
        error: function () {
            console.log("Error al obtener los datos.");
        }
    });
}

function renderPersonajes(data) {
    let div = $("<div></div>").addClass("ficha");
    let img = $("<img />").attr("src", data.images.length > 0 ? data.images[0] : "./assets/img/not-found.jpg");
    let name = $("<h3></h3>").text(data.name).addClass("nombre");
    let debut = $("<h3></h3>").text(data.debut ? Object.values(data.debut)[0] : "-").addClass("debut");
    let jutsu = $("<h3></h3>").text(data.jutsu ? data.jutsu[0] : "No posee jutsus").addClass("jutsu");

    div.append(img, name, debut, jutsu);
    $("#card").append(div);
}

async function fetchPersonajes() {
    for (let i = 0; i < 10; i++) {
        await getPersonajes();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}

$(document).ready(function () {
    fetchPersonajes();
});
document.addEventListener('DOMContentLoaded', () => {

    const btnClanes = document.querySelector('.btn-ext');
    

    if (btnClanes) {
        btnClanes.addEventListener('click', () => {
            window.location.href = 'clanes.html'; 
        });
    }
});
