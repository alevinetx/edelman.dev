module.exports = {
  siteUrl: process.env.SITE_URL || "https://edel.monster",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ["/server-sitemap.xml", "/api/*"],
  robotsTxtOptions: {
    additionalSitemaps: [
      "https://edel.monster/server-sitemap.xml", // <==== Add here
    ],
  },
};
