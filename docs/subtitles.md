# 字幕相关

## 在线字幕

若遇到无法加载的情况，请 portable_config/script-opts 目录下创建`sub_assrt.conf`文件，然后复制以下代码到文件中

```conf
# API token, 可以在 https://assrt.net 上注册账号后在个人界面API密钥获取
api_token=
# 设置是否使用https
use_https=no
# 代理设置
# proxy=""
```

务必填写 `API token`, 可以在 https://assrt.net 上注册账号后在[个人界面](https://secure.assrt.net/usercp.php)API 密钥获取

## 字幕大小、颜色

- 播放器内可设置，仅对当前播放有效
- 永久有效设置
  打开 `mpv.conf` 文件编辑

```conf
# 字体颜色
sub-color="#dadee3"
# 字体大小
sub-font-size=36
```

[mpv subtitles](https://mpv.io/manual/master/#subtitles)
