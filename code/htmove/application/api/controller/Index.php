<?php

namespace app\api\controller;

use app\admin\controller\Category;
use app\common\controller\Api;
use app\common\model\User;
use app\common\model\Coupon;
use Matrix\Exception;
use think\Cache;
use think\Db;

/**
 * 首页接口
 */
class Index extends Api
{
    protected $noNeedLogin = ['*'];
    protected $noNeedRight = ['*'];
    private $appid="wx3dd58f4332fd09ed";
    private $secret="10bb222e5349baff6e0c29511da6a9f6";
    private $sessionKey="";
    public static $OK = 0;
    public static $IllegalAesKey = -41001;
    public static $IllegalIv = -41002;
    public static $IllegalBuffer = -41003;
    public static $DecodeBase64Error = -41004;
    /**
     * 首页
     *
     */

    public function _initialize()
    {
        $this->redisArr["host"]=\think\Config::get('redis.host');
        $this->redisArr["port"]=\think\Config::get('redis.port');
        $this->redisArr["password"]=\think\Config::get('redis.password');
    }

    public function index()
    {
        $this->success('请求成功');
    }

    /*获取汽车车型等*/
    public function cartype(){
        // 查询数据集
        $type = $this->request->request('type');
        if(empty($type)){
            $this->error();
        }
        $info = \app\common\model\Category::getCategoryCarArray($type);
        $this->success('请求成功',$info);
    }

    /*添加起始地址*/
    public function addcarinfo(){
        $openid = $this->request->request('openid');
        $bj = $this->request->request('bj');
        $coin = $this->request->request('coin');
        $res=[];
        if(!empty($bj) && !empty($openid) && !empty($coin)){
            $key=$openid."_car";
            $res=Cache::set($key,$bj,54000);
        }
        $this->success('请求成功',$res);
    }

    /*添加起始地址*/
    public function setslocation(){
        $openid = $this->request->request('openid');
        $slocation = $this->request->request('slocation');
        $des = $this->request->request('des');
        $lt = $this->request->request('lt');
        $res=[];
        if(!empty($openid) && !empty($slocation)){
            $key=$openid."_s";
            $res=Cache::set($key,$slocation,54000);
            Cache::set($openid."_sdes",$des,54000);
            Cache::set($openid."_slt",$lt,54000);
        }
        $this->success('请求成功',$res);
    }

    /*添加起始地址*/
    public function setelocation(){
        $openid = $this->request->request('openid');
        $slocation = $this->request->request('slocation');
        $des = $this->request->request('des');
        $lt = $this->request->request('lt');
        if(!empty($openid) && !empty($slocation)){
            $key=$openid."_e";
            Cache::set($key,$slocation,54000);
            Cache::set($openid."_edes",$des,54000);
            Cache::set($openid."_elt",$lt,54000);
        }
    }

    /*添加起始地址*/
    public function getlocation(){
        $openid = $this->request->request('openid');
        $res=[];
        $s_str="";
        $e_str="";
        $sdes="";
        $slt="";
        $edes="";
        $elt="";
        if(!empty($openid)){
            $s=Cache::get($openid."_s");
            $e=Cache::get($openid."_e");
            $sdes=Cache::get($openid."_sdes");
            $edes=Cache::get($openid."_edes");
            $slt=Cache::get($openid."_slt");
            $elt=Cache::get($openid."_elt");
            if(!empty($s)){
                $s_arr=json_decode($s,true);
                if(!empty($s_arr)){
                    $s_str=$s_arr['title']; //$s_arr['address']."".
                }else{
                    $s_str="";
                }
            }
            if(!empty($e)){
                $e_arr=json_decode($e,true);
                if(!empty($e_arr)){
                    $e_str=$e_arr['title']; //$e_arr['address']."".
                }else{
                    $e_str="";
                }
            }
            $res["s"]=$s_str;
            $res["e"]=$e_str;
            $res["sdes"]=$sdes;
            $res["slt"]=$slt;
            $res["edes"]=$edes;
            $res["elt"]=$elt;
        }

        $this->success('请求成功',json_encode($res,JSON_UNESCAPED_UNICODE));

    }

    /*添加起始地址*/
    public function getelocation(){
        $openid = $this->request->request('openid');
        if(!empty($openid) && !empty($slocation)){
            $key=$openid."_e";
            echo Cache::get($key,$slocation);
        }
    }

    /*获取openid*/
    public function openid(){
        //声明CODE，获取小程序传过来的CODE
        $code = $_GET["code"];
        //配置appid
        $appid = $this->appid;
        //配置appscret
        $secret = $this->secret;
        //api接口
        $api = "https://api.weixin.qq.com/sns/jscode2session?appid={$appid}&secret={$secret}&js_code={$code}&grant_type=authorization_code";

        $str = file_get_contents($api);
        $insertdata=json_decode($str,JSON_UNESCAPED_UNICODE);
        /*记录openid*/

        if(!empty($insertdata["openid"])){
            try {
                User::insert(["openid"=>$insertdata["openid"],"createtime"=>time(),"jointime"=>time(),"updatetime"=>time(),"group_id"=>2]);
                //赠送新手卷
                $bird=Coupon::where(["openid"=>$insertdata["openid"]])->find();
                if(empty($bird)){
                    //送
                    Coupon::where(1)->insert(["title"=>"新人劵","all"=>150,"price"=>50,"limit"=>30,"openid"=>$insertdata["openid"],"startime"=>time(),"endtime"=>time()+86400*30,"status"=>2]);
                }
            }catch (\Exception $e){
                echo $str;
                die;
            }
        }
            echo $str;

    }

    /*获取手机号*/
    public function getphone(){
        $openid = $this->request->request('openid');
        $se_key = $this->request->request('se_key');
        $encryptedData = $this->request->request('encryptedData');
        $iv = $this->request->request('iv');
        $this->sessionKey=$se_key;
        $errCode = $this->decryptData($encryptedData, $iv, $data );

        if ($errCode == 0) {
            echo $data;
            /*更新手机号*/
            try {
                $phone=json_decode($data,JSON_UNESCAPED_UNICODE);
                if(!empty($phone['phoneNumber'])){
                    User::where(["openid"=>$openid])->update(["updatetime"=>time(),"mobile"=>$phone['phoneNumber']]);
                }
            }catch (\Exception $e){

            }
        } else {
            echo -1;
        }

    }

    /**
     * 下单
     *
     * @return int 成功0，失败返回对应的错误码
     */
    public function addorder(){
        $openid = $this->request->request('openid');
        $tel = $this->request->request('tel');
        $code = array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',"K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z");
        $sn = $code[intval(date('Y')) - 2020] . strtoupper(dechex(date('m'))) . date('d') . substr(time(), -5) . substr(microtime(), 2, 5) . sprintf('%02d', rand(0, 99));
        /*查询价钱*/
        if(empty($openid)){
            echo -1;
            die;
        }
        /*计算距离*/
        $pre_price=0;
        $key=$openid."_car";
        $cartype=Cache::get($key);

        switch ($cartype){
            case "小搬":
                $pre_price=150;
                $carprice="150";
                break;
            case "中搬":
                $pre_price=280;
                $carprice="280";
                break;
            case "大搬":
                $pre_price=458;
                $carprice="458";
                break;
        }
        $ewprice=[];
        $s=Cache::get($openid."_s");
        $e=Cache::get($openid."_e");

        if(!empty($s) && !empty($e)){
            $s=json_decode($s,JSON_UNESCAPED_UNICODE);
            $e=json_decode($e,JSON_UNESCAPED_UNICODE);
        }
        $url="https://apis.map.qq.com/ws/direction/v1/driving/?from=".$s['location']['lat'].",".$s['location']['lng']."&to={$e['location']['lat']},{$e['location']['lng']}&output=json&callback=cb&key=OESBZ-JEFCP-MWDD5-VWIQ6-E3NO2-HNFUW";
        /*创建初始订单*/
        $data=file_get_contents($url);
        $res=json_decode($data,JSON_UNESCAPED_UNICODE);
        $distance=$res["result"]['routes'][0]['distance'];
        $duration=$res["result"]['routes'][0]['duration'];
        if(!empty($distance) && $distance>1){
            $distance =round($distance/1000);
            if($distance>12){
                $pre_price=$pre_price+($distance-12)*8;
                $s1="总行驶公里数".$distance."公里,超出".($distance-12)."公里,额外收费 +".(($distance-12)*8)."元";
                array_push($ewprice,$s1);
            }
        }
        //取楼梯数
        $_s=Cache::get($openid."_s");
        $_sdes=Cache::get($openid."_sdes");
        $_slt=Cache::get($openid."_slt");
        if(!empty($_slt)){
            $sltprice=$this->getltprice($_slt);
            $pre_price=$pre_price+$sltprice;
            $s1="起始楼梯费".$_slt."层楼,额外收费 +".$sltprice."元";
            array_push($ewprice,$s1);
        }
        $_e=Cache::get($openid."_e");
        $_edes=Cache::get($openid."_edes");
        $_elt=Cache::get($openid."_elt");
        if(!empty($_elt)){
            $eltprice=$this->getltprice($_elt);
            $pre_price=$pre_price+$eltprice;
            $s1="终点楼梯费".$_elt."层楼,额外收费 +".$eltprice."元";
            array_push($ewprice,$s1);
        }
        $Sinfo=$s["address"]." ".$s["title"];
        $Einfo=$e["address"]." ".$e["title"];
        $info=["sn"=>$sn,"cartype"=>$cartype,"carprice"=>$carprice,"distance"=>$distance,"duration"=>$duration,"pre_price"=>$pre_price,"ewprice"=>$ewprice];
        //创建数据信息
        DB::name("order")->insert(["sn"=>$sn,"cartype"=>$cartype,"openid"=>$openid,"pro_price"=>$pre_price,"createtime"=>time(),"uptime"=>time(),"tel"=>$tel,"start"=>" ".$Sinfo." ".$_sdes,"end"=>" ".$Einfo." ".$_edes,"distance"=>$distance,"duration"=>$duration,"ewprice"=>json_encode($ewprice,JSON_UNESCAPED_UNICODE)]);
        $this->sendwx("有用户:".$tel."进入app，如果15分钟内未下单，请询问跟进",1);
        $this->success('请求成功',$info);

    }
    public function getltprice($lt){
        switch ($lt){
            case 0:
                return 0;
                break;
            case 1:
                return 0;
                break;
            case 2:
                return 15;
                break;
            case 3:
                return 30;
                break;
            case 4:
                return 45;
                break;
            case 5:
                return 60;
                break;
            case 6:
                return 75;
                break;
            case 7:
                return 95;
                break;
            case 8:
                return 115;
                break;
            default:return 135;

        }



    }
    /*
	 * 地图计算距离
	 *  $lat1:起点纬度
	 *  $lng1 : 起点经度
	 *  $lat2:终点纬度
	 *  $lng2 : 终点经度
	 * */
    function TX_Map_Api_distance($lat1,$lng1,$lat2,$lng2){

        // 将角度转为狐度
        $radLat1 = deg2rad($lat1);// deg2rad()函数将角度转换为弧度
        $radLat2 = deg2rad($lat2);
        $radLng1 = deg2rad($lng1);
        $radLng2 = deg2rad($lng2);

        $a = $radLat1 - $radLat2;
        $b = $radLng1 - $radLng2;

        $s = 2 * asin(sqrt(pow(sin($a / 2), 2)+cos($radLat1) * cos($radLat2) * pow(sin($b / 2), 2))) * 6378.137;

        return $s;


    }

    /**
     * 获取优惠券
     *
     * @return int 成功0，失败返回对应的错误码
     */
    public function getcoupons(){
        $put = request()->put();//会自动将JSON报头的数据转为数组
        if(empty($put['openid'])){
            echo -1;
            die;
        }
        $res=[];
        try {
            switch ($put['status']){
                case 0:
                    $res=DB::name("coupon")->where(["openid"=>$put['openid']])->select();
                    break;
                case 1:
                    $res=DB::name("coupon")->where(["openid"=>$put['openid'],"status"=>2])->select();
                    break;
                case 2:
                    $res=DB::name("coupon")->where(["openid"=>$put['openid'],"status"=>1])->select();
                    break;
            }
            //$res = Coupon::getCouponArray($put['openid']);
            //$res=DB::name("coupon")->where(["openid"=>$put['openid']])->select();
        }catch (\Exception $e){
        }
        if(!empty($res)){
            foreach ($res as $k=>$v){
                $res[$k]["startime"]=date("Y.m.d",$v["startime"]);
                $res[$k]["endtime"]=date("Y.m.d",$v["endtime"]);
                $res[$k]["desc"]="满".$v["all"]."元减".$v["price"]."元";
                $res[$k]["status"]=(string)$v['status'];
            }
        }
        exit(json_encode($res,JSON_UNESCAPED_UNICODE));
        $this->success('请求成功',json_encode($res,JSON_UNESCAPED_UNICODE));
    }



    /**
     * 检验数据的真实性，并且获取解密后的明文.
     * @param $encryptedData string 加密的用户数据
     * @param $iv string 与用户数据一同返回的初始向量
     * @param $data string 解密后的原文
     *
     * @return int 成功0，失败返回对应的错误码
     */
    public function decryptData( $encryptedData, $iv, &$data )
    {
        if (strlen($this->sessionKey) != 24) {
            return self::$IllegalAesKey;
        }
        $aesKey=base64_decode($this->sessionKey);

        if (strlen($iv) != 24) {
            return self::$IllegalIv;
        }
        $aesIV=base64_decode($iv);

        $aesCipher=base64_decode($encryptedData);

        $result=openssl_decrypt( $aesCipher, "AES-128-CBC", $aesKey, 1, $aesIV);

        $dataObj=json_decode( $result );
        if( $dataObj  == NULL )
        {
            return self::$IllegalBuffer;
        }
        if( $dataObj->watermark->appid != $this->appid )
        {
            return self::$IllegalBuffer;
        }
        $data = $result;
        return self::$OK;
    }
    /*上传图片*/
    public function addimg() {
        $sn=$this->request->get("sn");
        $openid=$this->request->get("openid");
        $key=$this->request->get("key");
        $file=$_FILES['file'];
        $dir='/uploads/weixin/'.date("Ymd").'/';
        $filename=$dir.md5(microtime(true)).'.'.explode('.',$file['name'])[count(explode('.',$file['name']))-1];
        if(!file_exists($_SERVER['DOCUMENT_ROOT'].$dir)){
            mkdir($_SERVER['DOCUMENT_ROOT'].$dir,0777,true);
        }
        $url="https://www.58hongtu.com";
        if(move_uploaded_file($file['tmp_name'],$_SERVER['DOCUMENT_ROOT'].$filename)){
            //$this->success([$_SERVER['DOCUMENT_ROOT'].$filename,$sn,$openid]);
            switch ($key){
                case 0: $img="img1";
                    break;
                case 1:$img="img2";
                    break;
                case 2:$img="img3";
                    break;
                case 3:$img="img4";
                    break;
                case 4:$img="img5";
                    break;
                case 5:$img="img6";
                    break;
            }
            $info=Db("order")->where(['sn'=>$sn,'openid'=>$openid])->update([$img=>$url.$filename]);
            if($info==""||$info==null){
                $data['picture']=$filename;
            }else{
                $data['picture']=$info.$filename;
            }
            /*Db::startTrans();
            $res=Db("infomation")->where(['id'=>input('id')])->update($data);
            if($res!==false){
                Db::commit();
                return json(true);
            }else{
                Db::rollback();
                return json(false);
            }*/
            $this->success($data);
        }else{
            $this->error();
        }

    }

    /*确认下单*/
    public function saveorder(){
        $openid=$this->request->request("openid");
        $time=$this->request->request("time");
        $name=$this->request->request("name");
        $mark=$this->request->request("mark");
        $couponid=$this->request->request("couponid");
        $coupon_price=$this->request->request("coupon_price");
        $price=$this->request->request("price");
        $sn=$this->request->request("sn");
        $tel=Db::name("order")->where(["openid"=>$openid,"sn"=>$sn])->find();
        if(empty($openid) || empty($time) || empty($name) || empty($sn)){
            $this->error();
        }else{
            $name=htmlspecialchars($name);
            if(!empty($mark)){
                $mark=htmlspecialchars($mark);
            }
            if(!empty($couponid)){
                Db::name("coupon")->where(["openid"=>$openid,"id"=>$couponid])->update(["status"=>1]);
            }
            if($couponid=="undefined"){
                $couponid="";
                $coupon_price="";
            }
            try {
                $Y=date("Y",time());
                if(preg_match_all('/\d+/',$time,$arr)){
                    if(!empty($arr)){
                        $M=$arr[0][0];
                        $D=$arr[0][1];
                        $H=$arr[0][2];
                        $S=$arr[0][3];
                        $ntime=$Y."-".$M."-".$D." ".$H.":".$S;
                        $time=strtotime($ntime);
                        $time=(int)$time;
                    }
                }
                $res=Db::name("order")->where(["openid"=>$openid,"sn"=>$sn])->update(["movetime"=>$time,"name"=>$name,"mark"=>$mark,"couponid"=>$couponid,"coupon_price"=>$coupon_price,"price"=>$price,"status"=>1]);
                if($res){

                    $sendstring="手机用户：".$tel['tel']."下单成功\n\n"."<a href='http://www.58hongtu.com/index/index/orders?sn=".$sn."&openid=".$openid."'>点击->查看详情</a>\n\n\n"."<a href='http://www.58hongtu.com/index/index/orderok?sn=".$sn."&openid=".$openid."'>点击->极速接单</a>\n\n\n"."<a href='http://www.58hongtu.com/pjsONbXFua.php/order?ref=addtabs?sn=".$sn."&openid=".$openid."'>点击进入->后台管理页面</a>";
                    $this->sendwx($sendstring,1);
                    $this->success($res);
                }
            }catch (\Exception $e){
                $this->sendwx($e->getMessage(),1);
                $this->error();
            }

        }
    }
    //{"id":"1674835955808487683","title":"草围公园","address":"广东省深圳市宝安区围园路","category":"旅游景点:公园","location":{"lat":22.62421,"lng":113.839157},"ad_info":{"adcode":"440306","province":"广东省","city":"深圳市","district":"宝安区"},"_distance":59.8,"_dir_desc":"东北"}
    /*查找订单*/
    public function findorder(){
        $openid=$this->request->request("openid");
        $status=$this->request->request("status");
        if(empty($openid)){
            $this->error();
        }else{
            try {
                if(!empty($status) && $status!=0){
                    $res=Db::name("order")->where(["openid"=>$openid,"status"=>$status])->order(["createtime"=>"desc"])->select();
                }else{
                    $res=Db::name("order")->where(["openid"=>$openid])->order(["createtime"=>"desc"])->select();
                }
                    if(!empty($res)){
                        foreach ($res as $k=>$v){
                            if(!empty($res[$k]["createtime"])){
                                $res[$k]["createtime"]=date("Y-m-d H:i:s",$v["createtime"]);
                            }
                            if(!empty($res[$k]['movetime'])){
                                if(preg_match("/^\d*$/",$res[$k]['movetime'])){
                                    $res[$k]['movetime']=date("Y-m-d H:i:s",$v['movetime']);
                                }
                            }

                        }
                    }
                    exit(json_encode($res,JSON_UNESCAPED_UNICODE));

            }catch (\Exception $e){
                $this->error();
            }

        }
    }
    /*司机获取订单*/
    public function getorders(){
        $openid=$this->request->request("openid");
        if(empty($openid)){
            $this->error();
        }else{
            if($openid!="oG2WP4v_q8Y8oFh9YqUHzcSe6hgc" || $openid!="oG2WP4gFAWbJdm1hIDkxPP-MbNlo"){
                $this->error("您还不是司机，请先认证");
            }
            try {

                $res=Db::name("order")->order(["createtime"=>"desc"])->select();
                if(!empty($res)){
                    foreach ($res as $k=>$v){
                        if(!empty($res[$k]["createtime"])){
                            $res[$k]["createtime"]=date("Y.m.d",$v["createtime"]);
                        }
                        if(!empty($res[$k]['movetime'])){
                            if(preg_match("/^\d*$/",$res[$k]['movetime'])){
                                $res[$k]['movetime']=date("Y-m-d H:i:s",$v['movetime']);
                            }
                        }

                    }
                }
                exit(json_encode($res,JSON_UNESCAPED_UNICODE));

            }catch (\Exception $e){
                $this->error();
            }

        }
    }
    /*通过id查找*/
    public function findorderbyid(){
        $id=$this->request->request("id");
        if(empty($id)){
            $this->error();
        }else{
            try {

                $res=Db::name("order")->where(["id"=>$id])->find();
                if(!empty($res['movetime'])){
                    if(preg_match("/^\d*$/",$res['movetime'])){
                        $res['movetime']=date("Y-m-d H:i:s",$res['movetime']);
                    }
                }
                exit(json_encode($res,JSON_UNESCAPED_UNICODE));

            }catch (\Exception $e){
                $this->error();
            }

        }
    }

    /*通过id查找*/
    public function feedback(){
        $tel=$this->request->request("tel");
        $content=$this->request->request("content");
        $type=$this->request->request("type");
        if(empty($tel)){
            $this->error();
        }else{
            try {
                $content=$type.":".$content;
                $res=Db::name("feedback")->insert(["tel"=>$tel,"content"=>$content]);
                $this->sendwx("用户留言：\n 手机号：".$tel."\n"."留言内容:".$content,1);
                exit(json_encode($res,JSON_UNESCAPED_UNICODE));
            }catch (\Exception $e){
                $this->error();
            }
        }
    }


    /*发送企业微信*/
    public function sendwx($msg,$to=1)
    {
        if(empty($msg)){
            exit();
        }
        /**
         * 开始推送 ww678e244168ecd6a8
         */
        $http="https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=ww678e244168ecd6a8&corpsecret=z_5GWiwbzqwu1zEvIFstBIEfuwHR3RbkRoT5L6xgjdg";
        $accesstoken=file_get_contents($http);
        if(!empty($accesstoken)){
            $APK=(json_decode($accesstoken,true));
        }
        //替换你的ACCESS_TOKEN
        $posturl="https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=".$APK['access_token'];
        $data=array("toparty"=>$to,"msgtype"=>"text","agentid"=>1000002,"text"=>array("content"=>$msg));
        $data=json_encode($data,JSON_UNESCAPED_UNICODE);
        $res=$this->https_request($posturl,$data);
        //$resdata = ["code" => 200, "msg" => "成功", "data" => []];
        //exit(json_encode($resdata, JSON_UNESCAPED_UNICODE));
    }

    //curl请求函数，微信都是通过该函数请求
    public function https_request($url, $data = null)
    {
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
        if (!empty($data)) {
            curl_setopt($curl, CURLOPT_POST, 1);
            curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
        }
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        $output = curl_exec($curl);
        curl_close($curl);
        return $output;
    }

}
