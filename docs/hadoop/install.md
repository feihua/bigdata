# 单机版本安装

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
<!--配置NameNode服务启动的节点  -->
<property>
    <name>fs.defaultFS</name>
    <value>hdfs://node01:9000</value>
</property>
```

3.3打开hdfs-site.xml 文件

```shell
vim /opt/module/hadoop/etc/hadoop/hdfs-site.xml 
```

```xml
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
<value>node01:9868</value>
</property>
        <!--secondaryNode日志文件目录  -->
<property>
<name>dfs.namenode.checkpoint.dir</name>
<value>/opt/module/hadoop/local/dfs/secondary</value>
</property>
```

3.4打开workers文件

```shell
vim /opt/module/hadoop/etc/hadoop/workers 
```

修改内容为node01

```text
node01
```

3.5初始化HDFS，会创建NameNode需要的目录，并创建空的fsimage

```shell
hdfs namenode -format
```  

3.6启动服务

```shell
/opt/module/hadoop/sbin/start-all.sh
```

浏览器浏览http://node01:9870/
