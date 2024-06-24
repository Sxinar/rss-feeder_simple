// RSS beslemesini çekmek için bir API kullanabilirsiniz
const rssUrl = 'https://example.com/rss-feed.xml';

// RSS verilerini al ve sayfada görüntüle
fetch(rssUrl)
    .then(response => response.text())
    .then(data => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'text/xml');
        const items = xmlDoc.querySelectorAll('item');

        const feedContainer = document.getElementById('feed-container');
        items.forEach(item => {
            const title = item.querySelector('title').textContent;
            const link = item.querySelector('link').textContent;

            const feedItem = document.createElement('div');
            feedItem.innerHTML = `<a href="${link}" target="_blank">${title}</a>`;
            feedContainer.appendChild(feedItem);
        });
    })
    .catch(error => console.error('RSS verileri alınamadı:', error));
