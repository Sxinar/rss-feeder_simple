document.addEventListener('DOMContentLoaded', function () {
  const feedList = document.getElementById('feedList');

  // Simüle edilmiş bir RSS verisi
  const rssFeeds = [
    {
      id: 1,
      title: 'Başlık 1',
      description: 'Bu bir RSS öğesi.',
      link: 'https://example.com/rss1'
    },
    {
      id: 2,
      title: 'Başlık 2',
      description: 'Bu da başka bir RSS öğesi.',
      link: 'https://example.com/rss2'
    },
    // Daha fazla öğe eklenebilir
  ];

  // RSS öğelerini ekrana ekleyen fonksiyon
  function renderFeeds() {
    rssFeeds.forEach(feed => {
      const feedItem = document.createElement('div');
      feedItem.classList.add('feed-item');
      feedItem.innerHTML = `
        <h3>${feed.title}</h3>
        <p>${feed.description}</p>
        <a href="${feed.link}" target="_blank">Devamını Oku</a>
      `;
      feedList.appendChild(feedItem);
    });
  }

  // RSS öğelerini yükleyelim
  renderFeeds();
});
