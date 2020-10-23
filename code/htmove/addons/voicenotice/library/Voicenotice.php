<?php
/**
 * Created by PhpStorm.
 * User: DOUBLE Y
 * Date: 2019/3/12
 * Time: 16:21
 */

namespace addons\voicenotice\library;

class Voicenotice
{


    /** 以下为开放接口 */

    public static function NoticeList($id) //获取通知列表
    {
        return Voice::init()->notice($id);
    }


    public static function get_token()
    {

        return ['token' => Voice::getToken()];
    }


    /**
     * 添加通知内容
     * @param string $text 通知内容
     * @param string|array $admin 管理员id
     * @param bool|string|array $group 管理组id
     * @return bool
     */

    public static function addNotice($text, $admin = true, $group = false, $loop = true, $url = null, $url_type = "open")
    {
        if (!$text) {
            return false;
        }
        if($url && $url_type){
            return Voice::init()->admin($admin)->group($group)->loop($loop)->$url_type($url)->send($text);
        }else{
            return Voice::init()->admin($admin)->group($group)->loop($loop)->send($text);
        }
    }

    /**
     * 删除通知
     * @return mixed
     */
    public static function delNotice($id)
    {
        return Voice::init()->delete($id);
    }

}
