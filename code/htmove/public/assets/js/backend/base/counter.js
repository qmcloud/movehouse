define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'base/counter/index' + location.search,
                    add_url: 'base/counter/add',
                    edit_url: 'base/counter/edit',
                    del_url: 'base/counter/del',
                    multi_url: 'base/counter/multi',
                    table: 'counter',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'id',
                search:false,
                commonSearch: false,
                columns: [
                    [
                        {checkbox: true},
                        {field: 'id', title: __('Id')},
                        {field: 'cates.title', title: __('City_id')},
                        {field: 'name', title: __('Name')},
                        {field: 'address', title: __('Address')},
                        {field: 'phone', title: __('Phone')},
                        {field: 'create_time', title: __('Create_time'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate}
                    ]
                ]
            });

            $('#look_cate').on('click', function () {
                Fast.api.open('base/counter/look_cate','查看分类');
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
        add_cate: function () {
            Controller.api.bindevent();
        },
        edit_cate:function(){
            Controller.api.bindevent();
        },
        look_cate:function(){
            Table.api.init({
                extend: {
                    index_url: 'base/counter/look_cate' + location.search,
                    add_url: 'base/counter/add_cate',
                    edit_url: 'base/counter/edit_cate',
                    del_url: 'base/counter/del_cate',
                    table: 'counter',
                }
            });
            var table = $("#cate_table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'id',
                showExport: false,
                commonSearch: false,
                showToggle: false,
                search:false,
                columns: [
                    [
                        {checkbox: true},
                        {field: 'id', title: __('Id')},
                        {field: 'title', title: '分类名称'},
                        {field:'icon',title:'图标',events: Table.api.events.image, formatter: Table.api.formatter.image},
                        {field: 'sort', title: '排序'},
                        {field: 'status', title: __('Status'), searchList: {"0":'隐藏',"1":'显示'}, formatter: Table.api.formatter.status},
                        {field: 'create_time', title: '添加时间', operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate}
                    ]
                ]
            });


            // 为表格绑定事件
            Table.api.bindevent(table);
        },
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));
            }
        }
    };
    return Controller;
});