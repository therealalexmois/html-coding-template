module.exports = {
  modules: false,
  plugins: [
    require("autoprefixer"),
    require("postcss-nested"),
    require("postcss-import"),
    require("postcss-pxtorem")({
      rootValue: 16,
      unitPrecision: 5,
      propList: [
        "font",
        "font-size",
        "line-height",
        "letter-spacing",
        "padding-top",
      ],
      selectorBlackList: [],
      replace: true,
      mediaQuery: false,
      minPixelValue: 0,
    }),
    require("postcss-mixins"),
  ],
}
