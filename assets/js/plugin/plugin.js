"use strict";
document.addEventListener("DOMContentLoaded", function () {

  $(function ($) {

    /* niceSelect */
    $("select").niceSelect();

    // Apexcharts
    if (document.querySelector('#chart') !== null) { 
    var options = {
      labels: ["Send", "Receive", "Payment", "Deposit", "Withdraw"],
      series: [44, 55, 13, 33, 22],
      chart: {
      width: 350,
      type: 'donut',
    },
    dataLabels: {
      enabled: false
    },
    responsive: [
      {
        breakpoint: 1449,
        options: {
          chart: {
            width: 300
          },
          legend: {
            show: true
          }
        }
      },
      {
        breakpoint: 1200,
        options: {
          chart: {
            width: 250
          },
          legend: {
            show: true
          }
        }
      },
      {
        breakpoint: 992,
        options: {
          chart: {
            width: 350
          },
          legend: {
            show: true
          }
        }
      },
      {
        breakpoint: 577,
        options: {
          chart: {
            width: 250
          },
          legend: {
            show: true
          }
        }
      },
    ],
      legend: {
        position: 'right',
        offsetY: 0,
        height: 230,
      }
    };
    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
    }

    /* Wow js */
    new WOW().init();

  });
});