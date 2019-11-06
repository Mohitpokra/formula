import Vue from 'vue'

Vue.filter('capitalize', val => val.charAt(0).toUpperCase() + val.slice(1));