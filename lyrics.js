const title = []
const artist = []

const button = document.getElementById('search')
const click = button.addEventListener('click',()=>{
    const searched_text = document.getElementById('search-bar').value
    document.getElementById('search-bar').value = " ";

    searchResults(searched_text)
})

const searchResults = searched_text => {
    fetch(`https://api.lyrics.ovh/suggest/${searched_text}`)
    .then(res => res.json())
    .then(data => {

        const songCard = document.getElementById('song-card')
        songCard.innerHTML = " "

        for (let i = 0; i < 10; i++) {
            title[i] = data.data[i].title
            artist[i] = data.data[i].artist.name

            songCard.innerHTML +=                 
                                            `<div class="single-result row align-items-center my-3 p-3">
                                                <div class="col-md-9">
                                                    <h3 class="lyrics-name">${title[i]}</h3>
                                                    <p class="author lead">Album by <span>${artist[i]}</span></p>
                                                </div>
                                                <div class="col-md-3 text-md-right text-center">
                                                    <button id="${i}" onClick="getLyrics(${i})" class="btn btn-success">Get Lyrics</button>
                                                </div>
                                            </div>`

        }
    })
}

const getLyrics = (i) => {
     fetch(`https://api.lyrics.ovh/v1/${artist[i]}/${title[i]}`)
     .then(res => res.json())
     .then(data => {
         //console.log(data.lyrics)
         const lyricsPlace = document.getElementById('lyrics-place')
         lyricsPlace.innerHTML = 
                                    `<br>
                                     <h2>${title[i]}</h2>
                                     <h4>${artist[i]}</h4>
                                     <br>
                                     <br>`
        const p = document.createElement('p')
        p.innerText = data.lyrics
        lyricsPlace.appendChild(p) 

     })
}