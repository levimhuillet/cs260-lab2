document.getElementById("weatherSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("weatherInput").value;
  if (value === "")
  return;
  console.log(value);

  const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=aec7d90b1736fdf5f598d4a9a469750e";
  fetch(url)
  .then(function(response) {
    return response.json();
  }).then(function(json) {
    let results = "";
    results += '<hr>';
    results += '<div class="container">';
    results += '<div class="row">';
    results += '<div class="col-md">';
    results += '<h2>Weather in ' + json.name + "</h2>";
    results += '</div>';
    results += '</div>';
    results += '<div class="container">';
    results += '<h2>1 Day Forecast </h2>';
    results += '</div>';
    results += '<div class="container">';
    results += '<div class="col-md">';
    for (let i=0; i < json.weather.length; i++) {
      results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
    }
    results += '<h2>' + json.main.temp + " &deg;F</h2>"
    results += "<p>"
    for (let i=0; i < json.weather.length; i++) {
      results += json.weather[i].description
      if (i !== json.weather.length - 1)
      results += ", "
    }
    results += "</p>";
    results += '</div>';
    results += '<div class="row">';
    results += '<div class="col-md">';
    results += "<p>Humidity: " + json.main.humidity + "%</p>";
    results += "<p>Minimum: " + json.main.temp_min + " &deg;F</p>";
    results += "<p>Maximum: " + json.main.temp_max + " &deg;F</p>";
    results += '</div>';
    results += '<div class="col-md">';
    results += "<p>Pressure: " + json.main.pressure + " hPa</p>";
    results += "<p>Wind Speed: " + json.wind.speed + " miles/hour</p>";
    results += "<p>Wind Direction: " + json.wind.deg + " degrees</p>";
    results += '</div>';
    results += '</div>';
    document.getElementById("weatherResults").innerHTML = results;
  });
});

document.getElementById("weatherSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("weatherInput").value;
  if (value === "")
  return;
  console.log(value);

  const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=aec7d90b1736fdf5f598d4a9a469750e";
  fetch(url2)
  .then(function(response) {
    return response.json();
  }).then(function(json) {
    let forecast = "";
    forecast += '<div class="container">';
    forecast += '<h2>5 Day Forecast </h2>';
    forecast += '</div>';
    forecast += '<div class="container">';
    let otherDay = "0";
    for (let i=0; i < json.list.length; i++) {
      if (moment(json.list[i].dt_txt).format('MMMM Do YYYY') != otherDay)
      {
        otherDay = moment(json.list[i].dt_txt).format('MMMM Do YYYY');
        if (i != 0)
        {
          forecast += '</div>'; //row
          forecast += '<br>';
        }
        forecast += '<div class="row">';
        forecast += '<div class="col-md">';
        forecast += "<h3>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY') + "</h3>";
        forecast += '</div>'; //column
        forecast += '</div>'; //row
        forecast += '<div class="row">';
        forecast += '<div class="col-sm">';
        forecast += "<h4>" + moment(json.list[i].dt_txt).format('h:mm a') + "</h4>";
      }
      else {
        forecast += '<div class="col-sm">';
        forecast += "<h4>" + moment(json.list[i].dt_txt).format('h:mm a') + "</h4>";
      }
      forecast += "<p>Temperature: " + json.list[i].main.temp + " &degF</p>";
      forecast += '<p>';
      forecast += '</p>';
      forecast += '<p class="icon">';
      forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>'
      forecast += '</p>';
      forecast += '</div>'; //column
    }
    forecast += '</div>'; //container
    document.getElementById("forecastResults").innerHTML = forecast;
  });
});
