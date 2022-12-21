# ChatRoom GraphQL ver.

感謝朋朋：B07901113 提供功能完整的 HW7 Code

完成基礎要求
其他功能：刪除訊息

## 安裝

### Frontend

In frontend/ `yarn install`

### Backend

In backend/ `yarn install`

## 開啟

In the project directory, you can run:

### `yarn server`

backend 架在 localhost:5000

### `yarn start` in another terminal

frontend 架在 localhost:3000

### 如果這兩個 port 有東西 所以網站開不起來 可以用下面的指令清空 address

https://stackoverflow.com/questions/4075287/node-express-eaddrinuse-address-already-in-use-kill-server

sudo lsof -i :3000

kill -9 {PID}
