# vue-router

## 权限管理

### jwt

通过json交互（jwt: json web token)

1. 用户登录 ===》 后端接收用户名密码，返回一个token（包含用户id，过期时间）
2. 登录成功，拿到token存储storage
3. axios拦截器
   1. 每次发请求前，都获取storage里面的token，放在http的header上
   2. 后端接收请求，会校验header，根据你接口是否需要权限
      - 需要权限，token过期，前端跳转
      - 用户通过，返回useridfo，包含用户名，路有权限表（addRouter)

