<?php if (!defined('THINK_PATH')) exit(); /*a:4:{s:85:"/www/wwwroot/www.58hongtu.com/htmove/public/../application/admin/view/order/edit.html";i:1596460353;s:79:"/www/wwwroot/www.58hongtu.com/htmove/application/admin/view/layout/default.html";i:1588765311;s:76:"/www/wwwroot/www.58hongtu.com/htmove/application/admin/view/common/meta.html";i:1588765311;s:78:"/www/wwwroot/www.58hongtu.com/htmove/application/admin/view/common/script.html";i:1588765311;}*/ ?>
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
                                <form id="edit-form" class="form-horizontal" role="form" data-toggle="validator" method="POST" action="">

    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Sn'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-sn" class="form-control" name="row[sn]" type="text" value="<?php echo htmlentities($row['sn']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Openid'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-openid" class="form-control" name="row[openid]" type="text" value="<?php echo htmlentities($row['openid']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Pro_price'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-pro_price" class="form-control" step="0.01" name="row[pro_price]" type="number" value="<?php echo htmlentities($row['pro_price']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Couponid'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-couponid" class="form-control" name="row[couponid]" type="number" value="<?php echo htmlentities($row['couponid']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Coupon_price'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-coupon_price" class="form-control" step="0.01" name="row[coupon_price]" type="number" value="<?php echo htmlentities($row['coupon_price']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Price'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-price" class="form-control" step="0.01" name="row[price]" type="number" value="<?php echo htmlentities($row['price']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Uptime'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-uptime" class="form-control datetimepicker" data-date-format="YYYY-MM-DD HH:mm:ss" data-use-current="true" name="row[uptime]" type="text" value="<?php echo $row['uptime']?datetime($row['uptime']):''; ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Movetime'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-movetime" class="form-control datetimepicker" data-date-format="YYYY-MM-DD HH:mm:ss" data-use-current="true" name="row[movetime]" type="text" value="<?php echo $row['movetime']?datetime($row['movetime']):''; ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Name'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-name" class="form-control" name="row[name]" type="text" value="<?php echo htmlentities($row['name']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Tel'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-tel" class="form-control" name="row[tel]" type="text" value="<?php echo htmlentities($row['tel']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Mark'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-mark" class="form-control" name="row[mark]" type="text" value="<?php echo htmlentities($row['mark']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Img1'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-img1" class="form-control" name="row[img1]" type="text" value="<?php echo htmlentities($row['img1']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Img2'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-img2" class="form-control" name="row[img2]" type="text" value="<?php echo htmlentities($row['img2']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Img3'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-img3" class="form-control" name="row[img3]" type="text" value="<?php echo htmlentities($row['img3']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Img4'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-img4" class="form-control" name="row[img4]" type="text" value="<?php echo htmlentities($row['img4']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Img5'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-img5" class="form-control" name="row[img5]" type="text" value="<?php echo htmlentities($row['img5']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Img6'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-img6" class="form-control" name="row[img6]" type="text" value="<?php echo htmlentities($row['img6']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Start'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-start" class="form-control" name="row[start]" type="text" value="<?php echo htmlentities($row['start']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('End'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-end" class="form-control" name="row[end]" type="text" value="<?php echo htmlentities($row['end']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Cartype'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-cartype" class="form-control" name="row[cartype]" type="text" value="<?php echo htmlentities($row['cartype']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Status'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-status" data-rule="required" class="form-control" name="row[status]" type="number" value="<?php echo htmlentities($row['status']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Distance'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-distance" class="form-control" name="row[distance]" type="number" value="<?php echo htmlentities($row['distance']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Duration'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-duration" class="form-control" name="row[duration]" type="number" value="<?php echo htmlentities($row['duration']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Ewprice'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-ewprice" class="form-control" name="row[ewprice]" type="text" value="<?php echo htmlentities($row['ewprice']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Img'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-img" class="form-control" name="row[img]" type="text" value="<?php echo htmlentities($row['img']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Driver'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-driver" class="form-control" name="row[driver]" type="text" value="<?php echo htmlentities($row['driver']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Driver_tel'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-driver_tel" class="form-control" name="row[driver_tel]" type="text" value="<?php echo htmlentities($row['driver_tel']); ?>">
        </div>
    </div>
    <div class="form-group layer-footer">
        <label class="control-label col-xs-12 col-sm-2"></label>
        <div class="col-xs-12 col-sm-8">
            <button type="submit" class="btn btn-success btn-embossed disabled"><?php echo __('OK'); ?></button>
            <button type="reset" class="btn btn-default btn-embossed"><?php echo __('Reset'); ?></button>
        </div>
    </div>
</form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <script src="/assets/js/require<?php echo \think\Config::get('app_debug')?'':'.min'; ?>.js" data-main="/assets/js/require-backend<?php echo \think\Config::get('app_debug')?'':'.min'; ?>.js?v=<?php echo htmlentities($site['version']); ?>"></script>
    </body>
</html>