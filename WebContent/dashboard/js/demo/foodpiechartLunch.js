// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Pie Chart Example
var ctx = document.getElementById("foodpiechartLunch");
var foodpiechartLunch = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ["Protein", "Carbohydrates", "Fats"],
    datasets: [{
      data: [parseInt($('#protein').text()), parseInt($('#carbs').text()), parseInt($('#fats').text())],
      backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
      hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
      hoverBorderColor: "rgba(234, 236, 244, 1)",
    }],
  },
  options: {
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
    },
    legend: {
      display: false
    },
    cutoutPercentage: 80,
  },
});
function updateLunch(protein,fat,carbs){
	foodpiechartLunch.data.datasets[0].data[0]=parseInt(protein);
	foodpiechartLunch.data.datasets[0].data[1]=parseInt(carbs);
	foodpiechartLunch.data.datasets[0].data[2]=parseInt(fat);
//	foodpiechart.data.labels.push("Carbs");
//	foodpiechart.data.datasets.forEach((dataset) => {
//        dataset.data.push(20);
//    });
	foodpiechartLunch.update();
}