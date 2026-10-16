# Default Behavior

Video-enhancement shaders and frame interpolation are **disabled by default** when mpv starts. They are enabled only when selected by the user.

```text
Default mpv startup:
      ┌──────────────┐
      │ Normal playback │
      │ No Anime4K      │
      │ No interpolation│
      │ No shader chain │
      └──────────────┘
               │
               │ User selects an option from the right-click menu
               ↓
      ┌───────────────────┐
      │ Video enhancement │
      ├───────────────────┤
      │ Anime4K HQ/Fast   │
      │ FSRCNNX           │
      │ ArtCNN             │
      │ CuNNy              │
      │ NNEDI3             │
      │ CFL                │
      │ FSR                │
      │ Sharpen            │
      └───────────────────┘
```

## Automatically save user settings (global)

The configuration is in `script-opts/celebi.conf`. To save additional `mpv.conf` options, edit `celebi.conf` manually. Saved user settings are stored in `portable_config/celebi.txt`. To restore the defaults, delete `celebi.txt` and restart the player.

```conf
# ====== Loaded from user settings on the next startup ======
# ====== Names of options saved automatically ======
# Volume
volume=yes
# Video frame synchronization mode
video-sync=yes
# Automatically load ICC profiles
icc-profile-auto=yes
# Color adjustments
contrast=yes
# Brightness
brightness=yes
# Gamma
gamma=yes
# Saturation
saturation=yes
# Hue
hue=yes
# Automatically fit the window size
autofit=yes
# OSD message font size
osd-font-size=yes
# OSD message horizontal alignment
osd-align-x=yes
# OSD level
osd-level=yes
```

## mpv built-in state saving (per video)

`save-position-on-quit = yes` is enabled by default. Its primary purpose is to save the **playback position**, and it may also save **some player state changed during playback**.

### 🎯 Main saved item: playback position

When you quit, mpv automatically saves the current position in the file. The next time you open **the same file**, playback resumes from where you left off.

Unlike manually pressing `Shift + Q` (`quit-watch-later`), `save-position-on-quit` saves the position automatically, including when you close the window using its close button.

### 📦 Other playback state that may be saved

In addition to the playback position, some options that you changed **after playback started** may also be saved. According to the official documentation and commit history, these may include:

- **Audio/video track selection:** The audio or subtitle track you selected manually.
- **Volume and mute state:** Adjusted volume or mute settings.
- **Playback speed:** A changed playback rate.
- **Subtitle settings:** Subtitle delay, position, visibility, and similar settings.
- **Picture adjustments:** Brightness, contrast, saturation, hue, and similar settings.

> **Note:** These states are saved only if they were changed during playback. If you keep the default settings, they are not recorded.
