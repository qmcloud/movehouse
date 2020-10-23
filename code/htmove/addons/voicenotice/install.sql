CREATE TABLE IF NOT EXISTS `__PREFIX__voicenotice_que` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `aid` int(11) DEFAULT NULL COMMENT '管理员id',
  `state` tinyint(4) NOT NULL COMMENT '0未读',
  `text` tinytext NOT NULL COMMENT '通知内容',
  `createtime` int(11) NOT NULL COMMENT '添加时间',
  `loop` varchar(32) DEFAULT NULL COMMENT '是否循环播放 |播放次数',
  `url_type` varchar(32) DEFAULT NULL COMMENT '打开连接方式 open  addons 弹窗|侧边栏',
  `url` varchar(255) DEFAULT NULL COMMENT '打开弹窗链接',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='消息通知队列';

BEGIN;
INSERT INTO `__PREFIX__voicenotice_que` VALUES ('1', 1, '0', '你有100条新订单!', '0',3,'',''),('2', 1, '0', 'Hey Man ！I can say english！Lets Go!', '0','true','','');
COMMIT;