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
#!/bin/bash

#1. 判断参数个数
if [ $# -lt 1 ]
then
  echo Not Enough Arguement!
  exit;
fi

#2. 遍历集群所有机器
for host in hadoop102 hadoop103 hadoop104
do
  echo ====================  $host  ====================
  #3. 遍历所有目录，挨个发送
  for file in $@
  do
    #4 判断文件是否存在
    if [ -e $file ]
    then
      #5. 获取父目录
      pdir=$(cd -P $(dirname $file); pwd)
      #6. 获取当前文件的名称
      fname=$(basename $file)
      ssh $host "mkdir -p $pdir"
      rsync -av $pdir/$fname $host:$pdir
    else
      echo $file does not exists!
    fi
  done
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
#!/bin/bash
 
for i in hadoop102 hadoop103 hadoop104
do
    echo --------- $i ----------
    ssh $i "$*"
done

```
修改脚本xsync赋予执行权限和测试
```shell
chmod +x xcall
xcall jps
```

