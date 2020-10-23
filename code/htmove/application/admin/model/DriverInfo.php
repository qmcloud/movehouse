<?php
/**
 * Created by PhpStorm.
 * User: HelloWord
 * Date: 2019/5/8
 * Time: 20:17
 */

namespace app\admin\model;
use think\Model;

class DriverInfo extends Model
{
    public function driver()
    {
        return $this->belongsTo('driver', 'uid','id');
    }
}