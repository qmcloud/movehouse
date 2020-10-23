<?php

namespace app\admin\controller\orders;

use app\common\controller\Backend;

/**
 * 
 *
 * @icon fa fa-circle-o
 */
class Appointment extends Backend
{
    
    /**
     * Appointment模型对象
     * @var \app\admin\model\Appointment
     */
    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\admin\model\Appointment;
        $this->view->assign("statusList", $this->model->getStatusList());
        $this->view->assign("typeList", $this->model->getTypeList());
    }
    
    /**
     * 默认生成的控制器所继承的父类中有index/add/edit/del/multi五个基础方法、destroy/restore/recyclebin三个回收站方法
     * 因此在当前控制器中可不用编写增删改查的代码,除非需要自己控制这部分逻辑
     * 需要将application/admin/library/traits/Backend.php中对应的方法复制到当前控制器,然后进行修改
     */
    

    /**
     * 查看
     */
    public function index()
    {
        //当前是否为关联查询
        $this->relationSearch = false;
        //设置过滤方法
        $this->request->filter(['strip_tags']);
        if ($this->request->isAjax())
        {
            //如果发送的来源是Selectpage，则转发到Selectpage
            if ($this->request->request('keyField'))
            {
                return $this->selectpage();
            }
            list($where, $sort, $order, $offset, $limit) = $this->buildparams();
            $total = $this->model
                    ->where(['uniacid'=>$GLOBALS['fuid'],'type'=>2 ])
                    ->where($where)
                    ->order($sort, $order)
                    ->count();

            $list = $this->model
                    ->where(['uniacid'=>$GLOBALS['fuid'],'type'=>2 ])
                    ->where($where)
                    ->order($sort, $order)
                    ->limit($offset, $limit)
                    ->select();

            foreach ($list as $row) {
                $row->visible(['id','order_number','place_dispatch','place_receipt','shipper_name','shipper_phone','consignee','consignee_phone','appointment_time','remark','status','create_time']);
                
            }
            $list = collection($list)->toArray();
            $result = array("total" => $total, "rows" => $list);

            return json($result);
        }
        return $this->view->fetch();
    }

    public function detail($ids){
        $re = $this->model->get($ids);

        $username = $re->user->nick_name;

        $user_coupon = db('user_coupon')->find($re['user_coupon_id']);


        return $this->view->fetch('',[
            're'            => $re,
            'username'      => $username,
            'user_coupon'   => $user_coupon,
        ]);
    }
}
