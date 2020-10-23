<?php

namespace app\admin\model;

use think\Model;

class Driver extends Model
{
    public function driverInfo()
    {
        return $this->belongsTo('driverInfo', 'id','driver_id')->field('service_number,service_mark,count_km,driver_id');
    }
}
