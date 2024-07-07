## GraphQL Personel API
Bu proje, GraphQL kullanarak personel verilerini yönetmek için bir API sağlar. Projede Node.js ve Express kullanılarak bir GraphQL sunucusu oluşturulmuştur.

## Kurulum
Gereksinimler

Node.js 12 veya daha yeni sürümleri
npm veya yarn

## Bağımlılıkların Yüklenmesi
```bash
npm install
# veya
yarn install

```
## Çalıştırma

```bash
npm start
# veya
yarn start

```
## Kullanım
- GraphQL API sunucusu varsayılan olarak http://localhost:4000/graphql adresinde çalışır.
- GraphQL Playground veya diğer GraphQL istemcileri kullanarak API'yi test edebilirsiniz.

- Örnek Sorgular
Tüm personelleri getir:

```bash
query {
    personeller {
        id
        isim
        yas
        email
    }
}

```

- Belirli bir personeli ID ile getir:
```bash
query {
    personel(id: "1") {
        id
        isim
        yas
        email
    }
}


```

Mutasyonlar
- Yeni personel ekle:
```bash
mutation {
    personelEkle(isim: "Mehmet", email: "mehmet@example.com", yas: 35) {
        id
        isim
        yas
        email
    }
}



```
- Belirli bir personeli sil:
```bash
mutation {
    personelSil(id: "2") {
        id
        isim
        yas
        email
    }
}



```
- Belirli bir personeli güncelle:
```bash
mutation {
    personelGuncelle(id: "3", isim: "Esra Güncel", email: "esra@example.com", yas: 26) {
        id
        isim
        yas
        email
    }
}



```

## Katkıda Bulunma
Bu projeyi çatallayın (fork) ve yerel makinenize klonlayın.
Yeni özellikler ekleyin veya hataları düzeltin.
Değişikliklerinizi yüklemek için bir pull isteği (pull request) gönderin.

