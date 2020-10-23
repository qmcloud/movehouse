define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'user/users/index' + location.search,
                    add_url: 'user/users/add',
                    edit_url: 'user/users/edit',
                    del_url: '',
                    multi_url: 'user/users/multi',
                    table: 'users',
                }
            });

            var table = $("#table");
            $.fn.bootstrapTable.locales[Table.defaults.locale]['formatSearch'] = function(){return "请输入昵称/手机号";};

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
                        {field: 'avatar', title: __('Avatar'),operate:false ,events: Table.api.events.image, formatter: Table.api.formatter.image},
                        {field: 'grade', title: __('Grade'),searchList: {"0":__('Grade 0'),"1":__('Grade 1')}, formatter: Table.api.formatter.status},
                        {field: 'gender', title: __('Gender'), searchList: {"0":'未知',"1":__('Gender 1'),"2":__('Gender 2')}, formatter: Table.api.formatter.normal},
                        {field: 'create_time', title: __('Create_time'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                        {field: 'last_time', title: __('Last_time'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
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