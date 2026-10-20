# MPV 播放器插帧功能

## MPV 内置插帧算法

> [!TIP]
> 默认包已自带

快捷键 `n` ，默认关闭插帧，连按循环：`关闭插帧` ➜ `电影模式` ➜ `动漫模式` ➜ `极致丝滑`

- 说明：`电影模式`（去抖动，零模糊）、`动漫模式`：sphinx 配合 0.65 模糊度，既丝滑又能收紧二次元的线条，不发糊、`极致丝滑`：bicubic 默认稍糊，设定为 -0.40 稍微锐化一下，压制过度黏糊感
- 使用 mpv 内置时间轴插帧（interpolation=yes）—— 门槛较低适合大部分硬件设备。
- 兼容 Windows、Linux、macOS

## 利用插件插帧方法

> [!TIP]
> 默认包不带有，需要的根据以下教程安装

### VapourSynth MVTools / OPEN-SVPFLOW 插帧/补帧功能

- 操作简单，一键安装，立即前往安装 ⇢ [https://github.com/mpvConfig/mpvTools](https://github.com/mpvConfig/mpvTools)
- 为了简化安装，我们做了脚本自动化处理，支持 Windows / Linux / macOS

### GitHub 社区其他插帧

- [https://github.com/MSalman5230/mpv-config](https://github.com/MSalman5230/mpv-config)
- [https://github.com/hzwer/Practical-RIFE](https://github.com/hzwer/Practical-RIFE)
