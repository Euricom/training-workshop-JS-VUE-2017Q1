import Vue from 'vue'
import template from './home.html'

import './home.less'

// console.log('template', template)

export default Vue.extend({
  template,
  data () {
    return {
      title: 'My awesome project',
    }
  },
})
