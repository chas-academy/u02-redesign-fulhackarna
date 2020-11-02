const Parser = new DOMParser();
const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get("q");
const page = urlParams.get("p") || undefined;

// The render container will recieve all elements that are rendered upon recieving the result from the search engine
const RENDER_CONTAINER = document.querySelector(".search-results");
const PAGINATION_CONTAINER = document.querySelector(".pagination-results");

// Only perform the request if a search query was provided
if (query) {
  RENDER_CONTAINER.innerHTML = `
    <div class="lds-default">
      <div></div><div></div><div></div>
      <div></div><div></div><div></div>
      <div></div><div></div><div></div>
      <div></div><div></div><div></div>
    </div>
  `;
  search(query);
}

// Function to do something (f) N times
const times = (n) => (f) => {
  let iter = (i) => {
    if (i === n) return;
    f(i);
    iter(i + 1);
  };
  return iter(0);
};

async function search(keyword) {
  var myHeaders = new Headers();
  myHeaders.append(
    "Cookie",
    "ASP.NET_SessionId=dnikjkvblxdiuirse3znfp3c; TS01c19746=014d21d2d86731e9219a9c7dd979398788221452a3de752e7562a9024e64188c5d6e8424873c518b60e73535115a58b601f5367f43ba5180460260baad2e137ef303384368"
  );

  fetch(
    `https://api.allorigins.win/get?url=${encodeURIComponent(
      `https://www.myh.se/Sok/?q=${keyword}${page ? "&p=2" : ""}`
    )}`.trim()
  )
    .then((response) => response.json())
    .then(({ contents: html }) => {
      if (html) {
        // Parse text response into HTML
        var doc = Parser.parseFromString(html, "text/html");
        // Grab search results and meta
        const searchResults = doc.querySelector(
          "#huvudinnehall > div.l-field-wrap > div > div.l-unit.l-size2of3 > div > div:nth-child(2) > div"
        );

        if (
          searchResults.querySelectorAll(".main-search-meta strong").length < 2
        ) {
          let noRes = document.createElement("span");
          noRes.innerHTML = searchResults.querySelector(
            ".main-search-meta"
          ).innerHTML;
          noRes.className = "no-results";
          return RENDER_CONTAINER.appendChild(noRes);
        }

        // Parse amount of hits and query
        const [
          { innerHTML: hitAmount },
          { innerHTML: query },
        ] = searchResults.querySelectorAll(".main-search-meta strong");
        const resultMeta = {
          hitAmount,
          query,
          pages: 10,
        };

        // Grab resulting articles
        const articles = searchResults.querySelectorAll(".article-item");
        // Parse articles into Array of properties
        const resultArray = Array.from(articles).map((article) => {
          return {
            heading: article.querySelector(".h-byline").innerHTML,
            content: article.querySelector(".compact").innerHTML,
            date: article.querySelector(".article-date").innerText,
          };
        });

        // If no results are returned, render a "No results" element
        if (resultArray.length === 0) {
          let noRes = document.createElement("span");
          noRes.innerHTML = "Inga resultat.";
          return RENDER_CONTAINER.appendChild(noRes);
        }

        // Create UL elements for search results and pagination
        var list = document.createElement("ul");
        var pagination = document.createElement("ul");
        pagination.className = "pagination";

        // Render LI elements for each search result.
        resultArray.forEach(({ heading, content, date }, index) => {
          let li = Parser.parseFromString(
            `
          <li class="article-item">
            <article>
              <h2>${heading}</h2>
              <div class="article-text">
                <p>${content}</p>
              </div>
              <time>${date}</time>
            </article>
          </li>
      `,
            "text/html"
          );

          list.appendChild(li.querySelector("li"));
        });

        // Render one page in the pagination for every page available in search
        times(resultMeta.pages)((index) => {
          let page = Parser.parseFromString(
            `
            <li>
              <span>${index + 1}<span>
            </li>
          `,
            "text/html"
          );
          page = page.querySelector("li");
          page.onclick = (e) =>
            (window.location.href = "?q=" + query + "&p=" + (index + 1));

          pagination.appendChild(page);
        });

        // Append elements to the render container
        RENDER_CONTAINER.replaceChild(
          list,
          document.querySelector(".lds-default")
        );
        PAGINATION_CONTAINER.appendChild(pagination);

        // Log info for debug purposes
        console.log({
          resultMeta,
          results: resultArray,
        });
      }
    })
    .catch((error) => console.log("error", error));
}
