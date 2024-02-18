# 单机版本安装

**1.解压安装文件到/opt/module下面**

```shell
tar -zxf apache-flume-1.10.1-bin.tar.gz -C /opt/module/
mv /opt/module/apache-flume-1.10.1-bin /opt/module/flume
cd /opt/module/flume
```

**2.修改conf目录下的log4j2.xml配置文件， 引入控制台输出，方便学习查看日志**

```shell
vim log4j2.xml
```

```xml
    <Root level="INFO">
      <AppenderRef ref="LogFile" />
      <AppenderRef ref="Console" />
    </Root>
```
