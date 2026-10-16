# Shader / Video Filter Selection Guide

Video-enhancement shaders and frame interpolation are disabled by default when mpv starts. They are enabled only when you explicitly select them.

```text
Default mpv startup:
      ┌─────────────────┐
      │ Normal playback │
      │ No Anime4K      │
      │ No interpolation│
      │ No shader chain │
      └─────────────────┘
               │
               │ User selects an option from the right-click menu
               ↓
      ┌───────────────────┐
      │ Video enhancement │
      ├───────────────────┤
      │ Anime4K HQ/Fast   │
      │ FSRCNNX           │
      │ ArtCNN            │
      │ CuNNy             │
      │ NNEDI3            │
      │ CFL               │
      │ FSR               │
      │ Sharpen           │
      └───────────────────┘
```

> **Note:** The recommendations below were compiled with AI based on the Shader combinations currently available in this project's `input.conf`. Results vary significantly with the source video, encoding quality, original resolution, and display device. Compare options during actual playback.

# Analysis of MPV Video Enhancement Shader Combinations

> [!TIP]
>
> - This guide primarily reflects the latest version; older versions may differ. 🍭 [View the latest releases](https://github.com/akFace/mpv.config/releases)
> - To check for updates in the player, right-click and select **Tools > Check for updates**. 🎯 [How to update to the latest version](https://mpvConfig.github.io/docs/en/update.html)
> - Performance levels are **Low / Medium / High / Very High**, estimated as relative workloads when outputting 4K on a mid-range GPU (such as a GTX 1660 / RTX 3050).

---

## 1. Recommendations by content type

### 🎨 Anime

| Source → Output                      | Recommended combination            | Reason                                                                      | Performance    |
| :----------------------------------- | :--------------------------------- | :-------------------------------------------------------------------------- | :------------- |
| **720p → 4K (recommended)**          | Anime4K Mode A (HQ) or Mode B (HQ) | 3x upscaling requires strong line reconstruction; HQ gives the best results | High           |
| **720p → 4K (limited performance)**  | Anime4K Mode A/B/C (Fast)          | Keeps the main reconstruction logic while using smaller CNN models          | Medium         |
| **1080p → 4K (recommended)**         | Anime4K Mode A (HQ) or Mode B (HQ) | 2x upscaling; HQ is sufficient, though Fast can also work                   | High / Medium  |
| **1080p → 4K (limited performance)** | Anime4K Mode A/B/C (Fast)          | Keeps the main reconstruction logic while using smaller CNN models          | Medium         |
| **1080p → 4K (efficient)**           | CuNNy/2x12 or CuNNy/fast           | Low overhead; suitable for everyday use                                     | Low            |
| **1080p → 4K (higher workload)**     | CuNNy/4x32 or CuNNy/8x32           | High workload; newer AI upscaling with richer detail, for enthusiasts       | High–Very High |

> Native 4K sources do not need upscaling.

### 🎬 Live-action

| Source → Output                   | Recommended combination                    | Reason                                                                                         | Performance   |
| :-------------------------------- | :----------------------------------------- | :--------------------------------------------------------------------------------------------- | :------------ |
| **720p → 4K**                     | FSRCNNX/2x16+SSim+Krig                     | High-quality upscaling plus post-processing correction; natural results without a smeared look | High          |
| **720p → 4K (balanced)**          | FSRCNNX/2x8+Krig                           | Moderate upscaling with reasonable performance cost                                            | Medium        |
| **720p → 4K (performance first)** | FSRCNNX/2x2+Krig                           | Lightweight upscaling, suitable for weaker GPUs                                                | Low           |
| **1080p → 4K**                    | FSRCNNX/2x8+Krig or FSRCNNX/2x16+SSim+Krig | 2x upscaling; 2x8 is often enough, while 2x16 is sharper                                       | Medium / High |
| **1080p → 4K (texture quality)**  | ArtCNN/32+RAVU-LITE-R4                     | Preserves natural texture with moderate denoising                                              | High          |
| **1080p → 4K (efficient)**        | FSRCNNX/2x2+Krig or CuNNy/4x12             | Low overhead and natural-looking results                                                       | Low–Medium    |

> Native 4K sources do not need upscaling. **Anime4K is not recommended for live-action**: its line reconstruction and denoising are optimized for anime and can make live-action look painterly or remove skin texture.

---

## 2. Shader combination reference

### 1. Anime4K series

| Menu name           | Included shaders                                                                                                          | Function                                            | Best suited for                              | Performance |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------ | :-------------------------------------------------- | :------------------------------------------- | :---------- |
| **Mode A (HQ)**     | Clamp_Highlights + Restore_CNN_VL + Upscale_CNN_x2_VL + AutoDownscalePre_x2/x4 + Upscale_CNN_x2_M                         | Line reconstruction + high-quality upscaling        | Anime                                        | High        |
| **Mode B (HQ)**     | Same as above, with Restore_CNN_Soft_VL                                                                                   | Softer reconstruction + upscaling                   | Anime with softer lines                      | High        |
| **Mode C (HQ)**     | Clamp_Highlights + Upscale_Denoise_CNN_x2_VL + AutoDownscalePre_x2/x4 + Upscale_CNN_x2_M                                  | Denoising and upscaling                             | Noisy anime                                  | High        |
| **Mode A+A (HQ)**   | Mode A plus an additional Restore_CNN_M layer                                                                             | Second reconstruction pass                          | Anime where line quality is the top priority | Very High   |
| **Mode B+B (HQ)**   | Mode B plus an additional Restore_CNN_Soft_M layer                                                                        | Second, softer reconstruction pass                  | Anime                                        | Very High   |
| **Mode C+A (HQ)**   | Denoising/upscaling + extra reconstruction                                                                                | Denoising + reconstruction                          | Anime                                        | Very High   |
| **Mode A (Fast)**   | Clamp_Highlights + Restore_CNN_M + Upscale_CNN_x2_M + AutoDownscalePre_x2/x4 + Upscale_CNN_x2_S                           | Lightweight line reconstruction + upscaling         | Anime                                        | Medium      |
| **Mode B (Fast)**   | Same as above, with Restore_CNN_Soft_M                                                                                    | Lightweight soft reconstruction                     | Anime                                        | Medium      |
| **Mode C (Fast)**   | Clamp_Highlights + Upscale_Denoise_CNN_x2_M + AutoDownscalePre_x2/x4 + Upscale_CNN_x2_S                                   | Denoising + lightweight upscaling                   | Anime                                        | Medium      |
| **Mode A+A (Fast)** | Clamp_Highlights + Restore_CNN_M + Upscale_CNN_x2_M + Restore_CNN_S + AutoDownscalePre_x2/x4 + Upscale_CNN_x2_S           | Two lightweight reconstruction passes               | Anime                                        | Medium      |
| **Mode B+B (Fast)** | Clamp_Highlights + Restore_CNN_Soft_M + Upscale_CNN_x2_M + AutoDownscalePre_x2/x4 + Restore_CNN_Soft_S + Upscale_CNN_x2_S | Two lightweight soft-reconstruction passes          | Anime                                        | Medium      |
| **Mode C+A (Fast)** | Clamp_Highlights + Upscale_Denoise_CNN_x2_M + AutoDownscalePre_x2/x4 + Restore_CNN_S + Upscale_CNN_x2_S                   | Denoising + lightweight reconstruction              | Anime                                        | Medium      |
| **A4K-DTDD**        | Denoise_Bilateral_Mode + Deblur_DoG + Thin_HQ + Darken_HQ                                                                 | Denoising, deblurring, line thinning, and darkening | Anime post-processing                        | Medium      |

> **Caution:** Anime4K can make live-action look smeared or plastic-like. It is not recommended for live-action content.

### 2. FSRCNNX series

| Menu name                  | Included shaders                                       | Function                                                     | Best suited for                | Performance |
| :------------------------- | :----------------------------------------------------- | :----------------------------------------------------------- | :----------------------------- | :---------- |
| **FSRCNNX/2x2+Krig**       | FSRCNNX_x2_2_12_0_4_1_v1_fastv2 + KrigBilateral        | Lightweight luma upscaling + chroma upscaling                | Live-action / general use      | Low         |
| **FSRCNNX/2x8+Krig**       | FSRCNNX_x2_8_0_4_1 + KrigBilateral                     | Medium luma upscaling + chroma upscaling                     | Live-action / general use      | Medium      |
| **FSRCNNX/2x16+SSim+Krig** | FSRCNNX_x2_16_0_4_1 + SSimSuperRes_RT + KrigBilateral  | High-quality upscaling + post-processing correction + chroma | Live-action / general use      | High        |
| **FSRCNNX/2x56+SSim+Krig** | FSRCNNX_x2_56_16_4_1 + SSimSuperRes_RT + KrigBilateral | Maximum-quality upscaling + post-processing + chroma         | Live-action, high-end hardware | Very High   |

> FSRCNNX is a general-purpose CNN that tends to look natural on live-action content, making it one of the top choices for live-action sources. It includes `KrigBilateral` chroma upscaling.

### 3. ArtCNN series

| Menu name           | Included shader            | Function                                                              | Best suited for                        | Performance |
| :------------------ | :------------------------- | :-------------------------------------------------------------------- | :------------------------------------- | :---------- |
| **ArtCNN/16**       | ArtCNN_C4F16.glsl          | Medium-quality luma upscaling                                         | Anime / live-action                    | Medium      |
| **ArtCNN/16DS**     | ArtCNN_C4F16_DS.glsl       | Denoising + medium-quality luma upscaling                             | Noisy anime / live-action              | Medium      |
| **ArtCNN/16DN**     | ArtCNN_C4F16_DN.glsl       | Strong denoising + medium-quality luma upscaling                      | Very noisy anime / live-action         | Medium      |
| **ArtCNN/32**       | ArtCNN_C4F32.glsl          | High-quality luma upscaling                                           | Anime / live-action                    | High        |
| **ArtCNN/32DS**     | ArtCNN_C4F32_DS.glsl       | Denoising + high-quality luma upscaling                               | Noisy anime / live-action              | High        |
| **ArtCNN/32DN**     | ArtCNN_C4F32_DN.glsl       | Strong denoising + high-quality luma upscaling                        | Very noisy anime / live-action         | High        |
| **ArtCNN/48**       | ArtCNN_v0_C4F8.glsl        | Very high-quality luma upscaling (larger model)                       | Anime / live-action, high-end hardware | Very High   |
| **ArtCNN/48DS**     | ArtCNN_v0_C4F8_DS.glsl     | Denoising + very high-quality luma upscaling                          | Anime / live-action, high-end hardware | Very High   |
| **ArtCNN/48DS_CMP** | ArtCNN_v0_C4F8_DS_CMP.glsl | Denoising + very high-quality upscaling + compression-artifact repair | Anime / live-action, high-end hardware | Very High   |

> **Important:** The newer ArtCNN menu items no longer include `CfL_Prediction` chroma upscaling. Enable `CHROMA: CFL_RT` or `CHROMA: Krig` manually through the individual shader toggles.
>
> `C4F8` is a larger model with the best quality but very high performance cost. `C4F16` and `C4F32` are common choices.
>
> `_DS` means denoising + sharpening; `_DN` applies stronger denoising. Choose according to the source.

### 4. CuNNy series

| Menu name         | Included shader                                             | Function                                       | Best suited for | Performance                                          |
| :---------------- | :---------------------------------------------------------- | :--------------------------------------------- | :-------------- | :--------------------------------------------------- |
| **CuNNy/faster**  | CuNNy-faster-DS.glsl                                        | Extremely lightweight upscaling                | Anime           | Low                                                  |
| **CuNNy/fast**    | CuNNy-fast-DS.glsl                                          | Lightweight upscaling                          | Anime           | Low                                                  |
| **CuNNy/2x12**    | CuNNy-2x12-DS.glsl                                          | Entry-level upscaling                          | Anime           | Low                                                  |
| **CuNNy/3x12**    | CuNNy-3x12-DS.glsl                                          | Low-end upscaling                              | Anime           | Medium                                               |
| **CuNNy/4x12**    | CuNNy-4x12-DS.glsl                                          | Low-to-mid-range upscaling                     | Anime           | Medium                                               |
| **CuNNy/4x16**    | CuNNy-4x16-DS.glsl                                          | Balanced upscaling                             | Anime           | Medium                                               |
| **CuNNy/4x24**    | CuNNy-4x24-DS.glsl                                          | Mid-to-high-end upscaling                      | Anime           | High                                                 |
| **CuNNy/4x32**    | CuNNy-4x32-DS.glsl                                          | High-end upscaling                             | Anime           | High                                                 |
| **CuNNy/8x32**    | CuNNy-8x32-DS.glsl                                          | Maximum-quality upscaling                      | Anime           | Very High                                            |
| **dp4a variants** | Same shaders under `CuNNy/dp4a/`, with `-Q` in the filename | Uses Vulkan dp4a instructions for acceleration | Anime           | One level lower than the equivalent standard version |

> **Important:** Newer CuNNy menu items no longer include `CfL_Prediction` chroma upscaling, so a chroma shader must be paired manually.
>
> CuNNy is mainly trained for visual novels and anime. Results on live-action may be inferior to FSRCNNX / ArtCNN.
>
> **The dp4a version requires** `vo=gpu-next` and `gpu-api=vulkan` in `mpv.conf`, as well as hardware that supports dp4a.

### 5. Individual shader toggles

| Menu name                   | Shader                        | Function                                    | Performance |
| :-------------------------- | :---------------------------- | :------------------------------------------ | :---------- |
| LUMA: NNEDI3/x4             | nnedi3_nns128_win8x4.glsl     | Edge-directed luma upscaling                | Medium      |
| LUMA: NNEDI3/x6             | nnedi3_nns128_win8x6.glsl     | Higher-quality edge-directed luma upscaling | High        |
| LUMA: FSRCNNX/2x16          | FSRCNNX_x2_16_0_4_1.glsl      | Luma upscaling                              | High        |
| LUMA: RAVU-ZOOM-R2          | ravu_zoom_r2.glsl             | RAVU luma scaling                           | Medium      |
| LUMA: RAVU-ZOOM-R3          | ravu-zoom-ar-r3.hook          | Higher-quality RAVU luma scaling            | Medium      |
| LUMA: RAVU-LITE-R4          | ravu-lite-ar-r4.hook          | Lightweight RAVU luma scaling               | Low         |
| SSimSuperRes_RT             | SSimSuperRes_RT.glsl          | Post-processing sharpening/correction       | Medium      |
| SSimDownscaler_RT           | SSimDownscaler_RT.glsl        | Downscaling (high → low resolution)         | Medium      |
| CHROMA: CFL_RT              | CfL_Prediction_RT.glsl        | Chroma upscaling                            | Low         |
| CHROMA: Krig                | KrigBilateral.glsl            | Chroma upscaling                            | Low         |
| AMD: FSR_EASU_RT            | AMD_FSR_EASU_rgb_RT.glsl      | AMD FSR upscaling (EASU)                    | Low         |
| AMD: FSR_RGB_RT             | AMD_FSR_rgb_RT.glsl           | AMD FSR upscaling (RGB)                     | Low         |
| Anime4K: Restore            | Anime4K_Restore_CNN_M.glsl    | Line reconstruction                         | Medium      |
| Anime4K: Upscale            | Anime4K_Upscale_GAN_x2_M.glsl | GAN upscaling                               | High        |
| OUTPUT: Adaptive Sharpen_RT | adaptive_sharpen_RT.glsl      | Adaptive sharpening                         | Low         |

> These toggles can be switched individually for fine-tuning or added to an existing combination. In particular, **CHROMA: CFL_RT** and **CHROMA: Krig** must now be enabled manually to get chroma upscaling.

## 3. Performance cost summary

| Level         | Typical combinations                                                                      | Suggested GPU class       |
| :------------ | :---------------------------------------------------------------------------------------- | :------------------------ |
| **Low**       | CuNNy/faster, CuNNy/fast, CuNNy/2x12, FSRCNNX/2x2+Krig, CfL_Prediction, adaptive_sharpen  | GTX 1050 / integrated GPU |
| **Medium**    | Anime4K Fast series, CuNNy/3x12–4x16, FSRCNNX/2x8+Krig, ArtCNN/16+SSim                    | GTX 1660 / RTX 3050       |
| **High**      | Anime4K HQ series, CuNNy/4x24–4x32, FSRCNNX/2x16+SSim+Krig, ArtCNN/32+RAVU                | RTX 3060 / RTX 4060       |
| **Very High** | Anime4K Mode A+A/B+B/C+A (HQ), CuNNy/8x32, FSRCNNX/2x56+SSim+Krig, ArtCNN/32+RAVU-ZOOM-R3 | RTX 4070 or higher        |

> The **dp4a variants** (`CuNNy/dp4a/*-Q`) are typically 20%–50% faster than standard variants of the same size, but require Vulkan and compatible hardware.

### Anime4K GPU recommendations

- Suggested GPUs (e.g. GTX 1080, RTX 2070, RTX 3060, RX 590, Vega 56, 5700XT, 6600XT) or higher:

  - Anime4K: Mode A (HQ)
  - Anime4K: Mode B (HQ)
  - Anime4K: Mode C (HQ)
  - Anime4K: Mode A+A (HQ)
  - Anime4K: Mode B+B (HQ)
  - Anime4K: Mode C+A (HQ)

- For GPUs below examples such as GTX 980, GTX 1060, or RX 570:
  - Anime4K: Mode A (Fast)
  - Anime4K: Mode B (Fast)
  - Anime4K: Mode C (Fast)
  - Anime4K: Mode A+A (Fast)
  - Anime4K: Mode B+B (Fast)
  - Anime4K: Mode C+A (Fast)

### Frame interpolation

Press `n`. Interpolation is disabled by default. Repeated presses cycle through:

`Interpolation Off` ➜ `Cinema Mode` ➜ `Anime Mode` ➜ `Ultra Smooth`

- **Cinema Mode:** de-judder with no blur.
- **Anime Mode:** uses sphinx with a blur level of 0.65, aiming for smooth motion while tightening anime linework without making it blurry.
- **Ultra Smooth:** uses bicubic interpolation, which can look slightly soft by default; the setting is adjusted to -0.40 for a little sharpening and to reduce excessive smearing.
- This configuration uses mpv's built-in temporal interpolation (`interpolation=yes`). Based on AI summaries of online discussions, it is considered a good overall choice for many hardware setups. If you need a different interpolation method, you can ask an AI assistant; the setup is relatively simple.

---

## 4. General recommendations

1. **Prioritize chroma upscaling:** Place `CfL_Prediction` or `KrigBilateral` at the beginning of the chain to improve color edges.
2. **Use only one luma upscaler:** Do not combine ArtCNN and RAVU luma upscaling simultaneously; this can duplicate upscaling and waste performance.
3. **Apply post-processing after upscaling:** `SSimSuperRes_RT` and `adaptive_sharpen_RT` can correct artifacts after upscaling.
4. **Use downscaling only for high → low resolution:** `SSimDownscaler_RT` is suitable for playing 4K sources on a 1080p display, not for low → 4K upscaling.
5. **Anime4K's `Clamp_Highlights`:** Under `vo=gpu-next`, it may darken the image. Setting `linear-downscaling=no` may avoid this.
6. **dp4a requires Vulkan:** For the CuNNy dp4a version, set `gpu-api=vulkan` and `gpu-context=winvk` in `mpv.conf`.
7. **Switch in real time:** Use shortcuts in `input.conf` (such as `Alt+F1`–`Alt+F12`) to compare combinations. Press `Shift+I`, then `2`, to view frame timing and confirm whether a shader is active.

---

### Shader usage cautions

1. **Do not stack every shader together.**

   Some combinations in this project are already complete processing chains, for example:

   ```text
   ArtCNN + RAVU
   FSRCNNX + SSimDownscaler + KrigBilateral
   Anime4K Mode A/B/C
   ```

   Treat these as complete presets. Do not stack their components on top of the same components again.

2. **Higher output resolution is not always better.**

   Native 4K video usually does not need further upscaling. High-bitrate, high-quality sources may not need strong AI upscaling either.

3. **A blurrier image does not automatically need a stronger shader.**

   For low-bitrate, heavily compressed, or very noisy video, strong upscaling may also amplify blocking, noise, and artifacts. Restoration, denoising, or structural reconstruction may be more suitable.

4. **Actual results depend heavily on source quality.**

   The same shader can behave very differently on anime, live-action, and game footage. Start by choosing according to content type and GPU performance, then compare results with A/B tests.
