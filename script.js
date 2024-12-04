async function fetchOpenwhyd() {
  let searchText = document.getElementById('musicSearch').value;
  let url = 'https://openwhyd.org/search?context=addTrack&q=' + searchText;

  let libraryApiResponse = await fetch(url);
  let resultsJson = await libraryApiResponse.json();
  let tracks = resultsJson.docs;
  
  let resultsTextContainer = document.getElementById("resultsText");  
  resultsTextContainer.innerHTML = "<h3>Top 5 curated track results:</h3>";
  
  let trackResultsContainer = document.getElementById("tracks");  
  trackResultsContainer.innerHTML = "";
  
  for(let i = 0; i < tracks.length; i++) {
    let track = tracks[i];
    let trackName = track.name;
    let trackImage = track.img;
    let trackPlatformUrl = track.url;
    let trackUploader = track.uNm;
    
    if(trackImage.includes("ytimg.com") && trackImage.includes("/default.jpg")) {
      let length = trackImage.length;
      trackImage = trackImage.slice(0, length - 11) + 'sddefault.jpg';
    }
    
    trackResultsContainer.innerHTML += `
    <div class="col">
      <div class="card shadow-sm">
        <img src="${trackImage}" width="100%" height="300"/>
        <div class="card-body">
            <p><strong>Track Name:</strong> ${trackName}</p>
            <p><strong>Url:</strong> ${trackPlatformUrl}</p>
            <p><strong>Track Uploader:</strong> ${trackUploader}</p>
        </div>
      </div>
    </div>`;
  }
}
