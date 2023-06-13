const xValues = ["January","Fabruary","Marth","April","May","June","July","August","September","October","Novomber","December"];
const yValues = [7,8,8,9,9,9,10,11,14,14,15,60];
new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      fill: false,
      lineTension: 0,
      backgroundColor: "rgba(0,0,255,1.0)",
      borderColor: "rgba(0,0,255,0.1)",
      data: yValues
    }]
  },
  options: {
    legend: {display: false},
    scales: {
      yAxes: [{ticks: {min: 6, max:16}}],
    }
  }
});

//
var xValues2 = ["Dress", "Shoses", "Make up", "Men", "Kids"];
var yValues2 = [90, 49, 84, 94, 75];
var barColors = [
  "#b91d47",
  "#00aba9",
  "#2b5797",
  "#e8c3b9",
  "#1e7145"
];

new Chart("myChart2", {
  type: "doughnut",
  data: {
    labels: xValues2,
    datasets: [{
      backgroundColor: barColors,
      data: yValues2
    }]
  },
  options: {
    title: {
      display: true,
      text: "Catagories"
    }
  }
});
var xValues3 = ["Italy", "France", "Spain", "USA", "Argentina"];
var yValues3 = [55, 49, 44, 24, 15];
var barColors = [
  "#b91d47",
  "#00aba9",
  "#2b5797",
  "#e8c3b9",
  "#1e7145"
];

new Chart("myChart3", {
  type: "pie",
  data: {
    labels: xValues3,
    datasets: [{
      backgroundColor: barColors,
      data: yValues3
    }]
  },
  options: {
    title: {
      display: true,
      text: "Which countries works us"
    }
  }
});