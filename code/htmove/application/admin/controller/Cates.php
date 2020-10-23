<?php
/**
 * Created by PhpStorm.
 * User: HelloWord
 * Date: 2019/5/6
 * Time: 10:01
 */

namespace app\admin\controller;

use app\common\controller\Backend;


class Cates extends Backend
{
    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\admin\model\Cates();

    }


    public function counter()
    {
            //设置过滤方法
            $this->request->filter(['strip_tags', 'htmlspecialchars']);

            //搜索关键词,客户端输入以空格分开,这里接收为数组
            $word = (array)$this->request->request("q_word/a");
            //当前页
            $page = $this->request->request("pageNumber");
            //分页大小
            $pagesize = $this->request->request("pageSize");
            //搜索条件
            $andor = $this->request->request("andOr", "and", "strtoupper");
            //排序方式
            $orderby = (array)$this->request->request("orderBy/a");
            //显示的字段
            $field = $this->request->request("showField");
            //主键
            $primarykey = $this->request->request("keyField");
            //主键值
            $primaryvalue = $this->request->request("keyValue");
            //搜索字段
            $searchfield = (array)$this->request->request("searchField/a");
            //自定义搜索条件
            $custom = (array)$this->request->request("custom/a");
            //是否返回树形结构
            $istree = $this->request->request("isTree", 0);
            $ishtml = $this->request->request("isHtml", 0);
            if ($istree) {
                $word = [];
                $pagesize = 99999;
            }
            $order = [];
            foreach ($orderby as $k => $v) {
                $order[$v[0]] = $v[1];
            }
            $field = $field ? $field : 'name';

            //如果有primaryvalue,说明当前是初始化传值
            if ($primaryvalue !== null) {
                $where = [$primarykey => ['in', $primaryvalue]];
            } else {
                $where = function ($query) use ($word, $andor, $field, $searchfield, $custom) {
                    $logic = $andor == 'AND' ? '&' : '|';
                    $searchfield = is_array($searchfield) ? implode($logic, $searchfield) : $searchfield;
                    foreach ($word as $k => $v) {
                        $query->where(str_replace(',', $logic, $searchfield), "like", "%{$v}%");
                    }
                    if ($custom && is_array($custom)) {
                        foreach ($custom as $k => $v) {
                            if (is_array($v) && 2 == count($v)) {
                                $query->where($k, trim($v[0]), $v[1]);
                            } else {
                                $query->where($k, '=', $v);
                            }
                        }
                    }
                };
            }
            $adminIds = $this->getDataLimitAdminIds();
            if (is_array($adminIds)) {
                $this->model->where($this->dataLimitField, 'in', $adminIds);
            }
            $list = [];
            $total = $this->model->where(['uniacid'=>$GLOBALS['fuid'],'type'=>2] )->where($where)->count();
            if ($total > 0) {
                if (is_array($adminIds)) {
                    $this->model->where($this->dataLimitField, 'in', $adminIds);
                }
                $datalist = $this->model->where($where)
                    ->where(['uniacid'=>$GLOBALS['fuid'],'type'=>2] )
                    ->order($order)
                    ->page($page, $pagesize)
                    ->field($this->selectpageFields)
                    ->select();
                foreach ($datalist as $index => $item) {
                    unset($item['password'], $item['salt']);
                    $list[] = [
                        $primarykey => isset($item[$primarykey]) ? $item[$primarykey] : '',
                        $field      => isset($item[$field]) ? $item[$field] : '',
                        'pid'       => isset($item['pid']) ? $item['pid'] : 0
                    ];
                }
                if ($istree) {
                    $tree = Tree::instance();
                    $tree->init(collection($list)->toArray(), 'pid');
                    $list = $tree->getTreeList($tree->getTreeArray(0), $field);
                    if (!$ishtml) {
                        foreach ($list as &$item) {
                            $item = str_replace('&nbsp;', ' ', $item);
                        }
                        unset($item);
                    }
                }
            }
            //这里一定要返回有list这个字段,total是可选的,如果total<=list的数量,则会隐藏分页按钮
            return json(['list' => $list, 'total' => $total]);
        }

}