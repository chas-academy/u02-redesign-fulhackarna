const Parser = new DOMParser()
const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get('q');
const page = urlParams.get('p');

search(query)

async function search(keyword) {
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "ASP.NET_SessionId=dnikjkvblxdiuirse3znfp3c; TS01c19746=014d21d2d86731e9219a9c7dd979398788221452a3de752e7562a9024e64188c5d6e8424873c518b60e73535115a58b601f5367f43ba5180460260baad2e137ef303384368");

  fetch("https://www.myh.se/Sok/?q=" + encodeURI(keyword), {
    "headers": {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "en,sv;q=0.9",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-origin",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1"
    },
    "referrer": "https://www.myh.se/Sok/",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors",
  })
  .then(response => response.text())
  .then(html => {
    if(html) {
      // Parse text response into HTML
      var doc = Parser.parseFromString(html, 'text/html')
      // Grab search results and meta
      const searchResults = doc.querySelector("#huvudinnehall > div.l-field-wrap > div > div.l-unit.l-size2of3 > div > div:nth-child(2) > div")
      // Parse amount of hits and query
      const [{innerHTML: hitAmount}, {innerHTML: query}] = searchResults.querySelectorAll(".main-search-meta strong");
      // Grab resulting articles
      const articles = searchResults.querySelectorAll(".article-item")
      // Parse articles into Array of properties
      const resultArray = Array.from(articles).map(article => {
        return {
          heading: article.querySelector(".h-byline").innerText,
          content: article.querySelector(".compact").innerHTML,
          date: article.querySelector(".article-date").innerText
        }
      })

      var list = document.createElement("ul");
      resultArray.forEach(({heading, content, date}) => {
        let li = Parser.parseFromString(`
          <li class="article-item">
            <h2>${heading}
            <div class="article-text">
              <p>${content}</p>
            </div>
            <time>${date}</time>
          </li>
      `, "text/html")
        
        list.appendChild(li.querySelector("li"))
      });
      document.body.appendChild(list)

      console.log({
        resultMeta: {
          hitAmount,
          query,
          pages: Math.ceil(hitAmount / 20)
        },
        results: resultArray
      })
    }
  })
  .catch(error => console.log('error', error));
}

