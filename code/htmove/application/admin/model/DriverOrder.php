<?php
/**
 * Created by PhpStorm.
 * User: HelloWord
 * Date: 2019/6/20
 * Time: 9:54
 */

namespace app\admin\model;
use think\Model;


class DriverOrder extends Model
{

    public function driver()
    {
        return $this->belongsTo('driver', 'driver_id','id')->field('id,driver_name,photo,driver_phone,plate_number');
    }
}