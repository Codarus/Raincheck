document.addEventListener('DOMContentLoaded', function () {

	//get tab urls
	chrome.tabs.query({ currentWindow: true }, function (tabs) {
		
		//set date for unique download identifier
		var monthNames = [
        "01", "02", "03",
        "04", "05", "06", "07",
        "08", "09", "10",
        "11", "12"
		];
		var date = new Date();
		var day = date.getDate();
		var monthIndex = date.getMonth();
		var year = date.getFullYear();
		var hour = date.getHours();
		var minutes = date.getMinutes();
		var seconds = date.getSeconds();
		var name = "raincheck-"+year+"-"+day+"-"+monthNames[monthIndex]+"-"+hour+"-"+minutes+"-"+seconds;
		//set chrome tabs api variables
		var text = "";
		var i = 0;
		//instantiate custom name & buttons
		var name_input = null;
		var btn = document.getElementById("btn");
		
		//get & store tab data
		while (i < tabs.length){
			if (i != tabs.length-1){
				text += tabs[i].title + ": " + "\r\n" + tabs[i].url + "\r\n\r\n";
			}
			else{
				text += tabs[i].title + ": " + "\r\n" + tabs[i].url;
			}
			i++;
		}
		
		//fix military time
		if (day<10){day = "0" + day};
		
		if (hour > 12){
        hour = hour - 12;
		}
		
		//set download to start after user input validation & button press
		btn.addEventListener("click", function(){
			name_input = $("input").val();
			if(name_input != null && /^[a-zA-Z0-9-_ ]*$/.test(name_input) != false && /\S/.test(name_input) != false){
				name = name_input;
			}
			
			download(name,text);
		});
			
	});
		
	//text file download function
	function download(filename, text) {
		var element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
		element.setAttribute('download', filename);

		element.style.display = 'none';
		document.body.appendChild(element);

		element.click();

		document.body.removeChild(element);
	}

});