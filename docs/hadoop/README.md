# 常用脚本

## 1.配置免密

```shell
#1.生成公私钥
ssh-keygen -t rsa

#2.分发公钥
ssh-copy-id hadoop102

```

## 2.集群分发脚本

```shell
vim xsync
```

在该文件中编写如下代码

```shell
#! /bin/bash
#xsync /opt/module/java a.txt
#1、判断参数是否传入
if [ $# -lt 1 ]
then
	echo "必须传入至少一个待分发的目录或者文件..."
	exit
fi
#2、遍历参数
# $*: 获取所有参数
# $@: 获取所有参数
# $*与$@的区别: 区别在于如果使用双引号包裹了,"$*"是将所有参数当做一个整体,"$@"是将参数当做一个个的单独的个体
for f in $*
do
	#3、判断目录/文件是否存在,如果不存在则不发送
	#-e: 判断目录/文件是否存在
	#-f: 判断是否为文件
	#-d: 判断是否为目录
	if [ -e $f ]
	then
		#4、获取当前待分发的目录/文件的父目录以及目录名和文件名
		pdir=$(cd $(dirname $f);pwd)
		fname=$(basename $f)
		#5、遍历服务器
		for host in hadoop102 hadoop103 hadoop104
		do
			#6、创建存储目录/文件的父目录
			echo "==================$host=================="
			ssh $host "mkdir -p $pdir"
			#7、发送
			rsync -av $pdir/$fname $host:$pdir
		done
	fi
done

```

修改脚本xsync赋予执行权限

```shell
chmod +x xsync
```

测试脚本

```shell
xsync xsync
```

## 3.批量执行脚本

```shell
vim xcall
```

在该文件中编写如下代码

```shell
#! /bin/bash
#xcall mkdir -p /opt/module/xxx
#1、判断参数是否传入
if [ $# -lt 1 ]
then
	echo "必须传入待执行的指令..."
	exit
fi
#2、循环主机,批量执行命令
for host in hadoop102 hadoop103 hadoop104
do
	echo "==============$host=============="
	ssh $host "$*"
done

```

修改脚本xsync赋予执行权限和测试

```shell
chmod +x xcall
xcall jps
```

