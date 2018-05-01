// "duża" funkcja w której używamy poszczególnych id przypisanych do przycisków do wywołania danej funkcji..
function loginFirebase() {
    $('#register').click(function() {  
           
           // validacja email i passoword, ponieważ muszą być one "valid" by przekazać je do funkcji poniższej.
           var email = $('#userEmail');    
           var pass = $('#userPass');      

                       if(email.val() && pass.val()){
           // założenie konta w firebase przy wykożystaniu loginu i hasła
               firebase.auth().createUserWithEmailAndPassword(email.val(), pass.val()).then(function(user){
                   console.log('everything went fine');
                   console.log('user object:' + user);
                   //you can save the user data here.
               }).catch(function(error) {
                   console.log('there was an error');
                   var errorCode = error.code;
                   var errorMessage = error.message;
                   console.log(errorCode + ' - ' + errorMessage);
               });

           } else {
               console.log('fill in both fields');
           }  
       });
       
        $('#login').click(function() {

           var email = $('#userEmail');    
           var pass = $('#userPass');      

                       if(email.val() && pass.val()){
           // logowanie na już założone konto w firebase.
               firebase.auth().signInWithEmailAndPassword(email.val(), pass.val()).then(function(user){
                   console.log('everything went fine');
                   console.log('user object:' + user);
                   //you can save the user data here.
               }).catch(function(error) {
                   console.log('there was an error');
                   var errorCode = error.code;
                   var errorMessage = error.message;
                   console.log(errorCode + ' - ' + errorMessage);
               });

           } else {
               console.log('fill in both fields');
           }  
       });
       
       
       /* logowanie google: używamy pluginu: 
       cordova-plugin-googleplus zgodnie z informacjami zawartymi w config.xml
       dzięki temu pluginowi pobieramy idToken którego następnie używamy do zalogowania poprzez funckję 
       signInWithCredential - UWAGA TA FUNKCJA STWORZY KONTO I ZALOGUJE UŻYTKOWNIKA ALE NIE PRZYPISUJE HASŁA DO KONTA, LOGOWANIE ODBYWA SIĘ BEZ HASŁA PRZEZ TEN TOKEN.
       BARDZO WAŻNE JEST POPRAWNE SKONFUGIROWANIE PLUGINU W PLIKU config.xml.
       */
       
       $('#logingoogle').click(function() {
            window.plugins.googleplus.login(
       {
                'webClientId' : '244487661018-8rn0cmocvl4p549fsfm3ag6umrgfrfd8.apps.googleusercontent.com',
                'offline': true
       },
       function (obj) {

       console.log(obj);
           document.querySelector("#feedback").innerHTML = "Hello, " + obj.displayName + ", " + obj.email;
           if (!firebase.auth().currentUser) {
               document.querySelector("#feedback").innerHTML ='signing firebase';
                   console.log(obj.idToken);
               firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(obj.idToken))
               .then((success) => {
                   console.log("success: " + JSON.stringify(success)); // to long json to put it in #feedback
               })
               .catch((error) => {
                       document.querySelector("#feedback").innerHTML = "error0: " + JSON.stringify(error);
                     });
           }else{
               document.querySelector("#feedback").innerHTML ='error1: already sigend in firebase';
           }
       },
       function (msg) {
         document.querySelector("#feedback").innerHTML = "error2: " + msg;
       }
   );	
   
   });
   
   
       /* logowanie google: używamy pluginu: 
       cordova-plugin-facebook4 zgodnie z informacjami zawartymi w config.xml
       dzięki temu pluginowi pobieramy idToken którego następnie używamy do zalogowania poprzez funckję 
       signInWithCredential - UWAGA TA FUNKCJA STWORZY KONTO I ZALOGUJE UŻYTKOWNIKA ALE NIE PRZYPISUJE HASŁA DO KONTA, LOGOWANIE ODBYWA SIĘ BEZ HASŁA PRZEZ TEN TOKEN.
       BARDZO WAŻNE JEST POPRAWNE SKONFUGIROWANIE PLUGINU W PLIKU config.xml, oraz poprawne wpisanie klucza "klucz tajny aplikacji", lub "app secret key" w polu w konsoli firebase (zakładka METODA LOGOWANIA)
       */
       
   $('#loginfacebook').click(function() {
   
       facebookConnectPlugin.getLoginStatus(
           function (status) {
               console.log("current status: " + JSON.stringify(status));
           },
           function (error) {
               console.log("Something went wrong: " + JSON.stringify(error));
           }
    );
    
   facebookConnectPlugin.login(["email"],function(result){
           console.log("logowanie:");
            console.log("RESULT:" + JSON.stringify(result));
             console.log("RESULT2:" + JSON.stringify(result.authResponse));
             console.log("RESULT3:" + JSON.stringify(result.authResponse.accessToken));
             
               firebase.auth().signInWithCredential(firebase.auth.FacebookAuthProvider.credential(result.authResponse.accessToken))
                   .then((success) => {
                       console.log("success: " + JSON.stringify(success)); 
                  })
                 
       //calling api after login success
        facebookConnectPlugin.api("/me?fields=email,name,picture",["public_profile","email"]
        ,function(userData){
            //API success callback
            console.log(JSON.stringify(userData));
         },function(error){
            //API error callback
            console.log(JSON.stringify(error));
         });
      },function(error){
         //authenication error callback
        console.log(JSON.stringify(error));
        });
   
   });
   

       $('#logout').click(function() {

           firebase.auth().signOut().then(function() {
             // Sign-out successful.
           }, function(error) {
             // An error happened.
           });
       
       facebookConnectPlugin.logout(function(){
                       console.log("LOGOUT SUCCESS");
                       $( "#loggedas" ).html('user logged out');
                   },function(){
                       console.log("LOGOUT FAIL");
                   }); 
       });	
}  







function loginFirebaseStatus() {
   firebase.auth().onAuthStateChanged(function(user) {
         if (user) {
           // User is signed in.
           var displayName = user.displayName;
           var email = user.email;
           var emailVerified = user.emailVerified;
           var photoURL = user.photoURL;
           var isAnonymous = user.isAnonymous;
           var uid = user.uid;
           var providerData = user.providerData;
           console.log(displayName);
               console.log(email);
               console.log(user.emailVerified);
               $( "#loggedas" ).html(email);
               
         } else {
           $( "#loggedas" ).html('user logged out');
         }
           });
           
           facebookConnectPlugin.getLoginStatus(function (status) {
               console.log("current status: " + JSON.stringify(status));
        });
            
}  
 

window.onerror = function(what, line, file) {
   alert(what + '; ' + line + '; ' + file);
};
 


function signOut() {
   var auth2 = gapi.auth2.getAuthInstance();
   auth2.signOut().then(function () {
     console.log('User signed out.');
   });
}



function isUserEqual(googleUser, firebaseUser) {
 if (firebaseUser) {
   var providerData = firebaseUser.providerData;
   for (var i = 0; i < providerData.length; i++) {
     if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
         providerData[i].uid === googleUser.getBasicProfile().getId()) {
       // We don't need to reauth the Firebase connection.
       return true;
     }
   }
 }
 return false;
}



function init() {
   loginFirebase();
   loginFirebaseStatus();
}
