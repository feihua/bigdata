# 创建用户

在root权限下

1）创建koobe用户，并修改koobe用户的密码

#创建用户

```shell
useradd koobe
```

#创建密码

```shell
passwd koobe
```

2）配置koobe用户具有root权限，方便后期加sudo执行root权限的命令

sudoers 文件添加可写权限

```shell
chmod -v u+w /etc/sudoers
```

修改/etc/sudoers文件

```shell
vim /etc/sudoers
```
[
在%wheel这行下面添加一行，如]()下所示：

```shell
koobe  ALL=(ALL)   NOPASSWD:ALL
```

:::tip
注意：koobe这一行不要直接放到root行下面，因为所有用户都属于wheel组，你先配置了koobe具有免密功能，但是程序执行到%wheel行时，该功能又被覆盖回需要密码。所以koobe要放到%wheel这行下面。
:::
最后取消sudoers 文件可写权限

```shell
chmod -v u-w /etc/sudoers
```

查看可以登录系统的用户
```shell
cat /etc/passwd | grep -v /sbin/nologin | cut -d : -f 1
```

查看可以登录系统的用户组
```shell
cat /etc/group | grep -v /sbin/nologin | cut -d : -f 1
```
