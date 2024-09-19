/*const ctx = document.getElementById('myChart')
const names = ['Naruto', 'Sasuke', 'Kakashi', 'Sakura' ] */

document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById("myChart").getContext("2d");
  const genero = ["Masculino", "Femenino", "Otro"];
  const datos = [70, 20, 10];
  const myChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: genero,
      datasets: [
        {
          label: "Distribución de personajes por genero",
          data: datos,
          backgroundColor: [
            "rgba(54, 162, 235, 0.7)", // Azul para masculino
            "rgba(255, 99, 132, 0.7)", // Rosa para femenino
            "rgba(153, 102, 255, 0.7)", // Morado para otro
          ],
          borderColor: [
            "rgba(54, 162, 235, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
  });
});
