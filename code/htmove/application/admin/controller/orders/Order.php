<?php

namespace app\admin\controller\orders;

use app\common\controller\Backend;
use think\Db;
/**
 * 
 *
 * @icon fa fa-circle-o
 */
class Order extends Backend
{
    
    /**
     * Order模型对象
     * @var \app\admin\model\Order
     */
    protected $model = null;
    protected $searchFields = 'order_number';

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\admin\model\Order;
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
                    ->with('user')
                    ->where(['order.uniacid'=>$GLOBALS['fuid'],'order.type'=>1 ])
                    ->where($where)
                    ->order($sort, $order)
                    ->count();

            $list = $this->model
                    ->with('user')
                    ->where(['order.uniacid'=>$GLOBALS['fuid'],'order.type'=>1 ])
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

                if($row->status == 7){
                    $result = $row->allowField(true)->save(['status'=>6]);
                    if($result){
                        return $this->success('取消成功');
                    }
                    return $this->error('取消失败');
                }

                Db::startTrans();
                try {
                    if( (int)$params['status'] === 6){

                        if( (int)$row->status == 4 || (int)$row->status == 5 ){
                            $driver = Db::name('driver_order')->where('order_id',$row->id)->field('driver_id')->find();


                            $upWhere = [
                                'balance'       => $row->price ,
                                'service_number'=> 1,
                                'count_km'      => $row->distance
                            ];
                            foreach($upWhere as $k=>$v){
                                $updateInfo = Db::name('driver_info')->where('driver_id', $driver['driver_id'])->setDec($k,$v);
                            }

                        }

                        $result = $row->allowField(true)->save($params);
                        $delDriverOrder = Db::name('driver_order')->where('order_id',$row->id)->delete();
                        $updateUserAmount = Db::name('users')->where('id',$row->uid)->setDec('amount',$row->real_price);
                    }

                } catch (PDOException $e) {
                    Db::rollback();
                    $this->error($e->getMessage());
                } catch (Exception $e) {
                    Db::rollback();
                    $this->error($e->getMessage());
                }
                if ($result !== false  || $updateUserAmount) {
                    $Refund = weixinRefund($row->order_number,$row->real_price,$row->uid);
                    if($Refund[0] == 1){
                        return $this->error($Refund[1]);
                    }

                    Db::commit();
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


    public function detail($ids){


        $order = $this->model->with(['driverOrder','driverOrder.driver','driverOrder.driver.driverInfo'])->find($ids);
        if(!$order){
           return $this->error('没有数据');
        }



        $username = $order->user->nick_name;
        $user_coupon = db('user_coupon')->field('title')->find($order['user_coupon_id']);



        return $this->view->fetch('',[
            'username'      => $username,
            'user_coupon'   => $user_coupon,
            'order'         => $order,
        ]);
    }

    //分配司机
    public function assign_driver($ids){
        if(request()->isPost()){
            $params = input('row/a');

            $order  = db('order')->field('id,status,car_id')->find($params['order_id']);
            if(!$order){
                return $this->error('订单不存在');
            }
            if( (int)$order['status'] !== 1)
                return $this->error('该订单不是待接单状态！');

            $driver = db('driver')->field('id')->where('id',$params['driver_id'])->find();
            if(!$driver){
                return $this->error('司机不存在!');
            }

            $driverOrder = Db::name('driver_order')->field('id')->where(['order_id'=>$order['id'] ])->find();
            if($driverOrder){
                return $this->error('订单已被抢走!');
            }

            $insData = [
                'order_id'      => $order['id'],
                'driver_id'     => $driver['id'],
                'create_time'   => time(),
                'uniacid'       => $GLOBALS['fuid'],
                'latitude'      => $params['lat'],
                'longitude'     => $params['lng']
            ];

            Db::startTrans();

            $insDroverOrder = db('driver_order')->insert($insData);
            $updateOrder    = Db::name('order')->where('id',$order['id'])->update(['status'=>2]);


            if(!$insDroverOrder || !$updateOrder ){
                Db::rollback();
                return $this->error('分配失败');
            }

            Db::commit();
            return $this->success('分配成功!');
        }




        $order = db('order')->field('id,start_lat,start_lot,status')->find($ids);
        if(!$order){
            return $this->error('没有该订单信息！');
        }
        if((int)$order['status'] !== 1)
            return $this->error('该订单不是待接单状态！');

        $key = db('config')->where(['name'=>'tmap','uniacid'=>$GLOBALS['fuid'] ])->field('value')->find();
        if(!$key){
            $this->error('请添加腾讯地图key');
        }

        $between = SquarePoint($order['start_lot'],$order['start_lat'],100);
        $where = array(
            'di.latitude'  => [ [ '>=', $between['minlat'] ],[ '<=' ,$between['maxlat'] ] ],
            'di.longitude' => [ [ '>=', $between['minlng'] ],[ '<=', $between['maxlng'] ] ],
        );

        $field  = ['d.driver_name','d.photo','driver_phone','d.id as did','v.title','di.latitude','di.longitude'];
        $driver = db('driver')
                ->alias('d')
                ->join('vehicle v','d.car_id = v.id')
                ->join('driver_info di','d.id = di.driver_id')
                ->field($field)
                ->where($where)
                ->select();



        $this->assign([
            'key'           => $key['value'],
            'order'         => $order,
            'drivers'       => $driver,
        ]);
        return $this->view->fetch();
    }

    public function search(){
        $key = $this->request->param('key');

        if(!$key){
            return json(['code'=>0,'msg'=>'请输入搜索内容']);
        }

        $field  = ['d.driver_name','d.photo','driver_phone','d.id as did','v.title','di.latitude','di.longitude'];
        $driver = db('driver')
            ->alias('d')
            ->join('vehicle v','d.car_id = v.id')
            ->join('driver_info di','d.id = di.driver_id')
            ->field($field)
            ->where('driver_name','like','%'.$key.'%')
            ->whereOr('driver_phone','like','%'.$key.'%')
            ->find();
        if(!$driver){
            return json(['code'=>0,'msg'=>'未搜索到司机信息']);
        }

        return json(['code'=>1,'msg'=>'ok','data'=>$driver]);







    }


}
