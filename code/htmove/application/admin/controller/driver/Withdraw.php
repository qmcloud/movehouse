<?php

namespace app\admin\controller\driver;

use app\common\controller\Backend;
use think\Db;
/**
 * 提现列管理
 *
 * @icon fa fa-circle-o
 */
class Withdraw extends Backend
{
    
    /**
     * Withdraw模型对象
     * @var \app\admin\model\Withdraw
     */
    protected $model = null;
    protected $searchFields = 'order_number';

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\admin\model\Withdraw;
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
                    ->with(['driver'])
                    ->where('withdraw.uniacid',$GLOBALS['fuid'])
                    ->where($where)
                    ->order($sort, $order)
                    ->count();

            $list = $this->model
                    ->with(['driver'])
                    ->where('withdraw.uniacid',$GLOBALS['fuid'])
                    ->where($where)
                    ->order($sort, $order)
                    ->limit($offset, $limit)
                    ->select();

            foreach ($list as $row) {
                
                $row->getRelation('driver')->visible(['id','nick_name']);
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

                        if( (int)$row->status == 1){
                            return $this->error('该订单已提现！');
                        }
                        $field  = ['mchid','mch_cert','mch_key','pay_secret','appid'];
                        $where  = ['uniacid'=>$GLOBALS['fuid'],'name'=>['in',$field] ];
                        $config = db('config')->where($where)->field('name,value')->select();
                        $config = array_column($config,'value','name');
                        if(!$config)
                            return $this->error('未配置参数');

                        foreach($field as $k=>$v){
                            if(!array_key_exists($v,$config)){
                                return $this->error($v.'参数未配置!');
                            }
                        }

                        $certPath = EXTEND_PATH .'apiclient_cert.pem';
                        $keyPath  = EXTEND_PATH .'apiclient_key.pem';
                        file_put_contents($certPath,$config['mch_cert']);
                        file_put_contents($keyPath,$config['mch_key']);

                        $withdrawal = $row->toArray();
                        Vendor('Weixin.Wxpay');
                        $wxpay = new \Wxpay();
                        $wxpay->setConfig(array(
                            'appid'         => $config['appid'],
                            'mchid'         => $config['mchid'],
                            'appsecret'	    => $config['pay_secret'],
                            'ssl_mch_cert'  => $certPath,
                            'ssl_mch_key'   => $keyPath,
                        ));

                        $existo = $wxpay->getTransferByWallet($row['order_number']);
                        if(strtolower($existo['result_code']) == 'success')
                            $this->error('该订单流水号已存在处理！');

                        $data = array(
                            'partner_trade_no'	=> $withdrawal['order_number'],
                            'openid'			=> $withdrawal['open_id'],
                            'amount'			=> 1,
                            'desc'				=> '余额提现',
                            'check_name'        => 'NO_CHECK'
                        );

                        $withdraw = $wxpay->setTransferToWallet($data);


                        if(empty($withdraw) || !is_array($withdraw))
                            return json(['code'=>0, 'msg'=>'系统异常，请稍后重试！']);

                        if(strtolower($withdraw['return_code']) != 'success'){
                            $withdraw['return_msg'] = !empty($withdraw['return_msg']) ? $withdraw['return_msg'] : '出现未知错误！';
                            return json(['code'=>0, 'msg'=>$withdraw['return_msg']]);
                        }
                        if(strtolower($withdraw['result_code']) != 'success')
                            return json(['code'=>0, 'msg'=>$withdraw['err_code_des']]);

                    unlink($certPath) && unlink($keyPath);
                    $result = $row->allowField(true)->save($params);
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


}
