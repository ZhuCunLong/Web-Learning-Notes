# fetch和ajax异同

- Api设计

  - ajax基于XMLHttpRequest，是通过传统回调的方式来处理不同的事件

  - fetct是基于Promise的
- 错误处理

  - **Ajax**：可以通过 XMLHttpRequest 对象的 `onreadystatechange` 事件以及 `status` 属性判断请求是否成功或失败。
  - **Fetch**：Fetch 仅针对网络层面的错误抛出异常，对于非 200 状态码的 HTTP 响应，默认并不视为错误，需要开发者自行检查响应的状态码并在必要时抛出错误。
- Cookie 和 Credentials
  - **Ajax**：默认情况下，同源请求会携带 cookies，跨域请求时需设置相关标志才能携带。
  - **Fetch**：默认情况下，fetch 不会自动携带 cookies，除非设置了 `credentials: 'include'` 选项。