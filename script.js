document.addEventListener('DOMContentLoaded', function () {
  const feedList = document.getElementById('feedList');

  // Kullanılacak RSS feed URL'si
  const rssFeedUrl = 'https://example.com/rss-feed'; // Burada kendi RSS feed URL'nizi girin

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
