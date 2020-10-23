<?php

namespace app\admin\model;

use think\Model;


class Users extends Model
{

    

    protected $hidden = ['users','open_id','ID_card'];
    
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = true;

    // 定义时间戳字段名
    protected $createTime = 'create_time';
    protected $updateTime = 'update_time';


    // 追加属性
    protected $append = [
        'gender_text',
        'create_time_text',
        'last_time_text'
    ];
    

    
    public function getGenderList()
    {
        return ['0' => '未知', '1' => __('Gender 1'), '2' => __('Gender 2')];
    }


    public function getGenderTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['gender']) ? $data['gender'] : '');
        $list = $this->getGenderList();
        return isset($list[$value]) ? $list[$value] : '';
    }



    public function getCreateTimeTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['create_time']) ? $data['create_time'] : '');
        return is_numeric($value) ? date("Y-m-d H:i:s", $value) : $value;
    }


    public function getLastTimeTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['last_time']) ? $data['last_time'] : '');
        return is_numeric($value) ? date("Y-m-d H:i:s", $value) : $value;
    }

    protected function setCreateTimeAttr($value)
    {
        return $value === '' ? null : ($value && !is_numeric($value) ? strtotime($value) : $value);
    }

    protected function setLastTimeAttr($value)
    {
        return $value === '' ? null : ($value && !is_numeric($value) ? strtotime($value) : $value);
    }


}
