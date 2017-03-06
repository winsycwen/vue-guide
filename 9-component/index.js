// 全局注册组件
Vue.component('my-component', {
  template: '<div>A custom component!</div>'
});
var example1 = new Vue({
  el: '#example1'
});

// 局部组件
var Child = {
  template: '<div>A custom component!</div>'
};
var example2 = new Vue({
  el: '#example2',
  components: {
    'my-component': Child
  }
});

// DOM模板解析说明
var example3 = new Vue({
  el: '#example3',
  template: '#my-row-template'
});

// 全局组件中data必须是函数
!(function() {
  var data = {counter: 0};
  Vue.component('simple-counter', {
    template: '<button v-on:click="counter+=1">{{counter}}</button>',
    data: function() {
      return data;
    }
  });
  var example4 = new Vue({
    el: '#example4'
  });
})();

// 父子组件的关系：Props down, events up
!(function() {
  Vue.component('child', {
    props: ['message', 'myMessage'],
    template: '<span>{{message}} {{myMessage}}</span>'
  });
  new Vue({
    el: '#example5',
    data: {
      msg: 'test'
    }
  })
})();

// 动态Prop
!(function() {
  var Child = {
    'props': ['myMessage'],
    'template': '<span>{{myMessage}}</span>'
  };
  new Vue({
    el: '#example6',
    data: {
      parentMsg: 'hello'
    },
    components: {
      'child': Child
    }
  })
})();

// 单向数据流
!(function() {
  var Child = {
    props: ['messageObj'],
    template: '<span>{{finalResult}}</span>',
    computed: {
      finalResult: function() {
        this.messageObj.name="a";
        return this.messageObj.name + this.messageObj.age;
      }
    }
  };
  new Vue({
    el: '#example7',
    data: {
      parentMsgObj: {
        name: 'winsy',
        age: 25 
      }
    },
    components: {
      'child': Child
    }
  });
})();

// 使用v-on绑定自定义事件
!(function() {
  Vue.component('button-counter', {
    template: '<button v-on:click="test">{{ counter }}</button>',
    data: function () {
      return {
        counter: 0
      }
    },
    methods: {
      test: function () {
        this.counter += 1
        this.$emit('increment')
      }
    },
  });
  new Vue({
    el: '#counter-event-example',
    data: {
      total: 0
    },
    methods: {
      incrementTotal: function () {
        this.total += 1
      }
    }
  });
})();

// 使用自定义事件的表单输入组件
!(function() {
  var CurrencyInput = {
    template: '\
      <span>\
        $\
        <input\
          ref="input"\
          v-bind:value="value"\
          v-on:input="updateValue($event.target.value)"\
        >\
      </span>\
    ',
    props: ['value'],
    methods: {
      // 不是直接更新值，而是使用此方法来对输入值进行格式化和位数限制
      updateValue: function (value) {
        var formattedValue = value
          // 删除两侧的空格符
          .trim()
          // 保留 2 小数位
          .slice(0, value.indexOf('.') + 3)
        // 如果值不统一，手动覆盖以保持一致
        if (formattedValue !== value) {
          this.$refs.input.value = formattedValue
        }
        // 通过 input 事件发出数值
        this.$emit('input', Number(formattedValue))
      }
    }
  };
  new Vue({
    el: '#example8',
    data: {
      value: 1
    },
    components: {
      'currency-input': CurrencyInput
    }
  })
})();