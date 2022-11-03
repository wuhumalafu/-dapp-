# 去中心化学生社团组织治理网站项目介绍

## 功能和实现分析

- 设置2种类型的数据结构proposal和vote，分别为活动提案和投票，其中活动提案需记录id，提出者，支持人数，反对人数，投票开始时间，反对时间等内容，投票需记录id，投票内容，投票对象等内容。
- 主要功能函数有3个，发布提案，发布投票和检验当前提案状态。
  - 发布提案中需保证新建提案的反对时间要晚于开始时间。
  - 发布投票需保证投票对象处于可投票时间区间内且该账号没有对这一对象反复投票
  - 检验状态会在通过后给活动提出者提供一些奖励。




## 如何运行此项目（使用步骤）

1. 安装Node.js(以及yarn或npm)，以太坊ganache客户端，Chrome插件Metamask。

2. 使用Node.js安装truffle框架： 

   在控制台下输入`npm install truffle`进行安装

3. 打开ganache客户端，并连接到7545端口。

   在ganache软件上选择 quickstart，单击右上角齿轮图标进行设置。并在 workspace 标签页中 add project 选中 [./contracts/truffle-config.js](./contracts/truffle-config.js)，在server标签卡中将端口改为8545（metamask有一个localhost 8545的端口，比较方便运行测试）。单击右上角 save and restart完成设置。

4. 编译智能合约文件

   在 [./contracts](./public-offering/src/utils) 目录下按顺序运行：`truffle compile` 和 `truffle migrations`，将生成智能合约的地址复制到[contracts.ts](./public-offering/src/utils/contracts.ts)文件中的contractAddr变量，使得程序可以正确调用合约方法。

5. 安装依赖包

   在 [./public-offering](./public-offering) 目录下运行`npm i` 

6. 运行应用

   输入`npm start`在弹出的网页界面便可以进行操作

   ​    

## 项目运行成功的关键界面和关键截图

针对本项目的关键功能，我选取了几个具有代表性的用例来验证项目的可行性。

- 发起活动流程

![image-20221103180254642](C:\Users\yyf\AppData\Roaming\Typora\typora-user-images\image-20221103180254642.png)

![image-20221103180416207](C:\Users\yyf\AppData\Roaming\Typora\typora-user-images\image-20221103180416207.png) 

![image-20221103190943362](C:\Users\yyf\AppData\Roaming\Typora\typora-user-images\image-20221103190943362.png)

![image-20221103180451301](C:\Users\yyf\AppData\Roaming\Typora\typora-user-images\image-20221103180451301.png)



- 投票流程

  - 同一用户自身项目第一次投票过程![image-20221103191706503](C:\Users\yyf\AppData\Roaming\Typora\typora-user-images\image-20221103191706503.png)![image-20221103191744232](C:\Users\yyf\AppData\Roaming\Typora\typora-user-images\image-20221103191744232.png)![image-20221103191755266](C:\Users\yyf\AppData\Roaming\Typora\typora-user-images\image-20221103191755266.png)

  

  - 同一用户第二次或更多次投票过程![image-20221103191903554](C:\Users\yyf\AppData\Roaming\Typora\typora-user-images\image-20221103191903554.png)![image-20221103192001790](C:\Users\yyf\AppData\Roaming\Typora\typora-user-images\image-20221103192001790.png)![image-20221103192025972](C:\Users\yyf\AppData\Roaming\Typora\typora-user-images\image-20221103192025972.png)

    

  - 给他人活动投票

    ![image-20221103192336316](C:\Users\yyf\AppData\Roaming\Typora\typora-user-images\image-20221103192336316.png)![image-20221103192428765](C:\Users\yyf\AppData\Roaming\Typora\typora-user-images\image-20221103192428765.png)![image-20221103192608355](C:\Users\yyf\AppData\Roaming\Typora\typora-user-images\image-20221103192608355.png)![image-20221103192705638](C:\Users\yyf\AppData\Roaming\Typora\typora-user-images\image-20221103192705638.png)

    

- 活动结束

  活动结束之后如果此活动通过，发起者会获得一笔gas。![image-20221103192922131](C:\Users\yyf\AppData\Roaming\Typora\typora-user-images\image-20221103192922131.png)![image-20221103193034161](C:\Users\yyf\AppData\Roaming\Typora\typora-user-images\image-20221103193034161.png)![image-20221103193114353](C:\Users\yyf\AppData\Roaming\Typora\typora-user-images\image-20221103193114353.png)













