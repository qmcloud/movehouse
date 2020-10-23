define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'orders/appointment/index' + location.search,
                    add_url: 'orders/appointment/add',
                    edit_url: 'orders/appointment/edit',
                    del_url: 'orders/appointment/del',
                    detail_url: 'orders/appointment/detail',
                    table: 'order',
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
                        {field: 'order_number', title: __('Order_number')},
                        {field: 'place_dispatch', title: __('Place_dispatch')},
                        {field: 'shipper_name', title: __('Shipper_name')},
                        {field: 'shipper_phone', title: __('Shipper_phone')},
                        {field: 'place_receipt', title: __('Place_receipt')},
                        {field: 'appointment_time', title: __('Appointment_time')},
                        {field: 'remark', title: __('Remark')},
                        {field: 'status', title: __('Status'), searchList: {"1":__('Status 1'),"2":__('Status 2'),"3":__('Status 3'),"5":__('Status 5'),"6":__('Status 6'),}, formatter: Table.api.formatter.status},
                        {field: 'create_time', title: __('Create_time'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                        {field: 'operate', title: __('Operate'), table: table, events: $.extend(eventBtn ,Table.api.events.operate || []),
                            buttons: [
                                {
                                    name: 'detail',
                                    title: '详情',
                                    classname: 'btn btn-xs btn-primary btn-detailone',
                                    extend: 'data-toggle="tooltip"',
                                    icon: 'fa fa-list',
                                    url: $.fn.bootstrapTable.defaults.extend.detail_url,

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
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));
            }
        }
    };
    return Controller;
});