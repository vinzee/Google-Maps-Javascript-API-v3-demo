<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8">
    <title>Simple markers</title>
    <style>
      #map-canvas {
        height: 50%;
        margin: 0px;
        padding: 0px
      }
    </style>
    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script>
		function initialize() {
		  var myLatlng = new google.maps.LatLng(-25.363882,131.044922);
		  var mapOptions = {
		    zoom: 4,
		    center: myLatlng
		  }
		  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		
		  var marker = new google.maps.Marker({
		      position: myLatlng,
		      map: map,
		      title: 'Hello World!'
		  });
		}
		
		google.maps.event.addDomListener(window, 'load', initialize);
    </script>
  </head>
  <body>
  
  <%@ page import="java.sql.*" %>
  <% 
  Connection con = null;
  Statement stmt=null;
  String url = "jdbc:mysql://localhost:3306/";
  String db = "location_data";
  String driver = "com.mysql.jdbc.Driver";
  Class.forName(driver);
  con = DriverManager.getConnection(url+db,"root","3110");
  System.out.println("Connected to database successfully...");
  stmt=con.createStatement();
  String sql = "SELECT * FROM coordinates";
  ResultSet rs = stmt.executeQuery(sql);
  %>
 
  <div id="main">
	  <div id="map-canvas"></div>
	  <br><hr><br>
	  <div id="loc_db">
	  
	  <%  while(rs.next()){ %>
      //Retrieve by column name
   
	   
      <%= rs.getFloat("latitude") %>
      <%= rs.getFloat("longitude") %>
      
      
    <%  
  rs.close();
  }
  %>
	  </div>
	  <div></div>
	  <div></div>
 </div>
  </body>
</html>