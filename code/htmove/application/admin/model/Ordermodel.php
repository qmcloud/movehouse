<?php

namespace app\admin\model;

use think\Model;


class Ordermodel extends Model
{

    

    

    // 表名
    protected $name = 'order';
    
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = 'int';

    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = false;
    protected $deleteTime = false;

    // 追加属性
    protected $append = [
        'uptime_text',
        'movetime_text'
    ];
    

    



    public function getUptimeTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['uptime']) ? $data['uptime'] : '');
        return is_numeric($value) ? date("Y-m-d H:i:s", $value) : $value;
    }


    public function getMovetimeTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['movetime']) ? $data['movetime'] : '');
        return is_numeric($value) ? date("Y-m-d H:i:s", $value) : $value;
    }

    protected function setUptimeAttr($value)
    {
        return $value === '' ? null : ($value && !is_numeric($value) ? strtotime($value) : $value);
    }

    protected function setMovetimeAttr($value)
    {
        return $value === '' ? null : ($value && !is_numeric($value) ? strtotime($value) : $value);
    }


}
