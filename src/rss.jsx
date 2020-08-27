import * as rssParser from 'react-native-rss-parser';

export function getRSS(url) {
    return fetch(url)
        .then(response => response.text())
        .then(str => rssParser.parse(str))
}

export function getFeedAuthors(feed) {
    return feed.authors.map(author => author.name).join(', ')
}

export function getArticleAuthors(feed,article) {
    if (!article.authors || article.authors.length == 0)
        return getFeedAuthors(feed);
    else
        return article.authors.map(author => author.name).join(', ')
}

export function getArticleDate(article) {
    return new Date(article.published.trim()).toDateString();
}