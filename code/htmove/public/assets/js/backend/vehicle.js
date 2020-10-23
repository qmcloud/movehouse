define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'vehicle/index' + location.search,
                    add_url: 'vehicle/add',
                    edit_url: 'vehicle/edit',
                    del_url: 'vehicle/del',
                    multi_url: 'vehicle/multi',
                    table: 'ims_feright_vehicle',
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
                        {field: 'title', title: __('Title')},
                        {field: 'load_capacity', title: __('Load_capacity')},
                        {field: 'icon', title: __('Icon'), events: Table.api.events.image, formatter: Table.api.formatter.image},
                        {field: 'image', title: __('Image'), events: Table.api.events.image, formatter: Table.api.formatter.image},
                        {field: 'starting_price', title: __('Starting_price'), operate:'BETWEEN'},
                        {field: 'starting_km', title: __('Starting_km')},
                        {field: 'beyond_price', title: __('Beyond_price')},
                        {field: 'status', title: '状态',formatter:function(val,row,index){
                            if(val == 0){
                                return "<span class='label label-danger'>隐藏</span>";
                            }else{
                                return "<span class='label label-success'>显示</span>";
                            }
                        }},
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