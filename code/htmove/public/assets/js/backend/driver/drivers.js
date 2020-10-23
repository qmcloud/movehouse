define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'driver/drivers/index' + location.search,
                    add_url: 'driver/drivers/add',
                    edit_url: 'driver/drivers/edit',
                    del_url: 'driver/drivers/del',
                    multi_url: 'driver/drivers/multi',
                    table: 'driver',
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
                        {field: 'nick_name', title: __('Nick_name')},
                        {field: 'driver_name', title: __('Driver_name')},
                        {field: 'driver_phone', title: __('Driver_phone')},
                        {field: 'driver_IDcard', title: __('Driver_idcard')},
                        {field: 'car.title', title: '车型'},
                        {field: 'plate_number', title: __('Plate_number')},
                        {field: 'photo', title: __('Photo'),events: Table.api.events.image, operate: false,formatter: Table.api.formatter.image},
                        {field: 'front_IDcard_image', title: __('Front_idcard_image'),operate: false, events: Table.api.events.image, formatter: Table.api.formatter.image},
                        {field: 'contrary_IDcard_image', title: __('Contrary_idcard_image'),operate: false, events: Table.api.events.image, formatter: Table.api.formatter.image},
                        {field: 'car_image', title: __('Car_image'), events: Table.api.events.image, operate: false,formatter: Table.api.formatter.image},
                        {field: 'drivers_license', title: __('Drivers_license'),events: Table.api.events.image,operate: false, formatter: Table.api.formatter.image},
                        {field: 'create_time', title: __('Create_time'), operate:'RANGE', addclass:'datetimerange',operate: false, formatter: Table.api.formatter.datetime},
                        {field: 'status', title: __('Status'),operate: false, searchList: {"0":__('Status 0'),"1":__('Status 1'),"2":__('Status 2')}, formatter: Table.api.formatter.status},
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
            }
        }
    };
    return Controller;
});