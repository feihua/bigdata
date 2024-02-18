# 单机版本安装

**1.解压安装文件到/opt/module下面**

```shell
tar -zxf kafka_2.12-3.3.1.tgz -C /opt/module/
mv /opt/module/kafka_2.12-3.3.1 /opt/module/kafka
cd /opt/module/kafka
```

**2.启动zookeeper**

```shell
 bin/zookeeper-server-start.sh -daemon config/zookeeper.propertie
```

**2.启动kafka**

```shell
bin/kafka-server-start.sh -daemon config/server.properties

```

**3.创建topic**

```shell
bin/kafka-topics.sh --create --topic maxwell --bootstrap-server localhost:9092
```

**4.查看topic**

```shell
bin/kafka-topics.sh --describe --topic quickstart-events --bootstrap-server localhost:9092
```

**5.启动生产者**

```shell
bin/kafka-console-producer.sh --topic quickstart-events --bootstrap-server localhost:9092
```

**6.启动消费者**

```shell
bin/kafka-console-consumer.sh --topic quickstart-events --from-beginning --bootstrap-server localhost:9092
```
