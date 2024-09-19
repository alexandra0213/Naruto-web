let currentPage = 1;
const pageSize = 20;
const urlClanes = "https://narutodb.xyz/api/clan/";
const urlAldeas = "https://narutodb.xyz/api/village";

document.addEventListener("DOMContentLoaded", function () {
  getAllPersonajes(currentPage);
  setupClanButtons();
  setupAldeasButtons();
  document
    .getElementById("ver-todos")
    .addEventListener("click", showAllCharacters);
});

function getAllPersonajes(page) {
  $("#card").empty();
  const promises = [];

  for (let i = (page - 1) * pageSize + 1; i <= page * pageSize; i++) {
    promises.push(
      $.ajax({
        type: "GET",
        url: `https://narutodb.xyz/api/character/${i}`,
        dataType: "json",
      })
    );
  }

  Promise.all(promises)
    .then((dataArray) => {
      dataArray.forEach((data) => {
        if (
          data.jutsu &&
          data.jutsu.includes(
            "The Springtime of Youth wiki has an article about this topic:"
          )
        ) {
          data.jutsu = "Texto modificado para jutsus";
        }
        renderPersonajes(data);
      });
      renderPagination();
    })
    .catch(() => {
      console.log("Error al obtener los datos.");
    });
}

function renderPagination() {
  $(".pagination").remove();
  const pagination = $("<div></div>").addClass("pagination");
  const prevButton = $("<button></button>")
    .text("Anterior")
    .click(() => {
      currentPage--;
      getAllPersonajes(currentPage);
    })
    .toggle(currentPage > 1);

  const nextButton = $("<button></button>")
    .text("Siguiente")
    .click(() => {
      currentPage++;
      getAllPersonajes(currentPage);
    });

  pagination.append(prevButton, nextButton);
  $("#card").after(pagination);
}

function renderPersonajes(data) {
  if (!Array.isArray(data)) {
    data = [data];
  }

  data.forEach((personaje) => {
    let link = $("<a></a>")
      .attr("href", `detalles.html?id=${personaje.id}`)
      .addClass("tarjeta-link");

    let div = $("<div></div>").addClass("ficha");

    let img = $("<img />").attr(
      "src",
      personaje.images && personaje.images.length > 0
        ? personaje.images[0]
        : "./assets/img/not-found.jpg"
    );

    let name = $("<h3></h3>").text(personaje.name).addClass("nombre");
    let genero = $("<p></p>")
      .text(personaje.personal ? personaje.personal.sex : "Desconocido")
      .addClass("genero");
    let debut = $("<h3></h3>")
      .text(personaje.debut ? Object.values(personaje.debut)[0] : "-")
      .addClass("debut");
    let jutsu = $("<h3></h3>")
      .text(personaje.jutsu ? personaje.jutsu[0] : "No posee jutsus")
      .addClass("jutsu");

    div.append(img, name, genero, debut, jutsu);
    link.append(div);
    $("#card").append(link);
  });
}

function setupClanButtons() {
  const botonesClanes = document.querySelectorAll(".clanes");
  botonesClanes.forEach((item) => {
    item.addEventListener("click", function () {
      const id = this.id;
      getPersonajesByClan(id);
    });
  });
}

function getPersonajesByClan(id) {
  const url = urlClanes + id;
  $.ajax({
    type: "GET",
    url: url,
    dataType: "json",
    async: true,
    success: function (data) {
      $("#card").empty();
      renderPersonajes(data.characters);
      $(".pagination").remove();
    },
    error: function () {
      console.log("Error al obtener los datos del clan.");
    },
  });
}

function setupAldeasButtons() {
  const botonesAldeas = document.querySelectorAll(".aldeas");
  botonesAldeas.forEach((item) => {
    item.addEventListener("click", function () {
      const id = this.id;
      getPersonajesByAldea(id);
    });
  });
}

function getPersonajesByAldea(id) {
  $.ajax({
    type: "GET",
    url: `https://narutodb.xyz/api/village/${id}`,
    dataType: "json",
    success: function (data) {
      $("#card").empty();
      renderPersonajes(data.characters);
      $(".pagination").remove();
    },
    error: function () {
      console.log("Error al obtener los datos de la aldea.");
    },
  });
}

function showAllCharacters() {
  currentPage = 1;
  getAllPersonajes(currentPage);
}
