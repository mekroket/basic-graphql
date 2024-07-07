const axios = require('axios');  // Axios kütüphanesini import ediyoruz, HTTP istekleri için kullanılır
const {
    GraphQLObjectType,  // GraphQLObjectType: GraphQL'de nesne tipleri tanımlamak için kullanılır
    GraphQLSchema,  // GraphQLSchema: GraphQL şemasını oluşturmak için kullanılır
    GraphQLString,  // GraphQLString: GraphQL'de string tipini ifade eder
    GraphQLInt,  // GraphQLInt: GraphQL'de tamsayı tipini ifade eder
    GraphQLList,  // GraphQLList: GraphQL'de liste tipini ifade eder
    GraphQLNonNull,  // GraphQLNonNull: GraphQL'de null olamayan (zorunlu) tipleri ifade eder
    GraphQLID  // GraphQLID: GraphQL'de benzersiz tanımlayıcılar için kullanılan özel bir tür
} = require('graphql');  // graphql modülünden ilgili GraphQL tiplerini import ediyoruz

// Örnek personeller veri seti
var personeller = [
    { id: '1', isim: 'Ali', yas: 30, email: 'ali@google.com' },
    { id: '2', isim: 'Osman', yas: 30, email: 'osman@google.com' },
    { id: '3', isim: 'Esra', yas: 25, email: 'esra@google.com' },
    { id: '4', isim: 'Öykü', yas: 2, email: 'oyku@google.com' }
];

// GraphQLObjectType kullanarak PersonelType nesne tipini tanımlıyoruz
const PersonelType = new GraphQLObjectType({
    name: 'Personel',  // Tipin adı
    fields: () => ({  // Tipin alanları, GraphQLString, GraphQLInt gibi tiplerle eşleştirilmiş
        id: { type: GraphQLString },  // ID alanı
        isim: { type: GraphQLString },  // İsim alanı
        email: { type: GraphQLString },  // E-posta alanı
        yas: { type: GraphQLInt }  // Yaş alanı
    })
});

// RootQuery ile GraphQL şemasının sorgu kısmını tanımlıyoruz
const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',  // Kök sorgu adı
    fields: {
        personel: {
            type: PersonelType,  // PersonelType nesne tipi
            args: { id: { type: GraphQLString } },  // id argümanı
            async resolve(parent, args) {  // Veri çözümleme işlevi (asenkron)
                // Veriye erişim için axios ile HTTP GET isteği gönderiyoruz
                try {
                    const res = await axios.get('http://localhost:3000/personeller/' + args.id);
                    return res.data;  // İstekten gelen veriyi döndürüyoruz
                } catch (error) {
                    console.error(error);  // Hata durumunda hata mesajını yazdırıyoruz
                    return null;  // Hata durumunda null döndürüyoruz
                }
            }
        },
        personeller: {
            type: new GraphQLList(PersonelType),  // PersonelType tipinden bir liste döndürür
            resolve(parent, args) {  // Veri çözümleme işlevi
                return personeller;  // Örnek personeller veri setini döndürür
            }
        }
    }
});

// Mutation (değişim) işlemlerini tanımlayan GraphQLObjectType
const mutation = new GraphQLObjectType({
    name: 'Mutation',  // Mutasyon adı
    fields: {
        personelEkle: {
            type: PersonelType,  // PersonelType nesne tipi
            args: {
                isim: { type: new GraphQLNonNull(GraphQLString) },  // Zorunlu isim alanı
                email: { type: new GraphQLNonNull(GraphQLString) },  // Zorunlu e-posta alanı
                yas: { type: new GraphQLNonNull(GraphQLInt) }  // Zorunlu yaş alanı
            },
            resolve(parent, args) {  // Mutasyon çözümleme işlevi
                // Axios ile HTTP POST isteği göndererek yeni personel ekler
                return axios.post('http://localhost:3000/personeller', {
                    isim: args.isim,
                    email: args.email,
                    yas: args.yas
                }).then(res => res.data);  // İstekten dönen veriyi döndürür
            }
        },
        personelSil: {
            type: PersonelType,  // PersonelType nesne tipi
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }  // Zorunlu id alanı
            },
            resolve(parent, args) {  // Mutasyon çözümleme işlevi
                // Axios ile HTTP DELETE isteği göndererek belirtilen id'ye sahip personeli siler
                return axios.delete('http://localhost:3000/personeller/' + args.id)
                    .then(res => res.data);  // İstekten dönen veriyi döndürür
            }
        },
        personelGuncelle: {
            type: PersonelType,  // PersonelType nesne tipi
            args: {
                id: { type: GraphQLString },  // Opsiyonel id alanı
                isim: { type: GraphQLString },  // Opsiyonel isim alanı
                email: { type: GraphQLString },  // Opsiyonel e-posta alanı
                yas: { type: GraphQLInt }  // Opsiyonel yaş alanı
            },
            resolve(_, args) {  // Mutasyon çözümleme işlevi
                // Axios ile HTTP PATCH isteği göndererek belirtilen id'ye sahip personelin bilgilerini günceller
                return axios.patch('http://localhost:3000/personeller/' + args.id, args)
                    .then(res => res.data);  // İstekten dönen veriyi döndürür
            }
        }
    }
});

// GraphQL şemasını oluşturup export ediyoruz
module.exports = new GraphQLSchema({
    query: RootQuery,  // Kök sorgu bölümü
    mutation: mutation  // Mutasyon bölümü
});
