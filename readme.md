
# Tech Comparison Backend

![workflow](https://github.com/alcr33k/tech-comparison-backend/actions/workflows/main.yml/badge.svg) [![codecov](https://codecov.io/github/alcr33k/tech-comparison-backend/graph/badge.svg?token=UHF67T4VHG)](https://codecov.io/github/alcr33k/tech-comparison-backend)

## Laptop Comparison GraphQL API

This GraphQL API provides detailed comparisons between various laptop models. It is built using Apollo Server and SQLite, and supports static site generation for the `tech-comparison-frontend` repository.

## Features

- Fetch and compare specifications for a wide range of laptops.
- Fetch and update content for the laptop comparison site.
- Generate internal links for different articles.
- Simple and intuitive GraphQL queries.

## Requirements

- Node.js
- npm

## Installation

Clone the repository:

    git clone https://github.com/yourusername/laptop-comparison-api.git
    cd laptop-comparison-api

Install dependencies:

    npm install

## Running the Server

Start the server locally:

    npm run start

This will start the Apollo Server on `http://localhost:4000`. You can access the GraphQL playground and start querying at `http://localhost:4000/graphql`.

## Running Tests

To run the test suite:

    npm run test

## Example Query

Here's an example query to get started with fetching laptop data:

```graphql
    query Laptop($productId: Int!) {
      laptop(productId: $productId) {
        batteryLife
        batteryPower
        screenSize
        resolution
        displayType
        refreshRate
        ram
        storageSize
      }
    }
```
You can use this query with a GraphQL variable `productId`, for example, `30`.

## Services

### ArticleService

#### Functions

<dl>
<dt><a href="#fetchArticleUrls">fetchArticleUrls(input)</a> ⇒ <code>Array</code></dt>
<dd><p>Fetch a list of article urls.</p>
</dd>
<dt><a href="#fetchArticles">fetchArticles(input)</a> ⇒ <code>Array</code></dt>
<dd><p>Fetches all articles, can also limit it to only return published articles</p>
</dd>
<dt><a href="#updatePublishedDate">updatePublishedDate(input)</a> ⇒ <code>Object</code></dt>
<dd><p>Updates the published_date of an article to the current date.</p>
</dd>
<dt><a href="#updateArticle">updateArticle(input)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Updates the content of an article on one or multiple sections</p>
</dd>
<dt><a href="#fetchArticleData">fetchArticleData(input)</a> ⇒ <code>Object</code></dt>
<dd><p>Fetches article data for a given URL, including details about laptops.</p>
</dd>
<dt><a href="#fetchArticleContent">fetchArticleContent(input)</a> ⇒ <code>Object</code></dt>
<dd><p>Fetches article content for a given URL, including sections like introduction, design, performance, and more.</p>
</dd>
<dt><a href="#fetchLatestComparisons">fetchLatestComparisons(input)</a> ⇒ <code>Array</code></dt>
<dd><p>Fetches latest articles base on publishedDT</p>
</dd>
</dl>

<a name="fetchArticleUrls"></a>

#### fetchArticleUrls(input) ⇒ <code>Array</code>
Fetch a list of article urls.

**Returns**: <code>Array</code> - - An array of articles.

| Param | Type | Description |
| --- | --- | --- |
| [limit] | <code>number</code> | How many articles to fetch. |
| [onlyUnpublished] | <code>boolean</code> | Whether to fetch only unpublished articles. |
| [onlytoPublish] | <code>boolean</code> | Whether to fetch only articles with a date_to_publish < NOW(). |

<a name="fetchArticles"></a>

#### fetchArticles(input) ⇒ <code>Array</code>
Fetches all articles, can also limit it to only return published articles

**Returns**: <code>Array</code> - - An array of articles.

| Param | Type | Description |
| --- | --- | --- |
| [onlyUnpublished] | <code>boolean</code> | Whether to fetch only unpublished articles. |

<a name="updatePublishedDate"></a>

#### updatePublishedDate(input) ⇒ <code>Object</code>
Updates the published_date of an article to the current date.

**Returns**: <code>Object</code> - - An object that indicate if the update completed sucessfully.

| Param | Type | Description |
| --- | --- | --- |
| article_id | <code>number</code> | The ID of the article to update. |

<a name="updateArticle"></a>

#### updateArticle(input) ⇒ <code>Boolean</code>
Updates the content of an article on one or multiple sections

**Returns**: <code>Boolean</code> - - A boolean that is true when the update is complete and false one errors.

| Param | Type | Description |
| --- | --- | --- |
| article_id | <code>number</code> | The ID of the article to update. |
| sectionsToChange | <code>number</code> | The sections and content to change. |

<a name="fetchArticleData"></a>

#### fetchArticleData(input) ⇒ <code>Object</code>
Fetches article data for a given URL, including details about laptops.

**Returns**: <code>Object</code> - - An object containing laptop data, such as names, ratings, sizes, benchmarks, and specifications.

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | The URL of the article to fetch data for. |

<a name="fetchArticleContent"></a>

#### fetchArticleContent(input) ⇒ <code>Object</code>
Fetches article content for a given URL, including sections like introduction, design, performance, and more.

**Returns**: <code>Object</code> - - An object containing various sections of article content.

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | The URL of the article to fetch content for. |

<a name="fetchLatestComparisons"></a>

#### fetchLatestComparisons(input) ⇒ <code>Array</code>
Fetches latest articles base on publishedDT

**Returns**: <code>Array</code> - - An array of article names and urls.

| Param | Type | Description |
| --- | --- | --- |
| [limit] | <code>number</code> | The amount of articles to fetch, deafult 5 articles. |


### InternalLinkService

#### Functions

<dl>
<dt><a href="#generateInternalLinks">generateInternalLinks(input)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Inserts internal links for given article ids</p>
</dd>
<dt><a href="#fetchInternalLinks">fetchInternalLinks(input)</a> ⇒ <code>Array&lt;Object&gt;</code></dt>
<dd><p>Fetches internal links for a given article URL.</p>
</dd>
</dl>

<a name="generateInternalLinks"></a>

#### generateInternalLinks(input) ⇒ <code>Boolean</code>
Inserts internal links for given article ids

**Returns**: <code>Boolean</code> - - A boolean indicating if it sucessfully generated

| Param | Type | Description |
| --- | --- | --- |
| [articleUrls] | <code>Array&lt;String&gt;</code> | The urls of the articles to create internal links for |

<a name="fetchInternalLinks"></a>

#### fetchInternalLinks(input) ⇒ <code>Array&lt;Object&gt;</code>
Fetches internal links for a given article URL.

**Returns**: <code>Array.&lt;Object&gt;</code> - - An array of internal link objects.

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | The URL of the article to fetch internal links for. |

### laptopService

#### fetchLaptopData(input) ⇒ <code>Object</code>
Fetches data for a laptop given its product ID.

**Returns**: <code>Object</code> - - An object containing the laptop specifications.

| Param | Type | Description |
| --- | --- | --- |
| productId | <code>number</code> | The product ID of the laptop to fetch data for. |