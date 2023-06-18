const DataProcessing = (allArticles) => {

// // store each article's data in an array where each article is stored in a dictionary
const allArticleData = []

for (let i = 0; i < allArticles.length; i++) {
  let hyphenAmount = allArticles[i].title.split("-").length -1
  let articleTitle = allArticles[i].title.split("-")[0]
  let sourceCheck = ""
  let author = allArticles[i].author
  console.log("Before processing news source:", allArticles[i].source)
  let newsSource = allArticles[i].source["name"]
  console.log("News Source:", newsSource)
  let url = allArticles[i].url
  // clean publishDate property
  let publishDate = allArticles[i].publishedAt.split("T")[0] 
  let publishTime = allArticles[i].publishedAt.split("T")[1].split(":").slice(0, 2).join(":")
  let formattedDateTime = publishDate + " " + publishTime
  // check title property for more than one hyphens
  if (hyphenAmount > 1) {
    // console.log("theres more than 1 hyphen")
    sourceCheck = allArticles[i].title.split("-")[hyphenAmount]
    articleTitle = allArticles[i].title.replace(sourceCheck, '')
    // get the lastIndex of "-"
    let lastHyphenIndex = articleTitle.lastIndexOf("-")
    // use subString method to only save only up to the lastHyphen without the hyphen itself
    articleTitle = articleTitle.substring(0, lastHyphenIndex).trim()
  }
  // some article titles include | News Source or News Type, code below to get rid of it
  if (articleTitle.includes("|")) {
    articleTitle = articleTitle.split("|")[0].trim()
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
    dateTime: formattedDateTime // 2023-05-16 10:05
  };

  allArticleData.push(articleData);
}
return allArticleData
}

module.exports = DataProcessing;