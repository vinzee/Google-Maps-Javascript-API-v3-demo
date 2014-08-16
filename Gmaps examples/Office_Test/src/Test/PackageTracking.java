package Test;
import java.sql.*;



public class PackageTracking {

	public static void main(String[] args) {
		
			  Connection con = null;
			  Statement stmt=null;
			  String url = "jdbc:mysql://localhost:3306/";
			  String db = "location_data";
			  String driver = "com.mysql.jdbc.Driver";
			  try{
			  Class.forName(driver);
			  con = DriverManager.getConnection(url+db,"root","3110");
			  System.out.println("Connected to database successfully...");
			  stmt=con.createStatement();
			  String sql = "SELECT * FROM coordinates";
		      ResultSet rs = stmt.executeQuery(sql);
		      
		      while(rs.next()){
		          //Retrieve by column name
		       
		    	   
		          float latitude = rs.getFloat("latitude");
		          float longitude = rs.getFloat("longitude");

		          //Display values
		          
		          System.out.print("Latitude"+ latitude);
		          System.out.println(", Longitude"+ longitude);
		          
			  }
		      rs.close();
			  }
			  catch(SQLException se){
		
			      se.printStackTrace();
			   }
			  
			  catch (Exception e){
			  e.printStackTrace();
			  }
			  finally{	   
			            con.close();
			   }
			   System.out.println("Goodbye!");
			  }
			} 
		
		
	