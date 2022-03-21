
# General Assembly Project 4 - Birds of a Feather

My fourth and final project with General Assembly. I built a dating app that matches users based on their answers to ‘would you rather’ questions.

![screenshot-home-page](https://i.imgur.com/YJC7WDS.png) 


## Brief

Design a full stack React app using Python, Django and PostgreSQL in 10 days.
## Deployment

The app is deployed using Heroku. You can find it [here](http://birds-of-a-feather.herokuapp.com).

You can create an account quickly using the ‘get random photos’ button. Six random profiles will like your profile upon creation in order to see the full functionality of the site.


## Code Installation

* Clone or download the repo.

* Install backend dependencies: run `pipenv` in the terminal

* Enter the shell for the project: run `pipenv shell`

* Make Migrations: run `python manage.py makemigrations`

* Migrate: run `python manage.py migrate`

* Start Backup Server: run `python manage.py runserver`

* Open a new terminal window.

* Move into the client folder: run `cd client`

* Install front end dependencies: run `yarn`

* Start front end server: run `yarn start`

Seed Data:

* First register a user account through the website. It will be deleted later.

* Close back end server: `ctrl C`

* Load seed data for questions: run `python manage.py loaddata questions/seeds.json`

* Load seed data for answers: run `python manage.py loaddata answers/seeds.json`

* Load seed data for profiles: run `python manage.py loaddata jwt_auth/seeds.json`

* Restart back end server: run `python manage.py runserver`

## Technologies Used

* Python
* Django
* Django REST Framework
* PostgreSQL
* PyJWT
* Axios
* React
* SASS
* Chakra
* React Mapbox
* React Router DOM

## Approach Taken

### Planning

#### Day 1:

I came up with the idea on the basis that it could showcase a lot of the skills I had learned whilst also being fun to use which would hopefully encourage people using the site to explore and experience more of the functionality of the site. I then researched the basic layout of dating apps such as Hinge and Bumble and made a wireframe for my front end.

![wireframe](https://i.imgur.com/FLpdZjU.png) 

I planned through how the back end would have to work. I decided that in order to compare answers between users it would be easier to have a separate model of answers that were linked to questions. That way each profile could have a list of the answers they had picked and it would be relatively simple to compare the answers of different users. I also needed several relationships between users such as ‘likes_sent’, ‘likes_recieved’ and ‘matches’.

I made an ERD to visualise the relationships between the different models.

![ERD](https://i.imgur.com/u3sbNna.png) 

I created a trello board in order to clearly set out tasks for each day and have somewhere to store useful links and ideas. 

![trello-board](https://i.imgur.com/JzY8lTj.png)

I also realised that my project would need at least some seeded profiles and a lot of questions in order to showcase the functionality of the site. I, therefore, spent the rest of the day finding copyright free photos to use for seeded dating profiles.

### Back End

#### Day 2:

I created a Django app and made the question, answer and user models without relationships for now. I then created a super user and used the Django admin site to check all the models had the correct input types.

I made a one to many relationship from the answer model to the question and added an owner field as I was planning for users to be able to add questions of their own.

![code-answer-question-relationship](https://i.imgur.com/GU6Mn7L.png)

I then made the common serializers and seeded 10 would you rather questions and their answers using the Django admin site.

#### Day 3:

I worked on the relationships needed for the user model. This required 3 many to many fields, one for the answers picked, one for matches and one for ‘likes_sent’. The ‘likes_sent’ field had a related name of ‘likes_recieved’ in order to create a seperate. I wanted to create fields in case I added the functionality later, so I added several fields that I did not end up using such as gender and longitude / latitude.

![user-model](https://i.imgur.com/Q9O8vi1.png)

I then created an authentication.py file using JSON Web Token and the Basic Authentication from the Django REST Framework.

![authentication](https://i.imgur.com/ILvhltV.png)

This also involved adding a validate function in the serializer to check and hash the passwords of the users.

I then created views.py for getting all answers, questions and users and checking them in Insomnia. Once I moved to make the register and login views, I decided I wanted to remove the username field from the user as the model already had a unique email field. As this was part of the Django Abstract User model. I had to make the email field equal to the username and remove email from the required fields.

![removing-username](https://i.imgur.com/jQOvX1f.png)

This allowed me to add users without a username but removed my ability to create a superuser and, therefore, the Django admin site. At this point, I decided the admin interface was less essential as I could create the necessary endpoints and use Insomnia from now on. 

I created the populated serializers and finished up the views so that all the models could be created, viewed, edited and deleted. I then seeded some more ‘would you rather questions’ and profiles using the pictures I had found earlier and the random profile generator randomuser.me for profile names and info.

### Front End:

#### Day 4:

I created a React app and connected to the database. I then created all the components that I was planning to use, containing just the name of the page, and connected them using the React Router DOM.

I then moved to the functionality of the register route. Rather than having one page where the user had to fill in all the necessary parts for their profile, I wanted to split up each section to show on separate pages. I therefore created a parent component which would display the separate form components. I passed down a function that would update which component the user was on as props.

![register-component](https://i.imgur.com/4Btyc0l.png) 

For the first register page, where the user entered the email and password. I realised it would be useful to create the user profile straight away. Otherwise, the user would have to wait until all the register forms had been filled in to see if there was an error with the password for example. I, therefore, made it so the user was registered and then logged in. Later create account forms would then use PUT requests to update the existing user.

![register-and-login-user](https://i.imgur.com/0Sn5ZXQ.png)

As the next create account forms would require the user to be logged in I added the login component and the necessary functions that handled the JSON Web Token and added it to local storage.

#### Day 5:

I worked on the separate create account components. Each one updated the user profile. 

For the age component I wanted the user to add the date of birth but I found the HTML date pickers to be fiddly when going back multiple years. I, therefore, searched for a react package that allowed for scrolling through options. I found one called react-mobile-picker-scroll but needed to enter multiple years and dates as options. I, therefore, created two functions that added possible years and dates to an array using a for loop.

![react-mobile-picker](https://i.imgur.com/g0Gw7yB.png) 

For the location I used React Map GL and the mapbox geocoding API to include a map that updated when users searched for a location or used their current location.

For the upload pictures component, I created an ‘UploadImageField’ which used cloudinary to upload photos. Once the photos were uploaded and had a link, the component would show a preview of the pictures. On submit the photos were added to the profile and the user navigated to the profile picture.

At this point I had created the functionality for each part of creating an account.
Day 6:

I created the basic functionality of a navigation bar so that I could move around the site easily and then moved to the ‘would you rather’ questions component. This involved checking which questions had been answered by the user. I, therefore, created a ‘useEffect’ that saved the ‘answers’ id on the user to state called ‘userAnswered’.

![get-user-answered](https://i.imgur.com/doGNJJN.png) 

I then made a ‘getQuestion’ function that pulls all the questions from the database and generates a random index for a question. It then checks, firstly, if the user has already answered all the questions. Secondly,  it checks if the user contains an answer Id that was associated with the question and had, therefore, already answered the question. If the question has been answered already, another random index is chosen until it finds one that has not been answered.

![get-question](https://i.imgur.com/WYhkGu7.png) 

Once the user picks an option, the answer is saved to the profile and added to the ‘userAnswered’ state. I also added a skip button that just adds the question id to another state called ‘skippedQuestions’.

I also worked on the profile page. I wanted the page to have a header with the username at the top and then two tabs with ‘view’ and ‘edit’ that changed the rest of the page accordingly. I, therefore, created a parent ‘UserProfile’ component with two child components ‘EditProfile’ and ‘ViewProfile’ that were shown based on what the user clicked on. 

![profile-header](https://i.imgur.com/swTRaRo.png)

For the edit profile page, I reused the ‘ImageUploadField’ to change the photos on the user profile. For the rest of the sections I wanted to re-use the components that I had made for the create account pages, however, some things had to be different such as the removing the ‘previous’ button. Rather than rewriting very similar code, I added props to each component that specified the parent. I could then add ternaries to the parts of the components that needed to change that would check what the parent component was. For example, here is the part of the JSX that checks whether the parent is the register and which buttons to display as a result.

![parent-props](https://i.imgur.com/EzaqvQi.png)

#### Day 7:

I moved to the view profile page. In particular, I spent a while on displaying the questions answered. I had forgotten to populate the answers with the question it belonged to on the user serializer. Because I had already created the ‘would you rather’ functionality which pulled down the questions answered from the user, I did not want to update the user serializer and have to redo the ‘would you rather’ functionality. 

This proved to be the wrong decision, as I definitely spent more time working around this problem than when I later came back to update the serializer. The initial component involved stringing several functions together using useEffects to initiate the next step once the first had finished.

First there was get request to get the answers from the user profile and save them to state.

Then a function selected 3 random ids of the answers.

Then for each random id, the page made a get request to find the question associated with the answer, followed by a function to find which was the alternative answer that had not been chosen by the user and finally a function to add the text of the two answers to state so that it could be displayed.

This was obviously a complicated way round and meant that the page made a total of four requests to the back end which would not be efficient. I made a note to update this method to a more efficient way later on if I had time. 

I then moved to the ‘other profile’ component and had to work around the unpopulated answers on the user model in a similar way, stringing together many useEffects and making several separate calls to the back end.

In order to check the agreed answers between profiles I created a seeding component that added a random selection of answers to every question for each of the seeded profiles.

![seed-answered-questions](https://i.imgur.com/VsXHuuk.png) 

#### Day 8:

In a similar way to the profile page. I made three header components:  ‘Find’, ‘Likes’ and ‘Matches’. These had functions to get the user profile information and the id of the profile being viewed. They then call the ‘OtherProfile’ component, passing down the user information and the id of the profile to be featured.

I then worked on the like/match/reject buttons and functionality. These were separate components which were defined in the header components. For example the ‘Find’ component JSX looked like this:

![find-header](https://i.imgur.com/zPQctIo.png)

In order to display the functionality of the site the best, I created a function in the register component that automatically seeded new users with a random selection of six of the seeded profiles.

![seed-random-likes](https://i.imgur.com/V7DPkN2.png) 

I now had all the functionality of the site working so moved to the styling

### Styling

I began by choosing a set of colours that work together and deciding on a simple modern theme similar to Hinge and Bumble.

I started with the navigation bar. I created a check so that it would only display if the user was logged in. I tried a few ways to achieve this, but found the most reliable was to reference state defined in App.js and updated on an initial render of the page and in the relevant login/out functions. I also wanted the icons to be highlighted when the user was on that page so I added a ‘onClick’ function that added a ‘highlighted’ class to each link in the navigation bar.

![navigation-bar-code](https://i.imgur.com/xQ7Pied.png) 

I then moved to the profile pages and used a mixture of Chakra and SASS to style them using Hinge as a reference.

In order to style the HTML file input, I created another button that was easier to style. I then gave the HTML file input `display: none` and saved it using React useRef. It could then be clicked when the other button was clicked.

#### Day 9

This whole day was spent on styling. I started with the mobile view and moved to the desktop view later. I made use of Chakra and my own classes to avoid repeating styling instructions and easily maintain consistency across pages.

![](https://i.imgur.com/K8TGqtd.png)


#### Day 10

I finished the rest of the styling, checking for bugs and adding loading spinners. 

As I had time before the presentations. I decided to go back to the user model to add in the populated answers serializer in order to make the profile pages more efficient. 

In order to make it so that those components only required one call to the backend, I had to also populate the answer serializer with the question it belonged to. To avoid an infinite loop of questions populated by answers that have populated questions again I created an ‘auxiliary answer serializer’:

![auxiliary-answer-serializer](https://i.imgur.com/0t0C7kb.png )

I then referenced the auxiliary answer serializer in the populated question serializer

![populated-question-serializer](https://i.imgur.com/LR8fz26.png) 

I could then make an answer serializer populated with the question it belonged to and populate the user model with it.

![populated-answer-serializer](https://i.imgur.com/hUt0jk0.png)  

This meant that each answer chosen by the user would return this information on a get request:

![example-populated-answer-field](https://i.imgur.com/HNqvsmL.png) 

This provided all the information needed for the view profile pages and so I could clean up those components to only make one call to the back end, making it far simpler and more efficient. I realised that it would have saved a lot of time to have fixed the back end this way when I first came across the issue. 

I then deployed the site using heroku. 

## Bugs

Sometimes the get another disagreement button takes a few clicks to work.


## Wins

This was the final project in my 12 week course at General Assembly and as a solo project I was able to see quite how far I had come.

I am proud of the usability of the app, in particular, the create account process which has been made a lot cleaner and simpler than having one large form to fill in. 

I believe that users could genuinely have some fun using the site which was a primary aim of mine starting the project.

## Future Features

* Chat functionality.

* The ability to have a preference for which answers get displayed by other profiles.

* To be able to add your own questions to the database.
