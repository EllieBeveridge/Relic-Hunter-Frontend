# Relic Hunter 

## Summary
Relic Hunter is a quiz app where you answer questions by finding objects and photographing them. It is aimed at children, mainly in an educational setting like a museum. 

Each quiz is called a Quest, and is made up of several questions. Quests are sorted by where they take place (a museum, art gallery, etc). A location can have any number of quests - a museum might have a quest for each exhibit, for example. Each question in a Quest will be a clue to a specific object, e.g. a specific painting in a gallery. If you think you've found what the question is asking for, you take a photo of it - the app will then tell you if you are correct, and you either move on to the next question or try again. If you're having trouble, you can receive a hint to help you, or you can skip the question altogether. Once you finish the quest you get to see how many questions you answered correctly, then you are taken back to the main menu so you can try a new quest.

## Interface

#### Landing Page

When you start the app, you begin on the landing page. On this page, you can select from a list of venues, then either play a Quest from the selected venue or create a new one.

### Play Quest

A video demonstration of the game play can be found [here](https://www.youtube.com/watch?v=ODsk4HAC_m0)

#### Quest Select

On this page you can see a list of all Quests for the venue selected on the landing page. If you tap a Quest title it will expand to show more information about the Quest, such as the intended age, where it takes place, and a short description. Clicking "Start Quest" will begin the Quest and take you to the first question.

#### Question Page

Here you can see the question and a list of buttons. The "Take a Picture" button will take you into the camera so you can try to solve the question, "Get a Hint" will open up a hint box, "Skip this Question" will take you to the next question (awarding no points) and "Finish this Quest" will allow you to finish early and takes you to your final score.

#### Camera View

In the camera view you can take a photo of your attempted solution with the "Press Me" button. You can then choose to either submit the photo you've taken or retake it. If you submit, you will see a screen telling you if you are correct or not. If you are correct, you proceed on to the next question - if not, you are taken back to the current question page.

#### Score Page

Here, you can see how many questions you got right and how many you did in total. The "next" button will take you back to the landing page so you can select another Quest (if you want to!).

### Create Quest

#### Create Quest Form

On this page you are prompted to put in all the information about the Quest itself, i.e. suitability, area in the location, etc. If you submit and the request is successful, you will see a dialog box telling you that your Quest has been added to the database.

#### Create Question Form

Again you will be prompted for information, this time about the first question. The same submit process as before occurs.

#### Add Reference Images

In order for the image recognition to work, it needs reference images of the object. You need to take at least 10, ideally from different angles with consistent lighting. The image capture process is identical to the one for attempting a solution when you are playing - take a photo and either retake or submit it. Once you have 10, tap "Finish Adding Pictures".

#### Model Test

Once the reference images are uploaded, you need to test that the model is working - you take one last photo which is then checked. If it passes, the question is added to the Quest - if it fails, you may need to add more reference images.

#### Question/Publish Page

Once the model is verified, you can either publish the Quest or add another question. You can add any number of questions, and when you're done, the Quest will appear in the list for the venue.



