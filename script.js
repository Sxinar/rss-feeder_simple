const rssList = [];
const rssListElement = document.getElementById('rss-list');
const rssFeedElement = document.getElementById('rss-feed');
const themeToggleButton = document.getElementById('theme-toggle-btn');

document.getElementById('add-btn').addEventListener('click', function() {
    const websiteUrl = document.getElementById('rss-url').value;
    if (websiteUrl && !rssList.includes(websiteUrl)) {
        fetchRSSFeedUrl(websiteUrl).then(rssUrl => {
            if (rssUrl) {
                rssList.push(rssUrl);
                updateRSSList();
            } else {
                alert('No RSS feed found for this website.');
            }
        });
        document.getElementById('rss-url').value = '';
    }
});

document.getElementById('fetch-all-btn').addEventListener('click', function() {
    rssFeedElement.innerHTML = '';
    rssList.forEach(fetchRSS);
});

themeToggleButton.addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
});

function updateRSSList() {
    rssListElement.innerHTML = '';
    rssList.forEach((url, index) => {
        const li = document.createElement('li');
        li.className = 'mdc-list-item';
        li.textContent = url;
        const removeButton = document.createElement('button');
        removeButton.className = 'mdc-icon-button material-icons';
        removeButton.textContent = 'delete';
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

function fetchRSSFeedUrl(websiteUrl) {
    const proxyUrl = `http://localhost:3000/fetch-rss?url=${encodeURIComponent(websiteUrl)}`;
    return fetch(proxyUrl)
        .then(response => response.json())
        .then(data => data.rssUrl)
        .catch(error => {
            console.error('Error fetching the RSS feed URL:', error);
            return null;
        });
}
