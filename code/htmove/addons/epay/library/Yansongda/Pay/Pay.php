<?php

namespace Yansongda\Pay;

use Yansongda\Pay\Exceptions\InvalidArgumentException;
use Yansongda\Pay\Support\Config;

class Pay
{
    /**
     * @var \Yansongda\Pay\Support\Config
     */
    private $config;

    /**
     * @var string
     */
    private $drivers;

    /**
     * @var \Yansongda\Pay\Contracts\GatewayInterface
     */
    private $gateways;

    /**
     * construct method.
     *
     * @author JasonYan <me@yansongda.cn>
     *
     * @param array $config
     */
    public function __construct(array $config = [])
    {
        $this->config = new Config($config);
    }

    /**
     * set pay's driver.
     *
     * @author JasonYan <me@yansongda.cn>
     *
     * @param string $driver
     *
     * @return Pay
     */
    public function driver($driver)
    {
        if (is_null($this->config->get($driver))) {
            throw new InvalidArgumentException("Driver [$driver]'s Config is not defined.");
        }

        $this->drivers = $driver;

        return $this;
    }

    /**
     * set pay's gateway.
     *
     * @author yansongda <me@yansongda.cn>
     *
     * @param string $gateway
     *
     * @return \Yansongda\Pay\Contracts\GatewayInterface
     */
    public function gateway($gateway = 'web')
    {
        if (!isset($this->drivers)) {
            throw new InvalidArgumentException('Driver is not defined.');
        }

        $this->gateways = $this->createGateway($gateway);

        return $this->gateways;
    }

    /**
     * create pay's gateway.
     *
     * @author yansongda <me@yansongda.cn>
     *
     * @param string $gateway
     *
     * @return \Yansongda\Pay\Contracts\GatewayInterface
     */
    protected function createGateway($gateway)
    {
        if (!file_exists(__DIR__ . '/Gateways/' . ucfirst($this->drivers) . '/' . ucfirst($gateway) . 'Gateway.php')) {
            throw new InvalidArgumentException("Gateway [$gateway] is not supported.");
        }

        $gateway = __NAMESPACE__ . '\\Gateways\\' . ucfirst($this->drivers) . '\\' . ucfirst($gateway) . 'Gateway';

        return $this->build($gateway);
    }

    /**
     * build pay's gateway.
     *
     * @author JasonYan <me@yansongda.cn>
     *
     * @param string $gateway
     *
     * @return \Yansongda\Pay\Contracts\GatewayInterface
     */
    protected function build($gateway)
    {
        return new $gateway($this->config->get($this->drivers));
    }

    public function verify()
    {
        if ($this->drivers == 'wechat') {
            return $this->gateway()->verify(file_get_contents("php://input"));
        } else {
            $request = request();
            $data = $request->get('app_id') && $request->get('out_trade_no') ? $request->get('', null, 'trim') : $request->post('', null, 'trim');
            return $this->gateway()->verify($data);
        }
    }

    public function success()
    {
        if ($this->drivers == 'wechat') {
            echo '<xml>
  <return_code><![CDATA[SUCCESS]]></return_code>
  <return_msg><![CDATA[OK]]></return_msg>
</xml>';
        } else {
            echo 'success';
        }
        return;
    }
}
