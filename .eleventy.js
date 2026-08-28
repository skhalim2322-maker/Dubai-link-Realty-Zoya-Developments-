module.exports = function (eleventyConfig) {

  // Static folders
  eleventyConfig.addPassthroughCopy({
    "images": "images"
  });

  eleventyConfig.addPassthroughCopy({
    "admin": "admin"
  });

  eleventyConfig.addPassthroughCopy({
  "src/style.css": "style.css"
});

  eleventyConfig.addPassthroughCopy({
  "src/script.js": "script.js"
});


  // Projects collection
  eleventyConfig.addCollection("projects", function (collectionApi) {

    return collectionApi
      .getFilteredByGlob("./content/projects/*.md")
      .sort((a, b) => {

        const aTitle = a.data.title || "";
        const bTitle = b.data.title || "";

        return aTitle.localeCompare(bTitle);

      });

  });


  // Featured projects collection
  eleventyConfig.addCollection("featuredProjects", function (collectionApi) {

    return collectionApi
      .getFilteredByGlob("./content/projects/*.md")
      .filter(project => project.data.featured === true);

  });


  // Approach collection
  eleventyConfig.addCollection("approach", function (collectionApi) {

    return collectionApi
      .getFilteredByGlob("./content/approach/*.md")
      .sort((a, b) => {

        const aNumber = Number(a.data.number || 999);
        const bNumber = Number(b.data.number || 999);

        return aNumber - bNumber;

      });

  });


  // Watch content changes
  eleventyConfig.addWatchTarget("./content/");
  eleventyConfig.addWatchTarget("./_data/");
  eleventyConfig.addWatchTarget("./images/");


  return {

    dir: {
      input: ".",
      includes: "src/_includes",
      output: "_site"
    },

    templateFormats: [
      "njk",
      "html",
      "md"
    ],

    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"

  };

};
