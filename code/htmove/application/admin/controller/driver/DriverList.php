<?php

namespace app\admin\controller\driver;

use app\common\controller\Backend;
use think\Db;
/**
 * 司机列表
 *
 * @icon fa fa-circle-o
 */
class DriverList extends Backend
{
    
    /**
     * DriverList模型对象
     * @var \app\admin\model\DriverList
     */
    protected $model = null;
    protected $searchFields = 'driver_name,driver_phone';
    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\admin\model\DriverList;
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
                    ->where(['driver_list.uniacid'=>$GLOBALS['fuid'],'driver_list.status'=>1 ])
                    ->with(['driverinfo'])
                    ->where($where)
                    ->order($sort, $order)
                    ->count();

            $list = $this->model
                    ->where(['driver_list.uniacid'=>$GLOBALS['fuid'],'driver_list.status'=>1 ])
                    ->with(['driverinfo'])
                    ->where($where)
                    ->order($sort, $order)
                    ->limit($offset, $limit)
                    ->select();


            $list = collection($list)->toArray();

            $result = array("total" => $total, "rows" => $list);

            return json($result);
        }
        return $this->view->fetch();
    }
    public function add()
    {
        if ($this->request->isPost()) {
            if( empty($GLOBALS['fuid']) ){
                $this->error('请先添加小程序ID');
            }
            $params = $this->request->post("row/a");
            if ($params) {
                $params = $this->preExcludeFields($params);


                if ($this->dataLimit && $this->dataLimitFieldAutoFill) {
                    $params[$this->dataLimitField] = $this->auth->id;
                }
                $user = Db::name('users')->field('open_id,nick_name')->where('id',$params['user_id'])->find();

                $params['uniacid']      = $GLOBALS['fuid'];
                $params['open_id']      = $user['open_id'];
                $params['status']       = 1;
                $params['create_time']  = time();
                $params['nick_name']    = $user['nick_name'];

                $driverInfo = [
                    'uniacid' => $GLOBALS['fuid'],
                    'statef'  => 1,
                ];
                $result = false;
                $driverInfoRes = false;
                Db::startTrans();
                try {

                    $result = $this->model->allowField(true)->save($params);
                    $driverInfo['driver_id'] = $this->model->id;
                    $driverInfoRes = Db::name('driver_info')->insert($driverInfo);

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
                if ($result !== false && $driverInfoRes !== false) {
                    Db::commit();
                    $this->success();
                } else {
                    $this->error(__('No rows were inserted'));
                }
            }
            $this->error(__('Parameter %s can not be empty', ''));
        }
        return $this->view->fetch();
    }

    public function detail($ids){
        $detail = $this->model
            ->with(['driverinfo','car'])
            ->where(['driver_list.uniacid'=>$GLOBALS['fuid'],'driver_list.id'=>$ids])
            ->find()
            ->toArray();


        return $this->fetch('',[
            'detail' => $detail
        ]);
    }

    /**
     * 删除
     */
    public function del($ids = "")
    {
        if ($ids) {
            $pk = $this->model->getPk();
            $adminIds = $this->getDataLimitAdminIds();
            if (is_array($adminIds)) {
                $this->model->where($this->dataLimitField, 'in', $adminIds);
            }
            $list = $this->model->where($pk, 'in', $ids)->select();

            $count = 0;
            $delInfo = 0;
            Db::startTrans();
            try {
                foreach ($list as $k => $v) {
                    $count += $v->delete();
                    $delInfo += Db::name('driver_info')->where('driver_id',$v->id)->delete();
                }
            } catch (PDOException $e) {
                Db::rollback();
                $this->error($e->getMessage());
            } catch (Exception $e) {
                Db::rollback();
                $this->error($e->getMessage());
            }
            if ($count && $delInfo ) {
                Db::commit();
                $this->success();
            } else {
                Db::rollback();
                $this->error(__('No rows were deleted'));
            }
        }
        $this->error(__('Parameter %s can not be empty', 'ids'));
    }

    public function update_car($ids){
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
                    $result = $row->allowField(true)->save($params);
                    Db::commit();
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
