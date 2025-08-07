import Vue from 'vue';
import Vuex from 'vuex';
import { createStore } from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		processedData: []
	},
	mutations: {
		addProcessedData(state, item) {
			state.processedData.push(item);
		},
		clearProcessedData(state) {
			state.processedData = [];
		}
	},
	actions: {},
	getters: {
		getProcessedData: state => state.processedData
	}
});