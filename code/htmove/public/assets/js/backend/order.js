define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'order/index' + location.search,
                    add_url: 'order/add',
                    edit_url: 'order/edit',
                    del_url: 'order/del',
                    multi_url: 'order/multi',
                    table: 'order',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'id',
                columns: [
                    [
                        {checkbox: true},
                        {field: 'id', title: __('Id')},
                        {field: 'sn', title: __('Sn')},
						{field: 'tel', title: __('Tel')},
                        {field: 'openid', title: __('Openid')},
                        {field: 'pro_price', title: __('Pro_price'), operate:'BETWEEN'},
                        {field: 'couponid', title: __('Couponid')},
                        {field: 'coupon_price', title: __('Coupon_price'), operate:'BETWEEN'},
                        {field: 'price', title: __('Price'), operate:'BETWEEN'},
                        {field: 'createtime', title: __('Createtime'),formatter: Table.api.formatter.datetime,},
                        {field: 'movetime', title: __('Movetime'),formatter: Table.api.formatter.datetime,},
                        {field: 'name', title: __('Name')},
                        {field: 'mark', title: __('Mark')},
                        {field: 'img1', title: __('Img1'),formatter: Controller.api.formatter.thumb, operate: false},
                        {field: 'img2', title: __('Img2'),formatter: Controller.api.formatter.thumb, operate: false},
                        {field: 'img3', title: __('Img3'),formatter: Controller.api.formatter.thumb, operate: false},
                        {field: 'img4', title: __('Img4'),formatter: Controller.api.formatter.thumb, operate: false},
                        {field: 'img5', title: __('Img5'),formatter: Controller.api.formatter.thumb, operate: false},
                        {field: 'img6', title: __('Img6'),formatter: Controller.api.formatter.thumb, operate: false},
                        {field: 'start', title: __('Start')},
                        {field: 'end', title: __('End')},
                        {field: 'cartype', title: __('Cartype')},
                        {field: 'status', title: __('Status')},
                        {field: 'distance', title: __('Distance')},
                        {field: 'duration', title: __('Duration')},
                        {field: 'ewprice', title: __('Ewprice')},
                        {field: 'driver', title: __('Driver')},
                        {field: 'driver_tel', title: __('Driver_tel')},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate}
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
        },
        add: function () {
            Controller.api.bindevent();
        },
        edit: function () {
            Controller.api.bindevent();
        },
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));
            },
			formatter: {
                thumb: function (value, row, index) {

                    var style = row.storage == 'upyun' ? '!/fwfh/120x90' : '';

                    return '<a href="' + value + '" target="_blank"><img src="' + value + style + '" alt="" style="max-height:90px;max-width:120px"></a>';

                },
                url: function (value, row, index) {
                    return '<a href="' + row.fullurl + '" target="_blank" class="label bg-green">' + value + '</a>';
                }
            }
        }
    };
    return Controller;
});