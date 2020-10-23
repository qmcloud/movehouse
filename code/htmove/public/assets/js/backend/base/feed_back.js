define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'base/feed_back/index' + location.search,
                    edit_url: 'base/feed_back/edit',
                    del_url: 'base/feed_back/del',
                    table: 'feedback',
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
                        {field: 'user.nick_name', title: '用户名'},
                        {field: 'contact', title: '联系方式'},
                        {field: 'name', title: __('Name')},
                        {field: 'content', title: __('Content'),operate: false},
                        {field: 'images', title: __('Images'),operate: false, events: Controller.api.image, formatter: Table.api.formatter.images},
                        {field: 'status', title: __('Status'), searchList: {"0":__('Status 0'),"1":__('Status 1')}, formatter: Table.api.formatter.status},
                        {field: 'create_time', title: '添加时间', operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate}
                    ]
                ]
            });


            $('#look_cate').on('click', function () {
                Fast.api.open('base/feed_back/look_cate','查看分类');
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
                    index_url: 'base/feed_back/look_cate' + location.search,
                    add_url: 'base/feed_back/add_cate',
                    edit_url: 'base/feed_back/edit_cate',
                    del_url: 'base/feed_back/del_cate',
                    table: 'feedback',
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
                        {field: 'title', title: '问题分类名称'},
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
            },
            image: {
                'click .img-center': function (e, value, row, index) {
                    var data = [];
                    value = value.split(",");
                    $.each(value, function (index, value) {
                        data.push({
                            src: Fast.api.cdnurl(value),
                        });
                    });
                    Layer.photos({
                        photos: {
                            "data": [{src:$(this).attr('src')}]
                        },
                        anim: 4 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
                    });
                },
            }
        }
    };
    return Controller;
});