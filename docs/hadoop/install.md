# 单机版本安装

**设置目录的用户**
```shell
chown -R koobe /opt/module
```

**1.解压安装文件到/opt/module下面**

```shell
tar -zxvf hadoop-3.3.4.tar.gz -C /opt/module/
mv /opt/module/hadoop-3.3.4 /opt/module/hadoop
```

**2.将Hadoop添加到环境变量**

打开/etc/profile.d/my_env.sh文件

```shell
sudo vim /etc/profile.d/my_env.sh
```

在profile文件末尾添加HADOOP_HOME路径

```shell
# HADOOP_HOME
export HADOOP_HOME=/opt/module/hadoop
export PATH=$PATH:$HADOOP_HOME/bin
export PATH=$PATH:$HADOOP_HOME/sbin

```
让环境变量生效和测试
```shell
source /etc/profile.d/my_env.sh
```

**3.添加Hadoop核心配置**

3.1打开hadoop-en.sh文件

```shell
vim /opt/module/hadoop/etc/hadoop/hadoop-env.sh  
```

添加JAVA_HOME配置

```shell
export JAVA_HOME=/opt/module/jdk-1.8.0
```

3.2打开core-site.xml文件

```shell
vim /opt/module/hadoop/etc/hadoop/core-site.xml
```

```xml

<configuration>
    <!-- 指定NameNode的地址 -->
    <property>
        <name>fs.defaultFS</name>
        <value>hdfs://node1:8020</value>
    </property>
    <!-- 指定hadoop数据的存储目录 -->
    <property>
        <name>hadoop.tmp.dir</name>
        <value>/opt/module/hadoop/data</value>
    </property>

    <!-- 配置HDFS网页登录使用的静态用户为koobe -->
    <property>
        <name>hadoop.http.staticuser.user</name>
        <value>koobe</value>
    </property>

    <!-- 配置该koobe(superUser)允许通过代理访问的主机节点 -->
    <property>
        <name>hadoop.proxyuser.koobe.hosts</name>
        <value>*</value>
    </property>
    <!-- 配置该koobe(superUser)允许通过代理用户所属组 -->
    <property>
        <name>hadoop.proxyuser.koobe.groups</name>
        <value>*</value>
    </property>
    <!-- 配置该koobe(superUser)允许通过代理的用户-->
    <property>
        <name>hadoop.proxyuser.koobe.users</name>
        <value>*</value>
    </property>
</configuration>


```

3.3打开hdfs-site.xml 文件

```shell
vim /opt/module/hadoop/etc/hadoop/hdfs-site.xml 
```

```xml

<configuration>
    <!-- HDFS副本数 -->
    <property>
        <name>dfs.replication</name>
        <value>1</value>
    </property>
    <!-- NameNode日志文件目录 -->
    <property>
        <name>dfs.namenode.name.dir</name>
        <value>/opt/module/hadoop/local/dfs/name</value>
    </property>
    <!-- DataNode日志文件目录 -->
    <property>
        <name>dfs.datanode.data.dir</name>
        <value>/opt/module/hadoop/local/dfs/data</value>
    </property>
    <!-- secondaryNode启动服务的节点  -->
    <property>
        <name>dfs.namenode.secondary.http-address</name>
        <value>node1:9868</value>
    </property>
    <!--secondaryNode日志文件目录  -->
    <property>
        <name>dfs.namenode.checkpoint.dir</name>
        <value>/opt/module/hadoop/local/dfs/secondary</value>
    </property>
</configuration>

```

3.yarn-site.xml 文件

```shell
vim /opt/module/hadoop/etc/hadoop/yarn-site.xml 
```

```xml

<configuration>
    <!-- 指定MR走shuffle -->
    <property>
        <name>yarn.nodemanager.aux-services</name>
        <value>mapreduce_shuffle</value>
    </property>

    <!-- 指定ResourceManager的地址-->
    <property>
        <name>yarn.resourcemanager.hostname</name>
        <value>node1</value>
    </property>

    <!-- 环境变量的继承 -->
    <property>
        <name>yarn.nodemanager.env-whitelist</name>
        <value>JAVA_HOME,HADOOP_COMMON_HOME,HADOOP_HDFS_HOME,HADOOP_CONF_DIR,CLASSPATH_PREPEND_DISTCACHE,HADOOP_YARN_HOME,HADOOP_MAPRED_HOME</value>
    </property>

    <!--yarn单个容器允许分配的最大最小内存 -->
    <property>
        <name>yarn.scheduler.minimum-allocation-mb</name>
        <value>512</value>
    </property>
    <property>
        <name>yarn.scheduler.maximum-allocation-mb</name>
        <value>4096</value>
    </property>

    <!-- yarn容器允许管理的物理内存大小 -->
    <property>
        <name>yarn.nodemanager.resource.memory-mb</name>
        <value>4096</value>
    </property>

    <!-- 关闭yarn对物理内存和虚拟内存的限制检查 -->
    <property>
        <name>yarn.nodemanager.pmem-check-enabled</name>
        <value>false</value>
    </property>
    <property>
        <name>yarn.nodemanager.vmem-check-enabled</name>
        <value>false</value>
    </property>
    <!-- 开启日志聚集功能 -->
    <property>
        <name>yarn.log-aggregation-enable</name>
        <value>true</value>
    </property>

    <!-- 设置日志聚集服务器地址 -->
    <property>
        <name>yarn.log.server.url</name>
        <value>http://node1:19888/jobhistory/logs</value>
    </property>

    <!-- 设置日志保留时间为7天 -->
    <property>
        <name>yarn.log-aggregation.retain-seconds</name>
        <value>604800</value>
    </property>

</configuration>

```

3.3打开mapred-site.xml 文件

```shell
vim /opt/module/hadoop/etc/hadoop/mapred-site.xml 
```

```xml

<configuration>
    <!-- 指定MapReduce程序运行在Yarn上 -->
    <property>
        <name>mapreduce.framework.name</name>
        <value>yarn</value>
    </property>
    <!-- 历史服务器端地址 -->
    <property>
        <name>mapreduce.jobhistory.address</name>
        <value>node1:10020</value>
    </property>
    <!-- 历史服务器web端地址 -->
    <property>
        <name>mapreduce.jobhistory.webapp.address</name>
        <value>node1:19888</value>
    </property>

</configuration>


```

3.4打开workers文件

```shell
vim /opt/module/hadoop/etc/hadoop/workers 
```

修改内容为node1

```text
node1
```

3.5初始化HDFS，会创建NameNode需要的目录，并创建空的fsimage

```shell
hdfs namenode -format
```  

3.6启动服务

```shell
sudo /opt/module/hadoop/sbin/start-all.sh
```

浏览器浏览http://node01:9870/
