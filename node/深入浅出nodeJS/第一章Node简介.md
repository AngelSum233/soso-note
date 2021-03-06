#### 阻塞I/O

通常IO操作都是阻塞I/O的，如果没有数据收到，那么线程或者进程就会被==挂起==，直到收到数据。阻塞I/O就是等着数据过来，进行读写操作。应用的函数进行调用，但是内核一直没有返回，就一直等着。应用的函数长时间处于等待结果的状态，我们就称为阻塞I/O。

#### 非阻塞I/O

当你调用read时，如果有数据收到，就返回数据，如果没有数据收到，就立刻返回一个错误。但是==需要不断的轮询来读取或写入==。

#### I/O多路复用（事件驱动模型）

==多路复用==是指使用一个线程来检查多个文件描述符（Socket）的就绪状态。比如调用select和poll函数，传入多个文件描述符（FileDescription，简称FD），如果有一个文件描述符（FileDescription）就绪，则返回，否则阻塞直到超时。得到就绪状态后进行真正的操作可以在同一个线程里执行，也可以启动线程执行（比如使用线程池）。**同一个线程内同时处理多个IO请求的目的。**

#### Node的特点

node的结构和chrome十分相似，他们都是基于事件驱动的异步框架。Node通过事件驱动来服务I/O。

![pic2](E:\soso\soso-note\assets\pic2.png)
