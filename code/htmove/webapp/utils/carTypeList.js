module.exports = {
    defaultCarTypeList: [ {
        carTypeId: 0,
        carName: "小型面包",
        basePrice: 38,
        baseDistance: 5,
        unitPrice: 3,
        waitPrice: 5,
        baseTime: 6,
        unitTime: 1,
        cityId: 1,
        carBaseInfo: {
            capacity: 1,
            height: 1.1,
            length: 1.8,
            width: 1.3
        },
        busiTagPersonConfs: [ {
            code: 0,
            busiTagName: "商家拉货",
            imgUrl: "/images/xiaomian.png",
            isDefault: 0
        }, {
            code: 1,
            busiTagName: "运东西",
            imgUrl: "/images/xiaomian.png",
            isDefault: 1,
            useSceneDesc: "适合少里那个货物/家具/行李，或单人搬家/"
        } ],
        priceCoef: 1.6,
        assignSwitch: 1,
        volume: "2.6",
        extraFee: [ {
            feeName: "搬运费",
            feeDesc: "客户与司机自行商议价格"
        } ]
    }, {
        carTypeId: 1,
        carName: "金杯",
        basePrice: 48,
        baseDistance: 5,
        unitPrice: 4,
        waitPrice: 5,
        baseTime: 6,
        unitTime: 15,
        cityId: 1,
        carBaseInfo: {
            capacity: 1.5,
            height: 1.3,
            length: 2.8,
            width: 1.5
        },
        busiTagPersonConfs: [ {
            code: 0,
            busiTagName: "商家拉货",
            imgUrl: "/images/xiaomian.png",
            isDefault: 0
        }, {
            code: 1,
            busiTagName: "运东西",
            imgUrl: "/images/xiaomian.png",
            isDefault: 1,
            useSceneDesc: "适合少量货物/家具/行李，或小型双人搬家"
        } ],
        priceCoef: 1.6,
        assignSwitch: 1,
        volume: "5.5",
        extraFee: [ {
            feeName: "搬运费",
            feeDesc: "客户与司机自行商议价格"
        } ]
    }, {
        carTypeId: 1,
        carName: "厢货",
        basePrice: 48,
        baseDistance: 5,
        unitPrice: 4,
        waitPrice: 5,
        baseTime: 6,
        unitTime: 15,
        cityId: 1,
        carBaseInfo: {
            capacity: 1.8,
            height: 1.8,
            length: 4.2,
            width: 2
        },
        busiTagPersonConfs: [ {
            code: 0,
            busiTagName: "商家拉货",
            imgUrl: "/images/xiaomian.png",
            isDefault: 0
        }, {
            code: 1,
            busiTagName: "运东西",
            imgUrl: "/images/xiaomian.png",
            isDefault: 1,
            useSceneDesc: "适合少量货物/家具/行李，或小型双人搬家"
        } ],
        priceCoef: 1.6,
        assignSwitch: 1,
        volume: "15.1",
        extraFee: [ {
            feeName: "搬运费",
            feeDesc: "客户与司机自行商议价格"
        } ]
    }, {
        carTypeId: 1,
        carName: "小型平板",
        basePrice: 48,
        baseDistance: 5,
        unitPrice: 4,
        waitPrice: 5,
        baseTime: 6,
        unitTime: 15,
        cityId: 1,
        carBaseInfo: {
            capacity: 1.5,
            height: 1.5,
            length: 2,
            width: 1.6
        },
        busiTagPersonConfs: [ {
            code: 0,
            busiTagName: "商家拉货",
            imgUrl: "/images/xiaomian.png",
            isDefault: 0
        }, {
            code: 1,
            busiTagName: "运东西",
            imgUrl: "/images/xiaomian.png",
            isDefault: 1,
            useSceneDesc: "适合少量货物/家具/行李，或小型双人搬家"
        } ],
        priceCoef: 1.6,
        assignSwitch: 1,
        volume: "4.8",
        extraFee: [ {
            feeName: "搬运费",
            feeDesc: "客户与司机自行商议价格"
        } ]
    }, {
        carTypeId: 1,
        carName: "大型平板",
        basePrice: 48,
        baseDistance: 5,
        unitPrice: 4,
        waitPrice: 5,
        baseTime: 6,
        unitTime: 15,
        cityId: 1,
        carBaseInfo: {
            capacity: 1.75,
            height: 2.4,
            length: 4.2,
            width: 2
        },
        busiTagPersonConfs: [ {
            code: 0,
            busiTagName: "商家拉货",
            imgUrl: "/images/xiaomian.png",
            isDefault: 0
        }, {
            code: 1,
            busiTagName: "运东西",
            imgUrl: "/images/xiaomian.png",
            isDefault: 1,
            useSceneDesc: "适合少量货物/家具/行李，或小型双人搬家"
        } ],
        priceCoef: 1.6,
        assignSwitch: 1,
        volume: "20.2",
        extraFee: [ {
            feeName: "搬运费",
            feeDesc: "客户与司机自行商议价格"
        } ]
    } ]
};