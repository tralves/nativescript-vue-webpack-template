const Vue = require('nativescript-vue/dist/index')
const http = require("http")
// const Page = require('ui/page').Page
// const StackLayout = require('ui/layouts/stack-layout').StackLayout
// const Image = require('ui/image').Image
// const Label = require('ui/label').Label
import JsComponent from './JsComponent';
import VueComponent from './VueComponent';

Vue.prototype.$http = http

new Vue({

    components: {
        JsComponent,
        VueComponent
    },

    template: `
        <page ref="page">
            <stack-layout>
                <js-component></js-component>
                <vue-component></vue-component>
            </stack-layout>
        </page>
    `,
    methods: {
    }
}).$start()