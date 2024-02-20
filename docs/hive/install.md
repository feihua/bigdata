# 单机版本安装

**1.解压安装文件到/opt/module下面**

```shell
tar -zxvf hive-3.1.3.tar.gz -C /opt/module/
mv /opt/module/apache-hive-3.1.3-bin /opt/module/hive
cd /opt/module/hive
```

**2.修改/etc/profile.d/my_env.sh，添加环境变量**

```shell
sudo vim /etc/profile.d/my_env.sh
```

添加内容

```shell
#HIVE_HOME
export HIVE_HOME=/opt/module/hive
export PATH=$PATH:$HIVE_HOME/bin


```

让环境变量生效

```shell
source /etc/profile.d/my_env.sh
```

**3.解决日志Jar包冲突，进入/opt/module/hive/lib目录**

```shell
mv /opt/module/hive/lib/log4j-slf4j-impl-2.17.1.jar /opt/module/hive/lib/log4j-slf4j-impl-2.17.1.jar.bak
```

**4.Hive元数据配置到MySQL**

将MySQL的JDBC驱动拷贝到Hive的lib目录下。

```shell
cp /home/koobe/mysql-connector-j-8.0.31.jar /opt/module/hive/lib/
```

**5.配置Metastore到MySQL**

在$HIVE_HOME/conf目录下新建hive-site.xml文件。

```shell
vim /opt/module/hive/conf/hive-site.xml
```

添加如下内容。

```xml
<?xml version="1.0"?>
<?xml-stylesheet type="text/xsl" href="configuration.xsl"?>
<configuration>
    <!--配置Hive保存元数据信息所需的 MySQL URL地址-->
    <property>
        <name>javax.jdo.option.ConnectionURL</name>
        <value>jdbc:mysql://node1:3306/metastore?useSSL=false&amp;useUnicode=true&amp;characterEncoding=UTF-8&amp;allowPublicKeyRetrieval=true</value>
    </property>

    <!--配置Hive连接MySQL的驱动全类名-->
    <property>
        <name>javax.jdo.option.ConnectionDriverName</name>
        <value>com.mysql.cj.jdbc.Driver</value>
    </property>

    <!--配置Hive连接MySQL的用户名 -->
    <property>
        <name>javax.jdo.option.ConnectionUserName</name>
        <value>root</value>
    </property>

    <!--配置Hive连接MySQL的密码 -->
    <property>
        <name>javax.jdo.option.ConnectionPassword</name>
        <value>000000</value>
    </property>

    <property>
        <name>hive.metastore.warehouse.dir</name>
        <value>/user/hive/warehouse</value>
    </property>

    <property>
        <name>hive.metastore.schema.verification</name>
        <value>false</value>
    </property>

    <property>
        <name>hive.server2.thrift.port</name>
        <value>10000</value>
    </property>

    <property>
        <name>hive.server2.thrift.bind.host</name>
        <value>node1</value>
    </property>

    <property>
        <name>hive.metastore.event.db.notification.api.auth</name>
        <value>false</value>
    </property>

    <property>
        <name>hive.cli.print.header</name>
        <value>true</value>
    </property>

    <property>
        <name>hive.cli.print.current.db</name>
        <value>true</value>
    </property>
</configuration>
```

**6.启动Hive**

新建Hive元数据库

```shell
mysql> create database metastore;
```

**7.初始化Hive元数据库**

```shell
/opt/module/hive/bin/schematool -initSchema -dbType mysql -verbose
```

**7.修改元数据库字符集**

Hive元数据库的字符集默认为Latin1，由于其不支持中文字符，所以建表语句中如果包含中文注释，会出现乱码现象。如需解决乱码问题，须做以下修改。
修改Hive元数据库中存储注释的字段的字符集为utf-8。
（1）字段注释和表注释

```shell
mysql> use metastore;
mysql> alter table COLUMNS_V2 modify column COMMENT varchar(256) character set utf8;
mysql> alter table TABLE_PARAMS modify column PARAM_VALUE mediumtext character set utf8;
```

**8.启动Hive客户端**

```shell
/opt/module/hive/bin/hive
```

2）查看一下数据库

```shell
hive (default)> show databases;
OK
database_name
default
Time taken: 0.955 seconds, Fetched: 1 row(s)
```

**9.启动hiveservice2服务**

```shell
nohup /opt/module/hive/bin/hive --service metastore &
nohup /opt/module/hive/bin/hive --service hiveserver2 &

```

```shell
/opt/module/hive/bin/hive --service hiveserver2 stop

```

**10.Hive on Spark配置**

上传并解压解压spark-3.3.1-bin-without-hadoop.tgz

```shell
tar -zxvf spark-3.3.1-bin-without-hadoop.tgz -C /opt/module/
mv /opt/module/spark-3.3.1-bin-without-hadoop /opt/module/spark

```

修改spark-env.sh配置文件

```shell
mv /opt/module/spark/conf/spark-env.sh.template /opt/module/spark/conf/spark-env.sh
```

编辑文件

```shell
vim /opt/module/spark/conf/spark-env.sh
```

增加如下内容。

```shell
export SPARK_DIST_CLASSPATH=$(hadoop classpath)
```

配置SPARK_HOME环境变量

```shell
sudo vim /etc/profile.d/my_env.sh
```

添加如下内容。

```shell
export SPARK_HOME=/opt/module/spark
export PATH=$PATH:$SPARK_HOME/bin
```

source 使其生效。

```shell
source /etc/profile.d/my_env.sh
```

在hive中创建spark配置文件

```shell
vim /opt/module/hive/conf/spark-defaults.conf
```

添加如下内容（在执行任务时，会根据如下参数执行）。

```text
spark.master                             yarn
spark.eventLog.enabled                   true
spark.eventLog.dir                       hdfs://node1:8020/spark-history
spark.executor.memory                    1g
spark.driver.memory					     1g
```

在HDFS创建如下路径，用于存储历史日志。

```shell
hadoop fs -mkdir /spark-history
```

（5）向HDFS上传Spark纯净版jar包
说明1：采用Spark纯净版jar包，不包含hadoop和hive相关依赖，能避免依赖冲突。
说明2：Hive任务最终由Spark来执行，Spark任务资源分配由Yarn来调度，该任务有可能被分配到集群的任何一个节点。所以需要将Spark的依赖上传到HDFS集群路径，这样集群中任何一个节点都能获取到。

```shell
hadoop fs -mkdir /spark-jars
hadoop fs -put /opt/module/spark/jars/* /spark-jars
```

修改hive-site.xml文件

```shell
vim /opt/module/hive/conf/hive-site.xml
```

添加如下内容。

```text
<!--Spark依赖位置（注意：端口号8020必须和namenode的端口号一致）-->
<property>
    <name>spark.yarn.jars</name>
    <value>hdfs://node1:8020/spark-jars/*</value>
</property>

<!--Hive执行引擎-->
<property>
    <name>hive.execution.engine</name>
    <value>spark</value>
</property>
```

Hive on Spark测试

**11.启动Hive客户端**

```shell
/opt/module/hive/bin/hive
```

```shell
hive (default)> create table student(id int, name string);
hive (default)> insert into table student values(1,'abc');
```

增加ApplicationMaster资源比例

```shell
vim /opt/module/hadoop/etc/hadoop/capacity-scheduler.xml
```
默认为0.1，修改为0.8

```xml
<property>
    <name>yarn.scheduler.capacity.maximum-am-resource-percent</name>
    <value>0.8</value>
</property>
```
修改完后要重启hadoop
