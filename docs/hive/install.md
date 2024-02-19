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

```shell
<?xml version="1.0"?>
<?xml-stylesheet type="text/xsl" href="configuration.xsl"?>
<configuration>
    <!--配置Hive保存元数据信息所需的 MySQL URL地址-->
    <property>
        <name>javax.jdo.option.ConnectionURL</name>
        <value>jdbc:mysql://hadoop102:3306/metastore?useSSL=false&amp;useUnicode=true&amp;characterEncoding=UTF-8&amp;allowPublicKeyRetrieval=true</value>
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
