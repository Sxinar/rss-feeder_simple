document.getElementById('fetch-btn').addEventListener('click', function() {
    const rssUrl = document.getElementById('rss-url').value;
    fetchRSS(rssUrl);
});

function fetchRSS(url) {
    fetch(`https://api.rss2json.com/v1/api.json?rss_url=${url}`)
        .then(response => response.json())
        .then(data => {
            displayRSS(data.items);
        })
        .catch(error => {
            console.error('Error fetching the RSS feed:', error);
        });
}

function displayRSS(items) {
    const rssFeed = document.getElementById('rss-feed');
    rssFeed.innerHTML = '';

    items.forEach(item => {
        const rssItem = document.createElement('div');
        rssItem.className = 'rss-item';

        const title = document.createElement('h2');
        title.textContent = item.title;
        rssItem.appendChild(title);

        const description = document.createElement('p');
        description.innerHTML = item.description;
        rssItem.appendChild(description);

        rssFeed.appendChild(rssItem);
    });
}
