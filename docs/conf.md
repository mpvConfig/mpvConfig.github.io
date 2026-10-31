# 界面设置

## 用户可自定义自己的界面效果（界面大小，字体大小、颜色各种样式等）

> [!IMPORTANT]
>
> 建议配合 ⇢ [自定义配置](./custom.md) 修改使用，因为切换主题颜色部分设置会被覆盖  
> 要修改请使用文本编辑器/或其他编辑器打开编辑

- **uosc** 主题自定义文档：[uosc](https://github.com/tomasklaen/uosc#options)  
  文件位置：`script-opts/uosc.conf`

---

- **ModernZ** 主题自定义文档：[ModernZ](https://github.com/Samillion/ModernZ#customization)  
  文件位置：`script-opts/modernz.conf`

---

- **ModernGlass** 主题自定义文档：[ModernGlass](https://github.com/Demetter/ModernGlass/blob/main/docs/USER_OPTS.md)  
  文件位置：`script-opts/modernz.conf`

---

- **菜单样式** 自定义文档：[mpv-menu-plugin-next](https://github.com/mpvConfig/mpv-menu-plugin-next/blob/main/doc/README.md#menu_styleconf-%E9%85%8D%E7%BD%AE%E8%AF%B4%E6%98%8E)  
  文件位置：`script-opts/menu_style.conf`
- [自定义配置](./custom.md)

---

- **弹幕** 默认样式在配置文件夹`script-opts/uosc_danmaku.conf`下
- 弹幕相关配置：[查看文档](https://github.com/Tony15246/uosc_danmaku#%E7%9B%AE%E5%BD%95)

## 启动默认窗口大小设置

- 播放器内：`右键 > 窗口 > 窗口大小`

## 主题颜色切换

- 播放器内：`右键 > 工具 > 主题切换 > 选择主题`

## 界面语言设置

- 前提是已经内置了该语言 ⇢ [查看已经支持的语言](https://github.com/akFace/mpv.config/tree/main/src) | [How to add a localized language?](https://github.com/akFace/mpv.config/issues/31)
- 文件位置：`portable_config/mpv.conf`（windows）

**设置步骤**

- 1. 打开 `mpv.conf` 文件第一行可以看到，修改对应的语言 code 即可，例如繁体中文（台湾）：

```conf
script-opts=modernz-language="zh-TW",uosc-languages="zh-TW"
```

- 2. 下载对应语言的 ⇢ [ input_xxx.conf ](https://github.com/akFace/mpv.config/tree/main/src) 并重命名为 `input.conf`，然后覆盖到配置文件夹（与`mpv.conf` 同级目录）
