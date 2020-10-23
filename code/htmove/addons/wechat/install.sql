
CREATE TABLE IF NOT EXISTS `__PREFIX__wechat_autoreply` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL DEFAULT '' COMMENT '标题',
  `text` varchar(100) NOT NULL DEFAULT '' COMMENT '触发文本',
  `eventkey` varchar(50) NOT NULL DEFAULT '' COMMENT '响应事件',
  `remark` varchar(255) NOT NULL DEFAULT '' COMMENT '备注',
  `weigh` int(10) NOT NULL DEFAULT '0' COMMENT '权重',
  `createtime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '添加时间',
  `updatetime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  `status` varchar(30) NOT NULL DEFAULT '' COMMENT '状态',
  PRIMARY KEY (`id`),
  KEY `eventkey` (`eventkey`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='微信自动回复表';

BEGIN;
INSERT INTO `__PREFIX__wechat_autoreply`(`id`, `title`, `text`, `eventkey`, `remark`, `weigh`, `createtime`, `updatetime`, `status`) VALUES (1, '输入hello', 'hello', '58c7d908c4570', '', 1, 1493366855, 1493366855, 'normal');
INSERT INTO `__PREFIX__wechat_autoreply`(`id`, `title`, `text`, `eventkey`, `remark`, `weigh`, `createtime`, `updatetime`, `status`) VALUES (2, '输入你好', '你好', '58fdfaa9e1965', '', 2, 1493704976, 1493704976, 'normal');
COMMIT;

CREATE TABLE IF NOT EXISTS `__PREFIX__wechat_captcha` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `event` varchar(100) DEFAULT '' COMMENT '事件',
  `openid` varchar(255) DEFAULT NULL COMMENT '用户openid',
  `context` varchar(20) DEFAULT NULL COMMENT '上下文',
  `code` varchar(30) DEFAULT NULL COMMENT '验证码',
  `times` int(10) unsigned DEFAULT '0' COMMENT '验证次数',
  `ip` varchar(50) DEFAULT '' COMMENT 'IP',
  `createtime` int(10) DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `ip` (`ip`,`event`) USING BTREE,
  KEY `openid` (`openid`(191),`event`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='微信公众号验证码';

CREATE TABLE IF NOT EXISTS `__PREFIX__wechat_config` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '' COMMENT '配置名称',
  `title` varchar(50) NOT NULL DEFAULT '' COMMENT '配置标题',
  `value` text NOT NULL COMMENT '配置值',
  `createtime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `updatetime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='微信配置表';

BEGIN;
INSERT INTO `__PREFIX__wechat_config` VALUES ('1', 'menu', '微信菜单', '[{\"name\":\"FastAdmin\",\"sub_button\":[{\"name\":\"官网\",\"type\":\"view\",\"url\":\"http:\\/\\/www.fastadmin.net\"},{\"name\":\"在线演示\",\"type\":\"click\",\"key\":\"\"},{\"name\":\"文档\",\"type\":\"view\",\"url\":\"http:\\/\\/doc.fastadmin.net\"}]},{\"name\":\"在线客服\",\"type\":\"click\",\"key\":\"58cb852984970\"},{\"name\":\"关于我们\",\"type\":\"click\",\"key\":\"58bf944aa0777\"}]', '1497398820', '1500538185'), ('2', 'service', '客服配置', '{\"onlinetime\":\"09:00-18:00\",\"offlinemsg\":\"请在工作时间联系客服！\",\"nosessionmsg\":\"当前没有客服在线！请稍后重试！\",\"waitformsg\":\"请问有什么可以帮到您？\"}', '1497429674', '1497429674'), ('3', 'signin', '连续登录配置', '{\"s1\":\"100\",\"s2\":\"200\",\"s3\":\"300\",\"sn\":\"500\"}', '1497429711', '1497429711');
COMMIT;

CREATE TABLE IF NOT EXISTS `__PREFIX__wechat_context` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `openid` varchar(64) NOT NULL DEFAULT '',
  `type` varchar(30) NOT NULL DEFAULT '' COMMENT '类型',
  `eventkey` varchar(64) NOT NULL DEFAULT '',
  `command` varchar(64) NOT NULL DEFAULT '',
  `message` varchar(255) NOT NULL DEFAULT '' COMMENT '内容',
  `refreshtime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '最后刷新时间',
  `createtime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `updatetime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `openid` (`openid`,`eventkey`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='微信上下文表';

CREATE TABLE IF NOT EXISTS `__PREFIX__wechat_response` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL DEFAULT '' COMMENT '资源名',
  `eventkey` varchar(128) NOT NULL DEFAULT '' COMMENT '事件',
  `type` enum('text','image','news','voice','video','music','link','app') NOT NULL DEFAULT 'text' COMMENT '类型',
  `content` text NOT NULL COMMENT '内容',
  `remark` varchar(255) NOT NULL DEFAULT '' COMMENT '备注',
  `createtime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `updatetime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  `status` varchar(30) NOT NULL DEFAULT '' COMMENT '状态',
  PRIMARY KEY (`id`),
  UNIQUE KEY `eventkey` (`eventkey`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='微信资源表';

BEGIN;
INSERT INTO `__PREFIX__wechat_response` VALUES ('1', '签到送积分', '58adaf7876aab', 'app', '{\"app\":\"signin\"}', '', '1487777656', '1487777656', 'normal'), ('2', '关于我们', '58bf944aa0777', 'app', '{\"app\":\"page\",\"id\":\"1\"}', '', '1488950346', '1488950346', 'normal'), ('3', '自动回复1', '58c7d908c4570', 'text', '{\"content\":\"world\"}', '', '1489492232', '1489492232', 'normal'), ('5', '自动回复2', '58fdfaa9e1965', 'text', '{\"content\":\"我是FastAdmin!\"}', '', '1493039785', '1493039785', 'normal');
COMMIT;

