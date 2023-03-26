# **Teste_Raccoon**

## Teste para vaga de Solution Engineering da empresa Raccoon.Monks

<br>

### **Objetivo**

Usando uma base de dados específica, extrair dados
de uma lista pré desterminada de artistas e realizar análises em cima destas informações coletadas.

### **Saída esperada**

A partir desses dados é necessária a criação de
dois rankings. Um com os 7 artistas com mais seguidores e outro com os 5
que têm a maior popularidade.

Portanto, nesses rankings, devem estar os seguintes dados:

- Nome da/do artista;
- Quantidade de seguidores;
- Popularidade (índice).

### **Lista inicial**

```json
{
  "Ed Sheeran": "6eUKZXaKkcviH0Ku9w2n3V",
  "Queen": "1dfeR4HaWDbWqFHLkxsg1d",
  "Ariana Grande": "66CXWjxzNUsdJxJ2JdwvnR",
  "Maroon 5": "04gDigrS5kc9YWfZHwBETP",
  "Imagine Dragons": "53XhwfbYqKCa1cC15pYq2q",
  "Eminem": "7dGJo4pcD2V6oG8kP0tJRR",
  "Lady Gaga": "1HY2Jd0NmPuamShAr6KMms",
  "Cold Play": "4gzpq5DPGxSnKTe4SA8HAU",
  "Beyonce": "6vWDO969PvNqNYHIOW5v0m",
  "Bruno Mars": "0du5cEVh5yTK9QJze8zA0C",
  "Rihanna": "5pKCCKE2ajJHZ9KAiaK11H",
  "Shakira": "0EmeFodog0BfCgMzAIvKQp",
  "Justin Bieber": "1uNFoZAHBGtllmzznpCI3s",
  "Demi Lovato": "6S2OmqARrzebs0tKUEyXyp",
  "Taylor Swift": "06HL4z0CvFAxyc27GXpf02"
}
```

### **Como executar**

Clone o repositório

```sh
git clone git@github.com:donthegust/desafio_spotify_raccoon.git
```

Abra o diretório e instale todas as dependências com

```sh
npm install
```

Insira um arquivo .env com as seguintes variaveis

```
CLIENT_ID=<seu client_id>
CLIENT_SECRET=<seu client_secret>
```

Execute o projeto com

```sh
node spotify_data_sort
```

Confira a saida do JSON final via console ou abrindo o aquivo "final_rank.json" com

```sh
code final_rank.json
```

_Comando **code** funciona apenas se o VSCode estiver instalado_

### **JSON Final**

```json
{
  "github_url": "https://github.com/donthegust/desafio_spotify_raccoon",
  "name": "Gustavo Lourenço",
  "follower_ranking": [
    { "artist_name": "Ed Sheeran", "followers": 110663355 },
    { "artist_name": "Ariana Grande", "followers": 88917092 },
    { "artist_name": "Justin Bieber", "followers": 70789017 },
    { "artist_name": "Taylor Swift", "followers": 70447437 },
    { "artist_name": "Eminem", "followers": 67909381 },
    { "artist_name": "Rihanna", "followers": 53928858 },
    { "artist_name": "Bruno Mars", "followers": 47129496 }
  ],
  "popularity_ranking": [
    { "artist_name": "Taylor Swift", "popularity": 100 },
    { "artist_name": "Eminem", "popularity": 93 },
    { "artist_name": "Rihanna", "popularity": 93 },
    { "artist_name": "Shakira", "popularity": 93 },
    { "artist_name": "Ed Sheeran", "popularity": 92 }
  ]
}
```
