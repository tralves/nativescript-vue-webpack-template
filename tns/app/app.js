'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Vue = _interopDefault(require('nativescript-vue'));

var TestComponent = { template: "<stack-layout><label class=\"large\">Test Component</label><label>{{ $data }}</label><text-field v-model=\"name\"></text-field><text-field v-model=\"age\"></text-field><text-field v-model=\"occupation\"></text-field></stack-layout>",_scopeId: 'data-v-303c0480',

    data() {
        return {
            name: 'John',
            age: 34,
            occupation: 'Developer'
        }
    }
};

var App = { template: "<page><action-bar title=\"{N}-Vue + Rollup\"></action-bar><stack-layout><label>Count: {{ count }}</label><button @tap=\"count--\">-1</button><test-component style=\"margin-top: 40\"></test-component></stack-layout></page>",_scopeId: 'data-v-45ba5ed4',

    data() {
        return {
            count: 10
        }
    },

    components: {
        TestComponent
    }
};

new Vue({
    render: h => h('app'),
    components: {
        App
    }
}).$start();
