# binarySearchTree

這是一個使用 ES6 Javascript 時做的基礎 Binary Search Tree.

已經實做完整的 C、R、U、D。

- Create: 新增節點。每個節點須包含兩個變數：
    - `id`: 用以識別此節點的 ID
    - `val`: 用以排序權重

- Read: 查詢、讀取節點。支援兩種功能
    - findById(): 依照 `Id` 進行搜尋。
    - findByVal(): 依照 `Val` 進行搜尋。

- Update: 更新節點。支援依照 `ID` 進行節點的 `Value` 更新。反之不支援。
    - updateById()

- Delete: 刪除節點，支援兩種功能
    - deleteById(): 依照 `Id` 進行刪除，刪除後自動重新調整 bst 架構。
    - deleteByVal(): 依照 `Val` 進行刪除，刪除後自動重新調整 bst 架構。

