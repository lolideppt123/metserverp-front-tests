import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    navbar: {
        isOpen: false,
    },
    inventory: {
        isOpen: false,
    },
    directory: {
        isOpen: false,
    },
    platform: {
        isMobile: false
    }
}

const drawerSlice = createSlice({
    name: 'drawer',
    initialState: initialState,
    reducers: {
        navbar: (state, { payload }) => {
            state.navbar.isOpen = payload;
        },
        inventory: (state, { payload }) => {
            state.inventory.isOpen = payload;
        },
        directory: (state, { payload }) => {
            state.directory.isOpen = payload;
        },
        platform: (state, { payload }) => {
            state.platform.isMobile = payload;
        }
    }
})

export const selectDrawerNavBar = (state) => state.drawer.navbar.isOpen;
export const selectDrawerInventory = (state) => state.drawer.inventory.isOpen;
export const selectDrawerDirectory = (state) => state.drawer.directory.isOpen;
export const selectDrawerPlatform = (state) => state.drawer.platform;

export const { navbar, inventory, directory, platform } = drawerSlice.actions;
export default drawerSlice.reducer;