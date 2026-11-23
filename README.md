# AxoCraft Network sitesi

## Önizleme
`index.html` dosyasını tarayıcıda aç.

## GitHub Pages ile ücretsiz yayınlama
1. GitHub'da yeni, Public bir repository oluştur (ör. `axocraft-website`).
2. Bu ZIP içindeki `index.html`, `style.css` ve `script.js` dosyalarını repository'nin ana dizinine yükle.
3. Repository > Settings > Pages bölümüne gir.
4. Deploy from a branch seç; Branch olarak `main`, klasör olarak `/ (root)` seç ve Save'e bas.
5. Yayın adresin `https://KULLANICIADIN.github.io/axocraft-website/` biçiminde olur.

## Özel alan adı
`axocraft.com` alan adını bir kayıt firmasından satın aldıktan sonra GitHub Pages > Custom domain alanına yaz. Kayıt firmasının DNS bölümünde GitHub Pages'in güncel dokümanındaki A/AAAA ve CNAME kayıtlarını ekle. DNS yayılımı zaman alabilir.

## Düzenleme
- Sunucu IP'si: `script.js` içindeki `IP` sabiti ve `index.html` içindeki IP metinleri.
- Discord: `index.html` içindeki `href="#discord"` bağlantısını gerçek davet bağlantınla değiştir.
- Oyun modları: Henüz doğrulanmamış modlar ve sürümler kesin bilgi gibi gösterilmedi.
- Canlı durum: mcsrvstat.us API'sinden alınır; API erişilemezse bilgi alınamadı yazar.
