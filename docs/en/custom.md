# Customization

> [!TIP]
> How can I customize the configuration `mpv.conf`, keybindings menus `input.conf` and any `script-opts/xxx.conf` file so that they remain unaffected when overwriting files during a version update?

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
```

## Customize shortcuts and menus (`input.conf`)

> Follow these steps:

1. To add or modify shortcuts/menu items, create a file named `custom-input.conf` in the same directory as `input.conf`. Add or modify entries there using the same syntax as `input.conf`.
2. After editing, in the player right-click menu, select **Tools > Merge custom shortcuts/menus**. Restart the player for the changes to take effect.
3. This prevents your additions or modifications from being lost when an update overwrites `input.conf`.

### Tips

> Issue [#19](https://github.com/akFace/mpv.config/issues/19#issuecomment-5856332146): How can you remove existing menu items and shortcuts? Without editing `input.conf` directly, you cannot simply comment them out.

In `custom-input.conf`, you cannot directly “delete” a binding from `input.conf`, but you can **override it by binding the same key again**.

### ✅ Example: rebind the same key

For example, if `input.conf` contains:

```conf
Ctrl+s   stop    #menu: Playback > Stop
```

To disable it in `custom-input.conf`, write:

```conf
Ctrl+s   ignore
```

After merging, the `Ctrl+s` line will be replaced with `Ctrl+s ignore`, so the key does nothing.

### 📋 Examples of common “removal” scenarios

| Desired result                          | Entry in `custom-input.conf`                                                 |
| --------------------------------------- | ---------------------------------------------------------------------------- |
| Disable a key completely                | `Ctrl+s  ignore`                                                             |
| Hide a key from the menu                | `Ctrl+s  ignore` (omit the `#menu:` comment; the menu entry is replaced too) |
| Make a key run another command          | `Ctrl+s  your-new-command`                                                   |
| Disable a key under specific conditions | `Ctrl+s  ignore  #@state=(...)` (usually unnecessary)                        |
