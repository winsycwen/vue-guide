!(function() {
  var gridComponent = {
    template: '#grid-component',
    props: ['list'],
    methods: {
      sort: function() {
        this.$emit('sort');
      }
    }
  };
  var app = new Vue({
    el: '#demo',
    data: {
      list: [
        {name: 'Chunck Norris', power: 'Infinity'},
        {name: 'Bruce Lee', power: 9000},
        {name: 'Jackie Chan', power: 7000},
        {name: 'Jet Li', power: 8000}
      ],
      currentList: null,
      isDown: true
    },
    created: function() {
      this.currentList = this.list;
    },
    components: {
      'grid-component': gridComponent
    },
    methods: {
      search: function(e) {
        var val = e.target.value;
        var that = this;
        var temp = [];
        if(val != '') {
          for(var i=0,j=0,len=that.list.length;i<len;i++) {
            var name = that.list[i].name.toString().toLowerCase();
            var power = that.list[i].power.toString().toLowerCase();
            if(name.indexOf(val) != -1 || power.indexOf(val) != -1) {
              temp[j] = that.list[i];
              j++;
            }
          }
          that.currentList = temp;
        } else {
          that.currentList = that.list;
        }
      },
      gridSort: function(e) {
        if(this.currentList) {
          this.currentList.reverse();
        }
      }
    }
  });
})();