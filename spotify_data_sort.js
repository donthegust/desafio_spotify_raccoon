// Importação das libs necessarias
const axios = require('axios');
const qs = require('qs');
const fs = require("fs");
require('dotenv').config();

// Definição das variaveis de ambiente e variaveis do tipo const
const client_id = process.env.CLIENT_ID ?? '';
const client_secret = process.env.CLIENT_SECRET ?? '';
const repository_url = 'https://github.com/donthegust/desafio_spotify_raccoon';

// Configuração do POST de solicitação do access_token
var data = qs.stringify({
  'grant_type': 'client_credentials' 
});
var configAuth = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://accounts.spotify.com/api/token',
  headers: { 
    'Content-Type': 'application/x-www-form-urlencoded', 
    'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
    },
  data : data
};

// Definição das variaveis que serão utilizadas no projeto
const artists = { 
  "Ed Sheeran" : "6eUKZXaKkcviH0Ku9w2n3V",
  "Queen": "1dfeR4HaWDbWqFHLkxsg1d",
  "Ariana Grande" : "66CXWjxzNUsdJxJ2JdwvnR",
  "Maroon 5" : "04gDigrS5kc9YWfZHwBETP",
  "Imagine Dragons" : "53XhwfbYqKCa1cC15pYq2q",
  "Eminem": "7dGJo4pcD2V6oG8kP0tJRR",
  "Lady Gaga" : "1HY2Jd0NmPuamShAr6KMms",
  "Cold Play" : "4gzpq5DPGxSnKTe4SA8HAU",
  "Beyonce" : "6vWDO969PvNqNYHIOW5v0m",
  "Bruno Mars" : "0du5cEVh5yTK9QJze8zA0C",
  "Rihanna" : "5pKCCKE2ajJHZ9KAiaK11H",
  "Shakira" : "0EmeFodog0BfCgMzAIvKQp",
  "Justin Bieber" : "1uNFoZAHBGtllmzznpCI3s",
  "Demi Lovato" : "6S2OmqARrzebs0tKUEyXyp",
  "Taylor Swift" : "06HL4z0CvFAxyc27GXpf02"
}
var artistsInfoArr = [];
var popularityRankList = [];
var followersRankList = [];

// Definição das funções que serão utilizadas no projeto
function popularityRank(list){ //Função que ordena por popularidade
  var newList = []
  list.sort(function (x, y) {
    let a = x.popularity,
        b = y.popularity;
        return a == b ? 0 : a < b ? 1 : -1;
  })
  newList = list;
  return newList;
}
function followersRank(list){ //Função que ordena por numero de seguidores
  var newList = []
  list.sort(function (x, y) {
    let a = x.followers,
        b = y.followers;
        return a == b ? 0 : a < b ? 1 : -1;
  })
  newList = list;
  return newList;
}
function formatFinalJson(fList, pList){ //Função que estrutura gera o JSON final
  let simplifiedFolList = [];
  let simplifiedPopList = [];
  fList.forEach(element => {
    simplifiedFolList.push({
      artist_name: element.name,
      followers: element.followers
    })
  });
  pList.forEach(element => {
    simplifiedPopList.push({
      artist_name: element.name,
      popularity: element.popularity
    })
  });
  let json = {
    github_url: repository_url,
    name: 'Gustavo Lourenço',
    follower_ranking: simplifiedFolList,
    popularity_ranking: simplifiedPopList
  };

  return json;
}

// Solicitação do access_token para a API do Spotify
axios(configAuth)
.then(async (response) => {
  var access_token = response.data.access_token;
  var token_type = response.data.token_type;

  // Iteração para utilizar o access_token na Solicitação dos dados de cada Artista
  for (i in artists){
    // Configuração dinamica do GET aos dados de cada Artista
    let configGetArtist = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://api.spotify.com/v1/artists/${artists[i]}`,
      headers: { 
        'Authorization': `${token_type} ${access_token}`,
      },
    };
    
    // Solicitação dos dados do artista da iteração atual
    await axios.request(configGetArtist)
    .then((resp) => {
      artistsInfoArr.push({
        id: resp.data.id,
        name: resp.data.name,
        popularity: resp.data.popularity,
        followers: resp.data.followers.total,
      })
    })
    // Impressão de erros caso não seja possivel realizar o GET do Artista
    .catch((error) => {
      console.log("Erro ao consultar lista de artistas");
      console.log(`Status ${error.response.status} - ${error.response.statusText} - ${error.response.data.error}`);
      process.exit(1);
    });
  }
})
// Impressão de erros caso não seja possivel realizar o POST do access_token
.catch((error) => {
  console.log("Erro ao solicitar Token");
  console.log(`Status ${error.response.status} - ${error.response.statusText} - ${error.response.data.error}`);
  process.exit(1);
})
// Caso tudo ocorra da forma correta, é realizado o tratamento do dados solicitados via GET
.finally(() => {
  followersRankList = followersRank(artistsInfoArr).slice(0, 7);
  popularityRankList = popularityRank(artistsInfoArr).slice(0, 5);

  console.log(formatFinalJson(followersRankList, popularityRankList));

  var finalJson = JSON.stringify(formatFinalJson(followersRankList, popularityRankList));

  //Exportação do JSON tratado através da método writeFileSync
  fs.writeFileSync('./final_rank.json', finalJson, 'utf8', function (err) {
      if (err) {
          return console.log("Erro ao salvar json final");
      }
  });
});