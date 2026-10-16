# 自定义

> [!TIP]
> 如何自定义配置 `mpv.conf` 与快捷键/菜单 `input.conf` 、`script-opts/` 目录中的任意`.conf`文件，在更新版本时直接覆盖不受影响？

## 自定义配置（`mpv.conf` 与 任意`.conf`文件）

> - 为了达到在更新版本时直接覆盖不受影响，需要在不修改 mpv.conf 和任意`script-opts/xxx.conf` 的配置项的情况下改变其中的内容
> - [相关 issue](https://github.com/akFace/mpv.config/issues/19)， 方案如下：

1. 在 mpv.conf 同目录下创建文件并重命名为：custom-opts.conf
2. 编辑 mpv.conf 配置，然后写入 `include = "~~/custom-opts.conf"`
3. 编辑 custom-opts.conf 文件
   写入需要自定义的内容，例如：

```
# 启动默认声音大小
volume=80
# 修改默认 modernz 配置
script-opts-append = modernz-layout=mini
script-opts-append = "modernz-seekbarfg_color=#cd0b9b"
script-opts-append = "modernz-seekbarbg_color=#077d55"
```

- 这样就可以改变 modernZ 的配置：`script-opts-append = modernz-layout=mini` 就是改变 modernz.conf 中 layout 的值
- 语法：`script-opts-append = <脚本>-<脚本的选项>=<值> ` 这样可以修改 script-opts/文件夹下任何配置的值
- 再比如：`script-opts-append = uosc_danmaku-fontsize=40` 这个就修改了 `uosc_danmaku.conf` 配置中的 fontsize 的值

---

一套 modernZ 主题/主要颜色，`custom-opts.conf` 文件内容示例：

```
# 进度条颜色
script-opts-append = "modernz-seekbarfg_color=#00AEEC"
# 剩余进度条的颜色
script-opts-append = "modernz-seekbarbg_color=#999999"
# 进度条缓存颜色
script-opts-append = "modernz-seekbar_cache_color=#FF6699"
#  进度条滑块的颜色
script-opts-append = "modernz-seek_handle_color=#0083B5"
# 绘制在进度条滑块内边框颜色
script-opts-append = "modernz-seek_handle_border_color=#076792"
# 鼠标悬停在按钮上的颜色
script-opts-append = "modernz-hover_effect_color=#FF6699"
```

## 自定义快捷键/菜单（`input.conf`）

> - 方案如下：

1. 若要增加或者修改快捷键/菜单，请在 input.conf 文件同目录下，新建文件并重命名为：custom-input.conf，然后在里边增加或修改快捷键/菜单，写法和 input.conf 保持一致。
2. 修改完后请在播放器中，按右键：工具 > 合并自定义快捷键/菜单 合并后重启播放器生效
3. 这样做的目的是避免直接修改 input.conf 导致更新覆盖，丢失了自己新增/修改的内容。

### 一些技巧

> [issues：#19](https://github.com/akFace/mpv.config/issues/19#issuecomment-5856332146) 怎么去除已有菜单项和快捷键？不直接编辑 input.conf，就无法注释了。

在 `custom-input.conf` 里，**没有办法“删除”`input.conf` 里的某条绑定**，但你完全可以用**重新绑定同一个键**来达到“覆盖”的效果。

### ✅ 做法：用同一个键重新绑定

比如 `input.conf` 里有：

```conf
Ctrl+s   stop    #menu: 回放 > 停止
```

你想在 `custom-input.conf` 里把它“去掉”，就写：

```conf
Ctrl+s   ignore
```

合并后，`input.conf` 里 `Ctrl+s` 那行会被替换成 `Ctrl+s ignore`，这个键就什么都不做了。

### 📋 各种“删除”场景的写法

| 想达到的效果             | 在 custom-input.conf 里写                                          |
| ------------------------ | ------------------------------------------------------------------ |
| 让某个键完全失效         | `Ctrl+s  ignore`                                                   |
| 让某个键在菜单里消失     | `Ctrl+s  ignore`（不带 `#menu:` 注释，合并后菜单项也一并被替换掉） |
| 让某个键改成执行别的命令 | `Ctrl+s  你的新命令`                                               |
| 让某个键在特定条件下失效 | `Ctrl+s  ignore  #@state=(...)`（但通常不需要这么绕）              |
