var songs = [];


var getSong = function(){		
	$.ajax({
		type: 'POST',
		url: '/song',
		data: JSON.stringify(songs),
		dataType: 'json',
		contentType: 'application/json',
		success: function(data){
			songs.push([data.title,data.artist_name,data.score]);
			console.log(data.tracks.foreign_id);
			// $(player).addSpotifyInfoToPlaylist([data.track.foreign_id]);
			return data.tracks.foreign_id;
		}
	});
};

var getRandomSong = function(){
	$.ajax({
		type: 'POST',
		url: '/random',
		data: JSON.stringify(songs),
		dataType: 'json',
		contentType: 'application/json',
		success: function(data){
			songs.push([data.title,data.artist_name,data.score]);
			console.log(data.tracks.foreign_id);
		}
	});
};