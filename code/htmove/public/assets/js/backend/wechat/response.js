define(['jquery', 'bootstrap', 'backend', 'table', 'form', 'adminlte'], function ($, undefined, Backend, Table, Form, Adminlte) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'wechat/response/index',
                    add_url: 'wechat/response/add',
                    edit_url: 'wechat/response/edit',
                    del_url: 'wechat/response/del',
                    multi_url: 'wechat/response/multi',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                sortName: 'id',
                columns: [
                    [
                        {field: 'state', checkbox: true,},
                        {field: 'id', title: 'ID'},
                        {field: 'type', title: __('Type')},
                        {field: 'title', title: __('Resource title')},
                        {field: 'eventkey', title: __('Event key')},
                        {field: 'status', title: __('Status'), formatter: Table.api.formatter.status, operate: false},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate}
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
        },
        select: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'wechat/response/index',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                sortName: 'id',
                columns: [
                    [
                        {field: 'state', checkbox: true,},
                        {field: 'id', title: 'ID'},
                        {field: 'type', title: __('Type')},
                        {field: 'title', title: __('Title')},
                        {field: 'eventkey', title: __('Event key')},
                        {field: 'status', title: __('Status'), formatter: Table.api.formatter.status, operate: false},
                        {
                            field: 'operate', title: __('Operate'), events: {
                                'click .btn-chooseone': function (e, value, row, index) {
                                    Fast.api.close(row);
                                },
                            }, formatter: function () {
                                return '<a href="javascript:;" class="btn btn-danger btn-chooseone btn-xs"><i class="fa fa-check"></i> ' + __('Choose') + '</a>';
                            }
                        }
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
        },
        add: function () {
            Form.api.bindevent($("form[role=form]"), function (data) {
                Fast.api.close(data);
            });
            Controller.api.bindevent();
        },
        edit: function () {
            Form.api.bindevent($("form[role=form]"));
            Controller.api.bindevent();
        },
        api: {
            bindevent: function () {
                var getAppFileds = function (id) {
                    var app = apps[id];
                    var appConfig = app['config'];
                    var str = '';
                    for (var i in appConfig) {
                        var type = appConfig[i]['type'];
                        var field = appConfig[i]['field'];
                        var caption = appConfig[i]['caption'];
                        var defaultvalue = typeof appConfig[i]['defaultvalue'] != 'undefined' ? appConfig[i]['defaultvalue'] : '';
                        if (type == 'text' || type == 'textarea') {
                            if (type == 'textarea') {
                                str += '<div class="form-group"><label for="content" class="control-label col-xs-12 col-sm-2">' + caption + ':</label><div class="col-xs-12 col-sm-8"><textarea ' + appConfig[i]['extend'] + ' class="form-control" name="row[content][' + field + ']" data-rule="' + appConfig[i]['rule'] + '">' + defaultvalue + '</textarea> </div> </div>';
                            } else {
                                str += '<div class="form-group"><label for="content" class="control-label col-xs-12 col-sm-2">' + caption + ':</label><div class="col-xs-12 col-sm-8"><input ' + appConfig[i]['extend'] + ' class="form-control" name="row[content][' + field + ']" type="text" value="' + defaultvalue + '" data-rule="' + appConfig[i]['rule'] + '"> </div> </div>';
                            }
                        } else {
                            var options = appConfig[i]['options'];
                            var html = '';
                            if (type == 'select') {
                                for (var j in options) {
                                    html += '<option value="' + j + '">' + options[j] + '</option>';
                                }
                                html = '<select ' + appConfig[i]['extend'] + ' class="form-control" name="row[content][' + field + ']">' + html + '</select>';
                            } else if (type == 'checkbox') {
                                for (var j in options) {
                                    html += '<input type="checkbox" name="row[content][' + field + '][]" value="' + j + '"> <span>' + options[j] + '</span> ';
                                }

                            } else if (type == 'radio') {
                                var index = 0;
                                for (var j in options) {
                                    html += '<input type="radio" name="row[content][' + field + ']" value="' + j + '" ' + (index == 0 ? 'checked' : '') + '> <span>' + options[j] + '</span> ';
                                    index++;
                                }
                            }
                            str += '<div class="form-group"><label for="content" class="control-label col-xs-12 col-sm-2">' + caption + ':</label><div class="col-xs-12 col-sm-8">' + html + ' </div> </div>';
                        }

                    }
                    return str;
                };
                $(document).on('change', "#app", function () {
                    var app = $(this).val();
                    $("#appfields").html(getAppFileds(app));
                    if (datas.app == app) {
                        delete (datas.app);
                        var form = $("form.form-ajax");
                        $.each(datas, function (i, j) {
                            console.log(i, j);
                            form.field("row[content][" + i + "]" + ($("input[name='row[content][" + i + "][]']", form).size() > 0 ? '[]' : ''), j);
                        });
                    }
                    Form.api.bindevent("#appfields");
                });
                $(document).on('click', "input[name='row[type]']", function () {
                    var type = $(this).val();
                    if (type == 'text') {
                        $("#expand").html('<div class="form-group"><label for="content" class="control-label col-xs-12 col-sm-2">文本内容:</label><div class="col-xs-12 col-sm-8"><textarea class="form-control" name="row[content][content]" data-rule="required"></textarea></div></div>');
                        $("form[role='form']").field("row[content][content]", datas.content);
                    } else if (type == 'app') {
                        $("#expand").html('<div class="form-group"><label for="content" class="control-label col-xs-12 col-sm-2">应用:</label><div class="col-xs-12 col-sm-8"><select class="form-control" name="row[content][app]" id="app">' + $("select[name=applist]").html() + '</select></div></div><div id="appfields"><div>');
                        $("form[role='form']").field("row[content][app]", datas.app);
                        $("#app").trigger('change');
                    }
                });
                $("input[name='row[type]']:checked").trigger("click");
            }
        }
    };
    return Controller;
});