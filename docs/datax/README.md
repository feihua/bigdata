# 快速入门


**1.解压安装文件到/opt/module下面**

```shell
tar -zxvf datax.tar.gz -C /opt/module/
python /opt/module/datax/bin/datax.py /opt/module/datax/job/job.json
```
看到如下表示安装成功

```text

2024-02-20 15:28:40.906 [job-0] INFO  JobContainer - PerfTrace not enable!
2024-02-20 15:28:40.907 [job-0] INFO  StandAloneJobContainerCommunicator - Total 100000 records, 2600000 bytes | Speed 253.91KB/s, 10000 records/s | Error 0 records, 0 bytes |  All Task WaitWriterTime 0.026s |  All Task WaitReaderTime 0.050s | Percentage 100.00%
2024-02-20 15:28:40.908 [job-0] INFO  JobContainer -
任务启动时刻                    : 2024-02-20 15:28:30
任务结束时刻                    : 2024-02-20 15:28:40
任务总计耗时                    :                 10s
任务平均流量                    :          253.91KB/s
记录写入速度                    :          10000rec/s
读出记录总数                    :              100000
读写失败总数                    :                   0



```

