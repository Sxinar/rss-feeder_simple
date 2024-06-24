const rssList = [];
const rssListElement = document.getElementById('rss-list');
const rssFeedElement = document.getElementById('rss-feed');

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

function updateRSSList() {
    rssListElement.innerHTML = '';
    rssList.forEach((url, index) => {
        const li = document.createElement('li');
        li.className = 'mdl-list__item';
        li.textContent = url;
        const removeButton = document.createElement('button');
        removeButton.className = 'mdl-button mdl-js-button mdl-button--icon';
        removeButton.innerHTML = '<i class="material-icons">delete</i>';
        removeButton.addEventListener('click', () => {
            rssList.splice(index, 1);
            updateRSSList();
        });
        li.appendChild(removeButton);
        rssListElement.appendChild(li);
    });
    componentHandler.upgradeDom();
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
        rssItem.className = 'rss-item mdl-card mdl-shadow--2dp';

        const title = document.createElement('h2');
        title.className = 'mdl-card__title-text';
        title.textContent = item.title;
        title.addEventListener('click', () => {
            toggleContent(description);
        });
        rssItem.appendChild(title);

        const description = document.createElement('div');
        description.className = 'mdl-card__supporting-text';
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
    return fetch(websiteUrl)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const linkElements = doc.querySelectorAll('link[type="application/rss+xml"], link[type="application/atom+xml"]');
            if (linkElements.length > 0) {
                return linkElements[0].href;
            } else {
                return null;
            }
        })
        .catch(error => {
            console.error('Error fetching the website:', error);
            return null;
        });
}
