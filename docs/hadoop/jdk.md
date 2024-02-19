# jdk安装

**卸载现有jdk**
```shell
sudo rpm -qa | grep -i java | xargs -n1 sudo rpm -e --nodeps
```

**解压JDK到/opt/module目录下**
```shell
tar -zxvf jdk-8u212-linux-x64.tar.gz -C /opt/module/
mv /opt/module/jdk1.8.0_212 /opt/module/jdk-1.8.0

```

**配置JDK环境变量**

1.新建/etc/profile.d/my_env.sh文件

```shell
sudo vim /etc/profile.d/my_env.sh
```

```shell
#JAVA_HOME
export JAVA_HOME=/opt/module/jdk-1.8.0
export PATH=$PATH:$JAVA_HOME/bin
```
2.让环境变量生效和测试
```shell
source /etc/profile.d/my_env.sh
java -version
```

```shell

java version "1.8.0_212"
Java(TM) SE Runtime Environment (build 1.8.0_212-b10)
Java HotSpot(TM) 64-Bit Server VM (build 25.212-b10, mixed mode)

```
