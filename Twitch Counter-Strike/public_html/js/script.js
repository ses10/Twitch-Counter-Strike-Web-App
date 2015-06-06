$(document).ready(function(){
    
    var twitchUrl = 'https://api.twitch.tv/kraken/search/streams?q=Counter-Strike%3A%20Global%20Offensive&limit=100';
    
    //request to twitch api
    $.ajax({
        url: twitchUrl,
        dataType: "jsonp",
        success: function(response){
            
            streamUrl = "http://www.twitch.tv/widgets/live_embed_player.swf?channel=";
            streamChatUrl = ["http://www.twitch.tv/", "/chat?popout="];
            streams = response.streams;
            
            //set the main video stream and chat to the first element in streams array
            $('#stream-title').html(streams[0].channel.name);
            $('#twitch-player').attr('data', streamUrl + streams[0].channel.name);
            $('#chat iframe').attr('src', streamChatUrl[0] + streams[0].channel.name + streamChatUrl[1]);
                        
            //loop through response and display stream previews
            for(var i = 0; i < streams.length; i++)
            {
                $('#streamList').append(
                        '<li class="streams" data-channel-name="'+ streams[i].channel.name +'">' +
                            '<p>'+ streams[i].channel.name + '<br>' +
                                   streams[i].channel.status.slice(0,40) + '<br>' +
                                   streams[i].viewers + ' viewing now' +
                            '</p>' +
                            '<img src="'+ streams[i].preview.medium + '">' +
                        '</li>');
            }
            
            //set onclick for each streams class object
            $.each($(".streams"), function(){
                $(this).on("click", function(){
                    $('#stream-title').html($(this).attr("data-channel-name"));
                    $('#twitch-player').attr('data', streamUrl + $(this).attr("data-channel-name"));
                    $('#chat iframe').attr('src', streamChatUrl[0] + $(this).attr("data-channel-name") + streamChatUrl[1]);
                });
            });     
        }
    });//End ajax request
    
});