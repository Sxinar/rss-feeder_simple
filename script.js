document.addEventListener('DOMContentLoaded', function () {
  const rssForm = document.getElementById('rssForm');
  const rssUrlInput = document.getElementById('rssUrl');
  const feedList = document.getElementById('feedList');

  rssForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const rssFeedUrl = rssUrlInput.value.trim();

    if (!rssFeedUrl) {
      alert('Lütfen geçerli bir RSS URL\'si girin.');
      return;
    }

    // RSS verilerini çeken fonksiyon
    async function fetchRssData(url) {
      try {
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`);
        if (!response.ok) {
          throw new Error('RSS verileri alınamadı.');
        }
        const data = await response.json();
        return data.items; // Sadece öğeleri (items) döndürüyoruz
      } catch (error) {
        console.error('Hata:', error);
        return [];
      }
    }

    // RSS öğelerini ekrana ekleyen fonksiyon
    async function renderFeeds() {
      feedList.innerHTML = ''; // Önceki içeriği temizle
      const items = await fetchRssData(rssFeedUrl);
      items.forEach(item => {
        const feedItem = document.createElement('div');
        feedItem.classList.add('feed-item');
        feedItem.innerHTML = `
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          <a href="${item.link}" target="_blank">Devamını Oku</a>
        `;
        feedList.appendChild(feedItem);
      });
    }

    // RSS öğelerini yükleyelim
    renderFeeds();
  });
});
