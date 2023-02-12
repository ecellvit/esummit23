import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  ids: [],
};

export const customReducer = createReducer(initialState, {
  addToCart: (state, action) => {
    if (state.ids.includes(action.payload)) {
      return;
    }
    state.ids.push(action.payload);
  },
  removeFromCart: (state, action) => {
    var index = state.ids.indexOf(action.payload);
    if (index > -1) {
      state.ids.splice(index, 1);
    }
  },
});
