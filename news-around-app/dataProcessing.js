const DataProcessing = (allArticles) => {

// // store each article's data in an array where each article is stored in a dictionary
const allArticleData = []

for (let i = 0; i < allArticles.length; i++) {
  let hyphenAmount = allArticles[i].title.split("-").length -1
  let articleTitle = allArticles[i].title.split("-")[0]
  let sourceCheck = ""
  let author = allArticles[i].author
  let newsSource = allArticles[i].source["Name"]
  let url = allArticles[i].url
  // clean publishDate property
  let publishDate = allArticles[i].publishedAt.split("T")[0]      
  // check title property for more than one hyphens
  if (hyphenAmount > 1) {
    // console.log("theres more than 1 hyphen")
    sourceCheck = allArticles[i].title.split("-")[hyphenAmount]
    articleTitle = allArticles[i].title.replace(sourceCheck, '')
    // get the lastIndex of "-"
    let lastHyphenIndex = articleTitle.lastIndexOf("-")
    // use subString method to only save only up to the lastHyphen without the hyphen itself
    articleTitle = articleTitle.substring(0, lastHyphenIndex)
  }
  // some article titles include | News Source or News Type, code below to get rid of it
  if (articleTitle.includes("|")) {
    articleTitle = articleTitle.split("|")[0]
  }
  // check author property
  // clean up author when it is null or an empty string 
  if (author === null || author === "") {
    author = "N/A"
  }
  let articleData = {
    title: articleTitle,
    author: author,
    source: newsSource, 
    url: url, 
    date: publishDate // 2023-05-16
  };

  allArticleData.push(articleData);
}
return allArticleData
}

module.exports = DataProcessing;