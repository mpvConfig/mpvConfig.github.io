# Customization

> [!TIP]
>
> - mpv manual：https://mpv.io/manual/master/
> - How can I customize the configuration `mpv.conf`, keybindings menus `input.conf` and any `script-opts/xxx.conf` file so that they remain unaffected when overwriting files during a version update?

## Customize the configuration (`mpv.conf` and Any `.conf` file)

> - To preserve customizations when updating, avoid directly changing settings in `mpv.conf` or any `script-opts/xxx.conf` file. Instead, use the method below.
> - Related issue: [#19](https://github.com/akFace/mpv.config/issues/19)

1. In the same directory as `mpv.conf`, create a file named `custom-opts.conf`.
2. Edit `mpv.conf` and add this line: `include = "~~/custom-opts.conf"`
3. Edit `custom-opts.conf` and add your custom settings. For example:

```conf
# Default volume at startup
volume=80
# Customize the default ModernZ settings
script-opts-append = modernz-layout=mini
script-opts-append = "modernz-seekbarfg_color=#cd0b9b"
script-opts-append = "modernz-seekbarbg_color=#077d55"
```

- This changes the ModernZ configuration. For example, `script-opts-append = modernz-layout=mini` changes the value of `layout` in `modernz.conf`.
- Syntax: `script-opts-append = <script>-<option>=<value>`. This can change values in configuration files under `script-opts/`.
- For example, `script-opts-append = uosc_danmaku-fontsize=40` changes the `fontsize` value in `uosc_danmaku.conf`.

> [!IMPORTANT]
>
> To modify any `.conf` file in the `script-opts/` directory in the future, just modify the contents of the `custom-opts.conf` file

---

Example `custom-opts.conf` for a ModernZ theme/color scheme:

```conf
# Seekbar foreground color
script-opts-append = "modernz-seekbarfg_color=#00AEEC"
# Remaining seekbar color
script-opts-append = "modernz-seekbarbg_color=#999999"
# Buffered seekbar color
script-opts-append = "modernz-seekbar_cache_color=#FF6699"
# Seekbar handle color
script-opts-append = "modernz-seek_handle_color=#0083B5"
# Inner border color of the seekbar handle
script-opts-append = "modernz-seek_handle_border_color=#076792"
# Hover color for buttons
script-opts-append = "modernz-hover_effect_color=#FF6699"
# color of the element when held down (pressed)
script-opts-append = "modernz-held_element_color=#7C3AED"
```

Menu size settings

```conf
# Set menu size, menu item height
script-opts-append = "menu_style-menu_item_height=30"
# Scale factor in windowed mode
script-opts-append = "menu_style-scale=1"
# Scale factor in fullscreen
script-opts-append = "menu_style-scale_fullscreen=1.2"
# Set font size, as a percentage of menu item height; recommended to be less than 1
script-opts-append = "menu_style-font_size_ratio=0.54"
# Menu font scaling factor (for large screens)
script-opts-append = "menu_style-menu_font_scale=1"
# macOS scaling compensation factor
script-opts-append = "menu_style-macos_font_scale=1.4"
```

- [View more menu configuration options](https://github.com/mpvConfig/mpv-menu-plugin-next/blob/main/doc/README.md#menu_styleconf-%E9%85%8D%E7%BD%AE%E8%AF%B4%E6%98%8E)

## Customize shortcuts and menus (`input.conf`)

> Follow these steps:

1. To add or modify shortcuts/menu items, create a file named `custom-input.conf` in the same directory as `input.conf`. Add or modify entries there using the same syntax as `input.conf`.
2. After editing, in the player right-click menu, select **Tools > Merge custom shortcuts/menus**. Restart the player for the changes to take effect.
3. This prevents your additions or modifications from being lost when an update overwrites `input.conf`.

### Delete Menu Items (Version >= v1.9.30)

- Use `#rm_menu: menu path` to delete matching menu items; `*` matches any characters.

For example:

```conf
_ ignore #rm_menu: Tools > mpvnet Features > *
```

### Tips

> Issue [#19](https://github.com/akFace/mpv.config/issues/19#issuecomment-5856332146): How can you remove existing menu items and shortcuts? Without editing `input.conf` directly, you cannot simply comment them out.

In `custom-input.conf`, you cannot directly “delete” a binding from `input.conf`, but you can **override it by binding the same key again**.

#### ✅ Example: rebind the same key

For example, if `input.conf` contains:

```conf
Ctrl+s   stop    #menu: Playback > Stop
```

To disable it in `custom-input.conf`, write:

```conf
Ctrl+s   ignore
```

After merging, the `Ctrl+s` line will be replaced with `Ctrl+s ignore`, so the key does nothing.

#### 📋 Examples of common “removal” scenarios

| Desired result                          | Entry in `custom-input.conf`                                                 |
| --------------------------------------- | ---------------------------------------------------------------------------- |
| Disable a key completely                | `Ctrl+s  ignore`                                                             |
| Hide a key from the menu                | `Ctrl+s  ignore` (omit the `#menu:` comment; the menu entry is replaced too) |
| Make a key run another command          | `Ctrl+s  your-new-command`                                                   |
| Disable a key under specific conditions | `Ctrl+s  ignore  #@state=(...)` (usually unnecessary)                        |

## Combined Quick Configuration

1. Contents of the [`custom-opts.conf`](./custom.md) file

```conf
# The name "my-profile" can be anything (the following is an example)
[my-profile]
profile-desc=Enable combined quick configuration 1
fullscreen=yes
volume=80
glsl-shaders="~~/shaders/Anime4K_Restore_CNN_M.glsl;~~/shaders/adaptive_sharpen_RT.glsl;~~/shaders/CfL_Prediction_RT.glsl"
```

2. Contents of the [`custom-input.conf`](./custom.md#customize-shortcuts-and-menus-input-conf) file

```conf
Ctrl+p apply-profile my-profile #menu: Tools > Enable custom profile
```

- After making changes, in the player, right-click: Tools > Merge custom shortcuts/menus, then restart the player for the changes to take effect

- Effect description:  
   Press the shortcut `Ctrl+p` to enable all the settings in my-profile:
  ```
  Set to fullscreen
  Volume to 80
  And set the corresponding filters
  ```

---

Multiple profiles are allowed to coexist

```conf
# custom-opts.conf
# The name "my-profile" can be anything (the following is an example)
[my-profile-1]
profile-desc=Enable combined quick configuration 1
fullscreen=yes
volume=80
glsl-shaders="~~/shaders/Anime4K_Restore_CNN_M.glsl;~~/shaders/adaptive_sharpen_RT.glsl;~~/shaders/CfL_Prediction_RT.glsl"

[my-profile-2]
profile-desc=Enable combined quick configuration 2
speed=1.2
volume=50
# Video filters
glsl-shaders="~~/shaders/Anime4K_Restore_CNN_M.glsl;~~/shaders/adaptive_sharpen_RT.glsl;~~/shaders/CfL_Prediction_RT.glsl"
# open-svpflow frame interpolation
vf=vapoursynth="~~/vs/open-svpflow-hq.vpy"
```

```conf
# custom-input.conf
Ctrl+p apply-profile my-profile-1 #menu: Tools > Enable my-profile1
Ctrl+m apply-profile my-profile-2 #menu: Tools > Enable my-profile2
```

Prompt template example for asking AI:

```
# Based on this profile, write me an mpv combined configuration profile and add a shortcut `Alt+m` binding, with the following features:
- Set volume to 40
- Set fullscreen
- Set brightness to 5
- Set contrast to 8
- Set playback speed to 1.5x
- Set subtitle color to yellow
- Set subtitle size to 30

Below is the profile example:
[my-profile-1]
profile-desc=Enable combined quick configuration 1
fullscreen=yes
volume=80
glsl-shaders="~~/shaders/Anime4K_Restore_CNN_M.glsl;~~/shaders/adaptive_sharpen_RT.glsl;~~/shaders/CfL_Prediction_RT.glsl"
```
