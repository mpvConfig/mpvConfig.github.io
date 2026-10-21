# FAQ & Recommendations

- **How do I update to the latest version?** [Update Guide](./update.md)
- **How to modify and add shortcuts?**  
  The shortcut settings file is located at `portable_config/input.conf`. You can open and edit it to see the settings, and refer to them (if you don't understand, you can ask AI).
- **What are the video enhancement options, and how do I use them?** [Shader Guide](./shaders.md) · [Frame Interpolation](./Interpolation.md)
- **How can I add other frame interpolation methods?** [Frame Interpolation](./Interpolation.md)
- **How do I adjust the UI size? It's too small or too large.** [Configuration Guide](./conf.md)
- **How do I change the danmaku size? It's too small or too large.** [Configuration Guide](./conf.md)
- **Danmaku won't load?** See [Related Issues](https://github.com/Tony15246/uosc_danmaku/issues).
- **Danmaku playback smoothness:** My current display is 4K at 60 Hz. Enabling video frame synchronization (`display-resample`) makes danmaku smoother on my system. However, on some devices, enabling this setting may cause audio stuttering during playback at increased speeds, so it is disabled by default. To enable it, go to **Right-click Menu > Danmaku > Sync Video Frames**.

---

- **Play Bilibili, YouTube, and other online videos by pasting a URL:** Install [yt-dlp](https://github.com/yt-dlp/yt-dlp/releases), download `yt-dlp.exe`, and place it in the same directory as `mpv.exe` (the player installation directory). Restart the player, and you can paste video-page URLs directly into MPV. However, the browser extension below is recommended for a better experience.
- **Recommended:** Tampermonkey users can install [play-with-mpv — Play Web Videos in MPV](https://github.com/akFace/play-with-mpv).
