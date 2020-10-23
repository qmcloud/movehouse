define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'driver/update_car/index' + location.search,
                    add_url: 'driver/update_car/add',
                    edit_url: 'driver/update_car/edit',
                    del_url: 'driver/update_car/del',
                    multi_url: 'driver/update_car/multi',
                    table: 'driver_update_car',
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
                        {field: 'driver_id', title: __('Driver_id')},
                        {field: 'car_id', title: __('Car_id')},
                        {field: 'plate_number', title: __('Plate_number')},
                        {field: 'flank_car_image', title: __('Flank_car_image'), events: Table.api.events.image, formatter: Table.api.formatter.image},
                        {field: 'car_image', title: __('Car_image'), events: Table.api.events.image, formatter: Table.api.formatter.image},
                        {field: 'drivers_license', title: __('Drivers_license')},
                        {field: 'drivers_license_copy', title: __('Drivers_license_copy')},
                        {field: 'create_time', title: __('Create_time')},
                        {field: 'status', title: __('Status'), searchList: {"0":__('Status 0'),"1":__('Status 1'),"2":__('Status 2')}, formatter: Table.api.formatter.status},
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