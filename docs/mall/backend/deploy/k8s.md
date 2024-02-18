# 在k8s上部署

## 1.安装 KubeSphere

参考：[在 Linux 上以 All-in-One 模式安装 KubeSphere](https://www.kubesphere.io/zh/docs/v3.4/quick-start/all-in-one-on-linux/)

```shell
#下载 KubeKey
curl -sfL https://get-kk.kubesphere.io | VERSION=v3.0.13 sh -
#添加可执行权限
chmod +x kk
#设置镜像环境
export KKZONE=cn
#开始安装
./kk create cluster --with-kubernetes v1.22.12 --with-kubesphere v3.4.1
```


## 2.脚本

<font face="宋体" color=red size=5>具体脚本在zero-admin\script\目录</font>

### 2.1 构建镜像

在linux下提供makefile脚本,构建docker镜像

```shell
make image

```

![image-20240105170836180](docker.assets/image-20240105170836180.png)

### 2.2 启动服务

在linux下提供makefile脚本,启动k8s脚本

```shell
make kubectl
```

![image-20240105171510795](k8s.assets/image-20240105171510795.png)

::: tip
serviceaccount.yaml是获取k8s api的权限

register.yaml 是注册中心(etcd或者k8s),如果不配置,注册中心默认为etcd
:::

![image-20240105181451496](k8s.assets/image-20240105181451496.png)



## 3.效果

**3.1项目预览**

![image-20231227094812485](k8s.assets/image-20231227094812485.png)

**3.2项目概览**

![image-20231227094934471](k8s.assets/image-20231227094934471.png)

**3.3项目服务**

![image-20231227095009680](k8s.assets/image-20231227095009680.png)

**3.4工作负载**

![image-20231227095052928](k8s.assets/image-20231227095052928.png)

**3.5容器组**

![image-20231227095111216](k8s.assets/image-20231227095111216.png)

**3.6front-api的deployments**

![image-20231227095234237](k8s.assets/image-20231227095234237.png)

**3.7front-api的pods**

![image-20231227095328574](k8s.assets/image-20231227095328574.png)

**3.8front-api的日志**

![image-20231227095837116](k8s.assets/image-20231227095837116.png)

