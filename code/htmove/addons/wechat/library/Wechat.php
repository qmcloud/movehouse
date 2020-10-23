<?php

namespace addons\wechat\library;

use addons\signin\model\Signin;
use addons\third\model\Third;
use app\common\model\User;
use EasyWeChat\Message\News;
use fast\Date;
use fast\Http;
use fast\Random;
use think\Cache;
use think\Config;

/**
 * 微信服务类
 */
class Wechat
{
    public static function appConfig()
    {
        return array(
            'signin' => array(
                'name'   => '签到送积分',
                'config' => array()
            ),
            'blog'   => array(
                'name'   => '关联博客',
                'config' => array(
                    array(
                        'type'    => 'text',
                        'caption' => '日志ID',
                        'field'   => 'post_id',
                        'rule'    => '',
                        'extend'  => 'class="form-control selectpage" data-source="blog/post/index" data-field="title"',
                        'options' => '',
                    ),
                    array(
                        'type'    => 'radio',
                        'caption' => '开启搜索日志',
                        'field'   => 'searchpost',
                        'rule'    => '',
                        'extend'  => '',
                        'options' => [
                            '1' => '是',
                            '0' => '否',
                        ],
                    ),
                    array(
                        'type'         => 'text',
                        'caption'      => '正则搜索匹配索引',
                        'field'        => 'searchregexindex',
                        'rule'         => '',
                        'defaultvalue' => '1',
                        'extend'       => '',
                        'options'      => [],
                    )
                )
            ),
            'cms'    => array(
                'name'   => '关联CMS',
                'config' => array(
                    array(
                        'type'    => 'text',
                        'caption' => '文章ID',
                        'field'   => 'archives_id',
                        'rule'    => '',
                        'extend'  => 'class="form-control selectpage" data-source="cms/archives/index" data-field="title"',
                        'options' => ''
                    ),
                    array(
                        'type'    => 'text',
                        'caption' => '单页ID',
                        'field'   => 'page_id',
                        'rule'    => '',
                        'extend'  => 'class="form-control selectpage" data-source="cms/page/index" data-field="title"',
                        'options' => ''
                    ),
                    array(
                        'type'    => 'text',
                        'caption' => '专题ID',
                        'field'   => 'special_id',
                        'rule'    => '',
                        'extend'  => 'class="form-control selectpage" data-source="cms/special/index" data-field="title"',
                        'options' => ''
                    ),
                    array(
                        'type'    => 'radio',
                        'caption' => '开启搜索文章',
                        'field'   => 'searcharchives',
                        'rule'    => '',
                        'extend'  => '',
                        'options' => [
                            '1' => '是',
                            '0' => '否',
                        ],
                    ),
                    array(
                        'type'    => 'radio',
                        'caption' => '开启搜索单页',
                        'field'   => 'searchpage',
                        'rule'    => '',
                        'extend'  => '',
                        'options' => [
                            '1' => '是',
                            '0' => '否',
                        ],
                    ),
                    array(
                        'type'    => 'radio',
                        'caption' => '开启搜索专题',
                        'field'   => 'searchspecial',
                        'rule'    => '',
                        'extend'  => '',
                        'options' => [
                            '1' => '是',
                            '0' => '否',
                        ],
                    ),
                    array(
                        'type'         => 'text',
                        'caption'      => '正则搜索匹配索引',
                        'field'        => 'searchregexindex',
                        'rule'         => '',
                        'defaultvalue' => '1',
                        'extend'       => '',
                        'options'      => [],
                    )
                )
            ),
            'ask'    => array(
                'name'   => '关联问答',
                'config' => array(
                    array(
                        'type'    => 'text',
                        'caption' => '问题ID',
                        'field'   => 'question_id',
                        'extend'  => 'class="form-control selectpage" data-source="ask/question/index" data-field="title"',
                        'options' => ''
                    ),
                    array(
                        'type'    => 'text',
                        'caption' => '文章ID',
                        'field'   => 'article_id',
                        'extend'  => 'class="form-control selectpage" data-source="ask/article/index" data-field="title"',
                        'options' => ''
                    ),
                    array(
                        'type'    => 'radio',
                        'caption' => '开启搜索问题',
                        'field'   => 'searchquestion',
                        'rule'    => '',
                        'extend'  => '',
                        'options' => [
                            '1' => '是',
                            '0' => '否',
                        ],
                    ),
                    array(
                        'type'    => 'radio',
                        'caption' => '开启搜索文章',
                        'field'   => 'searcharticle',
                        'rule'    => '',
                        'extend'  => '',
                        'options' => [
                            '1' => '是',
                            '0' => '否',
                        ],
                    ),
                    array(
                        'type'         => 'text',
                        'caption'      => '正则搜索匹配索引',
                        'field'        => 'searchregexindex',
                        'rule'         => '',
                        'defaultvalue' => '1',
                        'extend'       => '',
                        'options'      => [],
                    )
                )
            ),
            'vote'   => array(
                'name'   => '关联投票',
                'config' => array(
                    array(
                        'type'    => 'text',
                        'caption' => '投票主题ID',
                        'field'   => 'subject_id',
                        'extend'  => 'class="form-control selectpage" data-source="vote/subject/index" data-field="title"',
                        'rule'    => '',
                        'options' => ''
                    ),
                    array(
                        'type'    => 'text',
                        'caption' => '参赛人员ID',
                        'field'   => 'player_id',
                        'rule'    => '',
                        'extend'  => 'class="form-control selectpage" data-source="vote/player/index" data-field="nickname"',
                        'options' => ''
                    ),
                    array(
                        'type'    => 'radio',
                        'caption' => '开启搜索主题',
                        'field'   => 'searchsubject',
                        'rule'    => '',
                        'extend'  => '',
                        'options' => [
                            '1' => '是',
                            '0' => '否',
                        ],
                    ),
                    array(
                        'type'    => 'radio',
                        'caption' => '开启搜索参赛人员',
                        'field'   => 'searchplayer',
                        'rule'    => '',
                        'extend'  => '',
                        'options' => [
                            '1' => '是',
                            '0' => '否',
                        ],
                    ),
                    array(
                        'type'         => 'text',
                        'caption'      => '正则搜索匹配索引',
                        'field'        => 'searchregexindex',
                        'rule'         => '',
                        'defaultvalue' => '1',
                        'extend'       => '',
                        'options'      => [],
                    )
                )
            ),
        );
    }

    /**
     * 应用交互
     * @return array|bool|mixed|string
     */
    public function response($obj, $openid, $message, $content, $context, $matches = null)
    {
        $response = false;
        if (isset($content['app'])) {
            $entry = null;
            $keyword = isset($content['searchregexindex']) && $content['searchregexindex'] > -1 && $matches && isset($matches[$content['searchregexindex']])
                ? $matches[$content['searchregexindex']] : $message;
            switch ($content['app']) {
                case 'signin':
                    $signinInfo = get_addon_info('signin');
                    if (!$signinInfo || !$signinInfo['state']) {
                        return "请先在后台管理安装并启用《会员签到》插件";
                    }
                    $thirdInfo = get_addon_info('third');
                    if (!$thirdInfo || !$thirdInfo['state']) {
                        return "请先在后台管理安装并启用《第三方登录》插件";
                    }
                    $user = self::getUserByOpenid($openid);
                    if (!$user) {
                        return "请先在会员中心绑定微信登录，<a href='" . addon_url('third/index/connect', [':platform' => 'wechat'], true, true) . "'>点击这里绑定</a>";
                    }
                    $config = get_addon_config('signin');
                    $signdata = $config['signinscore'];
                    $lastdata = Signin::where('user_id', $user->id)->order('id', 'desc')->find();
                    $successions = $lastdata && $lastdata['createtime'] > Date::unixtime('day', -1) ? $lastdata['successions'] : 0;
                    $signin = Signin::where('user_id', $user->id)->whereTime('createtime', 'today')->find();
                    if ($signin) {
                        return '今天已签到,请明天再来!';
                    } else {
                        $successions++;
                        Signin::create(['user_id' => $user->id, 'successions' => $successions, 'createtime' => time()]);
                        $score = isset($signdata['s' . $successions]) ? $signdata['s' . $successions] : $signdata['sn'];

                        $user->setInc('score', $score);
                        User::score($score, $user->id, "连续签到{$successions}天");
                        return '签到成功!连续签到' . $successions . '天!获得' . $score . '积分,';
                    }
                    break;
                case 'blog':
                    $blogInfo = get_addon_info('blog');
                    if (!$blogInfo || !$blogInfo['state']) {
                        return "请先在后台管理安装并启用《简单博客》插件";
                    }
                    $entry = \addons\blog\model\Post::get($content['post_id']);
                    if ($entry) {
                        $entry['image'] = $entry['thumb'];
                    }
                    if (!$entry && $content['searchpost']) {
                        $entry = \addons\blog\model\Post::where("title|description", 'like', "%{$keyword}%")->where('status', 'normal')->find();
                    }
                    if (!$entry) {
                        return "未搜索到任何匹配信息$keyword" . json_encode($matches);
                    }
                    break;
                case 'cms':
                    $cmsInfo = get_addon_info('cms');
                    if (!$cmsInfo || !$cmsInfo['state']) {
                        return "请先在后台管理安装并启用《CMS内容管理系统》插件";
                    }
                    if (isset($content['archives_id']) && $content['archives_id']) {
                        $entry = \addons\cms\model\Archives::get($content['archives_id']);
                    } elseif (isset($content['page_id']) && $content['page_id']) {
                        $entry = \addons\cms\model\Page::get($content['page_id']);
                    } elseif (isset($content['special_id']) && $content['special_id']) {
                        $entry = \addons\cms\model\Special::get($content['special_id']);
                    }
                    if (!$entry && $content['searcharchives']) {
                        $entry = \addons\cms\model\Archives::where("title|description", 'like', "%{$keyword}%")->where('status', 'normal')->find();
                    }
                    if (!$entry && $content['searchpage']) {
                        $entry = \addons\cms\model\Page::where("title|description", 'like', "%{$keyword}%")->where('status', 'normal')->find();
                    }
                    if (!$entry && $content['searchspecial']) {
                        $entry = \addons\cms\model\Special::where("title|description", 'like', "%{$keyword}%")->where('status', 'normal')->find();
                    }
                    if (!$entry) {
                        return "未搜索到任何匹配信息";
                    }
                    break;
                case 'ask':
                    $blogInfo = get_addon_info('ask');
                    if (!$blogInfo || !$blogInfo['state']) {
                        return "请先在后台管理安装并启用《知识付费问答》插件";
                    }

                    if (isset($content['question_id']) && $content['question_id']) {
                        $entry = \addons\ask\model\Question::get($content['question_id']);
                    } elseif (isset($content['article_id']) && $content['article_id']) {
                        $entry = \addons\ask\model\Article::get($content['article_id']);
                    }

                    if (!$entry && $content['searchquestion']) {
                        $entry = \addons\ask\model\Question::where("title", 'like', "%{$keyword}%")->where('status', 'normal')->find();
                    }
                    if (!$entry && $content['searcharticle']) {
                        $entry = \addons\ask\model\Article::where("title|description", 'like', "%{$keyword}%")->where('status', 'normal')->find();
                    }
                    if (!$entry) {
                        return "未搜索到任何匹配信息";
                    }
                    break;
                case 'vote':
                    $blogInfo = get_addon_info('vote');
                    if (!$blogInfo || !$blogInfo['state']) {
                        return "请先在后台管理安装并启用《在线投票系统》插件";
                    }
                    if (isset($content['subject_id']) && $content['subject_id']) {
                        $entry = \addons\vote\model\Subject::all($content['subject_id']);
                    } elseif (isset($content['player_id']) && $content['player_id']) {
                        $entry = \addons\vote\model\Player::all($content['player_id']);
                    }

                    if (!$entry && $content['searchsubject']) {
                        $entry = \addons\vote\model\Subject::where("title|description", 'like', "%{$keyword}%")->where('status', 'normal')->find();
                    }
                    if (!$entry && $content['searchplayer']) {
                        $entry = \addons\vote\model\Player::where("nickname", 'like', "%{$keyword}%")->where('status', 'normal')->find();
                    }

                    if (!$entry) {
                        return "未搜索到任何匹配信息";
                    }
                    break;
                default:
                    break;
            }
            if (isset($entry) && $entry) {
                $news = new News();
                $news->title = isset($entry['title']) ? $entry['title'] : (isset($entry['nickname']) ? $entry['nickname'] : '');
                $news->url = $entry['fullurl'];
                $news->image = cdnurl($entry['image'], true);
                $news->description = isset($entry['description']) ? $entry['description'] : '';
                $response[] = $news;
            }
        } else {
            $response = isset($content['content']) ? $content['content'] : $response;
        }
        return $response;
    }

    /**
     * 获取Token
     */
    public static function getAccessToken()
    {
        $token = Cache::get('wechat_access_token');
        if (!$token) {
            $config = get_addon_config('wechat');
            $params = [
                'grant_type' => 'client_credential',
                'appid'      => $config['app_id'],
                'secret'     => $config['secret'],
            ];
            $url = "https://api.weixin.qq.com/cgi-bin/token";
            $result = Http::sendRequest($url, $params, 'GET');
            if ($result['ret']) {
                $msg = (array)json_decode($result['msg'], true);
                if (isset($msg['access_token'])) {
                    $token = $msg['access_token'];
                    Cache::set('wechat_access_token', $token, $msg['expires_in'] - 1);
                }
            }
        }
        return $token;
    }

    /**
     * 根据Openid获取用户信息
     * @param string $openid 微信OpenID
     * @return User|null
     */
    public static function getUserByOpenid($openid)
    {
        $third = Third::where('platform', 'wechat')->where('openid', $openid)->find();
        if ($third && $third->user_id) {
            return User::get($third->user_id);
        }
        return null;
    }
}
