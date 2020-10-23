$(function () {
    $('.carousel').carousel({
        interval: 5000 //changes the speed
    });
    $(".btn-experience").on("click", function () {
        location.href = "/addons/epay/index/experience?amount=" + $("input[name=amount]").val() + "&type=" + $(this).data("type") + "&method=" + $("#method").val();
    });

    var si, xhr;
    if (typeof queryParams != 'undefined') {
        var queryResult = function () {
            xhr && xhr.abort();
            xhr = $.ajax({
                url: "",
                type: "post",
                data: queryParams,
                dataType: 'json',
                success: function (ret) {
                    if (ret.code == 1) {
                        var data = ret.data;
                        console.log(data);
                        if (typeof data.trade_state != 'undefined') {
                            if (data.trade_state == 'SUCCESS') {
                                $(".wechat-qrcode .paid").removeClass("hidden");
                                $(".wechat-tips p").html("支付成功！<br>3秒后将自动跳转...");
                                setTimeout(function () {
                                    location.href = queryParams.return_url;
                                }, 3000);
                                clearInterval(si);
                            } else if (data.trade_state == 'REFUND') {
                                $(".wechat-tips p").html("请求失败！<br>请返回重新发起支付");
                                clearInterval(si);
                            } else if (data.trade_state == 'NOTPAY') {
                            } else if (data.trade_state == 'CLOSED') {
                                $(".wechat-tips p").html("订单已关闭！<br>请返回重新发起支付");
                                clearInterval(si);
                            } else if (data.trade_state == 'USERPAYING') {
                            } else if (data.trade_state == 'PAYERROR') {
                                clearInterval(si);
                            }
                        }
                    }
                }
            });
        };
        si = setInterval(function () {
            queryResult();
        }, 3000);
        queryResult();
    }

});