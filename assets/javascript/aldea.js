function getAldea(id) {
    $.get(`https://narutodb.xyz/api/village/${id}`, function (data) {
      console.log(data);
      let aldeCard = $("<div></div>").addClass("aldea-card");
      let name = $("<h2></h2>")
        .text(data.name.toUpperCase())
        .addClass("aldea-name");
      let num = $("<p></p>").text(`#${data.id}`);
  
      aldeCard.append(name, num);
      $("#aldea-container").append(aldeCard);
    });
  }
  
  $(document).ready(function () {
    for (let i = 1; i <= 38; i++) {
      getAldea(i);
    }
  });
  