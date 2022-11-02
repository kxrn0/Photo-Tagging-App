/**
 * What do I want to build? 
 * 
 * I want to build a simple where's waldo style of app.
 * 
 * How will it work?
 * 
 * The user will go to the website, and will be prompted with a screen asking them 
 * to start the game. That start screen will have the names of five characters, which
 * the user will have to find all the characters to complete the game. The characters
 * will be chosen at random. How will the backend work? I will store only the users
 * that complete the game. So I guess what I can do is, when the current user starts 
 * the game, I create a local user object, and give it the start time with the 
 * serverTimestamp() function, I don't know if this would be better than just a local 
 * new Date().valueOf(), I'll have to look into this.
 * The issue here is, how will I keep track of the users? once the current user finishes
 * the game what if he wants to play again? if the user completes the game again, should
 * I make another user in the backend, or should I let them use their current account?
 * Firebase seems to have anonymous log in, so I guess a new account will need a name and
 * a password to be created, also the user will have the chance to sign in again, so
 * as to not be prompted with password and name requirements each time.
 * 
 * Thus, the interaction of the user with the app may go as follows:
 * 
 * The user enters the page, the start screen is presented to them, which shows five
 * characters that the user is to find.
 * After the user presses enter, the image is displayed on the screen. There's also a 
 * navbar with a log in button. The user may choose to log in whenever he pleases.
 * The users now clicks around the screen looking for the characters. There's also a
 * section in the navbar that shows the characters that have already been found, and the
 * ones that haven't. When the user clicks on the screen, a menu for the characters appears.
 * If the user presses outside that menu, the menu it's closed.
 * Once the user has correctly selected all characters, if they are logged in, then they 
 * are just displayed their score, and prompted to play again. Otherwise, they are shown
 * their score, and prompted to log in for it to be displayed with all others.
 */