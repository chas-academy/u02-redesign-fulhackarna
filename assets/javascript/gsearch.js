const Parser = new DOMParser();
const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get("q");
const page = urlParams.get("p") || undefined;

// The render container will recieve all elements that are rendered upon recieving the result from the search engine
const RENDER_CONTAINER = document.querySelector(".search-results");

// Months array used to translate month indices (0, 1, 2) to strings (Januari, Februari, Mars)
const months = [
  "Januari",
  "Februari",
  "Mars",
  "April",
  "Maj",
  "Juni",
  "Juli",
  "Augusti",
  "September",
  "Oktober",
  "November",
  "December",
];

// Funtion used to check wether a generated date is valid or not
function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

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
  gsearch(query, page);
}

async function gsearch(keyword, page = 0) {
  fetch(
    `https://www.googleapis.com/customsearch/v1?key=AIzaSyBHaHEwQfWxGNBulxV3EWtPQPCRj4reIJA&cx=21d85085d6478063d&q=${keyword}&start=${
      page * 10
    }`
  )
    .then((response) => response.json())
    .then((search) => {
      if (search.items?.length > 0) {
        // Parse response for search metadata
        const { searchTime, totalResults } = search.searchInformation;
        const { searchTerms, count, startIndex } = search.queries.request;

        const resultMeta = {
          totalResults,
          searchTime,
          searchTerms,
          count,
          startIndex,
          pages: Math.ceil(totalResults / 10),
        };

        // Create list to render results to
        var list = document.createElement("ul");

        // Render LI elements for each search result.
        search.items.forEach(
          ({ title, htmlSnippet, link, pagemap: { metatags } }, index) => {
            let last_changed = metatags[0]?.["last-modified"];
            let created = metatags[0]?.["creation_date"];
            let date = new Date(last_changed || created);

            let dateString = `${
              last_changed ? "Senast ändrad:" : created ? "Skapad:" : ""
            } ${
              isValidDate(date)
                ? String(date.getDate()) + " " + String(months[date.getMonth()])
                : ""
            }`;

            let li = Parser.parseFromString(
              `
                <li class="article-item">
                  <a href="${link}">
                    <article>
                      <h2>${title}</h2>
                      <div class="article-text">
                        <p>${htmlSnippet.replace(
                          /(<|&lt;)br\s*\/*(>|&gt;)/g, // This removes all <br> elements from the snippet
                          ""
                        )}</p>
                      </div>
                      <time>${dateString}</time>
                    </article>
                  </a>
                </li>
            `,
              "text/html"
            );

            list.appendChild(li.querySelector("li"));
          }
        );

        // Create pagination list

        var pagination = document.createElement("ul");
        pagination.className = "pagination";

        // Render one page in the pagination for every page available in search
        for (let i = 0; i < search.items.length; i++) {
          let link = Parser.parseFromString(
            `
            <li ${page == i ? 'class="current-page"' : ""}>
              <a href="/sok.html?q=${query}&p=${i}">${i + 1}</a>
            </li>
          `,
            "text/html"
          );
          link = link.querySelector("li");

          pagination.appendChild(link);
        }

        // Append elements to the render container
        RENDER_CONTAINER.replaceChild(
          list,
          document.querySelector(".lds-default")
        );
        RENDER_CONTAINER.appendChild(pagination);

        // Log info for debug purposes
        console.log({
          resultMeta,
          results: search.items,
        });
      } else {
        let noRes = document.createElement("span");
        noRes.innerHTML = "Din sökning gav inga resultat.";
        noRes.className = "no-results";
        return RENDER_CONTAINER.appendChild(noRes);
      }
    })
    .catch((error) => console.log("error", error));
}
