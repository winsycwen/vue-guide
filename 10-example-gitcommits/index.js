!(function() {
	var demo = new Vue({
		el: '#demo',
		data: {
			commits: [],
			branches: ['master', 'gh-pages'],
			currentBranch: 'gh-pages'
		},
		watch: {
			currentBranch: 'getData'
		},
		created: function() {
			this.getData();
		},
		methods: {
			getData: function() {
				var apiURL = 'https://api.github.com/repos/winsycwen/winsycwen.github.io/commits?sha=';
				var xhr = new XMLHttpRequest();
				var self = this;
				xhr.open('get', apiURL + self.currentBranch, true);
				xhr.onreadystatechange = function() {
					if(xhr.readyState == 4) {
						if(xhr.status >= 200 && xhr.status <300) {
							self.dealData(JSON.parse(xhr.responseText));
						}
					}
				}
				xhr.send(null);
			},
			dealData: function(data) {
				var len = data.length,
					list = [],
					tempObject = {};
				if(len>0) {
					for(var i = 0; i < len; i++) {
						tempObject = {};
						tempObject['sha'] = data[i]['sha'];
						tempObject['time'] = data[i]['commit']['committer']['date'];
						tempObject['msg'] = data[i]['commit']['message'];
						list.push(tempObject);
					}
				}
				this.commits = list;
			}
		},
		filters: {
			format: function(value) {
				return value.split('T')[0];
			}
		}
	});
})();