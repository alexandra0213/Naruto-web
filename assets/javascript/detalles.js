function getPersonajeIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
  }
  
  function getPersonajeDetalles(id) {
    $.ajax({
      type: "GET",
      url: `https://narutodb.xyz/api/character/${id}`,
      dataType: "json",
      success: function (data) {
        renderPersonajeDetalles(data);
      },
      error: function () {
        console.log("Error al obtener los datos del personaje.");
      },
    });
  }
  
  function renderPersonajeDetalles(data) {
    let div = $("<div></div>").addClass("ficha");
    let img = $("<img />").attr(
      "src",
      data.images.length > 0 ? data.images[0] : "./assets/img/not-found.jpg"
    );
    let name = $("<h3> </h3>").text(data.name).addClass("nombre");
    let genero = $("<p></p>")
      .text(data.personal ? data.personal.sex : "Desconocido")
      .addClass("genero");
    let debut = $("<h3></h3>")
      .text(data.debut ? Object.values(data.debut)[0] : "-")
      .addClass("debut");
  
    let jutsu = $("<h3></h3>")
      .text(data.jutsu ? data.jutsu[0] : "No posee jutsus")
      .addClass("jutsu");
  
    let voz = $("<h3></h3>")
      .text(data.voiceActors ? Object.values(data.voiceActors) : "-")
      .addClass("voz");
  
    let natural = $("<h3></h3>")
      .text(data.natureType ? data.natureType[0] : "no posee tipo natural")
      .addClass("natural");
  
    let tools = $("<h3></h3>")
      .text(data.tools ? data.tools[0] : "no posee tools")
      .addClass("tools");
  
    let clasi = $("<p></p>")
      .text(
        data.personal && data.personal.classification
          ? data.personal.classification
          : "Desconocido"
      )
      .addClass("clasi");
  
    let ocupa = $("<p></p>")
      .text(
        data.personal && data.personal.occupation
          ? data.personal.occupation
          : "Desconocido"
      )
      .addClass("ocupa");
  
    div.append(
      img,
      name,
      genero,
      debut,
      jutsu,
      voz,
      natural,
      tools,
      clasi,
      ocupa
    );
    $("#card").append(div);
  }
  
  const personajeId = getPersonajeIdFromUrl();
  if (personajeId) {
    getPersonajeDetalles(personajeId);
  } else {
    console.log("No se encontró el ID del personaje en la URL.");
  }
  