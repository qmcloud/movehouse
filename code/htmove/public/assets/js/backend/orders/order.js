define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {
    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'orders/order/index' + location.search,
                    edit_url: 'orders/order/edit',
                    del_url: 'orders/order/del',
                    detail_url:'orders/order/detail',
                    assign_url:'orders/order/assign_driver',
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

            eventBtn['click .btn-assign'] = function (e, value, row, index) {
                e.stopPropagation();
                e.preventDefault();
                var table = $(this).closest('table');
                var options = table.bootstrapTable('getOptions');
                var ids = row[options.pk];
                row = $.extend({}, row ? row : {}, {ids: ids});
                var url = options.extend.assign_url;
                if( parseInt(row.status) !== 1){
                    layer.msg('该订单不是待接单状态！');return;
                }
                Fast.api.open(Table.api.replaceurl(url, row, table), __('请在地图上选择车辆或搜索'), $(this).data() || {});
            };




            var table = $("#table");
            $.fn.bootstrapTable.locales[Table.defaults.locale]['formatSearch'] = function(){return "请输入订单号";};

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'id',
                columns: [
                    [
                        {checkbox: true},
                        {field: 'id', title: __('Id'),sortable:true},
                        {field: 'user.nick_name', title: '下单用户'},
                        {field: 'order_number', title: __('Order_number')},
                        {field: 'shipper_name', title: __('Shipper_name')},
                        {field: 'shipper_phone', title: __('Shipper_phone')},
                        {field: 'real_price', title: __('Real_price'), operate:'BETWEEN',sortable:true},
                        {field: 'status', title: __('Status'), searchList: {"1":__('Status 1'),"2":__('Status 2'),"3":__('Status 3'),"4":__('Status 4'),"5":__('Status 5'),"6":__('Status 6'),"7":__('Status 7')}, formatter: Table.api.formatter.status},
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

                                },
                                {
                                    name: 'detail',
                                    icon: 'fa fa-paper-plane',
                                    title: __('分配司机'),
                                    extend: 'data-toggle="tooltip"',
                                    classname: 'btn btn-xs btn-info btn-assign',
                                    url: $.fn.bootstrapTable.defaults.extend.assign_url
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
            $(".btn-embossed").click(function(){
                layer.confirm('取消订单后订单金额会原路退还用户，是否继续?', {icon: 3, title:'提示'}, function(index){
                    Form.api.submit($("form[role=form]"));
                    layer.close(index);
                });
                return false;
            })

            Controller.api.bindevent();
        },
        assign_driver:function(){
            $("#search").click(function(){
                var key = $("#search_key").val();
                var order_id = $("#order_idid").val();

                $.ajax({
                    url: 'orders/order/search',
                    data: {key: key, order_id: order_id},
                    success: function (res) {
                        console.log(Config);
                        if(res.code == 1){
                            $(".search_val").removeClass('hide');
                            $(".rider-detail-init").hide();
                            $(".notsearch").hide();
                            $("#driver_names").val(res.data.driver_name);
                            $("#driver_phones").val(res.data.driver_phone);
                            $("#driver_cars").val(res.data.title);
                            $("#driver_avatar").attr('src',Config.upload.cdnurl+res.data.photo);

                            $("#sdriver_id").val(res.data.did);
                            $("#sorder_id").val(order_id);
                            $("#slat").val(res.data.latitude);
                            $("#slng").val(res.data.longitude);

                        }else{
                            layer.msg(res.msg);
                        }

                    }
                })
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