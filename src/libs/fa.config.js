import Vue from 'vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faRss } from '@fortawesome/free-solid-svg-icons';

library.add(faRss);

Vue.component('font-awesome-icon', FontAwesomeIcon);
