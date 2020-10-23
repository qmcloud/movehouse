<?php

namespace app\admin\controller\driver;

use app\common\controller\Backend;
use think\Db;
/**
 * 司机审核列管理
 *
 * @icon fa fa-circle-o
 */
class Drivers extends Backend
{
    
    /**
     * Drivers模型对象
     * @var \app\admin\model\Drivers
     */
    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\admin\model\Drivers;
        $this->view->assign("statusList", $this->model->getStatusList());
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
        $this->relationSearch = true;
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
                    ->where(['drivers.uniacid'=>$GLOBALS['fuid']])
                    ->with('car')
                    ->where($where)
                    ->where('drivers.status','<>','1')
                    ->order($sort, $order)
                    ->count();

            $list = $this->model
                    ->where(['drivers.uniacid'=>$GLOBALS['fuid']])
                    ->with('car')
                    ->where($where)
                    ->where('drivers.status','<>','1')
                    ->order($sort, $order)
                    ->limit($offset, $limit)
                    ->select();

            foreach ($list as $row) {
                $row->visible(['id','nick_name','driver_name','driver_phone','driver_IDcard','plate_number','front_IDcard_image','contrary_IDcard_image','driving_license','car_image','photo','drivers_license','drivers_license_copy','create_time','status']);
                $row->visible(['car']);
                $row->getRelation('car')->visible(['title']);
            }
            $list = collection($list)->toArray();
            $result = array("total" => $total, "rows" => $list);

            return json($result);
        }
        return $this->view->fetch();
    }


    public function edit($ids = null)
    {
        $row = $this->model->get($ids);
        if (!$row) {
            $this->error(__('No Results were found'));
        }
        $adminIds = $this->getDataLimitAdminIds();
        if (is_array($adminIds)) {
            if (!in_array($row[$this->dataLimitField], $adminIds)) {
                $this->error(__('You have no permission'));
            }
        }
        if ($this->request->isPost()) {
            $params = $this->request->post("row/a");
            if ($params) {
                $params = $this->preExcludeFields($params);
                $result = false;
                Db::startTrans();
                try {
                    //是否采用模型验证
                    if ($this->modelValidate) {
                        $name = str_replace("\\model\\", "\\validate\\", get_class($this->model));
                        $validate = is_bool($this->modelValidate) ? ($this->modelSceneValidate ? $name . '.edit' : $name) : $this->modelValidate;
                        $row->validateFailException(true)->validate($validate);
                    }
                    $driver_id  = $row->id;
                    $result     = $row->allowField(true)->save($params);

                    if($params['status'] == 1)
                        $re     = Db::name('driver_info')->insert(['driver_id'=>$driver_id,'statef'=>1,'uniacid'=>$GLOBALS['fuid'] ]);

                    Db::commit();
                } catch (ValidateException $e) {
                    Db::rollback();
                    $this->error($e->getMessage());
                } catch (PDOException $e) {
                    Db::rollback();
                    $this->error($e->getMessage());
                } catch (Exception $e) {
                    Db::rollback();
                    $this->error($e->getMessage());
                }
                if ($result !== false) {
                    $this->success();
                } else {
                    $this->error(__('No rows were updated'));
                }
            }
            $this->error(__('Parameter %s can not be empty', ''));
        }
        $this->view->assign("row", $row);
        return $this->view->fetch();
    }
}
