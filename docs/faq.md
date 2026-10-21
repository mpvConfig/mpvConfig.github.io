# 一些常用设置&推荐

- 如何更新到最新版：[Link](./update.md)
- 怎么修改和增加快捷键？  
  快捷键设置文件在 `portable_config/input.conf` 打开编辑可看到，参考其中的设置即可（不懂可问 AI）
- 视频增强里边都是什么？怎么使用？：[滤镜](./shaders.md)、[插帧模式](./Interpolation.md)
- 怎么增加别的插帧功能？：[插帧模式](./Interpolation.md)
- 怎么设置界面，太小了或者太大了？：[Link](./conf.md)
- 弹幕太小或者太大了怎么设置？：[Link](./conf.md)
- 弹幕没法加载？ [相关问题](https://github.com/Tony15246/uosc_danmaku/issues)
- **关于弹幕流畅度问题**，目前本人的设备屏幕是 4k60hz，要打开视频同步帧 `display-resample` 才流畅，但有些用户的设备打开此设置开倍速播放会导致声音卡问题，因此现在默认关闭，需要打开的：右键菜单 > 弹幕 > 同步视频帧 即可

---

- 直接粘贴播放 B 站、YouTube 视频或其他链接：安装 [yt-dlp](https://github.com/yt-dlp/yt-dlp/releases) ，进入下载 yt-dlp.exe，放到 `mpv.exe` 同目录下，即：播放器安装目录。重启即可直接粘贴视频页面链接，不过更推荐下边的浏览器插件
- **推荐：** 油猴脚本 👉 [play-with-mpv 使用 mpv 播放网页中的视频](https://github.com/akFace/play-with-mpv)
