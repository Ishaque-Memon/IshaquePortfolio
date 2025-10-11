import { createSlice } from '@reduxjs/toolkit';

const isDesktop = typeof window !== 'undefined' ? window.innerWidth >= 1024 : true;
const initialState = {
  sidebarOpen: isDesktop,
  headerTitle: '',
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setHeaderTitle: (state, action) => {
      state.headerTitle = action.payload;
    },
    openSidebar: (state) => {
      state.sidebarOpen = true;
    },
    closeSidebar: (state) => {
      state.sidebarOpen = false;
    },
  },
});

export const { toggleSidebar, setHeaderTitle, openSidebar, closeSidebar } = layoutSlice.actions;
export default layoutSlice.reducer;
