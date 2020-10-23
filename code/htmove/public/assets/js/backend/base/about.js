define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'base/about/index' + location.search,
                    add_url: 'base/about/add',
                    edit_url: 'base/about/edit',
                    del_url: 'base/about/del',
                    multi_url: 'base/about/multi',
                    table: 'ims_feright_about',
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
                        {field: 'company', title:'公司名称'},
                        {field: 'img_url', title: __('Img_url'),operate: false, events: Table.api.events.image, formatter: Table.api.formatter.images},
                        {field: 'versions', title: __('Versions')},
                        {field: 'phone', title: __('Phone')},
                        {field: 'work_time', title: __('Work_time')},
                        {field: 'email', title: __('Email')},
                        {field: 'wechat', title: __('Wechat')},
                        {field: 'create_time', title: __('Create_time'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
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