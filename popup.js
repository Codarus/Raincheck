document.addEventListener('DOMContentLoaded', function () {

	//get tab urls
	chrome.tabs.query({ currentWindow: true }, function (tabs) {
		
		var text = "";
		var i = 0;
		
		while (i < tabs.length){
			if (i != tabs.length-1){
				text += tabs[i].title + ": " + "\r\n" + tabs[i].url + "\r\n\r\n";
			}
			else{
				text += tabs[i].title + ": " + "\r\n" + tabs[i].url;
			}
			i++;
		}
		
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
		
		if (day<10){day = "0" + day};
		
		if (hour > 12){
        hour = hour - 12;
		}
		
		var name = "raincheck-"+year+"-"+day+"-"+monthNames[monthIndex]+"-"+hour+"-"+minutes+"-"+seconds;

		download(name,text);
			
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