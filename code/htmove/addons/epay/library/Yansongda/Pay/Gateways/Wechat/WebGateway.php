<?php

namespace Yansongda\Pay\Gateways\Wechat;

use Yansongda\Pay\Exceptions\InvalidArgumentException;

class WebGateway extends Wechat
{
    /**
     * get trade type config.
     *
     * @author yansongda <me@yansongda.cn>
     *
     * @return string
     */
    protected function getTradeType()
    {
        return 'NATIVE';
    }

    /**
     * pay a order.
     *
     * @author yansongda <me@yansongda.cn>
     *
     * @param array $config_biz
     *
     * @return string
     */
    public function pay(array $config_biz = [])
    {
        if (is_null($this->user_config->get('app_id'))) {
            throw new InvalidArgumentException('Missing Config -- [app_id]');
        }

        $code_url = $this->preOrder($config_biz)['code_url'];
        $params = [
            'body'         => $config_biz['body'],
            'code_url'     => $code_url,
            'out_trade_no' => $config_biz['out_trade_no'],
            'return_url'   => $this->user_config->get('return_url'),
            'total_fee'    => $config_biz['total_fee'],
        ];
        $params['sign'] = md5(implode('', $params) . $this->user_config->get('app_id'));
        $endpoint = addon_url("epay/api/wechat");

        return $this->buildPayHtml($endpoint, $params);
    }

    /**
     * build pay html.
     *
     * @author yansongda <me@yansongda.cn>
     *
     * @return string
     */
    protected function buildPayHtml($endpoint, $params)
    {
        $sHtml = "<form id='alipaysubmit' name='wechatsubmit' action='" . $endpoint . "' method='POST'>";
        foreach ($params as $key => $val) {
            $val = str_replace("'", '&apos;', $val);
            $sHtml .= "<input type='hidden' name='" . $key . "' value='" . $val . "'/>";
        }
        $sHtml .= "<input type='submit' value='ok' style='display:none;'></form>";
        $sHtml .= "<script>document.forms['wechatsubmit'].submit();</script>";

        return $sHtml;
    }
}
