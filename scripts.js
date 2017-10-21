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
			var watch = `<a href="https://imperativetv.blogspot.com"><img src="watch.png" width="500"/></a>`
			var humidity = weatherData.main.humidity;
			var sunrise = weatherData.sys.sunrise;
			var sunset = weatherData.sys.sunset;
			var rise = timeConverter(sunrise);
			var set = timeConverter(sunset); 
			var name = weatherData.name;
			var icon = weatherData.weather[0].icon;
			var newHTML = `<div><img src="http://openweathermap.org/img/w/${icon}.png">They tell me I'm in ${name}, it is currently ${currTemp}&deg</div>`
			newHTML += `<div>They want you to think the high is ${temps.max}&deg.</div>`
			newHTML += `<div>They want you to think the low is ${temps.min}&deg.</div>`
			newHTML += `<div>Shayla always liked to watch the sun rise. I thought of her today at ${rise}.</div>`
			newHTML += `<div>When the sun sets at ${set} today, I know they will be watching me.</div>`
			newHTML += `<div>They want you to believe ${humidity}% humidity is normal.</div>`
			newHTML += `<div>None of this really matters, does it?</div>`
			newHTML += `<div>${watch}</div>`
			$('#temp-info').html(newHTML);
		});
	});

}) //end doc ready!


