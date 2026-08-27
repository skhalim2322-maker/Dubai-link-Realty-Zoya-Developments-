const fs = require("fs");
const path = require("path");

module.exports = function (eleventyConfig) {

  /*
   * ==========================================
   * STATIC ASSETS
   * ==========================================
   */

  eleventyConfig.addPassthroughCopy({
    "assets": "assets"
  });

  eleventyConfig.addPassthroughCopy({
    "admin": "admin"
  });


  /*
   * ==========================================
   * PROJECT COLLECTION
   * ==========================================
   *
   * Decap CMS:
   *
   * content/projects/
   *
   * के अंदर जितनी .md files होंगी,
   * सभी automatically projects collection
   * में आ जाएंगी।
   */

  eleventyConfig.addCollection("projects", function (collectionApi) {

    return collectionApi
      .getFilteredByGlob"./Content/Projects/*.md"
      .sort((a, b) => {

        const aTitle = a.data.title || "";
        const bTitle = b.data.title || "";

        return aTitle.localeCompare(bTitle);

      });

  });


  /*
   * ==========================================
   * FEATURED PROJECTS
   * ==========================================
   */

  eleventyConfig.addCollection("featuredProjects", function (collectionApi) {

    return collectionApi
      .getFilteredByGlob("./Content/Projects/*.md")
      .filter(project => project.data.featured === true);

  });


  /*
   * ==========================================
   * APPROACH COLLECTION
   * ==========================================
   */

  eleventyConfig.addCollection("approach", function (collectionApi) {

    return collectionApi
      .getFilteredByGlob("./content/approach/*.md")
      .sort((a, b) => {

        const aNumber = Number(a.data.number || 999);
        const bNumber = Number(b.data.number || 999);

        return aNumber - bNumber;

      });

  });


  /*
   * ==========================================
   * WATCH CONTENT DURING LOCAL DEVELOPMENT
   * ==========================================
   */

  eleventyConfig.addWatchTarget("./content/");


  /*
   * ==========================================
   * DIRECTORY CONFIGURATION
   * ==========================================
   */

  return {

    dir: {
      input: ".",
      includes: "src/_includes",
      output: "_site"
    },

    templateFormats: [
      "njk",
      "md"
    ],

    markdownTemplateEngine: "njk",

    htmlTemplateEngine: "njk",

    dataTemplateEngine: "njk"

  };

};
