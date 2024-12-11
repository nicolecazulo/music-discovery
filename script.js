async function fetchLyricSuggestions() {  
  let searchText = document.getElementById('lyricSearch').value;
  
  let apiUrl = 'https://api.lyrics.ovh';
  let suggestUrl = apiUrl + '/suggest/' + searchText;

  let suggestApiResponse = await fetch(suggestUrl);
  
  let suggestJson = await suggestApiResponse.json();
  let lyricSuggestions = suggestJson.data;
  
  let resultsTextContainer = document.getElementById("resultsText");  
  resultsTextContainer.innerHTML = "<h3>Lyric results:</h3>";
  
  let lyricResultsContainer = document.getElementById("lyricSuggestions");  
  lyricResultsContainer.innerHTML = "";
  
  let lyricsContainer = document.getElementById("lyrics");  
  lyricsContainer.innerHTML = "";
  
  for(let i = 0; i < lyricSuggestions.length; i++) {
    let lyricSuggestion = lyricSuggestions[i];
    let artist = lyricSuggestion.artist.name;
    let album = lyricSuggestion.album.title;
    let albumCover = lyricSuggestion.album.cover_big;
    let title = lyricSuggestion.title;
    
    let lyricUrl = apiUrl + '/v1/' + artist + '/' + title;

    let lyricApiResponse = await fetch(lyricUrl);
  
    let lyricJson = await lyricApiResponse.json();
    let lyrics = lyricJson.lyrics;
    
    lyricResultsContainer.innerHTML += `
    <div  class="col">
      <div class="card shadow-sm">
        <img id="lyric-${i}" src="${albumCover}" width="100%" height="300"/>
        <div class="card-body">
            <p><strong>Artist:</strong>${artist}</p>
            <p><strong>Album:</strong>${album}</p>
            <p><strong>Title:</strong> ${title}</p>
            <p class="text-center">${lyrics}</p>
        </div>
      </div>
    </div>`;
  }
}
