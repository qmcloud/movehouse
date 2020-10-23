<?php if (!defined('THINK_PATH')) exit(); /*a:1:{s:86:"/www/wwwroot/www.58hongtu.com/htmove/public/../application/index/view/index/index.html";i:1596610392;}*/ ?>
<!DOCTYPE html>
<html>

    <head>

        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="">
        <meta name="author" content="">

        <title><?php echo $site['name']; ?></title>
        <link rel="shortcut icon" href="/assets/img/favicon.ico" />
        <!-- Bootstrap Core CSS -->
        <link href="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
        <link href="/assets/css/index.css" rel="stylesheet">

        <!-- Plugin CSS -->
        <link href="https://cdn.staticfile.org/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
        <link href="https://cdn.staticfile.org/simple-line-icons/2.4.1/css/simple-line-icons.min.css" rel="stylesheet">

        <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!--[if lt IE 9]>
            <script src="https://cdn.staticfile.org/html5shiv/3.7.3/html5shiv.min.js"></script>
            <script src="https://cdn.staticfile.org/respond.js/1.4.2/respond.min.js"></script>
        <![endif]-->
    </head>

    <body id="page-top">

        <nav id="mainNav" class="navbar navbar-default navbar-fixed-top">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-menu">
                        <span class="sr-only">Toggle navigation</span><i class="fa fa-bars"></i>
                    </button>
                    <a class="navbar-brand page-scroll" href="#page-top"><?php echo $site['name']; ?></a>
                </div>

                <div class="collapse navbar-collapse" id="navbar-collapse-menu">
                    <ul class="nav navbar-nav navbar-right">
                        <li><a href="<?php echo url('/'); ?>"><?php echo __('Home'); ?></a></li>
                        <li><a href="<?php echo url('index/user/index'); ?>"><?php echo __('Member center'); ?></a></li>
                    </ul>
                </div>
                <!-- /.navbar-collapse -->
            </div>
            <!-- /.container-fluid -->
        </nav>

        <header>
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="header-content">
                            <div class="header-content-inner">
                                <a href="http://www.58hongtu.com/pjsONbXFua.php/order?ref=addtabs">进入后台</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <!-- jQuery -->
        <script src="https://cdn.staticfile.org/jquery/2.1.4/jquery.min.js"></script>

        <!-- Bootstrap Core JavaScript -->
        <script src="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
    </body>

</html>
