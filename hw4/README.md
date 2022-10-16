# HW4 MineSweeper

![](https://i.imgur.com/pfsPBRR.png)

## [Demo Video](https://www.youtube.com/watch?v=mDx4bi-rA-Q)

## 基本要求

1. HomePage 和 Board 的跳轉
2. 用 map 來建立踩地雷的版面
3. 插旗子/拔旗子的功能
4. 踩地雷的遊戲功能

## 進階要求

1. 可以調整難易度，如果有地雷數量大於格子數就不能按 start game 進入遊戲。因為數字太大助教給的排版會整個爛掉，所以設定板子最大是 20\*20
2. 實作 Modal，在輸/贏遊戲有 Game Over/Win 兩種字樣，restart/new game 兩種按鈕
3. 在 Dashboard 做計時器的功能，但是有時候會有一點延遲，在 Modal 出現後會多跳一秒，應該是因為助教的 sample code 那邊 modal 出現的時間本來就有些微延遲，所以應該是正常，霸拖不要因為這個給我評 pass QQ
4. 那個聰明的 reveal function，我是設定如果翻開的格子 value 是 0，那他周圍附近的 8 個格子會自動翻開，需要處理四個邊的情況，不然會噴錯= =
