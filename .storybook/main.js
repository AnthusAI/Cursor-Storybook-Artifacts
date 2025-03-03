/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  "stories": [
    "../components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions"
  ],
  "framework": {
    "name": "@storybook/react-webpack5",
    "options": {}
  },
  "webpackFinal": async (config) => {
    // Find the CSS rule
    const cssRule = config.module.rules.find(
      (rule) => rule.test && rule.test.toString().includes('css')
    );

    // Add postcss-loader to the CSS rule
    if (cssRule && cssRule.use) {
      cssRule.use.push({
        loader: 'postcss-loader',
        options: {
          implementation: require('postcss'),
        },
      });
    }

    return config;
  }
};
export default config;