!(function(){
	function dealData(data) {
		var len = data.length,
			list = [],
			tempObject = {};
		if(len>0) {
			for(var i = 0; i < len; i++) {
				tempObject['time'] = data[i]['commit']['committer']['date'];
				list.push(tempObject);
			}
		}
		
		render(list);
	}
	
	function render(list) {
		new Vue({
			el: '.commit-wrapper',
			data: {
				commits: list
			},
			filters: {
				format: function(value) {
					var date = value.split('T')[0];
					console.log(date);
					return date;
				}
			}
		});
	}
	
	function getData(callback) {
		var xhr = new XMLHttpRequest();
		var url =		 'https://api.github.com/repos/winsycwen/winsycwen.github.io/commits';
		xhr.open("get", url, true);
		xhr.send();
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4) {
				if(xhr.status >= 200 && xhr.status < 300) {
					callback && callback(JSON.parse(xhr.responseText));
				}
			}
		};
	}
	getData(dealData);
})();