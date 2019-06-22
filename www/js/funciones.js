// var qrcode = new QRCode("qrcode");

// function makeCode () {      
//     var elText = document.getElementById("text");
    
//     if (!elText.value) {
//         alert("Input a text");
//         elText.focus();
//         return;
//     }
    
//     qrcode.makeCode(elText.value);
// }

// makeCode();

// $("#text").
//     on("blur", function () {
//         makeCode();
//     }).
//     on("keydown", function (e) {
//         if (e.keyCode == 13) {
//             makeCode();
//         }
//     });


$(document).ready(function () {

    var key ='AIzaSyDr6Uh5QzHGCGag905Vcc6kQ38B9nD5AhQ';
    var playlistId = 'PL8tdUV2vzUn4kkQMDmmLEMJE0zH6yQ3Xz';
    var URL = 'https://www.googleapis.com/youtube/v3/playlistItems';


    var options = {
        part: 'snippet',
        key: key,
        maxResults: 20,
        playlistId: playlistId
    }

    loadVids();

    function loadVids() {
        $.getJSON(URL, options, function (data) {
            var id = data.items[0].snippet.resourceId.videoId;
            mainVid(id);
            resultsLoop(data);
        });
    }

    function mainVid(id) {
        $('#video').html(`
                    <iframe style="margin-left:-15px;margin-top:10px;margin-bottom:20px" width="330" height="315" src="https://www.youtube.com/embed/${id}?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                `);
    }

        
    function resultsLoop(data) {

        $.each(data.items, function (i, item) {

            var thumb = item.snippet.thumbnails.default.url;
            var title = item.snippet.title;
            var desc = item.snippet.description.substring(0, 100);
            var vid = item.snippet.resourceId.videoId;


            $('main').append(`
                            <article class="item" data-key="${vid}">

                                <img style="margin-left:100px" src="${thumb}" alt="" class="thumb">
                                <div class="details" style="color:white;text-align:center">
                                    <h4>${title}</h4>
                                    <p>${desc}</p>
                                </div>

                            </article>
                        `);
        });
    }

        // CLICK EVENT
    $('main').on('click', 'article', function () {
        var id = $(this).attr('data-key');
        mainVid(id);
    });


});

function crearSala(){
    var roomname=document.getElementById("roomname");
    var value=$.trim($("#roomname").val());
    if(value.length==0)
    {
        alert("Ingrese el nombre de la sala");
    }else{
        window.open("newroom.html")
    }

}
function getvideoid(){
    var song=document.getElementById("song").value;
    var value=$.trim($("#song").val());
    if(value.length==0)
    {
        alert("Ingrese una canción");
    }else{
        var key ='AIzaSyDr6Uh5QzHGCGag905Vcc6kQ38B9nD5AhQ';
        var search = "https://www.googleapis.com/youtube/v3/search?part=snippet&key="+key + "&q="+song;
        data = JSON.parse(httpGet(search));
        if (data.items){
            var thumb=(data['items'][0]['snippet']['thumbnails']['default']['url']);
            var title = (data['items'][0]['snippet']['title']);
            var desc = (data['items'][0]['snippet']['description']);
            var vid=(data['items'][0]['id']['videoId']);
        }
        else{
            alert("no se pudo realizar la conexión");
        }
        // embedurl="https://www.youtube.com/watch?v="+vid;
        // alert (embedurl);
        $("main").append(`
                            <article class="item" data-key="${vid}">

                                <img style="margin-left:100px" src="${thumb}" alt="" class="thumb">
                                <div class="details" style="color:white;text-align:center">
                                    <h4>${title}</h4>
                                    <p>${desc}</p>
                                </div>

                            </article>
                                
                            `);
    }
}

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); 
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function inappfunction(){
    var song=document.getElementById("song").value;
    var value=$.trim($("#song").val());
    if(value.length==0)
    {
        alert("Ingrese una canción");
    }else{
        var key ='AIzaSyDr6Uh5QzHGCGag905Vcc6kQ38B9nD5AhQ';
        var search = "https://www.googleapis.com/youtube/v3/search?part=snippet&key="+key + "&q="+song;
        data = JSON.parse(httpGet(search));
        if (data.items){
            var vid=(data['items'][0]['id']['videoId']);
        }
        else{
            ("no se pudo realizar la conexión");
        }
        var url="https://www.youtube.com/watch?v="+vid;
        var target = "_blank";
        var option = "location=yest";
        cordova.InAppBrowser.open(url,target,option);
    }
}

function scanCode()
{	
	cordova.plugins.barcodeScanner.scan(
      function (result) {
        window.open("room.html");
      	if(result.cancelled==true)
            alert("Captura Cancelada.");
     }, 
      function (error) {
          alert("Captura Fallida: " + error);
      }
   );
}
