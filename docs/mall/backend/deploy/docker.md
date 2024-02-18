# 在docker上部署

## 安装docker

```shell
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
```

![image-20240104171801989](docker.assets/image-20240104171801989.png)

## 构建镜像

在linux下提供makefile脚本,构建docker镜像

```shell
make image

```

![image-20240105170836180](docker.assets/image-20240105170836180.png)

## 启动服务

在linux下提供makefile脚本,启动docker镜像

```shell
make run
```

![image-20240105171026136](docker.assets/image-20240105171026136.png)

![image-20240105175549864](docker.assets/image-20240105175549864.png)

::: tip
**具体脚本在zero-admin\makefile**
:::
