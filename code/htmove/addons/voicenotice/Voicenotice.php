<?php
/**
 * Created by PhpStorm.
 * User: DOUBLE Y
 * Date: 2019/2/25
 * Time: 16:21
 */

namespace addons\voicenotice;

use think\Addons;

/**
 * 插件
 */
class Voicenotice extends Addons
{
    /**
     * 插件安装方法
     * @return bool
     */
    public function install()
    {
        return true;
    }

    /**
     * 插件卸载方法
     * @return bool
     */
    public function uninstall()
    {
        return true;
    }

    public function run()
    {
        return true;
    }

    /**
     * 插件启用方法
     * @return bool
     */
    public function enable()
    {
        return true;
    }

    /**
     * 插件禁用方法
     * @return bool
     */
    public function disable()
    {
        return true;
    }
}
