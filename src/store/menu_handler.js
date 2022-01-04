const menu_handler = {
    state() {
        return {
            isCollapse: true
        }

    }, mutations: {
        setisCollapse(state, menuState) {
            state.isCollapse = menuState
        }
    },
    namespaced: true
}


export default menu_handler