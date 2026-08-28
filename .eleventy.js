const fs = require("fs");
const path = require("path");

module.exports = function (eleventyConfig) {

  eleventyConfig.addPassthroughCopy({
    "images": "images"
  });

  eleventyConfig.addPassthroughCopy({
    "admin": "admin"
  });


  eleventyConfig.addCollection("projects", function (collectionApi) {

    return collectionApi
      .getFilteredByGlob("./content/projects/*.md")
      .sort((a, b) => {

        const aTitle = a.data.title || "";
        const bTitle = b.data.title || "";

        return aTitle.localeCompare(bTitle);

      });

  });


  eleventyConfig.addCollection("featuredProjects", function (collectionApi) {

    return collectionApi
      .getFilteredByGlob("./content/projects/*.md")
      .filter(project => project.data.featured === true);

  });


  eleventyConfig.addCollection("approach", function (collectionApi) {

    return collectionApi
      .getFilteredByGlob("./content/approach/*.md")
      .sort((a, b) => {

        const aNumber = Number(a.data.number || 999);
        const bNumber = Number(b.data.number || 999);

        return aNumber - bNumber;

      });

  });


  eleventyConfig.addWatchTarget("./content/");


  return {

    dir: {
      input: ".",
      includes: "src/_includes",
      output: "_site"
    },

    templateFormats: [
      "njk",
      "md"
      "html"
    ],

    markdownTemplateEngine: "njk",

    htmlTemplateEngine: "njk",

    dataTemplateEngine: "njk"

  };

};
