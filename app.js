const rssForm = document.getElementById('rss-form');
const rssFeed = document.getElementById('rss-feed');

rssForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const rssUrl = document.getElementById('rss-url').value;

    fetch(rssUrl)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, 'text/xml');
            const items = xmlDoc.querySelectorAll('item');

            let html = '';
            items.forEach(item => {
                html += `
                    <article>
                        <h2>${item.querySelector('title').textContent}</h2>
                        <p>${item.querySelector('description').textContent}</p>
                        <a href="${item.querySelector('link').textContent}" target="_blank">Devamını Oku</a>
                    </article>
                `;
            });

            rssFeed.innerHTML = html;
        })
        .catch(error => {
            console.error('RSS beslemesi alınamadı!', error);
            rssFeed.innerHTML = '<p>RSS beslemesi alınamadı. Lütfen geçerli bir RSS URL girin.</p>';
        });
});
