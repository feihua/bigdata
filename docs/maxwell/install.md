# 单机版本安装

**1.解压安装文件到/opt/module下面**

```shell
tar -zxvf maxwell-1.29.2.tar.gz -C /opt/module/
mv /opt/module/maxwell-1.29.2 /opt/module/maxwell
cd /opt/module/maxwell
```

**2.配置MySQL**

打开/etc/my.cnf文件

```shell
sudo vim /etc/my.cnf
```

```text
#数据库id
server-id = 1
#启动binlog，该参数的值会作为binlog的文件名
log-bin=mysql-bin
#binlog类型，maxwell要求为row类型
binlog_format=row
#启用binlog的数据库，需根据实际情况作出修改
binlog-do-db=demo


```

**3.创建Maxwell所需数据库和用户**

Maxwell需要在MySQL中存储其运行过程中的所需的一些数据，包括binlog同步的断点位置（Maxwell支持断点续传）等，故需要在MySQL为Maxwell创建数据库及用户。
1）创建数据库

```shell
CREATE DATABASE maxwell;
```

2）创建Maxwell用户并赋予其必要权限

```shell
CREATE USER 'maxwell'@'%' IDENTIFIED BY 'maxwell';
GRANT ALL ON maxwell.* TO 'maxwell'@'%';
GRANT SELECT, REPLICATION CLIENT, REPLICATION SLAVE ON *.* TO 'maxwell'@'%';
```

**4.配置Maxwell**

1）修改Maxwell配置文件名称

```shell
cd /opt/module/maxwell
cp config.properties.example config.properties
```

2）修改Maxwell配置文件

```shell
vim config.properties
```

```text
#Maxwell数据发送目的地，可选配置有stdout|file|kafka|kinesis|pubsub|sqs|rabbitmq|redis
producer=kafka
# 目标Kafka集群地址
kafka.bootstrap.servers=localhost:9092
#目标Kafka topic，可静态配置，例如:maxwell，也可动态配置，例如：%{database}_%{table}
kafka_topic=topic_db

# MySQL相关配置
host=localhost
user=maxwell
password=maxwell
jdbc_options=useSSL=false&serverTimezone=Asia/Shanghai&allowPublicKeyRetrieval=true

# 过滤gozero中的sys_log表数据，该表是日志数据的备份，无须采集
filter=exclude:gozero.sys_log
# 指定数据按照主键分组进入Kafka不同分区，避免数据倾斜
producer_partition_by=primary_key
```

**5.Maxwell启停**

1）启动Maxwell

```shell
/opt/module/maxwell/bin/maxwell --config /opt/module/maxwell/config.properties --daemon
```

2）停止Maxwell

```shell
ps -ef | grep com.zendesk.maxwell.Maxwell | grep -v grep | awk '{print $2}' | xargs kill -9
```

**6.Maxwell启停脚本**

（1）创建并编辑Maxwell启停脚本

```shell
vim mxw.sh
```

（2）脚本内容如下

```shell
#!/bin/bash

MAXWELL_HOME=/opt/module/maxwell

status_maxwell(){
    result=`ps -ef | grep com.zendesk.maxwell.Maxwell | grep -v grep | wc -l`
    return $result
}


start_maxwell(){
    status_maxwell
    if [[ $? -lt 1 ]]; then
        echo "启动Maxwell"
        $MAXWELL_HOME/bin/maxwell --config $MAXWELL_HOME/config.properties --daemon
    else
        echo "Maxwell正在运行"
    fi
}


stop_maxwell(){
    status_maxwell
    if [[ $? -gt 0 ]]; then
        echo "停止Maxwell"
        ps -ef | grep com.zendesk.maxwell.Maxwell | grep -v grep | awk '{print $2}' | xargs kill -9
    else
        echo "Maxwell未在运行"
    fi
}


case $1 in
    start )
        start_maxwell
    ;;
    stop )
        stop_maxwell
    ;;
    restart )
       stop_maxwell
       start_maxwell
    ;;
esac
```

**7.历史数据全量同步**

Maxwell提供了bootstrap功能来进行历史数据的全量同步，命令如下：

```shell
/opt/module/maxwell/bin/maxwell-bootstrap --database gozero --table sys_user --config /opt/module/maxwell/config.properties
```
