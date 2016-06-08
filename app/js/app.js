import Vue from 'vue';
import Resource from 'vue-resource';

import Progress from './components/progress.vue';
import CloudradiooHeader from './components/header.vue';
import Navigation from './components/nav.vue';

import Player from './player';
import KeyEvents from './keyevents';

import store from './store';
import { convertDuration, reverse } from './filters';

Vue.use(Resource);
Vue.filter('convertDuration', convertDuration);
Vue.filter('reverse', reverse);

Vue.config.debug = true;

new Vue({
  el: '.app',

  store,

  components: {
    progress: Progress,
    cloudradiooHeader: CloudradiooHeader,
    navigation: Navigation
  },

  ready: function() {
    //localStorage.clear();
    this.$http.get('http://localhost:8000/api/api-key').then(value => {
      store.dispatch('SET_API_KEY', value.data);

      Player.start();
      KeyEvents.registerKeyEvents();
    });
  }
});