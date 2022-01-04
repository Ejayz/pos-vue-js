const qr_code = {
    state() {
        return {
            device_id: ""
        }
    }
    , mutations: {
        setDeviceId(state, id) {
            state.device_id = id
            
        }
    },namespaced:true
}
export default qr_code