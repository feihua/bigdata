# 单机版本安装

**1.解压安装文件到/opt/module下面**

```shell
tar -zxf kafka_2.12-3.3.1.tgz -C /opt/module/
mv /opt/module/kafka_2.12-3.3.1 /opt/module/kafka

```

**2.启动zookeeper和启动kafka**

```shell
 /opt/module/kafka/bin/zookeeper-server-start.sh -daemon config/zookeeper.properties
 /opt/module/kafka/bin/kafka-server-start.sh -daemon config/server.properties
```

**3.创建topic和查看topic**

```shell
/opt/module/kafka/bin/kafka-topics.sh --create --topic koobe-test --bootstrap-server node1:9092
/opt/module/kafka/bin/kafka-topics.sh --describe --topic koobe-test --bootstrap-server localhost:9092
```

**5.启动生产者**

```shell
/opt/module/kafka/bin/kafka-console-producer.sh --topic koobe-test --bootstrap-server localhost:9092
```

**6.启动消费者**

```shell
/opt/module/kafka/bin/kafka-console-consumer.sh --topic koobe-test --from-beginning --bootstrap-server localhost:9092
```
