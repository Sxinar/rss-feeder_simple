const rssForm = document.getElementById('rss-form');
const newsList = document.getElementById('news-list');

rssForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const rssUrl = document.getElementById('rss-url').value;

    fetch(rssUrl)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, 'text/xml');
            const items = xmlDoc.querySelectorAll('item');

            // Haberleri listeleme
            let html = '';
            items.forEach(item => {
                const title = item.querySelector('title').textContent;
                const description = item.querySelector('description').textContent;
                const link = item.querySelector('link').textContent;

                html += `
                    <li>
                        <h2><a href="${link}" target="_blank">${title}</a></h2>
                        <p>${description}</p>
                    </li>
                `;
            });

            newsList.innerHTML = html;
        })
        .catch(error => {
            console.error('RSS beslemesi alınamadı!', error);
            newsList.innerHTML = '<li>RSS beslemesi alınamadı. Lütfen geçerli bir RSS URL girin.</li>';
        });
});
