<?php
/**
 * Created by PhpStorm.
 * Author: DoubleY
 * Date: 2019/4/10
 * Time: 14:22
 * Email: 731633799@qq.com
 */

namespace addons\voicenotice\library;


class Voice
{
    protected $admin = null;  //管理员id
    protected $group = null;  //管理组id
    protected $adminAndGroup = null;
    private $witch = false;
    private $loop = true;
    private $url = "";
    private $url_type = "";
    private $sql = [];
    static public $init;
    protected $db = null;     //消息列表实例
    protected $db_name = "voicenotice_que";  //数据表名称

    public function __construct($table = '')
    {
        $this->db = db(!$table ? $this->db_name : $table);
    }

    public function admin($admin = true)
    {
        !is_bool($admin) && is_string($admin) && strstr($admin, ",") && $admin = explode(",", $admin);
        $this->admin = $admin;
        $this->witch = true;
        return $this;
    }

    public function group($group = true)
    {
        !is_bool($group) && is_string($group) && strstr($group, ",") && $group = explode(",", $group);
        $this->group = $group;
        $this->witch = true;
        return $this;
    }


    public function loop($loop = true)
    {
        if (!is_numeric($loop) ) {
            $loop = "true";
        } else {
            $loop < 1  &&  $loop = 1;
        }
        $this->loop = $loop;
        return $this;
    }

    /*
     * 通知消息 弹窗打开连接
     * @param string $url 打开的url地址
     * @param string $type ope
     * */
    public function open($url = null)
    {
        if ($url) {
            $this->url = $url;
            $this->url_type = "open";
        }
        return $this;
    }

    /*
   * 通知消息 菜单栏打开连接
   * @param string $url 打开的url地址
   * @param string $type ope
   * */

    public function addtabs($url = null)
    {
        if ($url) {
            $this->url = $url;
            $this->url_type = 'addtabs';
        }
        return $this;
    }


    private function adminAndGroup()
    {
        $admin = db("admin")->where($this->admin === true ? null : ["id" => ["in", $this->admin]])->group("id")->column("id");
        $group_admin = db("auth_group_access")->where($this->group === true ? null : ['group_id' => ["in", $this->group]])->group("uid")->column("uid");
        $admin = array_merge($admin, $group_admin);
        if (!$admin || !is_array($admin)) {
           return false;
        }
        $this->adminAndGroup = array_unique($admin);
        return true;
    }

    /*
     * 入库操作
     * */
    public function send($text = null)
    {
        if (!$this->witch) $this->admin();
        if (!$text) {
            return false;
        }
        $this->adminAndGroup();
        if (!$this->adminAndGroup) {
           return false;
        }
        foreach ($this->adminAndGroup as $v) {
            $this->sql[] = ["aid" => $v, "createtime" => time(), "text" => $text, "state" => 0, "loop" => $this->loop, "url" => $this->url, "url_type" => $this->url_type];
        }
        return $this->db->insertAll($this->sql);
    }


    public function delete($id) //删除消息
    {
        return $this->db->delete($id);
    }

    public function notice($id) //当前消息
    {
        $find = $this->db->where(['aid' => $id])->field("aid,createtime,state", true)->find();
          if (!empty($find) && ($find['loop'] != true || $find['loop'] != "true")) $this->delete($find['id']);  //取出后直接删除
        is_array($find) && $find['token'] = self::getToken();
        return ['state' => is_array($find) ? true : false, "data" => $find];
    }

    public static function getToken() //获取Token
    {
        $obj = new Comm();
        return $obj->getToken();
    }

    public function __call($method, $arg)
    {
        throw new \Exception("{$method}方法不存在");
    }

    public static function init($table = "")
    {
        if (!self::$init) self::$init = new self($table);
        return self::$init;
    }

    public static function __callStatic($method, $arg = '')
    {
        return new self($arg);
    }

}