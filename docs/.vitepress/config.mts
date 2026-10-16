import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/docs/",
  title: "mpv.config",
  description: "mpv.config — The configuration file of the mpv player",

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
      pattern: "https://github.com/akFace/mpv.config/tree/main/docs/:path",
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
          { text: "查看特性", link: "https://akface.github.io/mpv.config/" },
        ],
        sidebar: [
          {
            text: "立即开始",
            items: [
              { text: "安装", link: "/install" },
              { text: "快捷键", link: "/shortcuts" },
              { text: "默认行为", link: "/behavior" },
              { text: "字幕相关", link: "/subtitles" },
              { text: "视频滤镜选择指南", link: "/shaders" },
              { text: "自定义配置", link: "/custom" },
              { text: "常见问题&推荐", link: "/faq" },
              { text: "预览截图", link: "/preview" },
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
            link: "https://akface.github.io/mpv.config/",
          },
        ],
        sidebar: [
          {
            text: "Getting Started",
            items: [
              { text: "Installation", link: "/en/install" },
              { text: "Shortcuts", link: "/en/shortcuts" },
              { text: "Default Behavior", link: "/en/behavior" },
              { text: "Subtitles", link: "/en/subtitles" },
              { text: "Video Shader Guide", link: "/en/shaders" },
              { text: "Custom Configuration", link: "/en/custom" },
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
