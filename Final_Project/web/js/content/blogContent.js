"use strict";
function blogContent() {
  // ` this is a "back tick". Use it to define multi-line strings in JavaScript.
  var content = ` 
    <p id="table"><strong>Database Table Design:</strong> Because this is a camera marketplace, each user can have one to many cameras/camera gear. The table design will contain all of the neccessary information pertaining to the camera, so later a filter/sort feature can be added to allow a user to find a specific item(s) that they are looking for. A real-life example of a similar design is this website: <a href="https://www.mpb.com/en-us">https://www.mpb.com/en-us</a></p>

    <h4>Table Features: </h4>

    <ul>
      <li>Auto-increment User Camera ID (integer)</li>
      <li>Brand (string)</li>
      <li>Model (string)</li>
      <li>Camera Price (double)</li>
      <li>Type (string) [nullable]</li>
      <li>Condition (string)</li>
      <li>Megapixels (double) [nullable]</li>
      <li>Year Made (integer) [nullable]</li>
      <li>Primary Picture (string)</li>
      <li>User description (string) [nullable]</li>
      <li>web_user_id: foreign key (integer)</li>
    </ul>

    <p id="experience"><strong>My Web Development Experience:</strong> I have minimal web development experience, but I think that the little that I do have will still help me in this class. My freshman year, I attended the Universty of Vermont, and while I was there I took an introductory web development class. In this class I created a couple of websites using HTML, CSS, and primarily PHP. This class helped me understand the basics of site design and structure, as we also created wireframes for our site. Besides that class, I also worked on a Python web application last semester in Temple's Software Design course. I used the Django web framework to create a server-side web app that utilized the Spotify Web API to generated customized playlists. From working on this project, I learned about web frameworks and about how to make API calls to dynamically update your website.</p>
  

    <p id="thoughtshw1"><strong>Thoughts About HW 1:</strong>
    The HTML aspect of the assignment was not difficult, but position the items in the desired location was very difficult. I was going to use flex boxes, but decided that I wanted a more customized grid placement, so I used display:grid. However, I had to individually determine where each item goes within the grid, which was tedious. I think that having us make a wireframe would be helpful. Some of the instructions were confusing, such as what we are supposed to link to in our content area.</p>

    <p id="thoughtshw2"><strong>Thoughts About HW 2:</strong>
    Once I understood what I had to do, this assignment was not too bad, but it took me a while to configure everything to accomplish the goals laid out in the instructions. My issue with this assignment is that it requires you to essentially completely redo the layout of your homepage. My homepage for HW1 used a grid layout and had the contents shift and readjust depending on the browser width. I was not able to use any of that for this assignment due to the generation functions. Despite this, I was mostly able to retain my styling, although it was tedious to figure out what could be ported over and what could not. I understand how the navigation bar works and was able to restyle most aspects of it. I tried playing around with the animation but was not able to find a better animation style.
   </p>

   <p id="thoughtshw3"><strong>Thoughts About HW 3:</strong>
   After studying the sample code and completing the lab, I understood what I had to do for this assignment. What I found intuitive about this homework was taking an item that we might potentially represent in a database and transforming it into a JavaScript object that can be generated by a function. What I found confusing was combining the various topics we learned about from the sample code. I ran into issues with trying to combine templating with destructured objects and the functions I used, but I eventually got everything to work. My main problem with this assignment is that HTML, JavaScript, and CSS code are all spread randomly throughout files. There are JS files that contain HTML and CSS, and there are HTML files that contain JS that contain HTML within itself. 
   </p>

   <p id="database_experience"><strong>My Database Experience:</strong>
   I do not have very much database experience. During my freshman year at the University of Vermont, I took a similar class to this one and we used an online DBMS similar to MySQL Workbench. I made a database to store reviews for each item listed on my website, such that it updated with a new entry every time the review form was submitted. Besides that, I do not really have any experience working with databases.
   </p>

   
   <p id="thoughtshw4"><strong>Thoughts About HW 4:</strong>
   This homework was not too difficult, but I had to make some adjustments to my database design before I could make any progress in it. Once I was sure I met all of the requirements, implementing the "other" table was fairly straightforward. However, creating the data entries was a bit tedious, and keeping track of all of the database requirements can become burdensome, especialy because the MySQL Workbench user interface is sometimes confusing.
   Click <a target="_blank" href='docs/HW4_databasedoc_deland.pdf'>here</a> to see my database document. 
   </p>
    
   <p id="serverside_experience"><strong>My Experience Writing Serverside Code to Access a Database:</strong>
   When I took a web development course my freshman year, we wrote code in PHP to access our MySQL database. The code allowed entries to be written to the database, and there was also PHP code that validated the inputs into the database.
   </p>
    
     <p id="thoughtshw5"><strong>Thoughts About HW 5 and What I Learned:</strong>
    I learned a lot this week and it was hard to keep track of it all. The most important concept that I learned is how Java code can be written to access an external database via server calls. I also did not know what JSP was prior to this assignment. I also became more familiar with JSON data, which is always important to know. In my opinion, the tasks for this assignment were not too difficult, but the instructions were a little convoluted, with steps being out of order and some of the wording being confusing. <br> Click <a target="_blank" href="docs/API_Errors.pdf">here</a> to see my Web API error document.
   </p>

   <p id="thoughtshw6"><strong>Thoughts About HW 6:</strong>
   This was definitely the most difficult homework for me and I was not able to add all of the features. It was hard because we had to implement several features we had never worked on together, and code had to be merged and combined from numerous sources. I also wasted a lot of time being confused on why my page was not updating, only to learn it had decided to randomly cache and stop updating my changes.
  </p>

  <p id="thoughtshw7"><strong>Thoughts About HW 7:</strong> This homework was not too difficult, as most of the difficult work was already completed in the labs. The most difficult part of this homework was trying to connect HTML elements to the APIs. Resolving this challenge made me understand the ajax function much better, though. Ensuring that all of the APIs worked with each other was the most important function, as testing the APIs in different orders should not create an unexpected output. <br> Links: <br> <a target="_blank" href="webAPIs/logonAPI.jsp?email=dad@dad.com&password=dad">Log On</a><br> <a target="_blank" href="webAPIs/logoffAPI.jsp">Log Off</a><br> <a target="_blank" href="webAPIs/getProfileAPI.jsp">Get Profile</a><br> <a target="_blank" href="webAPIs/listUsersAPI.jsp">List All Web Users</a>
  </p>

  <p id="thoughtstutorial"><strong>Thoughts About Tutorial:</strong>
  This assignment was difficult and I ran into several challenges. The most immediate challenge was trying to find a way to handle the format and transferring of data between the provided objects and the filters, and how they would affect each other. I struggled to figure out the best way to format the objects and the function parameters. Because the component had to be reusable, I wanted the user to be able to use my component with a variety of objects, but I ended up deciding to have some attributes that are required for all objects. Another difficult part was figuring out how to update the UI when the filters are changed. Creating the UI itself was not to hard, it was just inserting data into them while maintaining flexibility that was a challenge.
 </p>

 <p id="thoughtshw9"><strong>Thoughts About HW 9:</strong>
 The biggest challenge I ran into with the update homework is the fact that I did the tutorial option instead of the Insert Homework. I did not realize that most of the implementation of the update functionality was very similar to the insert functionality, and thus I was missing a lot of the context behind why things were placed where they were. Completing this assigment involved spending lots of time copying, pasting, and modifying several files to include every moving part of the update API. Once I figured out where everything was supposed to be,  I was able to complete the assignment. Another issue was the vagueness of some of the error messages, as they did not at all indicate what the issue was and I did not know where they were originating from.
 </p>

 <p id="thoughtshw10"><strong>Thoughts About HW 10:</strong>
 Similar to the Update homework, the largest challenge of this assignment was connecting all of the pieces together to ensure that the API worked properly and updated both the UI and the database. I also had trouble trying to implement the modal menu, so I opted to just show the message at the bottom of the web page in its own div, as the ajax call needed a document element to be passed to it anyway.
 </p>

</div>
`;

  var ele = document.createElement("div");
  ele.innerHTML = content;
  return ele;


}
