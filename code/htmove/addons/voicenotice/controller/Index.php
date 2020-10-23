<?php
/**
 * Created by PhpStorm.
 * User: DOUBLE Y
 * Date: 2019/3/12
 * Time: 16:49
 */

namespace addons\voicenotice\controller;

use addons\voicenotice\library\Voicenotice as voice;
use app\admin\library\Auth;
use think\Lang;
use think\Validate;
use think\addons\Controller;
use app\admin\model\AuthGroup;
use app\admin\model\Admin;

class Index extends Controller
{
    protected $noNeedRight = ['index'];

    private $admin_auth = null;

    protected $lang = 'auth';

    public function _initialize()
    {
        $this->admin_auth = Auth::instance();
        if (!$this->admin_auth->isLogin()) {
            $this->error("请先登录管理后台", "");
        }
        Lang::load(APP_PATH . "admin" . '/lang/' . $this->request->langset() . '.php');
        $list = AuthGroup::all();
        $list = collection($list)->toArray();
        $admin = Admin::all();
        $admin = collection($admin)->toArray();
        $this->assign("list", $list);
        $this->assign("admin", $admin);
    }

    public function index()
    {
        if ($this->request->isPost()) {
            $post = $this->request->post();

            !isset($post['admin']) && !isset($post['group']) && $this->error("管理员/管理组请至少选择一项", addon_url('voicenotice/index/index'));

            $text = $post['text'];
            $rule = [
                'text' => 'require|length:2,100',
            ];
            $msg = [
                'text.require' => '消息不能为空',
                'text.length' => '消息内容在2-100之间',
            ];
            $data = [
                'text' => $text,
                'admin' => !isset($post['admin']) ? false : $post['admin'],
                'group' => !isset($post['group']) ? false : $post['group']
            ];

            $validate = new Validate($rule, $msg);
            $result = $validate->check($data);
            if (!$result) {
                $this->error(__($validate->getError()));
            }

            empty($post['loop'])&&$post['loop']=true;
            $worker = voice::addNotice($data['text'], $data['admin'], $data['group'],$post['loop'],$post['url'],$post['url_type']);
            if (!$worker) {
                $this->error("提交失败", addon_url('voicenotice/index/index'));
            }
            $this->success("提交成功", addon_url('voicenotice/index/index'));
        }
        return $this->view->fetch();
    }
}
