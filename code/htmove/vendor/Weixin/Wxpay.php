<?php
/**
 * 微支付API
 * 
 * @package Weixin
 * @version 1.0.0
 * 
 * 1. version 1.0.0
 *    初始创建版本。 
 */

//----------------------------------------------------------------------
class Wxpay {
	
	/**
	 * 微支付接口URL 
	 */
	const WX_API_URL = 'https://api.mch.weixin.qq.com/pay/';
	
	/**
	 * 红包/转账接口URL 
	 */
	const CASH_API_URL = 'https://api.mch.weixin.qq.com/mmpaymkttransfers/';
	
	/********************************************************************/
	
	/*
	 * 参数配置
	 * 
	 * @access protected
	 * @var array
	 */
	protected static $config = array();
	
	/********************************************************************/
	
	/**
	 * 获取订单
	 * 
	 * $out_trade_no与$transaction_id二选一，提供了$transaction_id时将会优先使用
	 * 也可单独使用$out_trade_no
	 * 
	 * @access	public
	 * @since	1.0.0
	 * 
	 * @param mixed $out_trade_no,		业务系统自行生成的订单号
	 * @param mixed $transaction_id,	微信支付提供的订单号
	 * 
	 * @return mixed
	 */
	public static function getOrder($out_trade_no, $transaction_id=''){
		if(empty(self::$config['appid']) || empty(self::$config['mchid']))
			return false;
		
		$data = array(
			'appid'				=> self::$config['appid'],
			'mch_id'			=> self::$config['mchid'],
			'transaction_id'	=> $transaction_id,
			'out_trade_no'		=> $out_trade_no,
			'nonce_str'			=> rand(000000, 999999),
			'sign_type'			=> 'MD5'
		);
		
		$data['sign'] = self::generateDataSign($data);
		
		$data	= self::setXMLData($data);
		$url	= self::WX_API_URL.'orderquery';
		$result	= self::setRequest($url, $data);
		
		empty($result) || $result = self::getXMLData($result);
		
		return $result;
	}
	
	/********************************************************************/
	
	/**
	 * 查询红包状态
	 * 
	 * @access	public
	 * @since	1.0.0
	 * 
	 * @param string $mch_billno,	红包订单号
	 * 
	 * @return mixed
	 */
	public static function getRepack($mch_billno){
		if(empty(self::$config['appid']) || empty(self::$config['mchid']))
			return false;
		
		$data = array(
			'appid'			=> self::$config['appid'],
			'mch_id'		=> self::$config['mchid'],
			'bill_type'		=> 'MCHT',
			'mch_billno'	=> $mch_billno,
			'nonce_str'		=> rand(000000, 999999)
		);
		
		$data['sign'] = self::generateDataSign($data);
		
		$data	= self::setXMLData($data);
		$url	= self::CASH_API_URL.'gethbinfo';
		$result	= self::setRequest($url, $data, true);
		
		empty($result) || $result = self::getXMLData($result);
		
		return $result;
	}
	
	/********************************************************************/
	
	/**
	 * 查询转账到钱包订单
	 * 
	 * @access	public
	 * @since	1.0.0
	 * 
	 * @param string $trade_no,	转账单号
	 * 
	 * @return mixed
	 */
	public static function getTransferByWallet($trade_no){
		if(empty(self::$config['appid']) || empty(self::$config['mchid']))
			return false;
		
		$data = array(
			'appid'				=> self::$config['appid'],
			'mch_id'			=> self::$config['mchid'],
			'partner_trade_no'	=> $trade_no,
			'nonce_str'			=> rand(000000, 999999)
		);
		
		$data['sign'] = self::generateDataSign($data);
		
		$data	= self::setXMLData($data);
		$url	= self::CASH_API_URL.'gettransferinfo';
		$result	= self::setRequest($url, $data, true);
		
		empty($result) || $result = self::getXMLData($result);
		
		return $result;
	}
	
	/********************************************************************/
	
	/**
	 * 查询转账到银行卡的订单 
	 * 
	 * @access	public
	 * @since	1.0.0
	 * 
	 * @param string $trade_no,	转账单号
	 * 
	 * @return mixed 
	 */
	public static function getTransferByBank($trade_no){
		if(empty(self::$config['mchid']))
			return false;
		
		$data = array(
			'mch_id'			=> self::$config['mchid'],
			'partner_trade_no'	=> $trade_no,
			'nonce_str'			=> rand(000000, 999999)
		);
		
		$data['sign'] = self::generateDataSign($data);
		
		$data	= self::setXMLData($data);
		$url	= self::CASH_API_URL.'query_bank';
		$result	= self::setRequest($url, $data, true);
		
		empty($result) || $result = self::getXMLData($result);
		
		return $result;
	}
	
	/********************************************************************/
	
	/**
	 * 获取微信提供的RSA加密公钥
	 * 
	 * @access	public
	 * @since	1.0.0
	 * 
	 * @return mixed
	 */
	public static function getRSAPublicKey(){
		if(empty(self::$config['mchid']))
			return false;
		
		$data = array(
			'mch_id'		=> self::$config['mchid'],
			'nonce_str'		=> rand(000000, 999999),
			'sign_type'		=> 'MD5'
		);
		
		$data['sign'] = self::generateDataSign($data, $data['sign_type']);
		
		$data	= self::setXMLData($data);
		$url	= 'https://fraud.mch.weixin.qq.com/risk/getpublickey';
		$result	= self::setRequest($url, $data, true);
		
		empty($result) || $result = self::getXMLData($result);
		
		return $result;
	}
	
	/********************************************************************/
	
	/**
	 * 解析XML数据，可用于解析微信服务器推送的XML数据
	 * 
	 * @access	public
	 * @since	1.0.0
	 * 
	 * @param string $xml, 原始XML数据
	 * 
	 * @return array
	 */
	public static function getXMLData($xml){
		if(!function_exists('simplexml_load_string'))
			return array();
		
		$data = simplexml_load_string($xml);
		
		if($data === false)
			return array();
		
		$results = array();
		
		foreach($data as $k => $v){
			$results[$k] = (string)$v;
		}
		
		return $results;
	}
	
	/********************************************************************/
	
	/**
	 * 通过微信统一下单接口设置预支付订单
	 * 
	 * @access	public
	 * @since	1.0.0
	 * 
	 * @param array $data,	kv形式的一维数组，订单数据
	 * 
	 * 	array(
	 * 		'body'				=> '商品描述',
	 * 		'out_trade_no'		=> '订单号，由业务系统自行生成，需要具备惟一性',
	 * 		'total_fee'			=> '订单金额，单位为元，程序会自动转换为分',
	 * 		'spbill_create_ip'	=> '客户端IP',
	 * 		'notify_url'		=> '异步接收回调通知的API地址',
	 * 		'openid'			=> '支付用户openid'
	 * 	)
	 * 
	 * @return mixed
	 */
	public static function setOrder($data){
		if(!is_array($data) || empty(self::$config['appid']) || empty(self::$config['mchid']))
			return false;
		
		empty($data['total_fee']) || $data['total_fee'] *= 100;
		
		$data['appid'] 		= self::$config['appid'];
		$data['mch_id'] 	= self::$config['mchid'];
		$data['sign_type']	= 'MD5';
		$data['trade_type']	= 'JSAPI';
		$data['nonce_str']	= rand(000000, 999999);
		$data['sign']		= self::generateDataSign($data, $data['sign_type']);
		
		$data	= self::setXMLData($data);
		$url	= self::WX_API_URL.'unifiedorder';
		$result	= self::setRequest($url, $data);
		
		empty($result) || $result = self::getXMLData($result);
		
		return $result;
	}
	
	/********************************************************************/
	
	/**
	 * 给用户发送普通红包
	 * 
	 * @access	public
	 * @since	1.0.0
	 * 
	 * @param array $data,	kv形式的一维数组，红包数据
	 * 
	 * 	array(
	 * 		'mch_billno'	=> '订单号，业务系统自行生成',
	 * 		'send_name'		=> '发送红包者名称',
	 * 		're_openid'		=> '接收红包用户openid',
	 * 		'total_amount'	=> '红包金额，单位为元，程序会自动转换为分',
	 * 		'wishing'		=> '祝福语',
	 * 		'act_name'		=> '活动名称',
	 *		'remark'		=> '备注信息'
	 * 	)
	 * 
	 * @return mixed
	 */
	public static function setRepack($data){
		if(!is_array($data) || empty(self::$config['appid']) || empty(self::$config['mchid']))
			return false;
		
		empty($data['total_amount']) || $data['total_amount'] *= 100;
		
		$data['total_num']	= 1;
		$data['wxappid'] 	= self::$config['appid'];
		$data['mch_id'] 	= self::$config['mchid'];
		$data['nonce_str']	= rand(000000, 999999);
		$data['client_ip']	= gethostbyname($_SERVER['HTTP_HOST']);
		$data['sign']		= self::generateDataSign($data);
		
		$data	= self::setXMLData($data);
		$url	= self::CASH_API_URL.'sendredpack';
		$result	= self::setRequest($url, $data, true);
		
		empty($result) || $result = self::getXMLData($result);
		
		return $result;
	}
	
	/********************************************************************/
	
	/**
	 * 发送列表红包
	 * 
	 * @access	public
	 * @since	1.0.0
	 * 
	 * @param array $data,	kv形式的一维数组，红包数据
	 * 
	 * 	array(
	 * 		'mch_billno'	=> '订单号，业务系统自行生成',
	 * 		'send_name'		=> '发送红包者名称',
	 * 		're_openid'		=> '接收红包用户openid',
	 * 		'total_amount'	=> '红包金额，单位为元，程序会自动转换为分',
	 * 		'total_num'		=> '接收红包的人数',
	 * 		'wishing'		=> '祝福语',
	 * 		'act_name'		=> '活动名称',
	 *		'remark'		=> '备注信息'
	 * 	)
	 * 
	 * @return mixed
	 */
	public static function setGroupRepack($data){
		if(!is_array($data) || empty(self::$config['appid']) || empty(self::$config['mchid']))
			return false;
		
		empty($data['total_amount'])	|| $data['total_amount'] *= 100;
		empty($data['total_num'])		|| $data['total_num'] = 1;
		
		$data['wxappid'] 	= self::$config['appid'];
		$data['mch_id'] 	= self::$config['mchid'];
		$data['nonce_str']	= rand(000000, 999999);
		$data['amt_type']	= 'ALL_RAND';
		$data['sign']		= self::generateDataSign($data);
		
		$data	= self::setXMLData($data);
		$url	= self::CASH_API_URL.'sendgroupredpack';
		$result	= self::setRequest($url, $data, true);
		
		empty($result) || $result = self::getXMLData($result);
		
		return $result;
	}
	
	/********************************************************************/
	
	/**
	 * 转账至用户零钱 
	 * 
	 * @access	public
	 * @since	1.0.0
	 * 
	 * @param array $data,	kv形式的一维数组，转账数据
	 * 
	 * 	array(
	 * 		'partner_trade_no'	=> '订单号，业务系统自行生成',
	 * 		'openid'			=> '需要转账的用户openid',
	 * 		'check_name'		=> '是否检验用户姓名：固定取值：NO_CHECK不校验|FORCE_CHECK强制校验',
	 * 		're_user_name'		=> '收款人姓名，当FORCE_CHECK时必填',
	 * 		'amount'			=> '转账金额，单位为元，程序会自动转换为分',
	 * 		'desc'				=> '备注说明'
	 * 	)
	 * 
	 * @return mixed
	 */
	public static function setTransferToWallet($data){
		if(!is_array($data) || empty(self::$config['appid']) || empty(self::$config['mchid']))
			return false;
		
		empty($data['amount']) 		|| $data['amount'] *= 100;
		empty($data['check_name'])	|| $data['check_name'] = 'NO_CHECK';
		
		$data['mch_appid'] 			= self::$config['appid'];
		$data['mchid'] 				= self::$config['mchid'];
		$data['nonce_str']			= rand(000000, 999999);
		$data['spbill_create_ip']	= gethostbyname($_SERVER['HTTP_HOST']);
		$data['sign']				= self::generateDataSign($data);

		$data	= self::setXMLData($data);
		$url	= self::CASH_API_URL.'promotion/transfers';
		$result	= self::setRequest($url, $data, true);

		empty($result) || $result = self::getXMLData($result);
		
		return $result;
	}
	
	/********************************************************************/
	
	/**
	 * 转账至用户银行卡
	 * 
	 * @access	public
	 * @since	1.0.0
	 * 
	 * @param array $data,	kv形式的一维数组，转账数据
	 * 
	 * 	array(
	 * 		'partner_trade_no'	=> '转账单号',
	 * 		'enc_bank_no'		=> '收款银行卡号',
	 *		'enc_true_name'		=> '收款人姓名',
	 *		'bank_code'			=> '银行编号，参阅：https://pay.weixin.qq.com/wiki/doc/api/tools/mch_pay.php?chapter=24_4',
	 *		'amount'			=> '转账金额，单位为元，程序会自动转换为分',
	 *		'desc'				=> '备注说明'
	 * 	)
	 * 
	 * @return mixed
	 */
	public static function setTransferToBank($data){
		if(empty(self::$config['mchid']) || !extension_loaded('openssl'))
			return false;
		
		// 获取RSA加密公钥
		$key = self::getRSAPublicKey();
		
		if(empty($key['pub_key']))
			return false;
		
		$key = $key['pub_key'];
		$key = openssl_pkey_get_public($key);
		
		if(!openssl_public_encrypt($data['enc_bank_no'], $bankno, $key, OPENSSL_PKCS1_OAEP_PADDING))
			return false;
		
		if(!openssl_public_encrypt($data['enc_true_name'], $bankname, $key, OPENSSL_PKCS1_OAEP_PADDING))
			return false;
		
		empty($data['amount']) || $data['amount'] *= 100;
		
		$data['enc_bank_no'] 	= base64_encode($bankno);
		$data['enc_true_name'] 	= base64_encode($bankname);
		$data['mch_id'] 		= self::$config['mchid'];
		$data['nonce_str']		= rand(000000, 999999);
		$data['sign']			= self::generateDataSign($data);
		
		unset($key, $bankno, $bankname);
		
		$data	= self::setXMLData($data);
		$url	= self::CASH_API_URL.'pay_bank';
		$result	= self::setRequest($url, $data, true);
		
		empty($result) || $result = self::getXMLData($result);
		
		return $result;
	}
	
	/********************************************************************/
	
	/**
	 * 设置生成XML数据，可用于响应微信服务器事件推送等场景
	 * 
	 * @access	public
	 * @since	1.0.0
	 * 
	 * @param array $data, kv形式的数组结构，需要转化成XML的原始数据
	 * 
	 * @return string
	 */
	public static function setXMLData($data){
		if(!is_array($data))
			return '';
		
		$result = '<xml>';
		
		foreach($data as $k => $v){
			$result .= '<'.$k.'><![CDATA['.$v.']]></'.$k.'>';
		}
		
		$result .= '</xml>';

		return $result;
	}
	
	/********************************************************************/
	
	/**
	 * 设置参数
	 * 
	 * 两种使用方式:
	 * 1. 只设置$key参数，一维数组形式，键名为参数名，键值为参数值，可同时设置多个参数，此时$val会被忽略；
	 * 2. 同时设置$key与$val参数，$key为参数名，$val为参数值，只能同时设置一个参数
	 * 
	 * @access	public
	 * @since	1.0.0
	 * 
	 * @param mixed $key, 参数名
	 * @param mixed $val, 参数值
	 * 
	 * return true
	 */
	public static function setConfig($key, $val=null){
		if(empty(self::$config)){
			self::$config = array(
				// 微信公众号开发接口appid
				'appid' => '',
					
				// 微信支付商户号ID
				'mchid' => '',
					
				// 微信支付开发接口appsecret
				'appsecret'	=> '',
				
				// SSL根证书，部分接口操作需要SSL协议，请指定证书的完整物理路径
				'ssl_root_cert' => '',
				
				// 微信支付所签发的商户证书，请指定证书的完整物理路径
				'ssl_mch_cert' => '',
					
				// 商户私钥，请指定证书的完整物理路径
				'ssl_mch_key' => ''
			);
		}
		
		is_array($key) || $key = array($key => $val);
		empty($key) || self::$config = array_merge(self::$config, $key);
		
		return true;
	}
	
	/********************************************************************/
	
	/**
	 * 关闭订单
	 * 
	 * @access	public
	 * @since	1.0.0
	 * 
	 * @param mixed $out_trade_no,		业务系统自行生成的订单号
	 * 
	 * @return mixed
	 */
	public static function closeOrder($out_trade_no){
		if(empty(self::$config['appid']) || empty(self::$config['mchid']))
			return false;
		
		$data = array(
			'appid'				=> self::$config['appid'],
			'mch_id'			=> self::$config['mchid'],
			'out_trade_no'		=> $out_trade_no,
			'nonce_str'			=> rand(000000, 999999),
			'sign_type'			=> 'MD5'
		);
		
		$data['sign'] = self::generateDataSign($data);
		
		$data	= self::setXMLData($data);
		$url	= self::WX_API_URL.'closeorder';
		$result	= self::setRequest($url, $data);
		
		empty($result) || $result = self::getXMLData($result);
		
		return $result;
	}
	
	/********************************************************************/
	
	/**
	 * 生成数字签名
	 * 
	 * @access	public
	 * @since	1.0.0
	 * 
	 * @param array		$data,	去要签名的数据
	 * @param string	$type,	签名类型，目前支持两种：MD5|HMAC-SHA256
	 * 
	 * @return mixed
	 */
	public static function generateDataSign($data, $type='md5'){
		if(empty(self::$config['appsecret']) || !is_array($data))
			return '';
		
		ksort($data);

		$sign = array();
		$type = strtoupper($type);

		foreach($data as $k => $v){
			if($v === '' || $v === false || $v === null)
				continue;
			
			$sign[] = $k.'='.$v;
		}

		$sign[] = 'key='.self::$config['appsecret'];

		$sign = implode('&', $sign);
		$sign = ($type == 'MD5') ? md5($sign) : hash_hmac('sha256', $sign, self::$config['appsecret']);
		$sign = strtoupper($sign);

		return $sign;
	}
	
	/********************************************************************/
	
	/**
	 * 验证数字签名
	 * 
	 * @access	public
	 * @since	1.0.0
	 * 
	 * @param array		$data,	需要验证的数据
	 * @param string	$hash,	待验证的签名hash
	 * @param string	$type,	签名类型，目前支持两种：MD5|HMAC-SHA256
	 * 
	 * @return bool 
	 */
	public static function checkDataSign($data, $hash, $type='md5'){
		if(empty(self::$config['appsecret']) || !is_array($data))
			return false;
		
		if(isset($data['sign']))
			unset($data['sign']);
		
		ksort($data);
		
		$sign = array();
		$type = strtoupper($type);	
		
		foreach($data as $k => $v){
			if($v === '' || $v === false || $v === null)
				continue;
			
			$sign[] = $k.'='.$v;
		}
		
		$sign[] = 'key='.self::$config['appsecret'];
		
		$sign = implode('&', $sign);
		$sign = ($type == 'MD5') ? md5($sign) : hash_hmac('sha256', $sign, self::$config['appsecret']);
		$sign = strtoupper($sign);
		
		if(md5($sign) !== md5($hash))
			return false;
		
		return true;
	}
	
	/********************************************************************/
	
	/**
	 * 通过CURL请求远程数据
	 * 
	 * @access	protected
	 * @since	1.0.0
	 * 
	 * @param string	$url,	远程url
	 * @param mixed		$post,	是否为POST方式，默认为GET，提供键值对的数组形式可以传递需要POST的数据
	 * @param string	$ssl,	是否启用ssl协议
	 * 
	 * @return mixed
	 */
	protected static function setRequest($url, $post=false, $ssl=false){
		$result = '';
		
		if(!function_exists('curl_init'))
			return '';
		
		$ch	= curl_init();
		
		// CURL配置参数
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_HEADER, false);
		curl_setopt($ch, CURLOPT_TIMEOUT, 30);
		curl_setopt($ch, CURLOPT_MAXREDIRS, 5);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
		
		// POST方式
		if($post){
			curl_setopt($ch, CURLOPT_POST, true);
			curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
		}
		
		// SSL协议
		if($ssl){
			curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
			
			// 对等证书
			if(!empty(self::$config['ssl_root_cert']) && is_file(self::$config['ssl_root_cert'])){
				curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
				curl_setopt($ch, CURLOPT_CAINFO, self::$config['ssl_root_cert']);
			}
			
			// 商户证书
			if(!empty(self::$config['ssl_mch_cert']) && is_file(self::$config['ssl_mch_cert'])){
				curl_setopt($ch, CURLOPT_SSLCERT, self::$config['ssl_mch_cert']);
				
				if(!empty(self::$config['mchid'])){
					curl_setopt($ch, CURLOPT_SSLCERTPASSWD, self::$config['mchid']);
				}
			}
			
			// SSL私钥
			if(!empty(self::$config['ssl_mch_key']) && is_file(self::$config['ssl_mch_key'])){
				curl_setopt($ch, CURLOPT_SSLKEY, self::$config['ssl_mch_key']);
			}
		}
		
		$result = curl_exec($ch);
		curl_close($ch);
		
		return $result;
	}
}