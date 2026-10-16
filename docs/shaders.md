# Shader / 视频滤镜选择指南

mpv 启动时默认不启用视频增强滤镜、插帧，只有用户自主选择时才启用

```
mpv启动时默认：
      ┌──────────────┐
      │ 正常播放      │
      │ 无 Anime4K    │
      │ 无插帧        │
      │ 无 Shader 链  │
      └──────────────┘
               │
               │ 用户右键菜单选项主动选择
               ↓
      ┌───────────────────┐
      │ 视频增强           │
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

> **说明：** 以下为根据本项目当前 `input.conf` 中提供的 Shader / 组合方案用 AI 整理的使用建议。不同视频源、编码质量、原始分辨率及显示设备会明显影响最终效果，实际播放时建议对比选择。

# MPV 视频增强滤镜组合分析

> [!TIP]
>
> - 以下内容基于最新版本为主，旧版或有差异：🍭 [查看最新 releases 版本](https://github.com/akFace/mpv.config/releases)
> - 查看是否为最新版本，播放器内：右键 > 工具 > 检查更新，🎯 [如何更新到最新版？](https://mpvConfig.github.io/docs/update)
> - 性能等级分为：**低 / 中 / 高 / 极高**，基于中端显卡（如 GTX 1660 / RTX 3050）播放 4K 输出时的相对开销估算。

---

## 一、场景推荐表

### 🎨 动漫

| 片源 → 输出                | 推荐组合                           | 理由                                         | 性能    |
| :------------------------- | :--------------------------------- | :------------------------------------------- | :------ |
| **720p → 4K（推荐）**      | Anime4K Mode A (HQ) 或 Mode B (HQ) | 3x 放大，需要强线条重建，HQ 效果最佳         | 高      |
| **720p → 4K（性能有限）**  | Anime4K Mode A/B/C (Fast)          | 保留主要重建逻辑，降低 CNN 规格              | 中      |
| **1080p → 4K（推荐）**     | Anime4K Mode A (HQ) 或 Mode B (HQ) | 2x 放大，HQ 足够，Fast 也可                  | 高 / 中 |
| **1080p → 4K（性能有限）** | Anime4K Mode A/B/C (Fast)          | 保留主要重建逻辑，降低 CNN 规格              | 中      |
| **1080p → 4K（效率）**     | CuNNy/2x12 或 CuNNy/fast           | 低开销，适合日常                             | 低      |
| **1080p → 4K（高开销）**   | CuNNy/4x32 或 CuNNy/8x32           | 高开销，新式 AI 放大，细节更丰富，适合发烧党 | 高~极高 |

> 4k 片源无需超分。

---

### 🎬 真人

| 片源 → 输出                | 推荐组合                                   | 理由                                | 性能    |
| :------------------------- | :----------------------------------------- | :---------------------------------- | :------ |
| **720p → 4K**              | FSRCNNX/2x16+SSim+Krig                     | 高质量放大 + 后处理修正，自然不涂抹 | 高      |
| **720p → 4K（均衡）**      | FSRCNNX/2x8+Krig                           | 中等放大，性能友好                  | 中      |
| **720p → 4K（性能优先）**  | FSRCNNX/2x2+Krig                           | 轻量放大，适合弱显卡                | 低      |
| **1080p → 4K**             | FSRCNNX/2x8+Krig 或 FSRCNNX/2x16+SSim+Krig | 2x 放大，2x8 已足够，2x16 更锐利    | 中 / 高 |
| **1080p → 4K（追求质感）** | ArtCNN/32+RAVU-LITE-R4                     | 保留真实纹理，降噪适度              | 高      |
| **1080p → 4K（效率）**     | FSRCNNX/2x2+Krig 或 CuNNy/4x12             | 低开销，效果自然                    | 低~中   |

> 4k 片源无需超分，**真人不推荐 Anime4K**：其线条重建和降噪逻辑针对动漫优化，用于真人容易产生“油画感”和皮肤纹理丢失。

---

## 二、滤镜组合功能速查

### 1. Anime4K 系列

| 菜单名称            | 包含 Shader                                                                                                               | 功能                     | 适用内容           | 性能 |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------ | :----------------------- | :----------------- | :--- |
| **Mode A (HQ)**     | Clamp_Highlights + Restore_CNN_VL + Upscale_CNN_x2_VL + AutoDownscalePre_x2/x4 + Upscale_CNN_x2_M                         | 线条重建 + 高质量放大    | 动漫               | 高   |
| **Mode B (HQ)**     | 同上，Restore_CNN_Soft_VL                                                                                                 | 柔和重建 + 放大          | 动漫（线条较软）   | 高   |
| **Mode C (HQ)**     | Clamp_Highlights + Upscale_Denoise_CNN_x2_VL + AutoDownscalePre_x2/x4 + Upscale_CNN_x2_M                                  | 降噪放大                 | 动漫（噪点多）     | 高   |
| **Mode A+A (HQ)**   | 在 Mode A 基础上多一层 Restore_CNN_M                                                                                      | 二次重建                 | 动漫（极追求线条） | 极高 |
| **Mode B+B (HQ)**   | 在 Mode B 基础上多一层 Restore_CNN_Soft_M                                                                                 | 二次柔和重建             | 动漫               | 极高 |
| **Mode C+A (HQ)**   | 降噪放大 + 额外重建                                                                                                       | 降噪 + 重建              | 动漫               | 极高 |
| **Mode A (Fast)**   | Clamp_Highlights + Restore_CNN_M + Upscale_CNN_x2_M + AutoDownscalePre_x2/x4 + Upscale_CNN_x2_S                           | 轻量线条重建 + 放大      | 动漫               | 中   |
| **Mode B (Fast)**   | 同上，Restore_CNN_Soft_M                                                                                                  | 轻量柔和重建             | 动漫               | 中   |
| **Mode C (Fast)**   | Clamp_Highlights + Upscale_Denoise_CNN_x2_M + AutoDownscalePre_x2/x4 + Upscale_CNN_x2_S                                   | 降噪放大 + 轻量放大      | 动漫               | 中   |
| **Mode A+A (Fast)** | Clamp_Highlights + Restore_CNN_M + Upscale_CNN_x2_M + Restore_CNN_S + AutoDownscalePre_x2/x4 + Upscale_CNN_x2_S           | 二次轻量重建             | 动漫               | 中   |
| **Mode B+B (Fast)** | Clamp_Highlights + Restore_CNN_Soft_M + Upscale_CNN_x2_M + AutoDownscalePre_x2/x4 + Restore_CNN_Soft_S + Upscale_CNN_x2_S | 二次轻量柔和重建         | 动漫               | 中   |
| **Mode C+A (Fast)** | Clamp_Highlights + Upscale_Denoise_CNN_x2_M + AutoDownscalePre_x2/x4 + Restore_CNN_S + Upscale_CNN_x2_S                   | 降噪 + 轻量重建          | 动漫               | 中   |
| **A4K-DTDD**        | Denoise_Bilateral_Mode + Deblur_DoG + Thin_HQ + Darken_HQ                                                                 | 去噪、去模糊、细化、加深 | 动漫（后处理）     | 中   |

> **注意**：Anime4K 系列对真人内容容易产生“涂抹感”和“塑料感”，不建议用于真人。

---

### 2. FSRCNNX 系列

| 菜单名称                   | 包含 Shader                                            | 功能                           | 适用内容       | 性能 |
| :------------------------- | :----------------------------------------------------- | :----------------------------- | :------------- | :--- |
| **FSRCNNX/2x2+Krig**       | FSRCNNX_x2_2_12_0_4_1_v1_fastv2 + KrigBilateral        | 轻量亮度放大 + 色度放大        | 真人 / 通用    | 低   |
| **FSRCNNX/2x8+Krig**       | FSRCNNX_x2_8_0_4_1 + KrigBilateral                     | 中等亮度放大 + 色度放大        | 真人 / 通用    | 中   |
| **FSRCNNX/2x16+SSim+Krig** | FSRCNNX_x2_16_0_4_1 + SSimSuperRes_RT + KrigBilateral  | 高质量放大 + 后处理修正 + 色度 | 真人 / 通用    | 高   |
| **FSRCNNX/2x56+SSim+Krig** | FSRCNNX_x2_56_16_4_1 + SSimSuperRes_RT + KrigBilateral | 极致质量放大 + 后处理 + 色度   | 真人（高配置） | 极高 |

> FSRCNNX 是通用型 CNN，在真人内容上表现自然，是真人片源的首选之一。自带 `KrigBilateral` 色度放大。

---

### 3. ArtCNN 系列

| 菜单名称            | 包含 Shader                | 功能                           | 适用内容              | 性能 |
| :------------------ | :------------------------- | :----------------------------- | :-------------------- | :--- |
| **ArtCNN/16**       | ArtCNN_C4F16.glsl          | 中等质量亮度放大               | 动漫 / 真人           | 中   |
| **ArtCNN/16DS**     | ArtCNN_C4F16_DS.glsl       | 降噪 + 中等质量亮度放大        | 动漫 / 真人（有噪点） | 中   |
| **ArtCNN/16DN**     | ArtCNN_C4F16_DN.glsl       | 强降噪 + 中等质量亮度放大      | 动漫 / 真人（噪点多） | 中   |
| **ArtCNN/32**       | ArtCNN_C4F32.glsl          | 高质量亮度放大                 | 动漫 / 真人           | 高   |
| **ArtCNN/32DS**     | ArtCNN_C4F32_DS.glsl       | 降噪 + 高质量亮度放大          | 动漫 / 真人（有噪点） | 高   |
| **ArtCNN/32DN**     | ArtCNN_C4F32_DN.glsl       | 强降噪 + 高质量亮度放大        | 动漫 / 真人（噪点多） | 高   |
| **ArtCNN/48**       | ArtCNN_v0_C4F8.glsl        | 极高质量亮度放大（更大模型）   | 动漫 / 真人（高配置） | 极高 |
| **ArtCNN/48DS**     | ArtCNN_v0_C4F8_DS.glsl     | 降噪 + 极高质量亮度放大        | 动漫 / 真人（高配置） | 极高 |
| **ArtCNN/48DS_CMP** | ArtCNN_v0_C4F8_DS_CMP.glsl | 降噪 + 极高质量 + 压缩伪影修复 | 动漫 / 真人（高配置） | 极高 |

> **重要**：新版 ArtCNN 菜单项**不再包含 `CfL_Prediction` 色度放大**，需要用户通过“单个着色器开关”手动开启 `CHROMA: CFL_RT` 或 `CHROMA: Krig`。  
> `C4F8` 是更大的模型，质量最好但性能开销极高；`C4F16` 和 `C4F32` 是常用选择。  
> `_DS` 表示降噪+锐化，`_DN` 表示更强降噪，适合不同片源。

---

### 4. CuNNy 系列

| 菜单名称         | 包含 Shader                             | 功能                      | 适用内容 | 性能           |
| :--------------- | :-------------------------------------- | :------------------------ | :------- | :------------- |
| **CuNNy/faster** | CuNNy-faster-DS.glsl                    | 极轻量放大                | 动漫     | 低             |
| **CuNNy/fast**   | CuNNy-fast-DS.glsl                      | 轻量放大                  | 动漫     | 低             |
| **CuNNy/2x12**   | CuNNy-2x12-DS.glsl                      | 入门放大                  | 动漫     | 低             |
| **CuNNy/3x12**   | CuNNy-3x12-DS.glsl                      | 低端放大                  | 动漫     | 中             |
| **CuNNy/4x12**   | CuNNy-4x12-DS.glsl                      | 中低端放大                | 动漫     | 中             |
| **CuNNy/4x16**   | CuNNy-4x16-DS.glsl                      | 均衡放大                  | 动漫     | 中             |
| **CuNNy/4x24**   | CuNNy-4x24-DS.glsl                      | 中高端放大                | 动漫     | 高             |
| **CuNNy/4x32**   | CuNNy-4x32-DS.glsl                      | 高端放大                  | 动漫     | 高             |
| **CuNNy/8x32**   | CuNNy-8x32-DS.glsl                      | 极致放大                  | 动漫     | 极高           |
| **dp4a 版本**    | 同上，路径 `CuNNy/dp4a/`，文件名带 `-Q` | 利用 Vulkan dp4a 指令加速 | 动漫     | 比同规格低一档 |

> **重要**：新版 CuNNy 菜单项**不再包含 `CfL_Prediction` 色度放大**，需要手动搭配色度滤镜。  
> CuNNy 主要针对视觉小说和动漫训练，真人内容效果可能不如 FSRCNNX / ArtCNN。  
> **dp4a 版本需要在 `mpv.conf` 中设置 `vo=gpu-next` + `gpu-api=vulkan` 且硬件支持 dp4a。**

---

### 5. 单个着色器开关

| 菜单名称               | Shader                        | 功能                      | 性能 |
| :--------------------- | :---------------------------- | :------------------------ | :--- |
| LUMA: NNEDI3/x4        | nnedi3_nns128_win8x4.glsl     | 边缘导向亮度放大          | 中   |
| LUMA: NNEDI3/x6        | nnedi3_nns128_win8x6.glsl     | 更高质量边缘导向亮度放大  | 高   |
| LUMA: FSRCNNX/2x16     | FSRCNNX_x2_16_0_4_1.glsl      | 亮度放大                  | 高   |
| LUMA: RAVU-ZOOM-R2     | ravu_zoom_r2.glsl             | RAVU 亮度缩放             | 中   |
| LUMA: RAVU-ZOOM-R3     | ravu-zoom-ar-r3.hook          | RAVU 亮度缩放（更高质量） | 中   |
| LUMA: RAVU-LITE-R4     | ravu-lite-ar-r4.hook          | RAVU 轻量亮度缩放         | 低   |
| SSimSuperRes_RT        | SSimSuperRes_RT.glsl          | 后处理锐化修正            | 中   |
| SSimDownscaler_RT      | SSimDownscaler_RT.glsl        | 下采样（高 → 低）         | 中   |
| CHROMA: CFL_RT         | CfL_Prediction_RT.glsl        | 色度放大                  | 低   |
| CHROMA: Krig           | KrigBilateral.glsl            | 色度放大                  | 低   |
| AMD: FSR_EASU_RT       | AMD_FSR_EASU_rgb_RT.glsl      | AMD FSR 放大（EASU）      | 低   |
| AMD: FSR_RGB_RT        | AMD_FSR_rgb_RT.glsl           | AMD FSR 放大（RGB）       | 低   |
| Anime4K: 重建          | Anime4K_Restore_CNN_M.glsl    | 线条重建                  | 中   |
| Anime4K: 放大          | Anime4K_Upscale_GAN_x2_M.glsl | GAN 放大                  | 高   |
| OUTPUT: 自适应锐化\_RT | adaptive_sharpen_RT.glsl      | 自适应锐化                | 低   |

> 这些开关可以单独切换，用于微调或叠加到现有组合上。特别是 **CHROMA: CFL_RT** 和 **CHROMA: Krig** 现在必须手动开启才能获得色度放大。

## 三、性能消耗等级汇总

| 等级     | 典型组合                                                                                  | 适用显卡            |
| :------- | :---------------------------------------------------------------------------------------- | :------------------ |
| **低**   | CuNNy/faster, CuNNy/fast, CuNNy/2x12, FSRCNNX/2x2+Krig, CfL_Prediction, adaptive_sharpen  | GTX 1050 / 核显     |
| **中**   | Anime4K Fast 系列, CuNNy/3x12~4x16, FSRCNNX/2x8+Krig, ArtCNN/16+SSim                      | GTX 1660 / RTX 3050 |
| **高**   | Anime4K HQ 系列, CuNNy/4x24~4x32, FSRCNNX/2x16+SSim+Krig, ArtCNN/32+RAVU                  | RTX 3060 / 4060     |
| **极高** | Anime4K Mode A+A/B+B/C+A (HQ), CuNNy/8x32, FSRCNNX/2x56+SSim+Krig, ArtCNN/32+RAVU-ZOOM-R3 | RTX 4070 及以上     |

> **dp4a 版本**（CuNNy/dp4a/\*-Q）在同规格下通常比标准版快 20%~50%，但需要 Vulkan + 硬件支持。

### Anime4K 显卡等级

- 适用显卡 GPU: (Eg. GTX 1080, RTX 2070, RTX 3060, RX 590, Vega 56, 5700XT, 6600XT) 以上  
   Anime4K: Mode A (HQ)  
   Anime4K: Mode B (HQ)  
   Anime4K: Mode C (HQ)  
   Anime4K: Mode A+A (HQ)  
   Anime4K: Mode B+B (HQ)  
   Anime4K: Mode C+A (HQ)

- 适用显卡 GPU: (Eg. GTX 980, GTX 1060, RX 570) 以下  
   Anime4K: Mode A (Fast)  
   Anime4K: Mode B (Fast)  
   Anime4K: Mode C (Fast)  
   Anime4K: Mode A+A (Fast)  
   Anime4K: Mode B+B (Fast)  
   Anime4K: Mode C+A (Fast)

### 插帧

快捷键 `n` ，默认关闭插帧，连按循环：`关闭插帧` ➜ `电影模式` ➜ `动漫模式` ➜ `极致丝滑`

- 说明：`电影模式`（去抖动，零模糊）、`动漫模式`：sphinx 配合 0.65 模糊度，既丝滑又能收紧二次元的线条，不发糊、`极致丝滑`：bicubic 默认稍糊，设定为 -0.40 稍微锐化一下，压制过度黏糊感
- 本配置使用 mpv 内置时间轴插帧（interpolation=yes）—— 根据网上 AI 结论：最推荐，综合体验最好，适合大部分硬件设备。[如果需要其他插帧方式，可询问 AI，方法也很简单]

---

## 四、通用建议

1. **色度放大优先**：`CfL_Prediction` 或 `KrigBilateral` 放在链首，提升色彩边缘。
2. **亮度放大只选一个**：不要同时使用 ArtCNN + RAVU 的亮度放大，会造成重复放大和性能浪费。
3. **后处理放在放大之后**：`SSimSuperRes_RT`、`adaptive_sharpen_RT` 用于修正放大后的伪影。
4. **下采样仅用于高 → 低**：`SSimDownscaler_RT` 适合 4K 片源在 1080p 屏幕播放，不适用于低 →4K。
5. **Anime4K 的 Clamp_Highlights**：在 `vo=gpu-next` 下可能导致画面变暗，可加 `linear-downscaling=no` 规避。
6. **dp4a 需要 Vulkan**：若使用 CuNNy dp4a 版本，请在`mpv.conf`配置文件中设置 `gpu-api=vulkan` 和 `gpu-context=winvk`。
7. **实时切换**：可通过 `input.conf` 中的快捷键（如 Alt+F1~F12）快速对比不同组合，按 `Shift+I` 然后再按`2`查看帧计时确认 shader 是否激活。

---

### Shader 使用注意事项

1. **不要把所有 Shader 叠加使用。**

   项目中部分方案本身就是完整的处理链，例如：

   ```text
   ArtCNN + RAVU
   FSRCNNX + SSimDownscaler + KrigBilateral
   Anime4K Mode A/B/C
   ```

   这些应该视为一个完整方案进行选择，而不是把所有组件重复叠加。

2. **超分并不是分辨率越高越好。**

   原生 4K 视频通常没有必要再次使用超分。高码率、高质量片源也不一定需要强力 AI 超分。

3. **画面越糊，不代表一定要使用越强的 Shader。**

   低码率、严重压缩、噪声很多的视频，强力超分有可能把压缩块、噪声和伪影一起增强。这种情况下更适合选择恢复、降噪或结构重建路线。

4. **不同 Shader 的实际效果与源片质量密切相关。**

   同一个 Shader 在动漫、真人、游戏画面上的表现可能明显不同，实际使用建议优先按照视频类型与 GPU 性能进行选择，再进行 A/B 对比。
