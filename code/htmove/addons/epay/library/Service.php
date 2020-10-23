<?php

namespace addons\epay\library;

use Exception;
use think\Log;
use think\Response;
use think\Session;
use Yansongda\Pay\Pay;

/**
 * 订单服务类
 *
 * @package addons\epay\library
 */
class Service
{

    public static function submitOrder($amount, $orderid = null, $type = null, $title = null, $notifyurl = null, $returnurl = null, $method = null)
    {
        if (!is_array($amount)) {
            $params = [
                'amount'    => $amount,
                'orderid'   => $orderid,
                'type'      => $type,
                'title'     => $title,
                'notifyurl' => $notifyurl,
                'returnurl' => $returnurl,
                'method'    => $method,
            ];
        } else {
            $params = $amount;
        }
        $type = isset($params['type']) && in_array($params['type'], ['alipay', 'wechat']) ? $params['type'] : 'wechat';
        $method = isset($params['method']) ? $params['method'] : 'web';
        $orderid = isset($params['orderid']) ? $params['orderid'] : date("YmdHis") . mt_rand(100000, 999999);
        $amount = isset($params['amount']) ? $params['amount'] : 1;
        $title = isset($params['title']) ? $params['title'] : "支付";
        $auth_code = isset($params['auth_code']) ? $params['auth_code'] : '';
        $openid = isset($params['openid']) ? $params['openid'] : '';

        $request = request();
        $notifyurl = isset($params['notifyurl']) ? $params['notifyurl'] : $request->root(true) . '/addons/epay/index/' . $type . 'notify';
        $returnurl = isset($params['returnurl']) ? $params['returnurl'] : $request->root(true) . '/addons/epay/index/' . $type . 'return/out_trade_no/' . $orderid;
        $html = '';
        $config = Service::getConfig($type);
        $config[$type]['notify_url'] = $notifyurl;
        $config[$type]['return_url'] = $returnurl;

        if ($type == 'alipay') {
            //创建支付对象
            $pay = new Pay($config);
            //支付宝支付,请根据你的需求,仅选择你所需要的即可
            $params = [
                'out_trade_no' => $orderid,//你的订单号
                'total_amount' => $amount,//单位元
                'subject'      => $title,
            ];
            //如果是移动端自动切换为wap
            $method = $request->isMobile() ? 'wap' : $method;

            switch ($method) {
                case 'web':
                    //电脑支付,跳转
                    $html = $pay->driver($type)->gateway('web')->pay($params);
                    Response::create($html)->send();
                    break;
                case 'wap':
                    //手机网页支付,跳转
                    $html = $pay->driver($type)->gateway('wap')->pay($params);
                    Response::create($html)->send();
                    break;
                case 'app':
                    //APP支付,直接返回字符串
                    $html = $pay->driver($type)->gateway('app')->pay($params);
                    break;
                case 'scan':
                    //扫码支付,直接返回字符串
                    $html = $pay->driver($type)->gateway('scan')->pay($params);
                    break;
                case 'pos':
                    //刷卡支付,直接返回字符串
                    //刷卡支付必须要有auth_code
                    $params['auth_code'] = $auth_code;
                    $html = $pay->driver($type)->gateway('pos')->pay($params);
                    break;
                default:
                    //其它支付类型请参考：https://docs.pay.yansongda.cn/alipay
            }
        } else {
            //如果是PC支付,判断当前环境,进行跳转
            if ($method == 'web') {
                if ((strpos($request->server('HTTP_USER_AGENT'), 'MicroMessenger') !== false)) {
                    Session::delete("openid");
                    Session::set("wechatorderdata", $params);
                    $url = addon_url('epay/api/wechat', [], true, true);
                    header("location:{$url}");
                    exit;
                } elseif ($request->isMobile()) {
                    $method = 'wap';
                }
            }

            //创建支付对象
            $pay = new Pay($config);
            $params = [
                'out_trade_no' => $orderid,//你的订单号
                'body'         => $title,
                'total_fee'    => $amount * 100, //单位分
            ];
            switch ($method) {
                case 'web':
                    //电脑支付,跳转到自定义展示页面(FastAdmin独有)
                    $html = $pay->driver($type)->gateway('web')->pay($params);
                    Response::create($html)->send();
                    break;
                case 'mp':
                    //公众号支付
                    //公众号支付必须有openid
                    $params['openid'] = $openid;
                    $html = $pay->driver($type)->gateway('mp')->pay($params);
                    break;
                case 'wap':
                    //手机网页支付,跳转
                    $params['spbill_create_ip'] = $request->ip(0, false);
                    $html = $pay->driver($type)->gateway('wap')->pay($params);
                    header("location:{$html}");
                    exit;
                    break;
                case 'app':
                    //APP支付,直接返回字符串
                    $html = $pay->driver($type)->gateway('app')->pay($params);
                    break;
                case 'scan':
                    //扫码支付,直接返回字符串
                    $html = $pay->driver($type)->gateway('scan')->pay($params);
                    break;
                case 'pos':
                    //刷卡支付,直接返回字符串
                    //刷卡支付必须要有auth_code
                    $params['auth_code'] = $auth_code;
                    $html = $pay->driver($type)->gateway('pos')->pay($params);
                    break;
                case 'miniapp':
                    //小程序支付,直接返回字符串
                    //小程序支付必须要有openid
                    $params['openid'] = $openid;
                    $html = $pay->driver($type)->gateway('miniapp')->pay($params);
                    break;
                default:
            }
        }
        //返回字符串
        $html = is_array($html) ? json_encode($html) : $html;
        return $html;
    }

    /**
     * 创建支付对象
     * @param string $type   支付类型
     * @param array  $config 配置信息
     * @return bool
     */
    public static function createPay($type, $config = [])
    {
        $type = strtolower($type);
        if (!in_array($type, ['wechat', 'alipay'])) {
            return false;
        }
        $config = self::getConfig($type);
        $config = array_merge($config[$type], $config);
        $pay = new Pay($config);
        return $pay;
    }

    /**
     * 验证回调是否成功
     * @param string $type   支付类型
     * @param array  $config 配置信息
     * @return bool|Pay
     */
    public static function checkNotify($type, $config = [])
    {
        $type = strtolower($type);
        if (!in_array($type, ['wechat', 'alipay'])) {
            return false;
        }
        try {
            $pay = new Pay(self::getConfig($type));
            $data = $type == 'wechat' ? file_get_contents("php://input") : request()->post('', null, 'trim');

            $data = $pay->driver($type)->gateway()->verify($data);

            if ($type == 'alipay') {
                if (in_array($data['trade_status'], ['TRADE_SUCCESS', 'TRADE_FINISHED'])) {
                    return $pay;
                }
            } else {
                return $pay;
            }
        } catch (Exception $e) {
            return false;
        }

        return false;
    }

    /**
     * 验证返回是否成功
     * @param string $type   支付类型
     * @param array  $config 配置信息
     * @return bool|Pay
     */
    public static function checkReturn($type, $config = [])
    {
        $type = strtolower($type);
        if (!in_array($type, ['wechat', 'alipay'])) {
            return false;
        }
        //微信无需验证
        if ($type == 'wechat') {
            return true;
        }
        try {
            $pay = new Pay(self::getConfig($type));
            $data = $type == 'wechat' ? file_get_contents("php://input") : request()->get('', null, 'trim');
            $data = $pay->driver($type)->gateway()->verify($data);
            if ($data) {
                return $pay;
            }
        } catch (Exception $e) {
            return false;
        }

        return false;
    }

    /**
     * 获取配置
     * @param string $type 支付类型
     * @return array|mixed
     */
    public static function getConfig($type = 'wechat')
    {
        $config = get_addon_config('epay');
        $config = isset($config[$type]) ? $config[$type] : $config['wechat'];
        if ($config['log']) {
            $config['log'] = [
                'file'  => LOG_PATH . '/epaylogs/' . $type . '-' . date("Y-m-d") . '.log',
                'level' => 'debug'
            ];
        }
        if (isset($config['cert_client']) && substr($config['cert_client'], 0, 6) == '/epay/') {
            $config['cert_client'] = ADDON_PATH . $config['cert_client'];
        }
        if (isset($config['cert_key']) && substr($config['cert_key'], 0, 6) == '/epay/') {
            $config['cert_key'] = ADDON_PATH . $config['cert_key'];
        }

        $config['notify_url'] = empty($config['notify_url']) ? addon_url('epay/api/notifyx', [], false) . '/type/' . $type : $config['notify_url'];
        $config['notify_url'] = !preg_match("/^(http:\/\/|https:\/\/)/i", $config['notify_url']) ? request()->root(true) . $config['notify_url'] : $config['notify_url'];
        $config['return_url'] = empty($config['return_url']) ? addon_url('epay/api/returnx', [], false) . '/type/' . $type : $config['return_url'];
        $config['return_url'] = !preg_match("/^(http:\/\/|https:\/\/)/i", $config['return_url']) ? request()->root(true) . $config['return_url'] : $config['return_url'];
        return [$type => $config];
    }

}