<?php
/**
 * Created by PhpStorm.
 * User: DOUBLE Y
 * Date: 2019/4/10
 * Time: 16:49
 */

namespace addons\voicenotice\controller;

use addons\voicenotice\library\Voice;
use app\admin\library\Auth;
use think\addons\Controller;


class Notice extends Controller
{

    private $admin_auth = null;

    public function _initialize()
    {
        $this->admin_auth = Auth::instance();
        if (!$this->admin_auth->isLogin()) {
            $this->error("请先登录管理后台", "");
        }
    }

    public function voice() //监听消息列表
    {
        if ($this->request->isGet()) {
            $info = Voice::init()->notice($this->admin_auth->id);
            return json($info);
        }
        exit;
    }

    public function delNotice() //点击清除消息队列
    {
        if ($this->request->isPost()) {
            $id = $this->request->param("id");
            $id && Voice::init()->delete($id);
            $this->success("清除成功", null, ['state' => true]);
        }
        exit;
    }
}
