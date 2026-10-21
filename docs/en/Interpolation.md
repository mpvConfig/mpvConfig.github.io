# MPV Frame Interpolation

## Built-in MPV Frame Interpolation

> [!TIP]
> Included in the default package.

Press `n` to cycle through the frame interpolation modes. Interpolation is disabled by default. Repeatedly press `n` to switch between:

`Interpolation Off` ➜ `Cinema Mode` ➜ `Anime Mode` ➜ `Ultra Smooth`

- **Cinema Mode:** Reduces judder with zero blur.
- **Anime Mode:** Uses Sphinx with a blur level of 0.65 to deliver smooth motion while tightening anime linework without making the image look blurry.
- **Ultra Smooth:** Uses bicubic interpolation, which can look slightly soft by default. The setting is adjusted to `-0.40` to add a little sharpness and reduce excessive smearing.
- Uses MPV's built-in temporal interpolation (`interpolation=yes`), offering an accessible solution suitable for most hardware.
- Compatible with Windows, Linux, and macOS.

## Frame Interpolation Using Plugins

> [!TIP]
> Not included in the default package. If needed, install one of the options below by following the relevant instructions.

### VapourSynth MVTools Frame Interpolation

- Easy to use, with one-step installation: [https://github.com/mpvConfig/mpvTools](https://github.com/mpvConfig/mpvTools)

### Other Community Frame Interpolation Solutions on GitHub

- [https://github.com/MSalman5230/mpv-config](https://github.com/MSalman5230/mpv-config)
- [https://github.com/hzwer/Practical-RIFE](https://github.com/hzwer/Practical-RIFE)
- [https://github.com/AmusementClub/vs-mlrt](https://github.com/AmusementClub/vs-mlrt)
