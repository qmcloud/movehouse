<?php if (!defined('THINK_PATH')) exit(); /*a:4:{s:92:"/www/wwwroot/www.58hongtu.com/htmove/public/../application/admin/view/wechat/menu/index.html";i:1593671741;s:79:"/www/wwwroot/www.58hongtu.com/htmove/application/admin/view/layout/default.html";i:1588765311;s:76:"/www/wwwroot/www.58hongtu.com/htmove/application/admin/view/common/meta.html";i:1588765311;s:78:"/www/wwwroot/www.58hongtu.com/htmove/application/admin/view/common/script.html";i:1588765311;}*/ ?>
<!DOCTYPE html>
<html lang="<?php echo $config['language']; ?>">
    <head>
        <meta charset="utf-8">
<title><?php echo (isset($title) && ($title !== '')?$title:''); ?></title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
<meta name="renderer" content="webkit">

<link rel="shortcut icon" href="/assets/img/favicon.ico" />
<!-- Loading Bootstrap -->
<link href="/assets/css/backend<?php echo \think\Config::get('app_debug')?'':'.min'; ?>.css?v=<?php echo \think\Config::get('site.version'); ?>" rel="stylesheet">

<!-- HTML5 shim, for IE6-8 support of HTML5 elements. All other JS at the end of file. -->
<!--[if lt IE 9]>
  <script src="/assets/js/html5shiv.js"></script>
  <script src="/assets/js/respond.min.js"></script>
<![endif]-->
<script type="text/javascript">
    var require = {
        config:  <?php echo json_encode($config); ?>
    };
</script>
    </head>

    <body class="inside-header inside-aside <?php echo defined('IS_DIALOG') && IS_DIALOG ? 'is-dialog' : ''; ?>">
        <div id="main" role="main">
            <div class="tab-content tab-addtabs">
                <div id="content">
                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <section class="content-header hide">
                                <h1>
                                    <?php echo __('Dashboard'); ?>
                                    <small><?php echo __('Control panel'); ?></small>
                                </h1>
                            </section>
                            <?php if(!IS_DIALOG && !\think\Config::get('fastadmin.multiplenav')): ?>
                            <!-- RIBBON -->
                            <div id="ribbon">
                                <ol class="breadcrumb pull-left">
                                    <li><a href="dashboard" class="addtabsit"><i class="fa fa-dashboard"></i> <?php echo __('Dashboard'); ?></a></li>
                                </ol>
                                <ol class="breadcrumb pull-right">
                                    <?php foreach($breadcrumb as $vo): ?>
                                    <li><a href="javascript:;" data-url="<?php echo $vo['url']; ?>"><?php echo $vo['title']; ?></a></li>
                                    <?php endforeach; ?>
                                </ol>
                            </div>
                            <!-- END RIBBON -->
                            <?php endif; ?>
                            <div class="content">
                                <link href="/assets/addons/wechat/css/menu.css?v=<?php echo $site['version']; ?>" rel="stylesheet"/>
<style>
    .form-item dl dt {
        width: 120px;
    }

    .form-item dl dd {
        margin-left: 120px;
    }

    .form-item dl dd input {
        font-size: 12px;
    }
</style>
<div class="panel panel-default panel-intro">
    <?php echo build_heading(); ?>

    <div class="panel-body">
        <div id="myTabContent" class="tab-content">
            <div class="tab-pane fade active in" id="one">
                <div class="widget-body no-padding">
                    <div class="weixin-menu-setting clearfix">
                        <div class="mobile-menu-preview">
                            <div class="mobile-head-title"><?php echo $site['name']; ?></div>
                            <ul class="menu-list" id="menu-list">
                            </ul>
                        </div>
                        <div class="weixin-body">
                            <div class="weixin-content" style="display:none">
                                <div class="item-info">
                                    <form id="form-item" class="form-item" data-value="">
                                        <div class="item-head">
                                            <h4 id="current-item-name">添加子菜单</h4>
                                            <div class="item-delete"><a href="javascript:;" id="item_delete">删除菜单</a></div>
                                        </div>
                                        <div style="margin-top: 20px;" id="item-body">

                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div class="no-weixin-content">
                                点击左侧菜单进行编辑操作
                            </div>
                        </div>
                    </div>

                    <div class="text-center" style="position:relative;">
                        <div class="text-danger" style="width:317px;position:absolute;left:0;top:0;">
                            <i class="fa fa-lightbulb-o"></i> <small>可直接拖动菜单排序</small>
                        </div>
                        <div style="padding-left:337px;"><a href="javascript:;" id="menuSyn" class="btn btn-danger">保存并发布</a></div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>
<script type="text/html" id="menutpl">
    <%for(var i=0; i< menu.length; i++){%>
    <%var first=menu[i];%>
    <li id="menu-<%=i%>" class="menu-item" data-type="<%=first['type']%>" data-key="<%=first['key']%>" data-name="<%=first['name']%>" data-url="<%=first['url']%>" data-appid="<%=first['appid']%>" data-pagepath="<%=first['pagepath']%>">
        <a href="javascript:;" class="menu-link">
            <i class="icon-menu-dot"></i> <i class="weixin-icon sort-gray"></i> <span class="title"><%=first['name']%></span>
        </a>

        <div class="sub-menu-box" style="display:none;">
            <ul class="sub-menu-list">
                <%if(typeof first['sub_button']!='undefined'){%>
                    <%for(var j=0; j< first['sub_button'].length; j++){%>
                    <%var second=first['sub_button'][j];%>
                    <li id="sub-menu-<%=j%>" class="sub-menu-item" data-type="<%=second['type']%>" data-key="<%=second['key']%>" data-name="<%=second['name']%>" data-url="<%=second['url']%>" data-appid="<%=second['appid']%>" data-pagepath="<%=second['pagepath']%>"><a href="javascript:;"> <i class="weixin-icon sort-gray"></i><span class="sub-title"><%=second['name']%></span></a></li>
                    <%}%>
                <%}%>
                <li class="add-sub-item <%if(typeof first['sub_button']!='undefined' && first['sub_button'].length>=5){%>hidden<%}%>"><a href="javascript:;" title="添加子菜单"><span class=" "><i class="weixin-icon add-gray"></i></span></a></li>
            </ul>
            <i class="arrow arrow-out"></i> <i class="arrow arrow-in"></i>
        </div>
    </li>
    <%}%>
    <li class="add-item extra" id="add-item">
        <a href="javascript:;" class="menu-link" title="添加菜单"><i class="weixin-icon add-gray"></i></a>
    </li>
</script>
<script type="text/html" id="itemtpl">
    <dl>
        <dt id="current-item-option"><span class="is-sub-item <%=first?'hidden':''%>">子</span>菜单标题：</dt>
        <dd>
            <div class="input-box"><input id="item_title" name="name" type="text" value="<%=name%>"></div>
        </dd>
    </dl>
    <%if(!hasChild){%>
    <dl class="is-item">
        <dt id="current-item-type"><span class="is-sub-item <%=first?'hidden':''%>">子</span>菜单内容：</dt>
        <dd>
            <%for(var i=0;i< typeList.length; i++){%>
            <input id="type<%=i%>" type="radio" name="type" value="<%=typeList[i]['name']%>" <%=typeList[i]['name']==type?'checked':''%> /><label for="type<%=i%>"><span class="lbl_content"><%=typeList[i]['title']%></span></label>
            <%}%>
        </dd>
    </dl>
    <div id="menu-content" class="is-item">
        <%if(type=='view'){%>
        <div class="viewbox is-view">
            <p class="menu-content-tips">点击该<span class="is-sub-item <%=first?'hidden':''%>">子</span>菜单会跳到以下链接</p>
            <dl>
                <dt>页面地址：</dt>
                <dd>
                    <div class="input-box"><input type="text" name="url" value="<%=url%>"></div>
                </dd>
            </dl>
        </div>
        <%}%>
        <%if(type!='view'&&type!='miniprogram'){%>
        <div class="clickbox is-click">
            <input type="hidden" name="key" id="key" value="<%=key%>"/>
            <span class="create-click">
                    <%if(keytitle){%>
                    <div class="keytitle">资源名:<%=keytitle%></div>
                    <%}%>
                    <a href="<?php echo url('wechat.response/select'); ?>" id="select-resources"><i class="weixin-icon big-add-gray"></i><strong>选择现有资源</strong></a>
                </span>
            <span class="create-click">
                    <a href="<?php echo url('wechat.response/add'); ?>" id="add-resources"><i class="weixin-icon big-add-gray"></i><strong>添加新资源</strong></a>
                </span>
        </div>
        <%}%>
        <%if(type=='miniprogram'){%>
        <div class="viewbox is-miniprogram">
            <p class="menu-content-tips">点击该<span class="is-sub-item <%=first?'':'hidden'%>">子</span>菜单会跳到以下小程序</p>
            <dl>
                <dt>小程序ID：</dt>
                <dd>
                    <div class="input-box"><input type="text" id="appid" name="appid" placeholder="在小程序后台获取" value="<%=appid%>"></div>
                </dd>
            </dl>
            <dl>
                <dt>小程序页面路径：</dt>
                <dd>
                    <div class="input-box"><input type="text" id="pagepath" name="pagepath" placeholder="小程序页面路径" value="<%=pagepath%>"></div>
                </dd>
            </dl>
            <dl>
                <dt>页面地址：</dt>
                <dd>
                    <div class="input-box"><input type="text" name="url" placeholder="页面地址，当不支持小程序时会跳转此页面" value="<%=url%>"></div>
                </dd>
            </dl>
        </div>
        <%}%>
    </div>
    <%}%>
</script>
<!--@formatter:off-->
<script type="text/javascript">
    var menu = <?php echo json_encode($menu, JSON_UNESCAPED_UNICODE); ?>;
    var responselist = <?php echo json_encode($responselist, JSON_UNESCAPED_UNICODE); ?>;
</script>
<!--@formatter:on-->

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <script src="/assets/js/require<?php echo \think\Config::get('app_debug')?'':'.min'; ?>.js" data-main="/assets/js/require-backend<?php echo \think\Config::get('app_debug')?'':'.min'; ?>.js?v=<?php echo htmlentities($site['version']); ?>"></script>
    </body>
</html>