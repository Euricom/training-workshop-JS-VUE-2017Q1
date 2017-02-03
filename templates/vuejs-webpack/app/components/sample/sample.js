import Vue from 'vue'
import template from './sample.html'

import './sample.less'

export default Vue.extend({
  template,
  name: 'sample',
  data() {
    return {
      title: 'My awesome component',
    }
  },
})
