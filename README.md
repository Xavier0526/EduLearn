# Level-Up-Labs
In a demanding academic environment, where many students struggle to balance effective time management with learning. EduLearn is an application desgined to help students take control of their schedules while improving their academic performance. The app tracks students' daily activities to encourage better study habits and productivity. while offering personalized learning support for subjects they find challenging.

To encourage consistent engagement with users, EduLearn features interactive quizzes where students can earn points and redeem rewards and prizes. By combining activity tracking, adaptive learning and gamified quizzes, EduLearn motivates students to manage their time more effectively, stay engaged and learn more efficiently.

# Design Process


# Features
- Feature 1 - Allows user to create/sign up for an account, by filling up username, email and password
- Feature 2 - Allows user to login their account that they have created, by entering usernaame and password
- Feature 3 - Allows user to change password when they forget their account password
- Feature 4 - Allows user to adjust their account info in the profile page
- Feature 5 - Allows user to answer quiz and earn token according to the amount of questions they answer correctly
- Feature 6 - Allows user to redeem reward with the points they earn, but each reward requires a certain amount of token before being able to redeem
- Feature 7 - Allows user to a their task and set a start and end time/date in the time management page
- Feature 8 - Allows user to see the task due date and time which can be drag to completed if done
- Feature 9 - Allows user to turn on/off desktop/mobile notification
- Feature 10 - Allows user to turn on/off automatic update
- Feature 11 - Allows user give feedback which the user have to fill up a form that requires their email and their feedback
- Feature 12 - Allows user to communicate with the support by filling up the contact us form that need their name, email and their questions.
- Feature 13 - Allows user to log out after using finish the app

# Technologies Used
- [RestDB](https://restdb.io/)
  
  - The project uses RestDB for sign up, login, change password and save details in profile page

- [Trivia APU](https://opentdb.com/api_config.php)

  - The project uses Trivia API for quiz pages

# Assistive AI
1. RestDB: ChatGPT was used to help with the login part to allow user login properly
![Assistive AI Image](https://github.com/user-attachments/assets/bbb68a2f-bcde-4010-ac0a-730465c5168f)

# Testing
1. Login Page:

   i. When login
   
   ii. Try to login without username and password and verify that an error message about the required fields appears
   
   iii. Try to login with invalid username and vwrify that a relevant error message appears
   
   iv. Try to login with invalid password and verify that a relevant error message appears

2. Form Page

   i. Open the form page and verify all input fields Email, Subject / Description, Type of Issue are displayed there correctly.
   
   ii. Try submitting the form without filling in any fields and verify whether a warning message will appear about the misiing fields.

   iii.  Try entering an invalid email address (e.g. abc) and verify whether the browser will shows an invalid email format error.

   iv. Try submitting with only some fields filled and verify that we cannot do the submission until all required fields are completed.

   v. Enter valid inputs for all fields and click Submit and verify that the confirmation message will appear.

   vi. Click “Go Back” on the confirmation popup and verify the user can return to the form without losing entered data.
   
   vii. Click “Submit” on the confirmation popup and verify that the Thank You message is displayed on the same page and allow users to navigate back.
   
   viii. Verify that form fields are cleared after successful submission.

# Credits
**Content**

[Figma](https://www.figma.com/design/TiZfXijqJoQMg4Lv1CDlBi/AD_EduLearn_Prototype?node-id=0-1&p=f)

**Media**

**Acknowledgement**

[ChatGPT](https://chatgpt.com/)
