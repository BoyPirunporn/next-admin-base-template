// import fs from "fs";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
// import path from "path";
// const dir = path.resolve();
// const langDir = path.join(dir, "src/messages");
// const allPath = fs.readdirSync(langDir).map(e => path.join(langDir, e));
// const allFiles = allPath.map(pathDir => fs.readdirSync(pathDir).filter(file => /(.json)$/g.test(file)).map(file => path.join(pathDir, file))).flatMap(e => e, []);
const withNextIntl = createNextIntlPlugin({
  requestConfig: "./src/i18n/request.ts",
  // experimental: {
  //   createMessagesDeclaration: allFiles,
  // }

});

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    unoptimized: false,
    domains: ["localhost"]
  }
};

export default withNextIntl(nextConfig);
