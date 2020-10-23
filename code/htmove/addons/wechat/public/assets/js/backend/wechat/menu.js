define(['jquery', 'bootstrap', 'backend', 'table', 'form', 'sortable'], function ($, undefined, Backend, Table, Form, Sortable) {
    var Controller = {
        index: function () {
            var typeList = [
                {name: "click", title: "发送消息"},
                {name: "view", title: "跳转网页"},
                {name: "miniprogram", title: "跳转小程序"},
                {name: "scancode_push", title: "扫码推"},
                {name: "scancode_waitmsg", title: "扫码推提示框"},
                {name: "pic_sysphoto", title: "拍照发图"},
                {name: "pic_photo_or_album", title: "拍照相册发图"},
                {name: "pic_weixin", title: "相册发图"},
                {name: "location_select", title: "地理位置选择"},
            ];
            String.prototype.subByte = function (start, bytes) {
                for (var i = start; bytes > 0; i++) {
                    var code = this.charCodeAt(i);
                    bytes -= code < 256 ? 1 : 2;
                }
                return this.slice(start, i + bytes)
            };

            //初始化菜单
            $("#menu-list").prepend(Template("menutpl", {menu: menu}));
            //拖动排序
            new Sortable($("#menu-list")[0], {
                draggable: 'li.menu-item',
                onEnd: function () {
                    updateChangeMenu();
                }
            });
            //子菜单拖动排序
            $(".sub-menu-list").each(function () {
                new Sortable(this, {
                    draggable: 'li.sub-menu-item',
                    onEnd: function () {
                        updateChangeMenu();
                    }
                });
            });
            //添加主菜单
            $(document).on('click', '#add-item', function () {
                var menu_item_total = $(".menu-item").size();
                if (menu_item_total < 3) {
                    var item = '<li class="menu-item" data-type="click" data-key="" data-name="添加菜单" > <a href="javascript:;" class="menu-link"> <i class="icon-menu-dot"></i> <i class="weixin-icon sort-gray"></i> <span class="title">添加菜单</span> </a> <div class="sub-menu-box" style=""> <ul class="sub-menu-list"><li class=" add-sub-item"><a href="javascript:;" title="添加子菜单"><span class=" "><i class="weixin-icon add-gray"></i></span></a></li> </ul> <i class="arrow arrow-out"></i> <i class="arrow arrow-in"></i> </div></li>';
                    var itemDom = $(item);
                    itemDom.insertBefore(this);
                    itemDom.trigger("click");
                    $("#item_title").focus().select();
                    $(".sub-menu-box", itemDom).show();
                    updateChangeMenu();
                    new Sortable($(".sub-menu-list", itemDom)[0], {draggable: 'li.sub-menu-item'});
                }
            });
            //切换类型
            $(document).on('change', 'input[name=type]', function () {
                $(".sub-menu-item.current,.menu-item.current").data("type", $(this).val()).trigger("click");
            });
            //删除菜单
            $(document).on('click', '#item_delete', function () {
                var current = $("#menu-list li.current");
                var prev = current.prev("li[data-type]");
                var next = current.next("li[data-type]");

                if (prev.size() == 0 && next.size() == 0 && $(".sub-menu-box", current).size() == 0) {
                    last = current.closest(".menu-item");
                } else if (prev.size() > 0 || next.size() > 0) {
                    last = prev.size() > 0 ? prev : next;
                } else {
                    last = null;
                    $(".weixin-content").hide();
                    $(".no-weixin-content").show();
                }
                if (current.hasClass("sub-menu-item")) {
                    $(".add-sub-item", current.parent()).removeClass("hidden");
                }
                current.remove();
                if (last) {
                    last.trigger('click');
                } else {
                    $("input[name='name']").val('');
                }

                updateChangeMenu();
            });
            //更新修改与变动
            var updateChangeMenu = function () {
                var item = $("#menu-list li.current");
                var values = $("#form-item").serializeArray();
                $.each(values, function (i, j) {
                    if (j.name == 'name') {
                        $(">a", item).html(j.value);
                    }
                    item.data(j.name, j.value);
                });
                menuUpdate();
            };
            //更新菜单数据
            var menuUpdate = function () {
                $.post("wechat/menu/edit", {menu: JSON.stringify(getMenuList())}, function (data) {
                    if (data['code'] == 1) {
                    } else {
                        Toastr.error(__('Operation failed'));
                    }
                }, 'json');
            };
            //获取菜单数据
            var getMenuList = function () {
                var menus = [];
                var sub_button = [];
                var menu_i = 0;
                var sub_menu_i = 0;
                var item;
                $("#menu-list li").each(function (i) {
                    item = $(this);
                    var name = item.data('name');
                    if (name != null) {
                        if (item.hasClass('menu-item')) {
                            sub_menu_i = 0;
                            if (item.find('.sub-menu-item').size() > 0) {
                                menus[menu_i] = {"name": name, "sub_button": "sub_button"}
                            } else {
                                menus[menu_i] = $(this).data();
                            }
                            if (menu_i > 0) {
                                menus[menu_i - 1]['sub_button'] = menus[menu_i - 1]['sub_button'] == "sub_button" ? sub_button : menus[menu_i - 1]['sub_button'];
                            }
                            sub_button = [];
                            menu_i++;
                        } else {
                            sub_button[sub_menu_i++] = $(this).data();
                        }
                    }
                });
                if (sub_button.length > 0) {
                    var len = menus.length;
                    menus[len - 1]['sub_button'] = sub_button;
                }
                return menus;
            };
            //添加子菜单
            $(document).on('click', ".add-sub-item", function () {
                var sub_menu_item_total = $(this).parent().find(".sub-menu-item").size();
                if (sub_menu_item_total < 5) {
                    var item = '<li class="sub-menu-item" data-type="click" data-key="" data-name="添加子菜单"><a href="javascript:;"><span class=" "><i class="weixin-icon sort-gray"></i><span class="sub-title">添加子菜单</span></span></a></li>';
                    var itemDom = $(item);
                    itemDom.insertBefore(this);
                    itemDom.trigger("click");
                    $("#item_title").focus().select();
                    updateChangeMenu();
                    if (sub_menu_item_total == 4) {
                        $(this).addClass("hidden");
                    }
                }
                return false;
            });
            //主菜单子菜单点击事件
            $(document).on('click', ".menu-item, .sub-menu-item", function () {
                var hasChild = $(".sub-menu-item", this).size() > 0 ? true : false;
                if ($(this).hasClass("sub-menu-item")) {
                    $("#menu-list li").removeClass('current');
                } else {
                    $("#menu-list li").removeClass('current');
                    $("#menu-list > li").not(this).find(".sub-menu-box").hide();
                    $(".sub-menu-box", this).toggle();
                }
                $(this).addClass('current');

                var data = $.extend({}, $(this).data());
                data.keytitle = data.key && typeof responselist[data.key] != 'undefined' ? responselist[data.key] : '';
                data.typeList = typeList;
                data.hasChild = hasChild;
                data.first = $(this).hasClass("menu-item") ? true : false;
                $(".weixin-content").show();
                $(".no-weixin-content").hide();
                $("#item-body").html(Template("itemtpl", data));

                return false;
            });
            //触发保存
            $("form#form-item").on('change', "input,textarea", function () {
                updateChangeMenu();
            });
            //点击同步
            $(document).on('click', "#menuSyn", function () {
                $.post("wechat/menu/sync", {}, function (ret) {
                    var msg = ret.hasOwnProperty("msg") && ret.msg != "" ? ret.msg : "";
                    if (ret.code == 1) {
                        Backend.api.toastr.success('菜单同步更新成功，生效时间看微信官网说明，或者你重新关注微信号！');
                    } else {
                        Backend.api.toastr.error(msg ? msg : __('Operation failed'));
                    }
                }, 'json');
            });
            //刷新资源
            var refreshkey = function (data) {
                responselist[data.eventkey] = data.title;
                $("input[name=key]").val(data.eventkey).trigger("change");
                $("#menu-list li.current").trigger("click");
                Layer.closeAll();
            };
            //选择资源
            $(document).on('click', "#select-resources", function () {
                var key = $("#key").val();
                Backend.api.open($(this).attr("href") + "?key=" + key, __('Select'), {
                    callback: refreshkey
                });
                return false;
            });
            //添加资源
            $(document).on('click', "#add-resources", function () {
                Backend.api.open($(this).attr("href") + "?key=" + key, __('Add'), {
                    callback: refreshkey
                });
                return false;
            });

            $("#menu-list li.menu-item:first").trigger("click");
        },
        add: function () {
            Form.api.bindevent($("form[role=form]"));
        },
        edit: function () {
            Form.api.bindevent($("form[role=form]"));
        }
    };
    return Controller;
});
