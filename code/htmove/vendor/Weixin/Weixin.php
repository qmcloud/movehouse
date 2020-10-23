<?php
/**
 * 微信公众号API
 * 
 * @package Weixin
 * @version 1.0.0
 * 
 * 1. version 1.0.0
 *    初始创建版本。
 */

//----------------------------------------------------------------------

class Weixin {
	
	/**
	 * 与微信用户相关的接口URL
	 */
	const USER_API_URL = 'https://api.weixin.qq.com/sns/';
	
	/**
	 * 微信公共接口URL 
	 */
	const WEIXIN_API_URL = 'https://api.weixin.qq.com/cgi-bin/';
	
	/**
	 * 与客服相关的接口URL 
	 */
	const SERVICE_API_URL = 'https://api.weixin.qq.com/customservice/';
	
	/********************************************************************/
	
	/**
	 * 配置参数
	 * 
	 * @var		array
	 * @access	protected
	 * @since	1.0.0
	 */
	protected static $config = array();
	
	/********************************************************************/
	
	/**
	 * 验证微信接口参数签名
	 * 
	 * @access	public
	 * @since	1.0.0
	 * 
	 * @param string $nonce,		nonce字串
	 * @param string $timestamp,	timestamp字串
	 * @param string $signature,	signature字串
	 * 
	 * @return bool
	 */
	public static function checkSignature($nonce, $timestamp, $signature){
		if(empty(self::$config['token']))
			return false;
		
		$data = array(self::$config['token'], $timestamp, $nonce);
		
		sort($data, SORT_STRING);
		
		$data = implode('', $data);
		$data = sha1($data);
		
		if(md5($data) !== md5($signature))
			return false;
		
		return true;
	}
	
	/********************************************************************/
	
	/**
	 * 获取全局access_token
	 * 
	 * !! 该方法未对access_token缓存或采取其他存储措施，请根据需要自行存储 !!
	 * 
	 * @access	public
	 * @since	1.0.0
	 * 
	 * @return mixed
	 */
	public static function getAccessToken(){
		if(empty(self::$config['appid']) || empty(self::$config['appsecret']))
			return null;
		
		$url = self::WEIXIN_API_URL.'token?grant_type=client_credential&appid='
			 . self::$config['appid'].'&secret='.self::$config['appsecret'];
		
		$result = self::setRequest($url);
		
		empty($result) || $result = json_decode($result, true);
		
		return empty($result) ? null : $result;
	}
	
	/********************************************************************/
	
	/**
	 * 获取二维码ticket
	 * 
	 * 注意，此处仅获取授权ticket，并不是二维码图片
	 * 得到ticket后需要在https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=TICKET换取图片
	 *
	 * @access	public
	 * @since	1.0.0
	 * 
	 * @param string $action_name,		二维码场景值类型，固定取值如下：
	 * 
	 * 									#1 QR_SCENE 			临时二维码整型参数值；
	 * 									#2 QR_STR_SCENE			临时二维码字符串参数值；
	 * 									#3 QR_LIMIT_SCENE		永久二维码整型参数值；
	 * 									#4 QR_LIMIT_STR_SCENE	永久二维码字符串参数值
	 * 
	 * @param array		$data,			二维码场景值
	 * @param string	$access_token,	全局access_token
	 * @param int		$expire,		有效时长，仅临时二维码需要此参数，永久二维码将会忽略，最长为30天
	 * 
	 * @return mixed
	 */
	public static function getQRTicket($action_name, $data, $expire=604800){
		$action_name	= strtoupper($action_name);
		$post			= array('action_name' => $action_name);
		
		if($action_name == 'QR_SCENE' || $action_name == 'QR_LIMIT_SCENE')
			$post['action_info'] = array('scene' => array('scene_id' => $data));
		else
			$post['action_info'] = array('scene' => array('scene_str' => $data));
		
		if($action_name == 'QR_SCENE' || $action_name == 'QR_STR_SCENE')
			$post['expire_seconds'] = $expire;
		
		$post	= self::urlEncodeDeep($post);
		$post	= urldecode(json_encode($post));
		$url	= self::WEIXIN_API_URL.'qrcode/create?access_token='.$access_token;
		$result	= self::setRequest($url, $post);
		
		empty($result) || $result = json_decode($result, true);
		
		return empty($result) ? null : $result;
	}
	
	/********************************************************************/
	
	/**
	 * 获取短链接
	 * 
	 * @access	public
	 * @since	1.0.0
	 * 
	 * @param string	$url,			需要转换的原始url
	 * @param string	$access_token,	全局access_token
	 * 
	 * @return mixed 
	 */
	public static function getShortURL($url, $access_token){
		$data = array(
			'action' 	=> 'long2short',
			'long_url'	=> $url
		);
		
		$data	= self::urlEncodeDeep($data);
		$data	= urldecode(json_encode($data));
		$url	= self::WEIXIN_API_URL.'shorturl?access_token='.$access_token;
		$result	= self::setRequest($url, $data);
		
		empty($result) || $result = json_decode($result, true);
		
		return empty($result) ? null : $result;
	}
	
	/********************************************************************/
	
	/**
	 * 通过访问授权码获取用户信息access_token
	 * 
	 * @access	public
	 * @since	1.0.0
	 * 
	 * @param mixed $code
	 * 
	 * @return mixed
	 */
	public static function getUserAccessToken($code){
		if(empty(self::$config['appid']) || empty(self::$config['appsecret']) || empty($code))
			return null;
		
		$url = self::USER_API_URL.'oauth2/access_token?appid='.self::$config['appid'].'&secret='
			 . self::$config['appsecret'].'&code='.$code.'&grant_type=authorization_code';
		
		$result = self::setRequest($url);
		
		empty($result) || $result = json_decode($result, true);
		
		return empty($result) ? null : $result;
	}
	
	/********************************************************************/
	
	/**
	 * 通过网页授权形式获取用户信息 
	 * 
	 * @access	public
	 * @since	1.0.0
	 * 
	 * @param string $openid,		用户openid
	 * @param string $access_token,	用户授权access_token，注意此token并非是全局token，需要通过网页授权形式取得
	 * 
	 * @return mixed
	 */
	public static function getUserByOauth($openid, $access_token){
		$url = self::USER_API_URL.'userinfo?access_token='
			 . $access_token.'&openid='.$openid.'&lang=zh_CN';
		
		$result = self::setRequest($url);
		
		empty($result) || $result = json_decode($result, true);
		
		return empty($result) ? null : $result;
	}
	
	/********************************************************************/
	
	/**
	 * 获取用户基础信息
	 * 
	 * 两种使用模式：
	 * 
	 * #1 一次获取一个用户，直接给$user传递openid即可；
	 * #2 一次获取多个用户，使用无下标数组传递多个openid，注意微信接口限制一次最多获取100条数据
	 * 
	 * @access	public
	 * @since	1.0.0
	 * 
	 * @param mixed		$user,			用户openid
	 * @param string	$access_token,	全局access_token
	 * 
	 * @return mixed 
	 */
	public static function getUser($user, $access_token){
		$url = self::WEIXIN_API_URL.'user/info';
		$post = false;
		
		if(is_array($user)){
			$url .= '/batchget?';
			$post = array('user_list' => array());
			
			foreach($user as $u){
				$post['user_list'][] = array(
					'openid'	=> $u,
					'lang'		=> 'zh_CN'
				);
			}
			
			$post = self::urlEncodeDeep($post);
			$post = urldecode(json_encode($post));
		}
		else{
			$url .= '?openid='.$user.'&lang=zh_CN&';
		}
		
		$url .= 'access_token='.$access_token;
		$result	= self::setRequest($url, $post);
		
		empty($result) || $result = json_decode($result, true);
		
		return empty($result) ? null : $result;
	}
	
	/********************************************************************/
	
	/**
	 * 获取已关注用户列表
	 * 
	 * @access	public
	 * @since	1.0.0
	 * 
	 * @param string $access_token,	全局access token
	 * @param string $openid,		列表中第一个用户openid，可作为分页标志
	 * 
	 * @return mixed
	 */
	public static function getUsers($access_token, $openid=''){
		$url = self::WEIXIN_API_URL.'user/get?access_token='.$access_token;
		
		empty($openid) || $url .= '&next_openid='.$openid;
		
		$result	= self::setRequest($url);
		
		empty($result) || $result = json_decode($result, true);
		
		return empty($result) ? null : $result;
	}
	
	/********************************************************************/
	
	/**
	 * 获取黑名单列表
	 * 
	 * @access	public
	 * @since	1.0.0
	 * 
	 * @param string $access_token,	全局access token
	 * @param string $openid,		列表中第一个用户openid，可作为分页标志
	 * 
	 * @return mixed 
	 */
	public static function getBlacklist($access_token, $openid=''){
		$data	= array('begin_openid' => $openid);
		$data	= self::urlEncodeDeep($data);
		$data	= urldecode(json_encode($data));
		$url	= self::WEIXIN_API_URL.'tags/members/getblacklist?access_token='.$access_token;
		$result	= self::setRequest($url, $data);
		
		empty($result) || $result = json_decode($result, true);
		
		return empty($result) ? null : $result;
	}
	
	/********************************************************************/
	
	/**
	 * 获取用户标签
	 * 
	 * @access	public
	 * @since	1.0.0
	 * 
	 * @param string $access_token
	 * 
	 * @return mixed
	 */
	public static function getTags($access_token){
		$url	= self::WEIXIN_API_URL.'tags/get?access_token='.$access_token;
		$result	= self::setRequest($url);
		
		empty($result) || $result = json_decode($result, true);
		
		return empty($result) ? null : $result;
	}
	
	/********************************************************************/
	
	/**
	 * 获取指定用户设置的所有标签
	 * 
	 * @access	public
	 * @since	1.0.0
	 * 
	 * @param string $openid,		指定用户的openid
	 * @param string $access_token,	全局access token
	 * 
	 * @return mixed 
	 */
	public static function getTagsByUser($openid, $access_token){
		$data	= array('openid' => $openid);
		$data	= self::urlEncodeDeep($data);
		$data	= urldecode(json_encode($data));
		$url	= self::WEIXIN_API_URL.'tags/getidlist?access_token='.$access_token;
		$result	= self::setRequest($url, $data);
		
		empty($result) || $result = json_decode($result, true);
		
		return $result;
	}
	
	/********************************************************************/
	
	/**
	 * 通过标签获取用户
	 * 
	 * @access	public
	 * @since	1.0.0
	 * 
	 * @param int		$tag_id,		标签ID
	 * @param string	$access_token,	全局access token
	 * @param string	$openid,		列表中第一个用户openid，可作为分页标志
	 * 
	 * @return mixed
	 */
	public static function getUsersByTag($tag_id, $access_token, $openid=''){
		$data	= array('tagid' => $tag_id, 'next_openid' => $openid);
		$data	= self::urlEncodeDeep($data);
		$data	= urldecode(json_encode($data));
		$url	= self::WEIXIN_API_URL.'user/tag/get?access_token='.$access_token;
		$result	= self::setRequest($url, $data);
		
		empty($result) || $result = json_decode($result, true);
		
		return $result;
	}
	
	/********************************************************************/
	
	/**
	 * 获取自定义菜单
	 * 
	 * @access	public
	 * @since	1.0.0
	 * 
	 * @param string $access_token
	 * 
	 * @return mixed
	 */
	public static function getMenus($access_token){
		$url	= self::WEIXIN_API_URL.'menu/get?access_token='.$access_token;
		$result	= self::setRequest($url);
		
		empty($result) || $result = json_decode($result, true);
		
		return empty($result) ? null : $result;
	}
	
	/********************************************************************/
	
	/**
	 * 获取所有客服列表
	 * 
	 * @access	public
	 * @since	1.0.0
	 * 
	 * @param string $access_token
	 * 
	 * @return mixed 
	 */
	public static function getServices($access_token){
		$url	= self::SERVICE_API_URL.'getkflist?access_token='.$access_token;
		$result	= self::setRequest($url);
		
		empty($result) || $result = json_decode($result, true);
		
		return empty($result) ? null : $result;
	}
	
	/********************************************************************/
	
	/**
	 * 获取公众号所属行业
	 * 
	 * @access	public
	 * @since	1.0.0
	 * 
	 * @param string $access_token
	 * 
	 * @return mixed
	 */
	public static function getIndustries($access_token){
		$url	= self::WEIXIN_API_URL.'template/get_industry?access_token='.$access_token;
		$result	= self::setRequest($url);
		
		empty($result) || $result = json_decode($result, true);
		
		return empty($result) ? null : $result;
	}
	
	/********************************************************************/
	
	/**
	 * 获取消息模板
	 * 
	 * @access	public
	 * @since	1.0.0
	 * 
	 * @param string $access_token
	 * 
	 * @return mixed
	 */
	public static function getTemplates($access_token){
		$url	= self::WEIXIN_API_URL.'template/get_all_private_template?access_token='.$access_token;
		$result	= self::setRequest($url);
		
		empty($result) || $result = json_decode($result, true);
		
		return empty($result) ? null : $result;
	}
	
	/********************************************************************/
	
	/**
	 * 获取自动回复配置
	 * 
	 * @access	public
	 * @since	1.0.0
	 * 
	 * @param string $access_token
	 * 
	 * @return mixed
	 */
	public static function getAutoreplyInfo($access_token){
		$url	= self::WEIXIN_API_URL.'get_current_autoreply_info?access_token='.$access_token;
		$result	= self::setRequest($url);
		
		empty($result) || $result = json_decode($result, true);
		
		return empty($result) ? null : $result;
	}
	
	/********************************************************************/
	
	/**
	 * 获取单个永久素材
	 * 
	 * @access	public
	 * @since	1.0.0
	 * 
	 * @param string $media_id,		素材id
	 * @param string $access_token,	全局access_token
	 * 
	 * @return mixed,	不同素材返回信息有异同，图片直接返回内容，多图文等返回json
	 */
	public static function getMedia($media_id, $access_token){
		$data	= array('media_id' => $media_id);
		$data	= self::urlEncodeDeep($data);
		$data	= urldecode(json_encode($data));
		$url	= self::WEIXIN_API_URL.'material/get_material?access_token='.$access_token;
		$result	= self::setRequest($url, $data);
		
		empty($result) || $json = json_decode($result, true);
		
		return empty($json) ? $result : $json;
	}
	
	/********************************************************************/
	
	/**
	 * 获取永久素材列表
	 * 
	 * @access	public
	 * @since	1.0.0
	 * 
	 * @param string	$type,			媒体类型：图片（image）、视频（video）、语音 （voice）、图文（news）
	 * @param int		$offset,		列表开始文职偏移量，用于分页
	 * @param int		$count,			每页数量
	 * @param string	$access_token,	全局access_token
	 * 
	 * @return mixed
	 */
	public static function getMedias($type, $offset, $count, $access_token){
		$type = strtolower($type);
		
		if($type == '' || !in_array($type, array('image', 'voice', 'video', 'news')))
			$type = 'image';
		
		$data = array(
			'type'		=> $type,
			'offset'	=> $offset,
			'count'		=> $count
		);
		
		$data	= self::urlEncodeDeep($data);
		$data	= urldecode(json_encode($data));
		$url	= self::WEIXIN_API_URL.'material/batchget_material?access_token='.$access_token;
		$result	= self::setRequest($url, $data);
		
		empty($result) || $result = json_decode($result, true);
		
		return empty($result) ? null : $result;
	}
	
	/********************************************************************/
	
	/**
	 * 获取媒体数量
	 * 
	 * @access	public
	 * @since	1.0.0
	 * 
	 * @param string $access_token,	全局access_token
	 * 
	 * @return mixed
	 */
	public static function getMediaCount($access_token){
		$url	= self::WEIXIN_API_URL.'material/get_materialcount?access_token='.$access_token;
		$result	= self::setRequest($url);
		
		empty($result) || $result = json_decode($result, true);
		
		return empty($result) ? null : $result;
	}
	
	/********************************************************************/
	
	/**
	 * 获取微信服务器IP列表
	 * 
	 * @access	public
	 * @since	1.0.0
	 * 
	 * @param string $access_token
	 * 
	 * @return mixed
	 */
	public static function getServerIP($access_token){
		$url	= self::WEIXIN_API_URL.'getcallbackip?access_token='.$access_token;
		$result	= self::setRequest($url);
		
		empty($result) || $result = json_decode($result, true);
		
		return empty($result) ? null : $result;
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
				
				// 微信公众号开发接口appsecret
				'appsecret'	=> '',
				
				// 微信公众号开发接口token，此token为接口配置中的token
				// 非微信授权token（access token）
				'token' => '',
			);
		}
		
		is_array($key) || $key = array($key => $val);
		empty($key) || self::$config = array_merge(self::$config, $key);
		
		return true;
	}
	
	/********************************************************************/
	
	/**
	 * 设置自定义菜单
	 * 
	 * @access	public
	 * @since	1.0.0
	 * 
	 * @param array $menu,	多维数组格式，参数如下：
	 *  array(
	 *  	// 只有一级菜单
	 *  	array(
	 *  		'name'	=> '一级菜单',
	 *  		'type'	=> '菜单类型，可选值请查阅微信开发文档',
	 *  		'key'	=> '自定义键值，当菜单为非view类型时有效',
	 *  		'url'	=> '菜单链接，仅菜单类型为view有效'
	 *  	),
	 *  	// 包含二级菜单
	 *  	array(
	 *  		'name'			=> '一级菜单',
	 *  		'sub_button'	=> array(
	 *  			array(
	 *  				'name'		=> '二级菜单',
	 *  				'type'		=> '菜单类型，可选值请查阅微信开发文档',
	 *  				'key'		=> '自定义键值，当菜单为非view类型时有效',
	 *  				'url'		=> '菜单链接，仅菜单类型为view有效'
	 *  			)
	 *  		)
	 *  	)
	 *  )
	 *  
	 * @param string $access_token,	全局access_token
	 * 
	 * @return mixed
	 */
	public static function setMenu($menu, $access_token){
		if(!is_array($menu) || count($menu) > 3)
			return null;
		
		$menu	= array('button' => $menu);
		$menu	= self::urlEncodeDeep($menu);
		$menu	= urldecode(json_encode($menu));
		$url	= self::WEIXIN_API_URL.'menu/create?access_token='.$access_token;
		$result	= self::setRequest($url, $menu);
		
		empty($result) || $result = json_decode($result, true);
		
		return $result;
	}
	
	/********************************************************************/
	
	/**
	 * 设置客户账号
	 * 
	 * @access	public
	 * @since	1.0.0
	 * 
	 * @param array $service,	一维数组，客服账号信息
	 * 
	 * 	array(
	 * 		'kf_account'	=> '客户账号：账号@公众号格式',
	 *		'nickname'		=> '客服昵称',
	 *		'password'		=> '客户密码，程序将会进行MD5计算，无需提前计算 '
	 * 	)
	 * 
	 * @param string $access_token,	全局access_token
	 * 
	 * @return mixed
	 */
	public static function setService($service, $access_token){
		empty($service['password']) || $service['password'] = md5($service['password']);
		
		$service	= self::urlEncodeDeep($service);
		$service	= urldecode(json_encode($service));
		$url		= self::SERVICE_API_URL.'kfaccount/add?access_token='.$access_token;
		$result		= self::setRequest($url, $service);
		
		empty($result) || $result = json_decode($result, true);
		
		return $result;
	}
	
	/********************************************************************/
	
	/**
	 * 新增图文素材
	 * 
	 * @access	public
	 * @since	1.0.0
	 * 
	 * @param array $news,	二维数组，图文内容数据
	 * 
	 * 	array(
	 * 		array(
	 * 			'title'					=> '图文标题',
	 * 			'thumb_media_id'		=> '封面图片素材id',
	 * 			'author'				=> '作者',
	 * 			'show_cover_pic'		=> '是否显示封面，0为false，即不显示，1为true，即显示',
	 * 			'content'				=> '内容，支持HTML标签，2万字符小于1M，去除JS图片url必须使用公众号平台的素材',
	 * 			'content_source_url'	=> '图文消息的原文地址，即点击“阅读原文”后的URL'
	 * 		)
	 * 		...
	 * 	)
	 * 
	 * @param string $access_token,	全局access_token
	 * 
	 * @return mixed 
	 */
	public static function setNews($news, $access_token){
		isset($news['title'])				|| $news['title'] = '';
		isset($news['thumb_media_id'])		|| $news['thumb_media_id'] = '';
		isset($news['show_cover_pic'])		|| $news['show_cover_pic'] = 1;
		isset($news['content'])				|| $news['content'] = '';
		isset($news['content_source_url'])	|| $news['content_source_url'] = '';
		
		$data 	= array('articles' => $news);
		$data	= self::urlEncodeDeep($data);
		$data	= urldecode(json_encode($data));
		$url	= self::WEIXIN_API_URL.'material/add_news?access_token='.$access_token;
		$result	= self::setRequest($url, $data);
		
		empty($result) || $result = json_decode($result, true);
		
		return $result;
	}
	
	/********************************************************************/
	
	/**
	 * 设置公众号模板消息行业
	 * 
	 * @access	public
	 * @since	1.0.0
	 * 
	 * @param int		$id1,			第一个行业ID
	 * @param int		$id2,			第二个行业ID
	 * @param string	$access_token,	全局access_token
	 * 
	 * @return mixed 
	 */
	public static function setIndustry($id1, $id2, $access_token){
		$data = array(
			'industry_id1' => $id1,
			'industry_id2' => $id2
		);
		
		$data	= self::urlEncodeDeep($data);
		$data	= urldecode(json_encode($data));
		$url	= self::WEIXIN_API_URL.'template/api_set_industry?access_token='.$access_token;
		$result	= self::setRequest($url, $data);
		
		empty($result) || $result = json_decode($result, true);
		
		return $result;
	}
	
	/********************************************************************/
	
	/**
	 * 设置用户分组标签
	 * 
	 * @access	public
	 * @since	1.0.0
	 * 
	 * @param string $name,			标签名称，最多30个字符
	 * @param string $access_token,	全局access_token
	 * 
	 * @return mixed 
	 */
	public static function setTag($name, $access_token){
		$data	= array('tag' => array('name' => $name));
		$data	= self::urlEncodeDeep($data);
		$data	= urldecode(json_encode($data));
		$url	= self::WEIXIN_API_URL.'tags/create?access_token='.$access_token;
		$result	= self::setRequest($url, $data);
		
		empty($result) || $result = json_decode($result, true);
		
		return $result;
	}
	
	/********************************************************************/
	
	/**
	 * 给用户设置标签
	 * 
	 * @access	public
	 * @since	1.0.0
	 * 
	 * @param array		$user,			无下标一维数组，用户openid
	 * @param int		$tag_id,		需要设置的标签id
	 * @param string	$access_token,	全局access_token
	 * 
	 * @return mixed
	 */
	public static function setUserTag($user, $tag_id, $access_token){
		$data = array(
			'openid_list'	=> $user,
			'tagid'			=> $tagid
		);
		
		$data	= self::urlEncodeDeep($data);
		$data	= urldecode(json_encode($data));
		$url	= self::WEIXIN_API_URL.'tags/members/batchtagging?access_token='.$access_token;
		$result	= self::setRequest($url, $data);
		
		empty($result) || $result = json_decode($result, true);
		
		return $result;
	}
	
	/********************************************************************/
	
	/**
	 * 设置黑名单（拉黑用户）
	 * 
	 * @access	public
	 * @since	1.0.0
	 * 
	 * @param array		$user,			无下标数组，需要拉黑的用户openid列表，一次最多20个
	 * @param string	$access_token,	全局access_token
	 * 
	 * @return mixed
	 */
	public static function setBlacklist($user, $access_token){
		$data	= array('openid_list' => $user);
		$data	= self::urlEncodeDeep($data);
		$data	= urldecode(json_encode($data));
		$url	= self::WEIXIN_API_URL.'tags/members/batchblacklist?access_token='.$access_token;
		$result	= self::setRequest($url, $data);
		
		empty($result) || $result = json_decode($result, true);
		
		return $result;
	}
	
	/********************************************************************/
	
	/**
	 * 取消用户标签
	 * 
	 * @access	public
	 * @since	1.0.0
	 * 
	 * @param array		$user,			无下标一维数组，用户openid
	 * @param int		$tag_id,		需要设置的标签id
	 * @param string	$access_token,	全局access_token
	 * 
	 * @return mixed 
	 */
	public static function unsetUserTag($user, $tag_id, $access_token){
		$data = array(
			'openid_list'	=> $user,
			'tagid'			=> $tagid
		);
		
		$data	= self::urlEncodeDeep($data);
		$data	= urldecode(json_encode($data));
		$url	= self::WEIXIN_API_URL.'tags/members/batchuntagging?access_token='.$access_token;
		$result	= self::setRequest($url, $data);
		
		empty($result) || $result = json_decode($result, true);
		
		return $result;
	}
	
	/********************************************************************/
	
	/**
	 * 取消用户黑名单
	 * 
	 * @access	public
	 * @since	1.0.0
	 * 
	 * @param array		$user,			无下标数组，需要拉黑的用户openid列表，一次最多20个
	 * @param string	$access_token,	全局access_token
	 * 
	 * @return mixed 
	 */
	public static function unsetBlacklist($user, $access_token){
		$data	= array('openid_list' => $user);
		$data	= self::urlEncodeDeep($data);
		$data	= urldecode(json_encode($data));
		$url	= self::WEIXIN_API_URL.'tags/members/batchunblacklist?access_token='.$access_token;
		$result	= self::setRequest($url, $data);
		
		empty($result) || $result = json_decode($result, true);
		
		return $result;
	}
	
	/********************************************************************/
	
	/**
	 * 向微信用户发送消息
	 * 
	 * @access	public
	 * @since	1.0.0
	 *
	 * @param array		$data,			需要发送的数据
	 * @param string	$access_token,	全局access_token
	 * @param int		$mode,			发送模式：1为单发；2为指定多个openid群发；3为指定分组id或完全群发	
	 * 
	 * @return mixed
	 */
	public static function sendMessage($data, $access_token, $mode=1){
		$data	= self::urlEncodeDeep($data);
		$data	= urldecode(json_encode($data));
		$url	= self::WEIXIN_API_URL;
		
		switch($mode){
			case 3:
				$url .= 'message/mass/sendall';
			break;
			
			case 2:
				$url .= 'message/mass/send';
			break;
			
			default:
				$url .= 'message/custom/send';
		}
		
		$url	.= '?access_token='.$access_token;
		$result	= self::setRequest($url, $data);
		
		empty($result) || $result = json_decode($result, true);
			
		return $result;
	}
	
	/********************************************************************/
	
	/**
	 * 给用户发送文本消息
	 * 
	 * 可以使用三种模式：
	 * 
	 * #1 给单个用户发送，此时直接给$user传递需要发送的openid即可；
	 * #2 给多个用户发送，此时请使用无下标的数组形式提供openid
	 * #3 给指定分组或完全群发，此时需要使用一维数组格式传递参数，格式如下：
	 * 
	 *   array(
	 *   	'is_to_all'	=> '布尔值，true为完全群发，false为给指定分组群发',
	 *   	'tag_id'	=> '用户分组id，is_to_all为true时将会被忽略'
	 *   )
	 * 
	 * @access	public
	 * @since	1.0.0
	 * 
	 * @param string	$text,			文本消息
	 * @param string	$user,			微信用户
	 * @param string	$access_token,	全局access_token
	 * @param mixed		$service,		使用指定的客户账号发送消息
	 * 
	 * @return mixed
	 */
	public static function sendTextMessage($text, $user, $access_token, $service=false){
		$data = array(
			'msgtype'	=> 'text',
			'text'		=> array('content' => $text)
		);
		
		$mode = is_array($user) ? (isset($user['is_to_all']) ? 3 : 2) : 1;
		
		self::parseMassegeData($data, $user, $service);
		
		return self::sendMessage($data, $access_token, $mode);
	}
	
	/********************************************************************/
	
	/**
	 * 给用户发送外部图文消息
	 * 
	 * 可以使用三种模式：
	 * 
	 * #1 给单个用户发送，此时直接给$user传递需要发送的openid即可；
	 * #2 给多个用户发送，此时请使用无下标的数组形式提供openid
	 * #3 给指定分组或完全群发，此时需要使用一维数组格式传递参数，格式如下：
	 * 
	 *   array(
	 *   	'is_to_all'	=> '布尔值，true为完全群发，false为给指定分组群发',
	 *   	'tag_id'	=> '用户分组id，is_to_all为true时将会被忽略'
	 *   )
	 * 
	 * @access	public
	 * @since	1.0.0
	 * 
	 * @param array $news, 需要发送的图文消息，二维数组格式，格式如下：
	 *  array(
	 *  	array('title' => '标题', 'description' => '描述', 'url' => '链接URL', 'picurl' => '缩略图'),
	 *  	array('title' => '标题', 'description' => '描述', 'url' => '链接URL', 'picurl' => '缩略图')
	 *  )
	 *  
	 * @param string	$user,			微信用户
	 * @param string	$access_token,	全局access_token
	 * @param mixed		$service,		使用指定的客户账号发送消息
	 * 
	 * @return mixed
	 */
	public static function sendNewsMessage($news, $user, $access_token, $service=false){
		if(!is_array($news) || count($news) > 8)
			return false;
		
		$data = array(
			'msgtype'	=> 'news',
			'news'		=> array('articles' => $news)
		);
		
		$mode = is_array($user) ? (isset($user['is_to_all']) ? 3 : 2) : 1;
		
		self::parseMassegeData($data, $user, $service);
		
		return self::sendMessage($data, $access_token, $mode);
	}
	
	/********************************************************************/
	
	/**
	 * 给用户发送图片消息
	 * 
	 * 可以使用三种模式：
	 * 
	 * #1 给单个用户发送，此时直接给$user传递需要发送的openid即可；
	 * #2 给多个用户发送，此时请使用无下标的数组形式提供openid
	 * #3 给指定分组或完全群发，此时需要使用一维数组格式传递参数，格式如下：
	 * 
	 *   array(
	 *   	'is_to_all'	=> '布尔值，true为完全群发，false为给指定分组群发',
	 *   	'tag_id'	=> '用户分组id，is_to_all为true时将会被忽略'
	 *   )
	 * 
	 * @access	public
	 * @since	1.0.0
	 * 
	 * @param string	$media_id,		微信公众号平台当中的media_id，上传素材时有返回，请提前存储
	 * @param string	$user,			微信用户
	 * @param string	$access_token,	全局access_token
	 * @param mixed		$service,		使用指定的客户账号发送消息
	 * 
	 * @return mixed
	 */
	public static function sendImageMessage($media_id, $user, $access_token, $service=false){
		$data = array(
			'msgtype'	=> 'image',
			'image'		=> array('media_id' => $media_id)
		);
		
		$mode = is_array($user) ? (isset($user['is_to_all']) ? 3 : 2) : 1;
		
		self::parseMassegeData($data, $user, $service);
		
		return self::sendMessage($data, $access_token, $mode);
	}
	
	/********************************************************************/
	
	/**
	 * 给用户发送语音消息
	 * 
	 * 可以使用三种模式：
	 * 
	 * #1 给单个用户发送，此时直接给$user传递需要发送的openid即可；
	 * #2 给多个用户发送，此时请使用无下标的数组形式提供openid
	 * #3 给指定分组或完全群发，此时需要使用一维数组格式传递参数，格式如下：
	 * 
	 *   array(
	 *   	'is_to_all'	=> '布尔值，true为完全群发，false为给指定分组群发',
	 *   	'tag_id'	=> '用户分组id，is_to_all为true时将会被忽略'
	 *   )
	 * 
	 * @access	public
	 * @since	1.0.0
	 * 
	 * @param string	$media_id,		微信公众号平台当中的media_id，上传素材时有返回，请提前存储
	 * @param string	$user,			微信用户
	 * @param string	$access_token,	全局access_token
	 * @param mixed		$service,		使用指定的客户账号发送消息
	 * 
	 * @return mixed
	 */
	public static function sendVoiceMessage($media_id, $user, $access_token, $service=false){
		$data = array(
			'msgtype'	=> 'voice',
			'voice'		=> array('media_id' => $media_id)
		);
		
		$mode = is_array($user) ? (isset($user['is_to_all']) ? 3 : 2) : 1;
		
		self::parseMassegeData($data, $user, $service);
		
		return self::sendMessage($data, $access_token, $mode);
	}
	
	/********************************************************************/
	
	/**
	 * 给用户发送视频消息
	 * 
	 * 可以使用三种模式：
	 * 
	 * #1 给单个用户发送，此时直接给$user传递需要发送的openid即可；
	 * #2 给多个用户发送，此时请使用无下标的数组形式提供openid
	 * #3 给指定分组或完全群发，此时需要使用一维数组格式传递参数，格式如下：
	 * 
	 *   array(
	 *   	'is_to_all'	=> '布尔值，true为完全群发，false为给指定分组群发',
	 *   	'tag_id'	=> '用户分组id，is_to_all为true时将会被忽略'
	 *   )
	 * 
	 * @access	public
	 * @since	1.0.0
	 * 
	 * @param array	$video,	一维数组，视频信息
	 * 									
	 * 	array(
	 * 		'media_id'			=> '微信公众号平台当中的media_id，上传素材时有返回，请提前存储',
	 * 		'thumb_media_id'	=> '封面图片ID，需要提前上传素材至微信公众号平台以获取media_id',
	 * 		'title'				=> '视频标题',
	 * 		'description'		=> '视频描述'
	 * 	)
	 * 
	 * @param string	$user,			微信用户
	 * @param string	$access_token,	全局access_token
	 * @param mixed		$service,		使用指定的客户账号发送消息
	 * 
	 * @return mixed
	 */
	public static function sendVideoMessage($video, $user, $access_token, $service=false){
		if(empty($video['media_id']))
			return false;
		
		$data = array(
			'msgtype'	=> 'video',
			'video'		=> $video
		);
		
		$mode = is_array($user) ? (isset($user['is_to_all']) ? 3 : 2) : 1;
		
		self::parseMassegeData($data, $user, $service);
		
		return self::sendMessage($data, $access_token, $mode);
	}
	
	/********************************************************************/
	
	/**
	 * 给用户发送卡券消息
	 * 
	 * 可以使用三种模式：
	 * 
	 * #1 给单个用户发送，此时直接给$user传递需要发送的openid即可；
	 * #2 给多个用户发送，此时请使用无下标的数组形式提供openid
	 * #3 给指定分组或完全群发，此时需要使用一维数组格式传递参数，格式如下：
	 * 
	 *   array(
	 *   	'is_to_all'	=> '布尔值，true为完全群发，false为给指定分组群发',
	 *   	'tag_id'	=> '用户分组id，is_to_all为true时将会被忽略'
	 *   )
	 * 
	 * @access	public
	 * @since	1.0.0
	 * 
	 * @param string	$card_id,		卡券id
	 * @param string	$user,			微信用户
	 * @param string	$access_token,	全局access_token
	 * @param mixed		$service,		使用指定的客户账号发送消息
	 * 
	 * @return mixed
	 */
	public static function sendWxcardMessage($card_id, $user, $access_token, $service=false){
		$data = array(
			'msgtype'	=> 'wxcard',
			'wxcard'	=> array('card_id' => $card_id)
		);
		
		$mode = is_array($user) ? (isset($user['is_to_all']) ? 3 : 2) : 1;
		
		self::parseMassegeData($data, $user, $service);
		
		return self::sendMessage($data, $access_token, $mode);
	}
	
	/********************************************************************/
	
	/**
	 * 给用户发送小程序卡片
	 * 
	 * 可以使用三种模式：
	 * 
	 * #1 给单个用户发送，此时直接给$user传递需要发送的openid即可；
	 * #2 给多个用户发送，此时请使用无下标的数组形式提供openid
	 * #3 给指定分组或完全群发，此时需要使用一维数组格式传递参数，格式如下：
	 * 
	 *   array(
	 *   	'is_to_all'	=> '布尔值，true为完全群发，false为给指定分组群发',
	 *   	'tag_id'	=> '用户分组id，is_to_all为true时将会被忽略'
	 *   )
	 * 
	 * @access	public
	 * @since	1.0.0
	 * 
	 * @param string $miniprogram,	一维数组，小程序信息
	 * 
	 * 	array(
	 * 		'pagepath'			=> '小程序页面路径，参见小程序中app.json的路径定义',
	 * 		'thumb_media_id'	=> '封面图片ID，需要提前上传素材至微信公众号平台以获取media_id',
	 * 		'title'				=> '标题',
	 * 		'appid'				=> '小程序appid'
	 * 	)
	 * 
	 * @param string	$user,			微信用户
	 * @param string	$access_token,	全局access_token
	 * @param mixed		$service,		使用指定的客户账号发送消息
	 * 
	 * @return mixed
	 */
	public static function sendMiniProgramMessage($miniprogram, $user, $access_token, $service=false){
		if(empty($miniprogram['appid']))
			return false;
		
		$data = array(
			'msgtype'			=> 'miniprogrampage',
			'miniprogrampage'	=> $miniprogram
		);
		
		$mode = is_array($user) ? (isset($user['is_to_all']) ? 3 : 2) : 1;
		
		self::parseMassegeData($data, $user, $service);
		
		return self::sendMessage($data, $access_token, $mode);
	}
	
	/********************************************************************/
	
	/**
	 * 发送模板消息
	 * 
	 * @access	public
	 * @since	1.0.0
	 * 
	 * @param string	$template_id,	模板ID
	 * @param string	$user,			需要发送的用户openid
	 * @param array		$data,			消息内容
	 * @param string	$url,			跳转url
	 * @param array		$miniprogram,	小程序数据，格式如下：
	 * 
	 * 	array(
	 * 		'appid'		=> '小程序appid',
	 *		'pagepath'	=> '小程序页面路径，参阅app.json'
	 * 	)
	 * 
	 * @return mixed
	 */
	public static function sendTemplateMessage($template_id, $user, $data, $url='', $miniprogram=array()){
		$param = array(
			'touser'		=> $user,
			'data'			=> $data,
			'template_id'	=> $template_id
		);
		
		empty($url)			|| $param['url'] = $url;
		empty($miniprogram)	|| $param['miniprogram'] = $miniprogram;
		
		$param	= self::urlEncodeDeep($param);
		$param	= urldecode(json_encode($param));
		$url	= self::WEIXIN_API_URL.'message/template/send?access_token='.$access_token;
		$result	= self::setRequest($url, $param);
		
		empty($result) || $result = json_decode($result, true);
		
		return $result;
	}
	
	/********************************************************************/
	
	/**
	 * 上传图片
	 * 
	 * 此处上传的图片不占用永久素材额度，上传后可立即取得URL
	 * 
	 * @access	public
	 * @since	1.0.0
	 * 
	 * @param string $file,			需要上传的文件，需要提前放置在服务器目录中，不支持远程上传
	 * @param string $access_token,	访问授权token
	 * 
	 * @return mixed
	 */
	public static function uploadImage($file, $access_token){
		if(!is_file($file))
			return false;
		
		$url	= self::WEIXIN_API_URL.'media/uploadimg?access_token='.$access_token;
		$result	= self::setRequest($url, true, $file);
		
		empty($result) || $result = json_decode($result, true);
		
		return $result;
	}
	
	/********************************************************************/
	
	/**
	 * 上传永久素材
	 * 
	 * @access	public
	 * @since	1.0.0
	 * 
	 * @param string $file,			需要上传的文件，需要提前放置在服务器目录中，不支持远程上传
	 * @param string $access_token,	访问授权token
	 * @param string $type,			文件类型，可选值为图片（image）、语音（voice）、视频（video）和缩略图（thumb，主要用于视频与音乐格式的缩略图）
	 * 
	 * @return array
	 */
	public static function uploadMedia($file, $access_token, $type='image'){
		if(!is_file($file))
			return false;
		
		$type = strtolower($type);
		
		if($type == '' || !in_array($type, array('image', 'voice', 'video', 'thumb')))
			$type = 'image';
		
		$url	= self::WEIXIN_API_URL.'material/add_material?access_token='.$access_token.'&type='.$type;
		$result	= self::setRequest($url, true, $file);
		
		empty($result) || $result = json_decode($result, true);
		
		return $result;
	}
	
	/********************************************************************/
	
	/**
	 * 上传临时素材
	 * 
	 * @access	public
	 * @since	1.0.0
	 * 
	 * @param string $file,			需要上传的文件，需要提前放置在服务器目录中，不支持远程上传
	 * @param string $access_token,	访问授权token
	 * @param string $type,			文件类型，可选值为图片（image）、语音（voice）、视频（video）和缩略图（thumb，主要用于视频与音乐格式的缩略图）
	 * 
	 * @return mixed
	 */
	public static function uploadTempMedia($file, $access_token, $type='image'){
		if(!is_file($file))
			return false;
		
		$type = strtolower($type);
		
		if($type == '' || !in_array($type, array('image', 'voice', 'video', 'thumb')))
			$type = 'image';
		
		$url	= self::WEIXIN_API_URL.'media/upload?access_token='.$access_token.'&type='.$type;
		$result	= self::setRequest($url, true, $file);
		
		empty($result) || $result = json_decode($result, true);
		
		return $result;
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
	 * @param string	$file,	需要上传的文件，留空则忽略，否则请提供完整的上传文件物理路径
	 * 
	 * @return mixed
	 */
	protected static function setRequest($url, $post=false, $file=''){
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
		
		// POST方式，如果需要上传文件时始终都是POST方式
		if($post || !empty($file)){
			curl_setopt($ch, CURLOPT_POST, true);
			
			// 文件上传
			if(!empty($file) && is_file($file)){
				is_array($post) || $post = array();
				$file = realpath($file);
				
				if(version_compare(PHP_VERSION, '5.5.0') >= 0){
					$post['media'] = new \CURLFile($file);
				}
				else{
					curl_setopt($ch, CURLOPT_SAFE_UPLOAD, false);
					
					$post['media'] = '@'.$file;
				}
			}
			
			curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
		}
		
		$result = curl_exec($ch);
		curl_close($ch);
		
		return $result;
	}
	
	/********************************************************************/
	
	/**
	 * 深度url编码
	 * 
	 * @access	protected
	 * @since	1.0.0
	 *  
	 * @param array $value, 需要处理的数据，支持多维数组
	 * 
	 * @return array
	 */
	protected static function urlEncodeDeep($value){
		if(is_array($value)){
			$value = array_map('self::urlEncodeDeep', $value);
		}
		elseif(is_object($value)){
			$vars = get_object_vars($value);
	
			foreach($vars as $key => $data){
				$value->{$key} = self::urlEncodeDeep($data);
			}
		}
		elseif(is_string($value)){
			$value = urlencode($value);
		}
		
		return $value;
	}
	
	/********************************************************************/
	
	/**
	 * 处理消息发送数据
	 * 
	 * @access	protected
	 * @since	1.0.0
	 * 
	 * @param array $data,		消息参数
	 * @param mixed	$user,		消息发送用户对象
	 * @param mixed $service,	公众号客服信息
	 * 
	 * @return void
	 */
	protected static function parseMassegeData(&$data, $user, $service){
		if(is_array($user) && isset($user['is_to_all'])){
			$data['filter'] = $user;
		}
		else{
			$data['touser']	= $user;
		}
		
		if(!empty($service) && is_string($service)){
			$data['customservice'] = array('kf_account' => $service);
		}
	}
}