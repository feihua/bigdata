# 常用脚本

## 1.分发脚本
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

## 2.app下载地址
1. **android** 版本体验地址 [flutter-mall-app](https://www.pgyer.com/OoW2Zy)
2. **ios** 需要自己下载源码打包

## 3.KubeSphere地址
[http://110.41.179.89:30880/login](http://110.41.179.89:30880/login)    账号：demo1 密码: 123456@Pass
