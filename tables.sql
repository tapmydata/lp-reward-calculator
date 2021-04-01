CREATE TABLE `trans` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Txhash` varchar(255) NOT NULL DEFAULT '',
  `Blockno` int(11) DEFAULT NULL,
  `UnixTimestamp` int(11) DEFAULT NULL,
  `From` varchar(255) DEFAULT NULL,
  `To` varchar(255) DEFAULT NULL,
  `Quantity` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `awards` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `address` varchar(200) DEFAULT NULL,
  `amount` double(18,9) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2548737 DEFAULT CHARSET=utf8;