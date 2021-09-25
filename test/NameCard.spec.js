import { shallowMount } from '@vue/test-utils'
import NameCard from '@/components/NameCard.vue'
import Vue from "vue";
import Vuetify from "vuetify";

describe('NameCard', () => {
  test('is a Vue instance', () => {
    Vue.config.productionTip = false;
    Vue.use(Vuetify);

    const wrapper = shallowMount(NameCard, {
      stubs: ['font-awesome-icon']
    });
    expect(wrapper.vm).toBeTruthy();
  })
})
