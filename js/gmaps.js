var map;
var geocoder;
//----------------------Main Gmaps initialize---------------------------
function initialize() {
          //----------------------Create Map---------------------------
var myLatLng = new google.maps.LatLng(-25.363882, 131.044922);
geocoder = new google.maps.Geocoder();
  var mapOptions = {
    zoom: 9,
    center: new google.maps.LatLng(19.205230885737848, 72.97698462988592),
    tilt:45,
      panControl: true,
      zoomControl: true,
      scaleControl: true,
     mapTypeId: google.maps.MapTypeId.ROADMAP,
     mapTypeControlOptions: {
   style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
      }
  };
  
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
    

  //----------------------Map Listeners---------------------------

  google.maps.event.addListener(map, 'zoom_changed', function() {
   document.getElementById("czoom").innerHTML=map.getZoom();
    $("#slider-vertical").slider( "value", map.getZoom());
  });

  google.maps.event.addListenerOnce(map, 'idle', function(){
    document.getElementById("czoom").innerHTML=map.getZoom();
    document.getElementById("clat").innerHTML=map.getCenter().lat();
    document.getElementById("clong").innerHTML=map.getCenter().lng();
    document.getElementById("cproj").innerHTML=map.getProjection();
    $( "#maptypeid_select" ).val(map.getMapTypeId());
    
  });
  
  google.maps.event.addListener(map, 'center_changed', function() {
  var ccenter = map.getCenter();
    document.getElementById("clat").innerHTML = ccenter.lat();
    document.getElementById("clong").innerHTML = ccenter.lng();

  });



  map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(document.getElementById('xtra_info'));


//-----------------------Custom Search Box-------------------------------------
 
 
  var markers = [];
  // Create the search box and link it to the UI element.
  var input = /** @type {HTMLInputElement} */(
      document.getElementById('pac-input'));
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var searchBox = new google.maps.places.SearchBox(
    /** @type {HTMLInputElement} */(input));

  // [START region_getplaces]
  // Listen for the event fired when the user selects an item from the
  // pick list. Retrieve the matching places for that item.
  google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();

    for (var i = 0, marker; marker = markers[i]; i++) {
      marker.setMap(null);
    }

    // For each place, get the icon, place name, and location.
    markers = [];
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, place; place = places[i]; i++) {
      var image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      var marker = new google.maps.Marker({
        map: map,
        icon: image,
        title: place.name,
        position: place.geometry.location
      });

      markers.push(marker);

      bounds.extend(place.geometry.location);
    }

    map.fitBounds(bounds);
  });
  // [END region_getplaces]

  // Bias the SearchBox results towards places that are within the bounds of the
  // current map's viewport.
  google.maps.event.addListener(map, 'bounds_changed', function() {
    var bounds = map.getBounds();
    searchBox.setBounds(bounds);
  });

  //------Custom Search Box End------

   var mark_center = /** @type {HTMLInputElement} */(
      document.getElementById('add_marker'));
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(mark_center);


//--------------------Center Crosshair--------------------
  var center_marker = new google.maps.Marker({
    map: map,
    icon: 'images/crosshair2.png'
    });
    center_marker.bindTo('position', map, 'center'); 
  }
//----------------------------------------------------


//google.maps.event.addDomListener(window, 'load', initialize);








 //---------------------JQuery Start---------------------
$(function(){

initialize();

$("#xtra_info").hide();
$("#tilt_change").hide();

//----------------------Geo Coding---------------------------
  $("#get_location").click(function() {
    var ccenter = map.getCenter();
    var latlng = new google.maps.LatLng(ccenter.lat(), ccenter.lng());

      geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) 
        {
          if (results[1]) 
          {
            document.getElementById("clocation").innerHTML = results[1].formatted_address;
          } 
          else 
          {
            document.getElementById("clocation").innerHTML = 'No results found';
          }
        } 
        else 
        {
          document.getElementById("clocation").innerHTML = 'Error - ' + status;
        }
      });
   }); //---------End of Geocoding--------------------------------------
  


  $("#find_by_latlong").click(function() {

  var x = document.getElementById("x").value;
  var y = document.getElementById("x").value;

  var mapOptions = {
    zoom: 6,
    center: new google.maps.LatLng(x, y)
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
  });
  
  $("#find_by_address").click(function () {
    var address = document.getElementById('address').value;
    geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
    });
  });
  

//----------------------Add marker to center---------------------------
  $("#add_marker").click(function add_marker() {
    
      $( "#marker_title_dialouge" ).dialog( "open" );
      //alert($("#marker_title").val());
     
  }); 

$( "#marker_title_dialouge" ).on( "dialogclose", function( event, ui ) {

   var ccenter = map.getCenter();
      var marker1 = new google.maps.Marker({
        position: new google.maps.LatLng(ccenter.lat(), ccenter.lng()),
        map: map,
        animation: google.maps.Animation.DROP,
        title: $("#marker_title").val(),
        anchorpoint: 30
     });
      google.maps.event.addListener(marker1, 'click', function toggleBounce(){

         if (marker1.getAnimation() != null) {
          $("#xtra_info").hide('fast');
          marker1.setAnimation(null);
        } else {
          $("#xtra_info").text(marker1.getTitle());
          $("#xtra_info").show('fast');
          marker1.setAnimation(google.maps.Animation.BOUNCE);
        }
      });  

  });


   // $("#create_marker").click(function create_marker() {
       
   // });

//----------------------Custom Zoom Control---------------------------
  $( "#slider-vertical" ).slider({
      //orientation: "vertical",
      range: "min",
      min: 0,
      max: 21,
      value: map.getZoom(),
      slide: function( event, ui ) {
        $( "#zoom_level" ).text( ui.value );
        map.setZoom(ui.value);
      }
    });
    $( "#zoom_level" ).text( $( "#slider-vertical" ).slider( "value" ) );



//----------------------JQuery UI---------------------------
    $( "#tabs" ).tabs();
    //$( "#tilt_radio" ).buttonset();

    $( "#map_style_radio" ).buttonset();
    

    $(':radio[name="m_style"]').change(function(){

        var map_style = null;
        
         switch($(':radio[name="m_style"]:checked').val()) {
            
            case 'Default':
                              
                              break;
            case 'Subtle_Grayscale':
                              map_style = subtle_gray;                   
                              break;
            case 'Pale_Dawn':
                              map_style = pale_dawn;  
                              break;
            case 'Blue_water':
                             map_style = blue_water;  
                              break; 
            default:
                               break;
        }
          var mapOptions = {
            styles: map_style
          };
         map.setOptions(mapOptions);

    });

    $( "#maptypeid_select" ).change(function(){

      
      switch($( "#maptypeid_select" ).val()) {
        case 'roadmap':
                          map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
                          break;
        case 'satellite':
                          map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
                          break;
        case 'terrain':
                          map.setMapTypeId(google.maps.MapTypeId.TERRAIN);
                          break;
        case 'hybrid':
                          map.setMapTypeId(google.maps.MapTypeId.HYBRID);
                          break; 
        default:
                           map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
        }
    });


    $( document ).tooltip({
      show: null,
      position: {
        my: "left top",
        at: "left bottom"
      },
      open: function( event, ui ) {
        ui.tooltip.animate({ top: ui.tooltip.position().top + 10 }, "fast" );
      }
    });

    $( "#marker_title_dialouge" ).dialog({
      modal: true,
      autoOpen: false,
      show: {
        effect: "blind",
        duration: 500
      },
      hide: {
        effect: "explode",
        duration: 500
      },
      buttons: {
        Ok: function() {
          $( this ).dialog( "close" );
        }
      }
    });


  $("#startm").click(function add_start_marker() {
          console.debug("Clicked");
      
       // if(d_marker_s!= null)
       //      d_marker_s.setMap(null);
          
      google.maps.event.addListener(map, 'click', function addmarker(event){
          console.debug("Map Clicked at " + event.latLng);

         

           var d_marker_s = new google.maps.Marker({
            position: new google.maps.LatLng(event.latLng.lat(), event.latLng.lng()),
            map: map,
            title: 'start'
         });
        $("#startp").val(event.latLng);
        google.maps.event.clearListeners(map, 'click');
        //console.debug("Map Clicked");
      });  
  }); 


  $("#endm").click(function add_end_marker() {
          console.debug("Clicked");
      
      // if(d_marker_e!= null)
      //       d_marker_e.setMap(null);

      google.maps.event.addListener(map, 'click', function addmarker(event){
          console.debug("Map Clicked at " + event.latLng);

          

           var d_marker_e = new google.maps.Marker({
            position: new google.maps.LatLng(event.latLng.lat(), event.latLng.lng()),
            map: map,
            title: 'end'
         });
        $("#endp").val(event.latLng);
        google.maps.event.clearListeners(map, 'click');
        //console.debug("Map Clicked");
      });  
  }); 

  $("#get_direction").click(function draw_route() {

      var rendererOptions = {
        draggable: true
      };
      var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
      var directionsService = new google.maps.DirectionsService();
      directionsDisplay.setMap(map);
      directionsDisplay.setPanel(document.getElementById('directions-panel'));

      var request = {
        origin: $("#startp").val(),
        destination: $("#endp").val(),
        travelMode: $("#dmode").val()
      };
      directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
        }
      });
  
  });


//----------------------Tilt---------------------------
    
     $( "#goto_cmu" ).click(function(){
      map.setCenter(new google.maps.LatLng(40.44259916895806, -79.94596544041916));
      map.setZoom(19);
      map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
     // map.setTilt(45);

       if(map.getTilt() == 0)
       {
          $("#tilt0").attr('checked', 'checked');
       }
       else
       {
          $("#tilt45").attr('checked', 'checked');
       }

       $("#tilt_change").show('slow');
    });

    $( "#tilt0" ).click(function(){
       map.setTilt(0);
    });

     $( "#tilt45" ).click(function(){
       map.setTilt(45);
    });




     //-----------Scroll to top--------
     //$("html, body").animate({ scrollTop: 0 }, "slow");

});//----JQuery End-----




