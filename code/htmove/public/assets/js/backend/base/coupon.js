define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'base/coupon/index' + location.search,
                    add_url: 'base/coupon/add',
                    edit_url: 'base/coupon/edit',
                    del_url: 'base/coupon/del',
                    multi_url: 'base/coupon/multi',
                    table: 'coupon',
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
                        {field: 'name', title: __('Name')},
                        {field: 'amount', title: __('Amount')},
                        {field: 'price', title: __('Price'), operate:'BETWEEN'},
                        {field: 'code', title: '兑换码'},
                        {field: 'desc', title: '简述'},
                        {field: 'start_time', title: __('Start_time'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                        {field: 'end_time', title: __('End_time'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                        {field: 'get_number', title: '领取数量'},
                        {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate}
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
        },
        add: function () {
            $("#addcode").click(function(){
                var success = function (data) {
                    $("#c-code").val(data);
                }
                Fast.api.ajax({
                    type: 'post',
                    url: 'base/coupon/create_code',
                    dataType: 'json',
                },success)
            })
            Controller.api.bindevent();
        },
        edit: function () {
            $("#addcode").click(function(){
                var success = function (data) {
                    $("#c-code").val(data);
                }
                Fast.api.ajax({
                    type: 'post',
                    url: 'base/coupon/create_code',
                    dataType: 'json',
                },success)
            })
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