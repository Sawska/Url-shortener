const connection = require("./connection").connection


async function postUrl(url) {
    const shortLink = await generateUniqId()
    console.log(shortLink)
    return new Promise((resolve,reject) => {
        connection.query(`INSERT INTO Urls (Link,ShortLink) VALUES('${url}','${shortLink}')`,(err,res) => {
            if(err) reject(err)
            resolve(shortLink)
        })
    })
}




function findShortUrls(url) {
    return new Promise((resolve,reject) => {
        connection.query(`SELECT ShortLink FROM Urls WHERE ShortLink = '${url}'`,(err,res) => {
            if(err) reject(err)
            resolve(res);
        })
    })
}

function getUrl(shortUrl) {
        return new Promise((resolve,reject) => {
            connection.query(`SELECT Link FROM Urls WHERE ShortLink = '${shortUrl}'`,(err,res) => {
                if(err) reject(err)
                resolve(res);
            })
        })
}



 function generateUniqId() {
    return new Promise(async (resolve,reject) => {
        let idOfUrl = "http://localhost:4000/sh:" + createUniqId();
        let PosiblySame = await findShortUrls(idOfUrl);
        while (PosiblySame.length !== 0) {
          idOfUrl = "http://localhost:4000/sh:" + createUniqId();
          PosiblySame = await findShortUrls(idOfUrl);
        }
        resolve(idOfUrl)
    })
  }

  function createUniqId() {
    const alpabeth = 'abcdefghijklmnopqrstuvyzABCDEFGHIJKLMNOPQRSTUVYZ123456789'.split('')
    let str = '';
    for(let i = 0;i<6;i++) {
        const randomNumber = Math.floor(Math.random() * (alpabeth.length- 1 - 0)) + 0
        str += alpabeth[randomNumber]
    }
    return str
}


module.exports =  {
    postUrl: postUrl,
    getUrl: getUrl,
    findShortUrls: findShortUrls,
}