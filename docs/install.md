# 使用方法

### 1. 先安装播放器

- **Windows：**
  - [官方构建版本（推荐）](https://github.com/mpv-player/mpv/releases)
  - [每日构建版本（推荐）](https://github.com/zhongfly/mpv-winbuild/releases)
  - [shinchiro 版本](https://github.com/shinchiro/mpv-winbuild-cmake/releases)
  - [mpv.net 版本](https://github.com/mpvnet-player/mpv.net/releases)
- **macOS、Linux：** [mpv 官网下载](https://mpv.io/installation/)

### 2. 下载主题配置

[🎯 点击下载](https://github.com/akFace/mpv.config/releases) 你需要的主题皮肤，目前提供：

- `modernz`
- `modern_glass`
- `uosc`

📣 [查看主题预览](https://akface.github.io/mpv.config/docs/preview.html)

每个主题皮肤压缩包均包含完整功能的配置，下载后解压。

### 3. 配置播放器

**以下案例以 Windows 系统为例：**

- 解压/安装播放器后，在播放器根目录(`mpv.exe` 同目录)下新建名为 `portable_config` 文件夹，作为 **_配置文件夹_**
- 将解压出的全部文件复制到 **_配置文件夹_** (只能共存一个主题配置)，重启播放器即可

- **注意目录结构**

```
一般的目录结构如下:
~/mpv/portable_config
      ├── fonts
      ├── scripts
      ├── script-opts
      ├── mpv.conf
      └── input.conf
```

macOS、Linux 、Windows 全局配置文件夹路径：

```
macOS:   ~/Library/Application Support/mpv/
Linux:   ~/.config/mpv/
Windows: C:/Users/%username%/AppData/Roaming/mpv/
```

> [!IMPORTANT]
>
> - macOS、Linux 用户操作方式类似，将解压出的全部配置文件放置到 **_配置文件夹_** 重启播放器即可
> - **mpv.net 播放器** 可直接右键>配置>打开配置文件夹或者`Ctrl + f`快捷键打开 **_配置文件夹_** 。若你使用的是 mpv.net 播放器，出现偶尔无法加载**缩略图**的情况，请修改`script-opts/thumbfast.conf`目录中的`mpv_path=mpv`改为`mpv_path=mpvnet`或者播放器安装目录可执行文件 例如：`mpv_path=C:\Program Files\mpv.net\mpvnet.exe`
