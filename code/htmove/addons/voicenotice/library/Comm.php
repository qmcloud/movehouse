<?php
/**
 * Created by PhpStorm.
 * User: DOUBLE Y
 * Date: 2019/3/12
 * Time: 16:49
 */

namespace addons\voicenotice\library;

use Think\Cache;

class Comm
{
    protected $conf = null;

    public function __construct()
    {
        $this->conf = $this->getConf();
    }

    protected function getConf() //获取配置信息
    {
        return get_addon_config("voicenotice");
    }


    public function getToken()  //获取apiToken
    {
        $re = Cache::get("voice_token");
        if ($re) {
            return $re;
        }
        $json = $this->curl();
        $response = json_decode($json, true);
        if (!isset($response['access_token'])) {
            return false;
        }
        Cache::set("voice_token", $response['access_token'], 3600 * 24 * 25);
        return $response['access_token'];
    }

    /** 公共模块获取token开始 */
    private function curl()
    {
        $auth_url = "https://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials&client_id=" . $this->conf['appKey'] . "&client_secret=" . $this->conf['secretKey'];
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $auth_url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); //信任任何证书
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0); // 检查证书中是否设置域名,0不验证
        $res = curl_exec($ch);
        if (curl_errno($ch)) {
            return false;
        }
        curl_close($ch);
        return $res;
    }
}
