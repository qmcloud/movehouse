<?php if (!defined('THINK_PATH')) exit(); /*a:1:{s:85:"/www/wwwroot/www.58hongtu.com/htmove/public/../application/index/view/index/home.html";i:1602734343;}*/ ?>
<!DOCTYPE html>
<html lang="zh-CN" class="webp" style="font-size: 20px;">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport"
          content="minimal-ui,width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no,viewport-fit=cover,minimal-ui"/>
    <meta name="format-detection" content="telephone=no"/>
    <meta content="email=no" name="format-detection"/>
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="apple-touch-fullscreen" content="yes"/>
    <meta name="screen-orientation" content="portrait"/>
    <meta name="full-screen" content="yes"/>
    <meta name="x5-fullscreen" content="true"/>
    <meta name="360-fullscreen" content="true"/>
    <meta name="browsermode" content="application"/>
    <link rel="shortcut icon" href="/assets/img/favicon.png"/>
    <title>鸿途搬家</title>

    <script>;(function (unit) {
        function reset() {
            window.HTML = {
                el: document.documentElement,
                width: document.documentElement.clientWidth || window.innerWidth,
                height: document.documentElement.clientHeight || window.innerHeight
            };
            window.HTML.el.style.fontSize = HTML.width * unit / 375 + "px"
        }

        reset();
        document.addEventListener("DOMContentLoaded", function () {
            reset()
        });
        document.addEventListener("WeixinJSBridgeReady", function () {
            reset()
        }, false);
        window.addEventListener("pageshow", function () {
            reset()
        });
        window.addEventListener("load", function () {
            reset()
        });
        window.addEventListener("resize", function () {
            setTimeout(function () {
                reset()
            }, 30)
        })
    })(20);</script>
    <script>;

    function check_support_webp() {
        var img = document.createElement('canvas').toDataURL('image/webp')
        return img && img.indexOf('data:image/webp') == 0;
    }

    if (check_support_webp()) {
        document.getElementsByTagName('html')[0].classList.add("webp")
    }</script>
    <link href="/assets/move/app.5b5c129f.css" rel="preload" as="style" crossorigin=""/>
    <link href="/assets/move/chunk-vendors.3448aadb.css" rel="preload" as="style" crossorigin=""/>
    <link href="/assets/move/chunk-vendors.3448aadb.css" rel="stylesheet" crossorigin=""/>
    <link href="/assets/move/app.5b5c129f.css" rel="stylesheet" crossorigin=""/>
</head>
<body class="">
<noscript>
    <strong>We're sorry but move-house doesn't work properly without JavaScript enabled. Please enable it to
        continue.</strong>
</noscript>
<div class="app">
    <!---->
    <div data-v-e1c76018="" class="homepage">
        <div data-v-e1c76018="" class="main flex">
            <div data-v-5671c10a="" data-v-e1c76018="" class="nav" style="display: none;">
                <div data-v-5671c10a="" class="syt-tabs syt-tabs--line">
                    <div class="syt-tabs__wrap syt-hairline--top-bottom">
                        <div class="syt-tabs__nav syt-tabs__nav--line">
                            <div class="syt-tabs__line"></div>
                        </div>
                    </div>
                    <div class="syt-tabs__content"></div>
                </div>
            </div>
            <div data-v-e1c76018="" class="page-body flex-fill">
                <div data-v-e1c76018="" class="move-type">
                    <div data-v-e1c76018="" class="move-type-box">
                        <div data-v-e1c76018="" class="type-tabs flex">
                            <div data-v-e1c76018="">
                                <span data-v-e1c76018="" id="xb" class="active">小搬</span>
                                <span data-v-e1c76018="" class="active holder">小搬</span>
                            </div>
                            <div data-v-e1c76018="">
                                <span data-v-e1c76018="" id="zb" class="">中搬</span>
                                <span data-v-e1c76018="" class="active holder">中搬</span>
                            </div>
                            <div data-v-e1c76018="">
                                <span data-v-e1c76018="" id="db" class="">大搬</span>
                                <span data-v-e1c76018="" class="active holder">大搬</span>
                            </div>
                        </div>
                        <div data-v-2c4cafa8="" data-v-e1c76018="" class="cartype">
                            <img data-v-2c4cafa8="" src="/assets/move/0e884b02.png" class="car-img"/>
                            <div data-v-2c4cafa8="" class="move-desc">
                                <div data-v-2c4cafa8="">
                                    <p id="drivecount" data-v-2c4cafa8="">含1位师傅</p>
                                    <p data-v-2c4cafa8="">全程搬运</p>
                                </div>
                                <div data-v-2c4cafa8="">
                                    <p id="carname" data-v-2c4cafa8="">小面车型</p>
                                    <p id="cardesc" data-v-2c4cafa8="">约10个24寸行李箱物品</p>
                                </div>
                                <div data-v-2c4cafa8="">
                                    <p  data-v-2c4cafa8="">车箱尺寸</p>
                                    <p id="carweight" data-v-2c4cafa8="">1.2*1.1*1.1m</p>
                                </div>
                            </div>
                        </div>
                        <div data-v-9670fa66="" data-v-e1c76018="" class="address address">
                            <div data-v-9670fa66="" class="address-input syt-cell syt-field">
                                <span data-v-9670fa66="" class="circle"></span>
                                <!---->
                                <div class="syt-cell__value syt-cell__value--alone">
                                    <div class="syt-field__body">
                                        <input id="start-location" type="text" readonly="readonly" placeholder="请输入您的起点"
                                               class="syt-field__control"/>
                                        <!---->
                                        <!---->
                                        <!---->
                                    </div>
                                    <!---->
                                </div>
                                <!---->
                            </div>
                            <div data-v-9670fa66="" class="address-input syt-cell syt-field">
                                <span data-v-9670fa66="" class="circle circle-red"></span>
                                <!---->
                                <div class="syt-cell__value syt-cell__value--alone">
                                    <div class="syt-field__body">
                                        <input id="end-location" type="text" readonly="readonly" placeholder="请输入您的终点"
                                               class="syt-field__control"/>
                                        <!---->
                                        <!---->
                                        <!---->
                                    </div>
                                    <!---->
                                </div>
                                <!---->
                            </div>
                        </div>
                    </div>
                </div>
                <div data-v-4cffc000="" data-v-e1c76018="" class="fees">
                    <h2 data-v-4cffc000="" class="fees-title">小搬费用标准</h2>
                    <div data-v-4cffc000="" class="fee-panel">
                        <div data-v-4cffc000="" class="fees-item-title">
                            <h3 data-v-4cffc000="" class="flex"><span data-v-4cffc000=""
                                                                      class="flex-fill item-title-left"></span><span
                                    data-v-4cffc000="" class="item-title-text">基础费用</span><span data-v-4cffc000=""
                                                                                                class="flex-fill item-title-right"></span>
                            </h3>
                        </div>
                        <div data-v-4cffc000="" class="flex base-fee">
                            <span data-v-4cffc000="" id="fee-desc" class="flex-fill fee-desc">8公里及以内车程+1位师傅全程搬运</span>
                            <span data-v-4cffc000="" id="fee-price" class="flex-fixed fee-price">150.00元</span>
                        </div>
                    </div>
                    <div data-v-4cffc000="" class="fee-panel addition-fee">
                        <div data-v-4cffc000="" class="fees-item-title">
                            <h3 data-v-4cffc000="" class="flex"><span data-v-4cffc000=""
                                                                      class="flex-fill item-title-left"></span><span
                                    data-v-4cffc000="" class="item-title-text">额外费用</span><span data-v-4cffc000=""
                                                                                                class="flex-fill item-title-right"></span>
                            </h3>
                            <small data-v-4cffc000="">(没有时不收取)</small>
                        </div>
                        <div data-v-4cffc000="" id="goods" class="fee-panel border-bottom" style="">
                            <div data-v-4cffc000="" class="flex">
                                <h4 data-v-4cffc000="" class="flex-fill">大件物品搬运费<small data-v-4cffc000="" class="badge">价格更透明</small>
                                </h4>
                                <div data-v-4cffc000="" class="fee-price link">
                                    价目表
                                    <i data-v-4cffc000="" class="syt-icon syt-icon-arrow">
                                        <!----></i>
                                </div>
                            </div>
                        </div>
                        <!---->
                        <div data-v-4cffc000="" class="fee-panel border-bottom">
                            <div data-v-4cffc000="" class="flex">
                                <h4 data-v-4cffc000="" class="flex-fill">超出里程</h4>
                                <div data-v-4cffc000="" class="fee-price">
                                    8.00元/公里
                                </div>
                            </div>
                            <span data-v-4cffc000="" class="fee-explain">超出12公里收取</span>
                        </div>
                        <div data-v-4cffc000="" class="fee-panel border-bottom">
                            <h4 data-v-4cffc000="">无电梯楼层</h4>
                            <div data-v-4cffc000="" class="flex fee-item">
                                <span data-v-4cffc000="" class="flex-fill fee-explain">1楼</span>
                                <span data-v-4cffc000="" class="fee-price">0.00元</span>
                            </div>
                            <div data-v-4cffc000="" class="flex fee-item">
                                <span data-v-4cffc000="" class="flex-fill fee-explain">2楼</span>
                                <span data-v-4cffc000="" class="fee-price">15.00元</span>
                            </div>
                            <div data-v-4cffc000="" class="flex fee-item">
                                <span data-v-4cffc000="" class="flex-fill fee-explain">3楼</span>
                                <span data-v-4cffc000="" class="fee-price">30.00元</span>
                            </div>
                            <div data-v-4cffc000="" class="flex fee-item">
                                <span data-v-4cffc000="" class="flex-fill fee-explain">4楼</span>
                                <span data-v-4cffc000="" class="fee-price">45.00元</span>
                            </div>
                            <div data-v-4cffc000="" class="flex fee-item">
                                <span data-v-4cffc000="" class="flex-fill fee-explain">5楼</span>
                                <span data-v-4cffc000="" class="fee-price">60.00元</span>
                            </div>
                            <div data-v-4cffc000="" class="flex fee-item">
                                <span data-v-4cffc000="" class="flex-fill fee-explain">6楼</span>
                                <span data-v-4cffc000="" class="fee-price">75.00元</span>
                            </div>
                            <div data-v-4cffc000="" class="flex fee-item">
                                <span data-v-4cffc000="" class="flex-fill fee-explain">7楼</span>
                                <span data-v-4cffc000="" class="fee-price">95.00元</span>
                            </div>
                            <div data-v-4cffc000="" class="flex fee-item">
                                <span data-v-4cffc000="" class="flex-fill fee-explain">8楼</span>
                                <span data-v-4cffc000="" class="fee-price">115.00元</span>
                            </div>
                        </div>
                        <!--<div data-v-4cffc000="" class="fee-panel border-bottom">
                            <h4 data-v-4cffc000="">加人费 <span data-v-4cffc000="" class="fee-explain">(此费用不参与优惠)</span>
                            </h4>
                            <div data-v-4cffc000="" class="flex fee-item">
                                <span data-v-4cffc000="" class="flex-fill fee-explain">单件物品重量大于40kg需要选择加一名师傅</span>
                                <span data-v-4cffc000="" class="fee-price">100.00元/人</span>
                            </div>
                        </div>
                        <div data-v-4cffc000="" class="fee-panel flex border-bottom">
                            <h4 data-v-4cffc000="" class="flex-fill">中途装卸费</h4>
                            <span data-v-4cffc000="" class="fee-price">50.00元/点</span>
                        </div>
                        <div data-v-4cffc000="" class="fee-panel border-bottom">
                            <div data-v-4cffc000="" class="flex">
                                <h4 data-v-4cffc000="" class="flex-fill">超时费</h4>
                                <div data-v-4cffc000="" class="fee-price">
                                    50.00元/人/小时
                                </div>
                            </div>
                            <span data-v-4cffc000="" class="fee-explain">因客户原因导致超时30分钟以上</span>
                        </div>
                        <div data-v-4cffc000="" class="fee-panel border-bottom">
                            <div data-v-4cffc000="" class="flex">
                                <h4 data-v-4cffc000="" class="flex-fill">空驶费</h4>
                                <div data-v-4cffc000="" class="fee-price">
                                    50.00元/车
                                </div>
                            </div>
                            <span data-v-4cffc000="" class="fee-explain">上门后因客户自身原因取消订单时收取</span>
                        </div>
                        <div data-v-4cffc000="" class="fee-panel border-bottom">
                            <div data-v-4cffc000="" class="flex">
                                <h4 data-v-4cffc000="" class="flex-fill">第三方服务费 <span data-v-4cffc000=""
                                                                                      class="fee-explain">(此费用不参与优惠)</span>
                                </h4>
                                <div data-v-4cffc000="" class="fee-price">
                                    客户承担
                                </div>
                            </div>
                            <span data-v-4cffc000="" class="fee-explain">停车费、过路费、过桥费等产生的第三方收费</span>
                        </div>
                        <div data-v-4cffc000="" class="fee-panel">
                            <div data-v-4cffc000="" class="flex">
                                <h4 data-v-4cffc000="" class="flex-fill">用户下单须知</h4>
                                <div data-v-4cffc000="" class="fee-price">
                                    <i data-v-4cffc000="" class="syt-icon syt-icon-arrow">
                                    </i>
                                </div>
                            </div>
                        </div>-->
                    </div>
                </div>
                <div data-v-08ba3a73="" data-v-e1c76018="" class="ent" style="display: none;">
                    <div data-v-08ba3a73="" class="panel">
                        <h3 data-v-08ba3a73="" class="title">预约流程</h3>
                        <div data-v-08ba3a73="" class="flex panel-body subscribe thumbs">
                            <!---->
                            <div data-v-08ba3a73="" class="sub-item">
                                <img data-v-08ba3a73=""
                                     src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAAAXNSR0IArs4c6QAAB8VJREFUeAHtnU9IHFccx8fRKGqTaNCDQgnkoDQV/FOhkJKW5NCm0ELak70UvAQvKR7Sizl5qIe2B4uX0kskl9yaHAq1PSSQ0NKiDUrTLXoIiCiCIas1q/i/3+9k3mR2d3adf292ducNjO/tzHu/P5/5+ds3s29mqrQYLUdHRyd2d3c7Dw4OOquqqjoPDw9ZnsP20yhPojzJkiajvon6plluoHyq6/o8yvnq6ur52traeezfi4t7VaU0BFD0ra2tPgC5hPpllBdRNoZhE2RlIOsRyvsoHzQ0NDxG/TAM2X5klAR0JpN5C05/DgCfwehWP4b76LMGnXeg83ZjY+NfPvoH6hIZaDh4ant7+xrKQVh8PpDVwTunAP1WfX39Dyj/Cy7ueAnSQQPsGaSHYZhyHWvT8SZF2mId2iaQVsYB/LlMzdJAA3AjAN+EA9dRf02mE0Flw8YXsJHAv0I9E1SeU38poAH4Uygbh/GvOymN6zZAXoJtwwD+Y9g2hgoaOfgshmTfw8grYRsasbwpDBWHkMMXw9IbGmiMJK7CqFtY45aH/bJi/h7ECOWeXwH2frr9g5860kMtUsU4+t7FWimQiYK+3KVv9JEbgiyBIhoGtCBd/ITy7SBGxL0vcvefSCMfoXzm11bfoJmPAfhXrB1+lZdTP0DmKf0HfvO2r9Sxs7PTBcC/JwUyAwK+dtJn+u4nQDxHNBXt7+8/hLJmPworoE+6pqbm3bq6uidefPEE2kwXjOR2L0oqrS1SyArWC17SiOvUAbgtWJmTEw2ZQUMGWH/B2uI2iFyBhsBac3SRiC8+N/DApNNk4mro5wo0BH4NwRU9hHMDN7cNmZBN7nanz8fmaPOMjycjailM4JPjziCLgsbR4rWLWcivpDO+wrj871nHtZGeYl+ORVOHeYFIQT7+ADSZrAq2LAjavNRZ7lfhCjouYccVk5mjaMfUgSTfiLTxL8qyup7s6GGEGzG2XkL6eANl3o8HjhGNI3NTQfZ+hMiM7Jx65kU0Gp9BNC+ijPXPT07OxGEbovkFovosyqzfIPMiGkdkWEH2f8jIjgxzJWRFNBqdQqNFNFIjjVxS3j6v43dHRrU1laHG3h8p41qpIKdSKW15eVnDMMluku86nNTa2tq0rq4ujfWIlyaT5bdCb5YFOAv8Bzsin9wyOTmpzc3NCZtCLTs6OrShoaFSwE7hbPFN4YyVozlNqxSQFxYWpEGmk5Q/Ozsr/I2yPG8yNXRaqQP/XpwLF6Uhhq6VlRVL58jIiNbaGs5UvLW1NW1sbMzS0dvba+mJqkKm0GXM8zMiGoB1rJxwGPliz8lhQaYTdll2HVE6SKZkS53GH4w0+mhblEYkRFeryfYlaIT4pYQ4Hrmbgq1IHZcjtyAhCpE6DLbMzSdA/WJC/I7cTbIlY533jKASyu0MkXtRBgrJlox13phTBvaWtYlkrCO0FWjJh5GMdYwxFWjJoMmYEX1Osp7EiydjjjpOJ56EZABkzIg27kSVrCvR4smYEa1ASw4DMlYRLRkyxRsRHYEepQIEmDo2FQm5BMiYqUOBlsuZqWNTRbRkyBQvInojAl2JVoGI3mBEP000hQicJ2NM69XnI9CVaBVkzIhWoCWHARnrfNCTZD2JF0/Guvk0rbz5vKWgw7kYYS1hygpiE74IM2Rcg8oeZtQ8grCSz+4XE16COBa3vkgbfFLZnvErOCr342Zgpdgj2BpTwkD9QdwdQ57T+vv7tebml7egp9NpbWZmRsPvcbE2XbA1QGMu72PMqGGCjO1spb6+Pm1gYCALKqd6TU9PZ22L2Yc1sqVNInUcIsTvlMJIjDFdqV1aWtLW19ettqxzm5vFrQ43sry0IVOsxoRvazYpQvw2hHzhRVAYbdvb3d3Dv7q6qo2OjvpS6VaHL+FFOplMjRZWOJmPkUwV6SdlFyeKd3d3S5FNoZTf09MjTX4RwZyIbkzZZZusGf/I0zdwFL4p0lnargq7tYKXRr9Efna+tQKQ1c1C4YRS3s1CVuqgfBwF3kU0EY6uREuZMFlaELJSB7ciqtUNnRYe7xUAdndDJxo+B2wV1d4ZGz3Ijgxzu+dFNBugsbrpPpeUi88A7O2me3Tg1bxhF7JVk2wCwya77K345BjRohWu6v2Mesmv6gl7Yl5OYdz8YSEbs0YduY1w6jqEba/Oe3MbqM+CAB/1Q1YFl6KgzWcEDRbsrXYIAoPFnqfERkVBswH+He4h73zHulryCZANGeXvyd5SNEeLphiF8AGDD1GqZ98JKCgB+Q9E8nsod22bHauuQLMnIPNZ0b+h7HCUlLCNgLsAyO+gfObG9WNThxBCgVjfx/rqLnmxM2ElGZgsXEEmHteg2ZgJHz8pcbiX5ueELmkw8PzAbk+gCRbPTf6bz09OYmTTZz/PjiY3z6BN2E+g9ALWBX5OwkJf6bPXB3QLNq6/DEUHe2l+QSbhZQocXXwM0K5zsp0T674iWgihYhjANFKx42z6Bh85hPMNmbwCRbQAzhLXRa6iUC+8sUOx1QNFtE2OcQaJ8/0ebJuyby/TOl/h1OPmjM+tf6FFtF0hfuRVLyWzA0FdCmjqwBeles2eDbY00EIHgKsXRwKGdNA24OpVqAJGVCWfcIjhknq5b1TAkVbU66qjgm3XA/AV+wL2/wFtenjFa/mVWAAAAABJRU5ErkJggg=="/>
                                <p data-v-08ba3a73="">致电预约</p>
                            </div>
                            <div data-v-08ba3a73="" class="arrow-right">
                                <img data-v-08ba3a73=""
                                     src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAaCAMAAACJtiw1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAVUExURWZmZkxpcWdnZ2ZmZmhoaGdnZ2ZmZuDBRcQAAAAHdFJOU/4AU+UrfLH0w7MsAAAAWElEQVQY033RQQ7AIAhE0RmV3v/INdpa/CZl+RIUBjnCuRTSRdhEhsgum3QYUluCTQZkmZDkAbfaqSRYsuCVD6bED7CFj/JbDsbRuRzXZ0CM8Aj5OAMPdQPMBAIT5ci8FQAAAABJRU5ErkJggg=="/>
                            </div>
                            <div data-v-08ba3a73="" class="sub-item">
                                <img data-v-08ba3a73=""
                                     src="data:image/png;base64,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"/>
                                <p data-v-08ba3a73="">顾问实勘</p>
                            </div>
                            <div data-v-08ba3a73="" class="arrow-right">
                                <img data-v-08ba3a73=""
                                     src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAaCAMAAACJtiw1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAVUExURWZmZkxpcWdnZ2ZmZmhoaGdnZ2ZmZuDBRcQAAAAHdFJOU/4AU+UrfLH0w7MsAAAAWElEQVQY033RQQ7AIAhE0RmV3v/INdpa/CZl+RIUBjnCuRTSRdhEhsgum3QYUluCTQZkmZDkAbfaqSRYsuCVD6bED7CFj/JbDsbRuRzXZ0CM8Aj5OAMPdQPMBAIT5ci8FQAAAABJRU5ErkJggg=="/>
                            </div>
                            <div data-v-08ba3a73="" class="sub-item">
                                <img data-v-08ba3a73=""
                                     src="data:image/png;base64,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"/>
                                <p data-v-08ba3a73="">签订合同</p>
                            </div>
                            <div data-v-08ba3a73="" class="arrow-right">
                                <img data-v-08ba3a73=""
                                     src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAaCAMAAACJtiw1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAVUExURWZmZkxpcWdnZ2ZmZmhoaGdnZ2ZmZuDBRcQAAAAHdFJOU/4AU+UrfLH0w7MsAAAAWElEQVQY033RQQ7AIAhE0RmV3v/INdpa/CZl+RIUBjnCuRTSRdhEhsgum3QYUluCTQZkmZDkAbfaqSRYsuCVD6bED7CFj/JbDsbRuRzXZ0CM8Aj5OAMPdQPMBAIT5ci8FQAAAABJRU5ErkJggg=="/>
                            </div>
                            <div data-v-08ba3a73="" class="sub-item">
                                <img data-v-08ba3a73=""
                                     src="data:image/png;base64,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"/>
                                <p data-v-08ba3a73="">打包还原</p>
                            </div>
                        </div>
                    </div>
                    <div data-v-08ba3a73="" class="panel">
                        <h3 data-v-08ba3a73="" class="title">服务流程</h3>
                        <div data-v-08ba3a73="" class="panel-body">
                            <div data-v-08ba3a73="" class="step flex border-bottom">
                                <div data-v-08ba3a73="" class="flex-fill">
                                    <h4 data-v-08ba3a73="" class="step-title">Step1 致电预约企业搬家</h4>
                                    <p data-v-08ba3a73="" class="step-desc">在企业搬家点击“预约企业搬家”，<br/>致电专属顾问,了解您的订制化需求；</p>
                                </div>
                                <img data-v-08ba3a73=""
                                     src="data:image/png;base64,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"
                                     class="step-img"/>
                            </div>
                            <div data-v-08ba3a73="" class="step flex border-bottom">
                                <div data-v-08ba3a73="" class="flex-fill">
                                    <h4 data-v-08ba3a73="" class="step-title">Step2 专属顾问现场实勘</h4>
                                    <p data-v-08ba3a73="" class="step-desc">专属顾问现场实勘公司规模和搬运物资提供专属搬迁方案和报价；</p>
                                </div>
                                <img data-v-08ba3a73="" src="/assets/move/survey@2x.5ebc7637.png"
                                     class="step-img"/>
                            </div>
                            <div data-v-08ba3a73="" class="step flex border-bottom">
                                <div data-v-08ba3a73="" class="flex-fill">
                                    <h4 data-v-08ba3a73="" class="step-title">Step3 确定方案签署合同</h4>
                                    <p data-v-08ba3a73="" class="step-desc">双方沟通确认搬家方案和报价，<br/>并签订搬迁服务合同；</p>
                                </div>
                                <img data-v-08ba3a73="" src="/assets/move/signed@2x.a6c8697b.png"
                                     class="step-img"/>
                            </div>
                            <div data-v-08ba3a73="" class="step flex border-bottom">
                                <div data-v-08ba3a73="" class="flex-fill">
                                    <h4 data-v-08ba3a73="" class="step-title">Step4 专业工具全面打包</h4>
                                    <p data-v-08ba3a73="" class="step-desc">搬家师傅携带全套拆卸工具和打包耗材提供全面防护和打包服务；</p>
                                </div>
                                <img data-v-08ba3a73="" src="/assets/move/pack@2x.48655480.png"
                                     class="step-img"/>
                            </div>
                            <div data-v-08ba3a73="" class="step flex border-bottom">
                                <div data-v-08ba3a73="" class="flex-fill">
                                    <h4 data-v-08ba3a73="" class="step-title">Step5 新公司物品还原</h4>
                                    <p data-v-08ba3a73="" class="step-desc">搬家车队运输送达后，按照搬家方案做基本还原，全程无需客户动手；</p>
                                </div>
                                <img data-v-08ba3a73="" src="/assets/move/restore@2x.7e9bb2ea.png"
                                     class="step-img"/>
                            </div>
                        </div>
                    </div>
                    <div data-v-08ba3a73="" class="panel">
                        <h3 data-v-08ba3a73="" class="title">专业工具</h3>
                        <div data-v-08ba3a73="" class="flex panel-body tool thumbs">
                            <div data-v-08ba3a73="">
                                <img data-v-08ba3a73="" src="/assets/move/tools@2x.5d8fdfc3.png"/>
                                <p data-v-08ba3a73="">拆装工具</p>
                            </div>
                            <div data-v-08ba3a73="">
                                <img data-v-08ba3a73="" src="/assets/move/box@2x.01747eee.png"/>
                                <p data-v-08ba3a73="">打包箱</p>
                            </div>
                            <div data-v-08ba3a73="">
                                <img data-v-08ba3a73="" src="/assets/move/foam@2x.96ce1a4f.png"/>
                                <p data-v-08ba3a73="">防护泡沫</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer data-v-e1c76018="" class="page-footer">
                <div data-v-e1c76018="" class="complaint flex border-bottom">
                    <img data-v-e1c76018=""
                         src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAUCAYAAAEYUjbiAAAAAXNSR0IArs4c6QAAAwlJREFUOBGNVE1IVUEYnXnehWnRqshNuJfXolKSbNP2bUIrKiiLFkEYQopBUbyFEKGJChEqJrQpn0GY2KowqIU/zyAhaBctfEihpD197917Z6bzfXPnaj9GA3Nn5pvznXvmzHevEFEzmUyZzI4PLAQbq8mgkHdxIaYetpl4JWef9Zmg8EMkgmJeqOJGl6S99y8f7THF9aTvF1/roCQ8CvprK18VFiosCR34FPq1TT+9d4TTKTyT6TGhDyTQibnnD/idKvQR8IVRgfCIixpxUZCRNKHW0HxHMlJrEXPyzpZHNtO3P9SlBRWq3UaHQn6eGilfXisVjApFbWOLnB7tMcYoYTQ6Yjxi7i2vFuZ1GAqNLGpakSgCaHTEFSWFInH4xNUaOrAJAwZi/KIxt4KtaFqzQywYmdSOXrhdzZPokR1IV+TF+qGtsb/OZ550pbY98fRod7dWYRuEb9rycXJkX03q0tLMWO9bHKJB02kh3kCKNz8xuICTJtdxv2gSGxGALEGHPQlMklhxFqF4AyzwAQBYQkxknvVFEwZgCyAPLZMGk1aDzmUCWS3EDBZmgql1J1uvEKj+bAeflOYMJD3RNSXiV9AE7djFtPSkOADgIrPZsBDvHnduFrQLRuPUYPuZbc38DfvH8tP48K7vhZXL0N1qlK6GeYX/JpvL9NcpEVzHqZsg18NoDYAJbs5kuexERS6XuyuMOIXTV2k4VYfaJTmzY715bXQlnRcWxomOgONIpNGbfzHUmVtcvMU2cwJswVtdQ91UIsBgS4D7o32nDDmUS2tcdtCOTye+NweMyejyYzKbRMopRkpJEedjjqvUHVQhdoOKgSrJfnlMSAm0Rjzeo3JEjCuOCe0+vsiW/tqma2VMQG8hJUYvOWVcQEiggnLJbnTkrA77XGRSSnhMFWh/EPXnblQ5sh3lZXuNNu1g+gA5VmU00ifmFJPL/AugRKvIXrcjovHg6ZvfMNyPOoXgUTrxZih/HPV1XkrRiNBOBNdiMqHNsDZhCtBJzvjHQ8o03cCrqDc76E+C+qo8FQl83QAAAABJRU5ErkJggg=="/>
                    <span data-v-e1c76018=""><a href="tel:075523318769">鸿途搬家预约热线:075523318769</a></span>
                </div>
                <div data-v-13bb8eda="" data-v-e1c76018="" class="predict">
       <span data-v-13bb8eda="" class="text-wrap">
        <div data-v-13bb8eda="">
         <span data-v-13bb8eda="" class="start-key">起步价</span>
         <span data-v-13bb8eda="" class="start-value">150</span>
         <span data-v-13bb8eda="">元</span>
         <span data-v-13bb8eda="" class="original" style="display: none;">150元</span>
        </div>
        <div data-v-13bb8eda="" class="dk-wrap">
         <span data-v-13bb8eda="" style="display: none;">无可用优惠券</span>
         <span data-v-13bb8eda="" class="discount" style="display: none;">0</span>
         <span data-v-13bb8eda="" class="discount" style="display: none;">元</span>
         <span data-v-13bb8eda="" style="display: none;">不使用优惠券</span>
         <span data-v-13bb8eda="" data-name="login">登录后查看优惠</span>
         <span data-v-13bb8eda="" class="s-line"></span>
         <span data-v-13bb8eda="" data-name="priceDetail" id="fymx" class="mx-btn">费用明细</span>
        </div></span>
                    <span data-v-13bb8eda="" data-name="predictTime" class="btn">预约时间</span>
                </div>
            </footer>
            <footer data-v-e1c76018="" class="ent-footer" style="display: none;">
                <button data-v-e1c76018="" class="btn-sub syt-button syt-button--primary syt-button--normal"><span
                        class="syt-button__text">预约企业搬家</span></button>
            </footer>
            <img data-v-e1c76018=""
                 src="data:image/png;base64,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"
                 class="my-order"/>
        </div>
        <!---->
        <div data-v-2b9512df="" data-v-e1c76018="" id="yhjoff" class="syt-popup syt-popup--bottom" original="99"
             style="z-index: 2001; display: none;">
            <div data-v-2b9512df="" class="title syt-row syt-row--flex">
                <div data-v-2b9512df="" class="syt-col syt-col--8">
                    <div data-v-2b9512df="" class="close"></div>
                </div>
                <div data-v-2b9512df="" class="syt-col syt-col--8">
                    <h3 data-v-2b9512df="" id="hdbj">小搬</h3>
                </div>
            </div>
            <div data-v-2b9512df="" class="price-items">
                <div data-v-2b9512df="" class="price-item">
                    <div data-v-2b9512df="" class="flex">
                        <span data-v-2b9512df=""  class="flex-fill">起步价</span>
                        <span data-v-2b9512df="" id="hdqbj" class="flex-fixed">150.00元</span>
                    </div>
                    <small data-v-2b9512df="" id="hddesc" class="price-item-desc">含12公里及以内车程、1位师傅全程搬运</small>
                </div>
                <div data-v-2b9512df="" class="price-item discount">
                    <div data-v-2b9512df="" class="flex">
                        <span data-v-2b9512df="" class="flex-fill">优惠券可抵扣</span>
                        <span data-v-2b9512df="" class="flex-fixed">登录查看优惠券
                            <!----></span>
                    </div>
                </div>
            </div>
            <div data-v-2b9512df="" class="price-total">
                <span data-v-2b9512df="">费用合计<em data-v-2b9512df="" id="hdallcount">150.00</em>元</span>
                <small data-v-2b9512df="">（加师傅和第三方服务费不参与优惠）</small>
            </div>
        </div>
        <!---->
        <div class="syt-modal" style="z-index: 2000; display: none;"></div>
    </div>
</div>
<input id="openid" hidden value="">
<!-- jQuery -->
<script src="https://cdn.staticfile.org/jquery/2.1.4/jquery.min.js"></script>
<script src="https://res.wx.qq.com/open/js/jweixin-1.3.0.js"></script> 
<script>
    /* eslint-disable */
    $(function(){
        /*我得订单*/
        $('.my-order').on('click',function(s) {
            wx.miniProgram.navigateTo({
                url:'/make_freight/info/info',
                success: function(){
                    console.log('success')
                },
                fail: function(){
                    console.log('fail');
                },
                complete:function(){
                    console.log('complete');
                }

            });
        });

        $('#start-location').on('click',function(s) {
            wx.miniProgram.navigateTo({
                url:'/make_freight/address/address?address_type=0&type=0',
                success: function(){
                    console.log('success')
                },
                fail: function(){
                    console.log('fail');
                },
                complete:function(){
                    console.log('complete');
                }

            });
        });

        $('#end-location').on('click',function(s) {
            wx.miniProgram.navigateTo({
                url:'/make_freight/address/address?address_type=0&type=1',
                success: function(){
                    console.log('success')
                },
                fail: function(){
                    console.log('fail');
                },
                complete:function(){
                    console.log('complete');
                }

            });
        });

        /*价格明细*/
        $('#goods').on('click',function(s) {
            window.location.href='/index/index/goods';
        });

        /*点击切换轮播*/
        $('#xb').on('click',function(s) {
            this.className='active'
            $("#zb").removeClass()
            $("#db").removeClass()
            $(".car-img").attr("src","https://www.58hongtu.com/assets/move/0e884b02.png");
            /*基础*/
            $(".fees-title").html("小搬费用标准");
            /*跟车师傅个数*/
            $("#drivecount").html("含1位师傅");

            $("#carname").html("小面车型");

            $("#cardesc").html("约10个45寸行李箱物品");

            $("#carweight").html("1.2*1.1*1.1m");

            $("#fee-desc").html("12公里及以内车程+1位师傅全程搬运");

            $("#fee-price").html("150元");
            /*起步价*/
            $(".start-value").html("150");

            /*隐藏部分*/
            $("#hdbj").html("小搬")
            $("#hdqbj").html("150元")
            $("#hddesc").html("12公里及以内车程+1位师傅全程搬运")
            $("#hdallcount").html("150")
            setinfo({"bj":"小搬","coin":150})

        });

        /*点击切换轮播*/
        $('#zb').on('click',function(s) {
            this.className='active'
            $("#xb").removeClass()
            $("#db").removeClass()
            $(".car-img").attr("src","https://www.58hongtu.com/assets/move/30739cf1.png");

            /*基础*/
            $(".fees-title").html("中搬费用标准");
            /*跟车师傅个数*/
            $("#drivecount").html("含2位师傅");

            $("#carname").html("金杯车型");

            $("#cardesc").html("约30个45寸行李箱物品");

            $("#carweight").html("2.0*1.5*1.5m");

            $("#fee-desc").html("12公里及以内车程+2位师傅全程搬运");

            $("#fee-price").html("280元");
            /*起步价*/
            $(".start-value").html("280");
            /*隐藏部分*/
            $("#hdbj").html("中搬")
            $("#hdqbj").html("280元")
            $("#hddesc").html("12公里及以内车程+2位师傅全程搬运")
            $("#hdallcount").html("280")
            setinfo({"bj":"中搬","coin":280})

        });

        /*点击切换轮播*/
        $('#db').on('click',function(s) {
            this.className='active'
            $("#xb").removeClass()
            $("#zb").removeClass()
            $(".car-img").attr("src","https://www.58hongtu.com/assets/move/d213801c.png");

            /*基础*/
            $(".fees-title").html("小家庭搬家费用标准");
            /*跟车师傅个数*/
            $("#drivecount").html("含2位师傅");

            $("#carname").html("适合小家庭搬家");

            $("#cardesc").html("可装载大件物品");

            $("#carweight").html("3.4*1.75*1.75m");

            $("#fee-desc").html("12公里及以内车程+2位师傅全程搬运");

            $("#fee-price").html("458.00元");

            /*起步价*/
            $(".start-value").html("458");

            /*隐藏部分*/
            $("#hdbj").html("大搬")
            $("#hdqbj").html("458")
            $("#hddesc").html("12公里及以内车程+2位师傅全程搬运")
            $("#hdallcount").html("458")
            setinfo({"bj":"大搬","coin":458})


        });
        /*写入车型信息*/
        function setinfo(data) {
            $.ajax({
                url:"/api/index/addcarinfo?openid="+openid,
                type:"get",
                data:data,
                dataType:"json",
                error:function(){
                    console.log("error")
                },
                success:function(res){
                    console.log(res);
                    if(res.code){
                        //var obj = jQuery.parseJSON(res.data)
                        //console.log(obj.e)
                        //$("#start-location").val(obj.s);//填充内容
                        //$("#end-location").val(obj.e);//填充内容
                    }else{
                        //console.log(res.data)
                    }
                },
            })
        }

        function getUrlParam(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg);  //匹配目标参数
            if (r != null) return unescape(r[2]); return null; //返回参数值
        }

        var openid = getUrlParam('openid');

        $("#openid").val(openid)

        //$("#end-location").attr("value",$("#openid").val());//填充内容
        /*查看明细*/
        $("#fymx").on('click',function() {
            $("#yhjoff").show()
        })

        $(".close").on('click',function () {
            $("#yhjoff").hide()
        })
        /*提交*/
        $('.btn').on('click',function(s) {
            //验证数据
            if($("#start-location").val() =="" || $("#end-location").val() == ""){
                wx.miniProgram.navigateTo({
                    url:'/make_freight/error/error',
                    success: function(){
                        console.log('success')
                    },
                    fail: function(){
                        console.log('fail');
                    },
                    complete:function(){
                        console.log('complete');
                    }

                });
            }else{
                wx.miniProgram.navigateTo({
                    url:'/make_freight/auth/auth',
                    success: function(){
                        console.log('success')
                    },
                    fail: function(){

                        console.log('fail');
                    },
                    complete:function(){
                        console.log('complete');
                    }

                });
            }

            //window.location.href = 'tel://18588446402';
        })

        $.ajax({
            url:"/api/index/getlocation?openid="+openid,
            type:"get",
            data:{
            },
            dataType:"json",
            error:function(){
                console.log("error")
            },
            success:function(res){
                console.log(res);
                if(res.code){
                    var obj = jQuery.parseJSON(res.data)
                    //console.log(obj.e)
                    $("#start-location").val(obj.s);//填充内容
                    $("#end-location").val(obj.e);//填充内容
                    setinfo({"bj":"小搬","coin":150})
                }else{
                    //console.log(res.data)
                }
            },
        })

    });
</script>
</body>
</html>