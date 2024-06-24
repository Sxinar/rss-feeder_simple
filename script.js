function haberleriGetir() {
    const kaynakURL = document.getElementById('kaynakURL').value;

    fetch(kaynakURL)
        .then(response => response.text())
        .then(xml => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(xml, "text/xml");

            const haberler = doc.getElementsByTagName("item");

            let html = "";
            for (const haber of haberler) {
                const baslik = haber.getElementsByTagName("title")[0].textContent;
                const link = haber.getElementsByTagName("link")[0].textContent;
                const aciklama = haber.getElementsByTagName("description")[0].textContent;

                html += `
                    <div class="haber">
                        <h2>${baslik}</h2>
                        <a href="${link}" target="_blank">${link}</a>
                        <p>${aciklama}</p>
                    </div>
                `;
            }

            document.getElementById('haberler').innerHTML = html;
        })
        .catch(error => {
            console.error("Hata:", error);
        });
}
