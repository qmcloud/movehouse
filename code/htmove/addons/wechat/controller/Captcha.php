<?php

namespace addons\wechat\controller;

use addons\wechat\library\Wechat;
use addons\wechat\model\WechatCaptcha;
use fast\Http;

/**
 * 微信验证码验证接口
 */
class Captcha extends \think\addons\Controller
{

    public function _initialize()
    {
        parent::_initialize();
    }

    /**
     * 验证码检测接口
     */
    public function check()
    {
        $captcha = $this->request->post("captcha");
        $event = $this->request->post("event");
        $result = WechatCaptcha::check($captcha, $event);
        if ($result) {
            $this->success("验证码正确");
        } else {
            $this->error("验证码错误");
        }
    }

    /**
     * 验证码发送接口
     */
    public function send()
    {
        $ip = $this->request->ip();
        $event = $this->request->post("event");
        if (!$event) {
            $this->error("参数错误");
        }
        $captch = WechatCaptcha::where('ip', $ip)
            ->where('event', $event)
            ->whereTime('createtime', '-2 minutes')
            ->find();
        if ($captch) {
            $this->error("获取频繁，请稍后重试");
        }
        $token = Wechat::getAccessToken();
        if (!$token) {
            $this->error("发送失败，请稍后重试");
        }
        $url = "https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token={$token}";
        $params = [
            'expire_seconds' => 120,
            'action_name'    => 'QR_STR_SCENE',
            'action_info'    => [
                'scene' => [
                    'scene_str' => "captcha_" . $event . "_" . $ip,
                ]
            ],

        ];
        $result = Http::sendRequest($url, json_encode($params));
        if ($result['ret']) {
            $msg = (array)json_decode($result['msg'], true);
            if (isset($msg['ticket']) && isset($msg['url'])) {
                $this->success("", null, ['image' => "https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=" . urlencode($msg['ticket']), 'url' => $msg['url']]);
            }
        }
        $this->error("获取失败！请稍后重试");
    }

}