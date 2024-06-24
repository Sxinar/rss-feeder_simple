const rssList = [];
const rssListElement = document.getElementById('rss-list');
const rssFeedElement = document.getElementById('rss-feed');

document.getElementById('add-btn').addEventListener('click', function() {
    const rssUrl = document.getElementById('rss-url').value;
    if (rssUrl && !rssList.includes(rssUrl)) {
        rssList.push(rssUrl);
        updateRSSList();
        document.getElementById('rss-url').value = '';
    }
});

document.getElementById('fetch-all-btn').addEventListener('click', function() {
    rssFeedElement.innerHTML = '';
    rssList.forEach(fetchRSS);
});

function updateRSSList() {
    rssListElement.innerHTML = '';
    rssList.forEach((url, index) => {
        const li = document.createElement('li');
        li.textContent = url;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            rssList.splice(index, 1);
            updateRSSList();
        });
        li.appendChild(removeButton);
        rssListElement.appendChild(li);
    });
}

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
    items.forEach(item => {
        const rssItem = document.createElement('div');
        rssItem.className = 'rss-item';

        const title = document.createElement('h2');
        title.textContent = item.title;
        title.addEventListener('click', () => {
            toggleContent(description);
        });
        rssItem.appendChild(title);

        const description = document.createElement('div');
        description.style.display = 'none';
        description.innerHTML = item.content || item.description;
        rssItem.appendChild(description);

        rssFeedElement.appendChild(rssItem);
    });
}

function toggleContent(element) {
    if (element.style.display === 'none') {
        element.style.display = 'block';
    } else {
        element.style.display = 'none';
    }
}
