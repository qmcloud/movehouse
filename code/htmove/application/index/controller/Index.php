<?php

namespace app\index\controller;

use app\common\controller\Frontend;
use think\Db;

class Index extends Frontend
{

    protected $noNeedLogin = '*';
    protected $noNeedRight = '*';
    protected $layout = '';

    /* 配置开始 */
    /**
     * 参考资料详见 https://mp.weixin.qq.com/wiki/17/c0f37d5704f0b64713d5d2c37b468d75.html
     */

    private $appId = 'wx3dd58f4332fd09ed';
    private $secret = '10bb222e5349baff6e0c29511da6a9f6';
    protected $accessTokenUrl = 'https://api.weixin.qq.com/cgi-bin/token';
    protected $wechatAuthCodeUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?';
    protected $userOpenIdUrl = 'https://api.weixin.qq.com/sns/oauth2/access_token?';
    protected $code;
    protected $openId;
    protected $redisArr=[];


    public function index()
    {
        /*$string="8月5日 21:30";
        $Y=date("Y",time());
        if(preg_match_all('/\d+/',$string,$arr)){
            if(!empty($arr)){
                $M=$arr[0][0];
                $D=$arr[0][1];
                $H=$arr[0][2];
                $S=$arr[0][3];
                $ntime=$Y."-".$M."-".$D." ".$H.":".$S;
                echo $ntime."<br/>";
                echo strtotime($ntime);
            }
        }

        die;*/
        return $this->view->fetch();
    }
    public function home(){

        /*$json=$this->getUserOpenId();
        //获取opeid
        $openid=$json['openid'];
        $this->view->assign('openid', $openid);*/
        return $this->view->fetch();

    }
    public function game(){

        /*$json=$this->getUserOpenId();
        //获取opeid
        $openid=$json['openid'];
        $this->view->assign('openid', $openid);*/
        return $this->view->fetch();

    }
    public function goods(){
        return $this->view->fetch();
    }

    public function orders(){
        $sn=$_GET['sn'];
        $openid=$_GET['openid'];
        if(!empty($sn) && !empty($openid)){
            $info=Db::name("order")->where(["openid"=>$openid,"sn"=>$sn])->find();
            if(!empty($info['movetime'])){
                $info['movetime']=date("Y-m-d H:i:s",$info['movetime']);
            }
        }else{
            $info=[];
        }
        $this->view->assign('info', $info);
        return $this->view->fetch();
    }

    public function orderok(){
        $sn=$_GET['sn'];
        $openid=$_GET['openid'];
        if(!empty($sn) && !empty($openid)){
            $info=Db::name("order")->where(["openid"=>$openid,"sn"=>$sn])->update(['status'=>2]);
        }else{
            $info="";
        }
        if(!empty($info)){
            $info="极速接单成功！";
        }
        $this->view->assign('info', $info);
        return $this->view->fetch();
    }

    /**
     * 网页授权获取用户openId -- 2.获取openid
     * @return mixed
     */
    public function getUserOpenId(){
        if (!isset($_GET['code']))
        {
            $codeUrl = $this->getWechatAuthCode();
            Header("Location: $codeUrl");
            die;
        }else{
            $code = $_GET['code'];
            $this->code = $code;

            // 请求openid
            $url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' . $this->appId . '&secret=' . $this->secret . '&code=' . $this->code . '&grant_type=authorization_code';

            $json = file_get_contents($url);

            $json = json_decode($json, true);

            //取出openid
            return $json;
        }
    }

    /**
     * 网页授权获取用户openId -- 1.获取授权code url
     */
    public function getWechatAuthCode(){
        // 获取来源地址
        $url = $this->get_url();

        // 获取code
        $urlObj["appid"] = $this->appId;
        $urlObj["redirect_uri"] = "$url";
        $urlObj["response_type"] = "code";
        $urlObj["scope"] = "snsapi_base";
        $urlObj["state"] = "STATE"."#wechat_redirect";
        $bizString = $this->formatBizQueryParaMap($urlObj, false);
        $codeUrl =  $this->wechatAuthCodeUrl.$bizString;

        return $codeUrl;
    }

    /**
     * 获取来源地址
     * @return string
     */
    public function get_url() {
        //获取来源地址
        $url = "https://".$_SERVER["HTTP_HOST"].$_SERVER["REQUEST_URI"];
        return $url;
    }


    /**
     * 作用：格式化参数，签名过程需要使用
     * @param $paraMap
     * @param $urlencode
     * @return bool|string
     */
    protected function formatBizQueryParaMap($paraMap, $urlencode)
    {
        $buff = "";
        ksort($paraMap);
        foreach ($paraMap as $k => $v)
        {
            if($urlencode)
            {
                $v = urlencode($v);
            }
            $buff .= $k . "=" . $v . "&";
        }
        $reqPar = '';
        if (strlen($buff) > 0)
        {
            $reqPar = substr($buff, 0, strlen($buff)-1);
        }
        return $reqPar;
    }


}
