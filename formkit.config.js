import { generateClasses } from "@formkit/themes";
import theme from "./theme.js";
import { createProPlugin, inputs } from "@formkit/pro";
import { createMultiStepPlugin } from "@formkit/addons";
import { genesisIcons } from "@formkit/icons";

const pro = createProPlugin("fk-d5888c6a7f", inputs);

const config = {
  config: {
    // pass our theme object to generateClasses
    classes: generateClasses(theme),
  },
  icons: {
    ...genesisIcons,
  },
  plugins: [pro, createMultiStepPlugin()],
};

export default config;
