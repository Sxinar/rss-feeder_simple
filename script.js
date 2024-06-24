const rssFeed = document.getElementById('rss-feed');

// RSS beslemesini çekmek için bir AJAX isteği yap
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://example.com/rss-feed.xml', true);
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const response = xhr.responseXML;
    const items = response.getElementsByTagName('item');

    // Her bir RSS öğesini döngüyle dolaşarak içerikleri al ve kullanıcı arayüzüne ekle
    for (let i = 0; i < items.length; i++) {
      const title = items[i].getElementsByTagName('title')[0].textContent;
      const description = items[i].getElementsByTagName('description')[0].textContent;
      const date = items[i].getElementsByTagName('pubDate')[0].textContent;

      const li = document.createElement('li');
      li.innerHTML = `<h2>${title}</h2><p>${description}</p><span>${date}</span>`;

      rssFeed.appendChild(li);
    }
  }
};
xhr.send();
