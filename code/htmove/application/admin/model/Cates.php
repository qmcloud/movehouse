<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/5/3 0003
 * Time: 下午 1:33
 */

namespace app\admin\model;

use think\Model;


class Cates extends Model
{
    // 开启自动写入时间戳字段
    protected $autoWriteTimestamp = 'int';
    // 定义时间戳字段名
    protected $createTime = 'create_time';
}