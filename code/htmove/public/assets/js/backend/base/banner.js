define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'base/banner/index' + location.search,
                    add_url: 'base/banner/add',
                    edit_url: 'base/banner/edit',
                    del_url: 'base/banner/del',
                    multi_url: 'base/banner/multi',
                    table: 'banner',
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
                        //{field: 'url', title: __('Url'), formatter: Table.api.formatter.url},
                        {field: 'image', title: __('Image'), events: Table.api.events.image, formatter: Table.api.formatter.image},
                        {field: 'sort', title: __('Sort')},
                        {field: 'show_switch', title: __('Show_switch'),formatter:function(val,index,row){
                            if(val == 0){
                                return "<span class='label label-danger'>隐藏</span>";
                            }else{
                                return "<span class='label label-success'>显示</span>";
                            }
                        }},
                        {field: 'create_time', title: __('Create_time'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate}
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
        },
        add: function () {
            $("#select_app").click(function(e){
                $("#appid").removeClass('hide');
                $("#pages").removeClass('hide');
                $("#select_page").hide();
            })

            $("#page").click(function(e){
                $("#appid").addClass('hide');
                $("#pages").addClass('hide');
                $("#select_page").show();
            })
            Controller.api.bindevent();
        },
        edit: function () {
            $("#select_app").click(function(e){
                $("#appid").removeClass('hide');
                $("#pages").removeClass('hide');
                $("#select_page").addClass('hide');
            })

            $("#page").click(function(e){
                $("#appid").addClass('hide');
                $("#pages").addClass('hide');
                $("#select_page").removeClass('hide');
            })

            Controller.api.bindevent();
        },
        api: {
            bindevent: function () {
                $('form[role=form]').validator({
                    ignore: ':hidden'
                });
                Form.api.bindevent($("form[role=form]"));
            }
        }
    };
    return Controller;
});