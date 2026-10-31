import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/docs/",
  title: "mpv.config",
  description:
    "mpv.config — The configuration file of the mpv player supports Windows, macOS, Linux & Multiple shaders, Anime4K/FSRCNNX/CuNNy/ArtCNN | mpv播放器配置整合包懒人版&液态玻璃主题皮肤(theme | skin) 轻量级/支持全网弹幕/在线字幕/插帧超帧超分画质Anime4K /进度条预览/可视化均衡器/360°VR",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "https://mpvconfig.github.io/images/favicon.ico",
        type: "image/x-icon",
      },
    ],
    [
      "meta",
      {
        name: "msvalidate.01",
        content: "66960A5444E78E869FA802824D725643",
      },
    ],
    [
      "meta",
      {
        name: "google-site-verification",
        content: "Ow9oA2uKI81J9FVrb16T5JwbzExxwyAVdelsAevhdu0",
      },
    ],
  ],
  sitemap: {
    hostname: "https://mpvconfig.github.io/docs/",
  },
  markdown: {
    languageAlias: {
      conf: "ini", // 或者用 'bash'，取决于你的配置文件风格
    },
  },
  // 顶层 themeConfig 只放所有语言通用的配置
  themeConfig: {
    search: {
      provider: "local",
    },
    editLink: {
      pattern:
        "https://github.com/mpvConfig/mpvConfig.github.io/blob/main/docs/:path",
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/akFace/mpv.config" },
    ],
  },

  locales: {
    root: {
      label: "简体中文",
      lang: "zh-Hans",
      dir: "ltr",
      themeConfig: {
        nav: [
          { text: "首页", link: "/" },
          { text: "查看特性", link: "https://mpvConfig.github.io/" },
          {
            text: "社区",
            items: [
              {
                text: "Telegram",
                link: "https://t.me/+rYLzi96XzoxjZDc1",
              },
              {
                text: "QQ频道",
                link: "https://pd.qq.com/s/cp5zsp7a4?b=9",
              },
            ],
          },
        ],
        sidebar: [
          {
            text: "立即开始",
            items: [
              { text: "安装", link: "/install" },
              { text: "界面设置", link: "/conf" },
              { text: "自定义配置", link: "/custom" },
              { text: "快捷键", link: "/shortcuts" },
              { text: "默认行为", link: "/behavior" },
              { text: "字幕相关", link: "/subtitles" },
              { text: "视频滤镜选择指南", link: "/shaders" },
              { text: "插帧/补帧相关", link: "/Interpolation" },
              { text: "常见问题&推荐", link: "/faq" },
              { text: "预览截图", link: "/preview" },
              { text: "下载方式", link: "/download" },
              { text: "如何更新到最新版", link: "/update" },
            ],
          },
        ],
      },
    },
    en: {
      label: "English-MT",
      lang: "en-US",
      dir: "ltr",
      themeConfig: {
        nav: [
          { text: "Home", link: "/en/" },
          {
            text: "View Features",
            link: "https://mpvConfig.github.io/",
          },
          {
            text: "Community",
            items: [
              {
                text: "Telegram",
                link: "https://t.me/+rYLzi96XzoxjZDc1",
              },
            ],
          },
        ],
        sidebar: [
          {
            text: "Getting Started",
            items: [
              { text: "Installation", link: "/en/install" },
              { text: "Interface Settings", link: "/en/conf" },
              { text: "Custom Configuration", link: "/en/custom" },
              { text: "Keyboard Shortcuts", link: "/en/shortcuts" },
              { text: "Default Behavior", link: "/en/behavior" },
              { text: "Subtitles", link: "/en/subtitles" },
              { text: "Video Shader Guide", link: "/en/shaders" },
              { text: "Frame Interpolation", link: "/en/Interpolation" },
              { text: "FAQ & Recommendations", link: "/en/faq" },
              { text: "Preview Screenshots", link: "/en/preview" },
              { text: "How to Update", link: "/en/update" },
            ],
          },
        ],
      },
    },
  },
});
