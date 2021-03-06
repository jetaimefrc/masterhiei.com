import { ActionTree, MutationTree, GetterTree } from 'vuex';

// Mutation types declaration
const types = {
  OPEN_NAV_DRAWER: 'OPEN_NAV_DRAWER',
};

// Interface
export interface RootState {}

interface State {
  showNavDrawer: boolean;
}

interface Actions<S, R> extends ActionTree<S, R> {}

// State
export const state = (): RootState => ({
  showNavDrawer: false,
});

// Getters
export const getters: GetterTree<RootState, RootState> = {};

// Actions
export const actions: Actions<RootState, RootState> = {};

// Mutations
export const mutations: MutationTree<State> = {
  /**
   * Open navigation drawer
   * @param state Vuex state
   */
  [types.OPEN_NAV_DRAWER](state): void {
    state.showNavDrawer = !state.showNavDrawer;
  },
};
