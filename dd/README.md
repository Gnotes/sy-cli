## React Hook FAQ

Some FAQs About React Hook

> Reack Hook 使用时，在事件监听中不能获取 `useState` 最新的 `value` 值，而值表现为上一次快照或初始的值?

答： 因为生成了“快照” 或 “闭包”引用！查看 [Code Pen](https://codepen.io/xing_he/pen/QWjeqjL)、[参考链接](https://segmentfault.com/q/1010000018274513)
