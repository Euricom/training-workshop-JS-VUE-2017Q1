import Vue from 'vue'
import template from './sample1.html'

import './sample1.less'

export const Sample1 = Vue.extend({
  ...template,
  // alternative syntax for ES5
  // render: template.render,
  // staticRenderFns: template.staticRenderFns,
  data () {
    return {
      title: 'My awesome project',
    }
  },
})
