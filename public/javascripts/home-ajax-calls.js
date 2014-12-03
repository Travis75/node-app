$(document).ready(function(){
  var accessToken = window.location.href.split("?value=")[3]
  // Should try and find a way to abstract out the numerous datasets.
     ajaxCall("https://api.humanapi.co/v1/human/activities?access_token=demo")
     .done(function(objects){
           var data = {
              labels: [],
               datasets: [
                   {
                       label: "Calories",
                       fillColor: "rgba(220,220,220,0.2)",
                       strokeColor: "green",
                       pointColor: "green",
                       pointStrokeColor: "#fff",
                       pointHighlightFill: "#fff",
                       pointHighlightStroke: "green",
                       data: []
                   },
                   {
                       label: "Distance",
                       fillColor: "rgba(151,187,205,0.2)",
                       strokeColor: "blue",
                       pointColor: "blue",
                       pointStrokeColor: "#fff",
                       pointHighlightFill: "#fff",
                       pointHighlightStroke: "blue",
                       data: []
                   }
               ]
           };
         formatActivities(data, objects.reverse(), distanceVals)
         var ctx = $("#activities").get(0).getContext("2d");
         var myLineChart = new Chart(ctx).Line(data, options);
         })

   ajaxCall("https://api.humanapi.co/v1/human/weight/readings?access_token=demo")
   .done(function(objects){
           var data = {
              labels: [],
               datasets: [
                   {
                       label: "Calories",
                       fillColor: "rgba(220,220,220,0.2)",
                       strokeColor: "green",
                       pointColor: "green",
                       pointStrokeColor: "#fff",
                       pointHighlightFill: "#fff",
                       pointHighlightStroke: "green",
                       data: []
                   }
               ]
           };
           formatActivities(data, objects.reverse(), weightVals)
           var ctx = $("#weight").get(0).getContext("2d");
           var myBarChart = new Chart(ctx).Bar(data, options);
       })

    ajaxCall("https://api.humanapi.co/v1/human/height?access_token=demo")
    .done(function(data){
      $("#height").text(data.value + " " + data.unit)
    })

    ajaxCall("https://api.humanapi.co/v1/human/weight?access_token=demo")
    .done(function(data){
      $("#weight-single").text(data.value + " " + data.unit)
    })

    ajaxCall("https://api.humanapi.co/v1/human/body_fat/readings?access_token=demo")
    .done(function(objects){
      var data = {
         labels: [],
          datasets: [
              {
                  label: "Body Fat %",
                  fillColor: "rgba(220,220,220,0.2)",
                  strokeColor: "green",
                  pointColor: "green",
                  pointStrokeColor: "#fff",
                  pointHighlightFill: "#fff",
                  pointHighlightStroke: "green",
                  data: []
              }
          ]
      };
      formatActivities(data, objects.reverse(), weightVals)
      var ctx = $("#body-fat").get(0).getContext("2d");
      var myBarChart = new Chart(ctx).Bar(data, options);
    })

    ajaxCall("https://api.humanapi.co/v1/human/body_fat?access_token=demo")
    .done(function(object){
      var data = [
          {
              value: null,
              color:"#F7464A",
              highlight: "#FF5A5E",
              label: "Current Fat %"
          },
          {
              value: null,
              color: "#46BFBD",
              highlight: "#5AD3D1",
              label: "% of PURE MUSCLE"
          }
      ]
      var notFat = 100 - object.value
      data[0].value = object.value
      data[1].value = notFat
      var ctx = $("#not-fat").get(0).getContext("2d");
      var myDoughnutChart = new Chart(ctx).Doughnut(data,options);
    })

    ajaxCall("https://api.humanapi.co/v1/human/blood_pressure/readings?access_token=demo")
    .done(function(objects){
      var data = {
              labels: [],
               datasets: [
                   {
                       label: "Calories",
                       fillColor: "rgba(220,220,220,0.2)",
                       strokeColor: "green",
                       pointColor: "green",
                       pointStrokeColor: "#fff",
                       pointHighlightFill: "#fff",
                       pointHighlightStroke: "green",
                       data: []
                   },
                   {
                       label: "Distance",
                       fillColor: "rgba(151,187,205,0.2)",
                       strokeColor: "blue",
                       pointColor: "blue",
                       pointStrokeColor: "#fff",
                       pointHighlightFill: "#fff",
                       pointHighlightStroke: "blue",
                       data: []
                   }
               ]
           };
      formatActivities(data, objects.reverse(), bloodPressureVals)
      var ctx = $("#blood-pressure").get(0).getContext("2d");
      var myLineChart = new Chart(ctx).Line(data, options);
    })

  ajaxCall("https://api.humanapi.co/v1/human/heart_rate/readings?access_token=demo")
  .done(function(objects){
    var data = {
       labels: [],
        datasets: [
            {
                label: "Heart Rate",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "green",
                pointColor: "green",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "green",
                data: []
            }
        ]
    };
    formatActivities(data, objects.reverse(), weightVals)
    var ctx = $("#heart-rate").get(0).getContext("2d");
    var myBarChart = new Chart(ctx).Bar(data, options);
  })

})


// Abstracted functions from above
function formatActivities(holder, objects, valuesFunction){
  for (var i=0; i < 10; i++){
   holder.labels.push(objects[i].createdAt.split("T")[0])
   valuesFunction(holder, objects, i)
 }
}

// could combine this with blood pressure, but then there are a lot of arguments flying around
function distanceVals(holder, objects, i){
  holder.datasets[0].data.push(objects[i].calories)
  holder.datasets[1].data.push(objects[i].distance)
}

function weightVals(holder, objects, i){
  holder.datasets[0].data.push(objects[i].value)
}

function bloodPressureVals(holder, objects, i){
  holder.datasets[0].data.push(objects[i].diastolic)
  holder.datasets[1].data.push(objects[i].systolic)
}

ajaxCall = function(location) {
    var ajax = $.ajax({
                  type: "GET",
                  url: location
                })
    return ajax;
  }