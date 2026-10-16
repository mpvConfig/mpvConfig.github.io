# Installation

### 1. Install the Player

- **Windows:**
  - [Official Builds (Recommended)](https://github.com/mpv-player/mpv/releases)
  - [Daily Builds (Recommended)](https://github.com/zhongfly/mpv-winbuild/releases)
  - [shinchiro Builds](https://github.com/shinchiro/mpv-winbuild-cmake/releases)
  - [mpv.net Builds](https://github.com/mpvnet-player/mpv.net/releases)
- **macOS, Linux:** [Download from the official mpv website](https://mpv.io/installation/)

### 2. Download the Theme Configuration

[🎯 Click to Download](https://github.com/akFace/mpv.config/releases) the theme you need. The following themes are currently available:

Please download `xxx_en.zip` version, [How to add a localized language?](https://github.com/akFace/mpv.config/issues/31)

- `modernz`
- `modern_glass`
- `uosc`

📣 [Preview](https://akface.github.io/mpv.config/docs/en/preview)

Each theme archive contains a complete, fully functional configuration. Simply download and extract it.

### 3. Configure the Player

- **The following example uses Windows:**
- After extracting/installing the player, create a new folder named `portable_config` in the player's root directory (the same directory as `mpv.exe`). This will be used as the **configuration folder**.
- Copy all extracted files into the **configuration folder** (only one theme configuration can be used at a time), then restart the player.

- **Note the directory structure**

```
A typical directory structure looks like this:
~/mpv/portable_config
      ├── fonts
      ├── scripts
      ├── script-opts
      ├── mpv.conf
      └── input.conf
```

macOS、Linux 、Windows， The global configuration directories are:

```
macOS:   ~/Library/Application Support/mpv/
Linux:   ~/.config/mpv/
Windows: C:/Users/%username%/AppData/Roaming/mpv/
```

> [!IMPORTANT]
>
> - The procedure is the same for macOS and Linux users: simply place the extracted files into the **_configuration folder_** and restart the player.
> - If you are using the mpv.net player and thumbnails occasionally fail to load, change `mpv_path=mpv` in `script-opts/thumbfast.conf` to `mpv_path=mpvnet`, or specify the executable in the player installation directory, for example: `mpv_path=C:\Program Files\mpv.net\mpvnet.exe`
