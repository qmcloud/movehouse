var _home = require("../../modules/home"), homeModule = new _home.home();

Component({
    properties: {
        polyline: {
            type: Array
        },
        latitude: {
            type: Float32Array
        },
        longitude: {
            type: Float32Array
        },
        markers: {
            type: Array
        },
        map_height: {
            type: Number
        },
        status: {
            type: Number
        }
    },
    data: {},
    methods: {}
});