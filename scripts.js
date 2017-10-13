$(document).ready(()=>{


	function timeConverter(UNIX_timestamp){ //covert UNIX timestamp, figure out how to convert to standard time!
		var a = new Date(UNIX_timestamp * 1000);
		var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		var year = a.getFullYear();
		var month = months[a.getMonth()];
		var date = a.getDate();
		var hour = a.getHours();
		var min = a.getMinutes();
		var sec = a.getSeconds();
		var time = hour + ':' + min;
		return time;
	}



	$('#weather-form').submit((event)=>{
		event.preventDefault();
		// console.log("user submitted the form");
		var zipCode = $("#zip-code").val();
		// console.log(zipCode);
		var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&units=imperial&appid=${apiKey}`;
		console.log(weatherUrl);
		$.getJSON(weatherUrl,(weatherData)=>{
			console.log(weatherData);
			var currTemp = weatherData.main.temp;
			var temps = {
				curr: weatherData.main.temp,
				max: weatherData.main.temp_max,
				min: weatherData.main.temp_min,
			}
			var watch = `<img src="watch.png" width="500"/>`
			var humidity = weatherData.main.humidity;
			var sunrise = weatherData.sys.sunrise;
			var sunset = weatherData.sys.sunset;
			var rise = timeConverter(sunrise);
			var set = timeConverter(sunset); 
			var name = weatherData.name;
			var icon = weatherData.weather[0].icon;
			var newHTML = `<div><img src="http://openweathermap.org/img/w/${icon}.png">The temperature in ${name} is currently ${currTemp}&deg</div>`
			newHTML += `<div>The daily high is ${temps.max}&deg</div>`
			newHTML += `<div>The daily low is ${temps.min}&deg</div>`
			newHTML += `<div>Today the sun rises at ${rise}</div>`
			newHTML += `<div>Today the sun sets at ${set}</div>`
			newHTML += `<div>Yuck, the humidity is ${humidity}% today</div>`
			newHTML += `<div>${watch}</div>`
			$('#temp-info').html(newHTML);
		});
	});

}) //end doc ready!


