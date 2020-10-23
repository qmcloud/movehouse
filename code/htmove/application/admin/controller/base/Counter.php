<?php

namespace app\admin\controller\base;

use app\common\controller\Backend;
use think\Db;
/**
 * 营业网点
 *
 * @icon fa fa-circle-o
 */
class Counter extends Backend
{
    
    /**
     * Counter模型对象
     * @var \app\admin\model\Counter
     */
    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\admin\model\Counter;

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
                    ->with(['cates'])
                    ->where( ['counter.uniacid'=>$GLOBALS['fuid']] )
                    ->where($where)
                    ->order($sort, $order)
                    ->count();

            $list = $this->model
                    ->with(['cates'])
                    ->where( ['counter.uniacid'=>$GLOBALS['fuid']] )
                    ->where($where)
                    ->order($sort, $order)
                    ->limit($offset, $limit)
                    ->select();

            foreach ($list as $row) {
                $row->visible(['id','city_id','name','address','phone','uniacid','create_time']);
                $row->visible(['cates']);
				$row->getRelation('cates')->visible(['id','title']);
            }
            $list = collection($list)->toArray();
            $result = array("total" => $total, "rows" => $list);

            return json($result);
        }
        return $this->view->fetch();
    }

    //查看分类
    public function look_cate(){
        //设置过滤方法
        $this->request->filter(['strip_tags']);
        if ($this->request->isAjax()) {
            //如果发送的来源是Selectpage，则转发到Selectpage
            if ($this->request->request('keyField')) {
                return $this->selectpage();
            }
            list($where, $sort, $order, $offset, $limit) = $this->buildparams();
            $total = model('cates')
                ->where(['uniacid'=>$GLOBALS['fuid'],'type'=>2])
                ->count();

            $list = model('cates')
                ->where(['uniacid'=>$GLOBALS['fuid'],'type'=>2])
                ->order('sort', 'desc')
                ->limit($offset, $limit)
                ->select();

            $list = collection($list)->toArray();
            $result = array("total" => $total, "rows" => $list);

            return json($result);
        }
        return $this->fetch();
    }

    //添加问题分类
    public function add_cate(){
        if( $this->request->isAjax() ){
            $params = $this->request->post('row/a');
            if( empty($params) ){
                return $this->error('参数不能为空');
            }
            $params['uniacid']  = $GLOBALS['fuid'];
            $params['type']     = 2;
            $re = model('cates')->allowField(true)->save($params);
            if($re){
                $this->success('添加成功');
            }else{
                $this->error('添加失败');
            }

        }
        return $this->fetch();
    }


    public function edit_cate($ids=null){
        $row = model('cates')->get($ids);
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

                $result = $row->allowField(true)->save($params);

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

    public function del_cate($ids=null){
        if ($ids) {
            $pk = model('cates')->getPk();
            $adminIds = $this->getDataLimitAdminIds();
            if (is_array($adminIds)) {
                model('cates')->where($this->dataLimitField, 'in', $adminIds);
            }
            $list = model('cates')->where($pk, 'in', $ids)->select();

            $count = 0;
            Db::startTrans();
            try {
                foreach ($list as $k => $v) {
                    $count += $v->delete();
                }
                Db::commit();
            } catch (PDOException $e) {
                Db::rollback();
                $this->error($e->getMessage());
            } catch (Exception $e) {
                Db::rollback();
                $this->error($e->getMessage());
            }
            if ($count) {
                $this->success();
            } else {
                $this->error(__('No rows were deleted'));
            }
        }
        $this->error(__('Parameter %s can not be empty', 'ids'));

    }



}
