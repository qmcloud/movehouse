define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'driver/driver_list/index' + location.search,
                    add_url: 'driver/driver_list/add',
                    edit_url: 'driver/driver_list/edit',
                    del_url: 'driver/driver_list/del',
                    multi_url: 'driver/driver_list/multi',
                    detail_url:'driver/driver_list/detail',
                    update_car:'driver/driver_list/update_car',
                    table: 'driver',
                }
            });
            var eventBtn = [];
            eventBtn['click .btn-detailone'] = function (e, value, row, index) {
                e.stopPropagation();
                e.preventDefault();
                var table = $(this).closest('table');
                var options = table.bootstrapTable('getOptions');
                var ids = row[options.pk];
                row = $.extend({}, row ? row : {}, {ids: ids});
                var url = options.extend.detail_url;
                Fast.api.open(Table.api.replaceurl(url, row, table), __('Detail'), $(this).data() || {});
            };

            eventBtn['click .update_car'] = function (e, value, row, index) {
                e.stopPropagation();
                e.preventDefault();
                var table = $(this).closest('table');
                var options = table.bootstrapTable('getOptions');
                var ids = row[options.pk];
                row = $.extend({}, row ? row : {}, {ids: ids});
                var url = options.extend.update_car;
                Fast.api.open(Table.api.replaceurl(url, row, table), __('更换车型'), $(this).data() || {});
            };

            var table = $("#table");

            $.fn.bootstrapTable.locales[Table.defaults.locale]['formatSearch'] = function(){return "请输入姓名/手机号";};

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'id',
                columns: [
                    [
                        {checkbox: true},
                        {field: 'id', title: __('Id'),sortable:true},
                        {field: 'nick_name', title: __('Nick_name')},
                        {field: 'driver_name', title: __('Driver_name')},
                        {field: 'driver_phone', title: __('Driver_phone')},
                        {field: 'driver_IDcard', title: __('Driver_idcard')},
                        {field: 'plate_number', title: __('Plate_number')},
                        {field: 'driverinfo.statef',operate:false, title: __('Driverinfo.state'), searchList: {"1":'听单中',"2":'未听单'}, formatter: Table.api.formatter.label},
                        {field: 'driverinfo.balance', operate:false,title: __('Driverinfo.balance'), operate:'BETWEEN',sortable:true},
                        {field: 'driverinfo.service_number',operate:false, title: __('Driverinfo.service_mark'),sortable : true, operate:false},
                        {field: 'driverinfo.cancel_number',operate:false, title: __('订单取消次数'), operate:false,sortable : true},
                        {field: 'create_time', title: __('Create_time'),width:5, operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                        {field: 'operate', title: __('Operate'), table: table, events: $.extend(eventBtn ,Table.api.events.operate || []),
                            buttons: [
                                {
                                    name: 'detail',
                                    title: '详情',
                                    classname: 'btn btn-xs btn-primary btn-detailone',
                                    icon: 'fa fa-list',
                                    url: $.fn.bootstrapTable.defaults.extend.detail_url,

                                },
                                {
                                    name: 'detail',
                                    icon: 'fa fa-car',
                                    title: __('更换车型'),
                                    extend: 'data-toggle="tooltip"',
                                    classname: 'btn btn-xs btn-primary update_car',
                                    url: $.fn.bootstrapTable.defaults.extend.update_car
                                }
                            ],
                            formatter: Table.api.formatter.operate
                        }
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
        update_car:function(){
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