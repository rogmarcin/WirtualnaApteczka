(function() {
    // Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

    var uiConfig = {
        callbacks: {
            signInSuccessWithAuthResult: function (authResult, redirectUrl) {
              // User successfully signed in.
              // Return type determines whether we continue the redirect automatically
              // or whether we leave that to developer to handle.
              conosle.log(authResult, redirectUrl);
              return true;
            },
            uiShown: function() {
              // The widget is rendered.
              // Hide the loader.
              document.getElementById('loader').style.display = 'none';
            },
            signInFailure: function(error) {
                console.log(error);
                $('body').html(JSON.stringify(error));
              // For merge conflicts, the error.code will be
              // 'firebaseui/anonymous-upgrade-merge-conflict'.
//              if (error.code != 'firebaseui/anonymous-upgrade-merge-conflict') {
//                return Promise.resolve();
//              }
//              // The credential the user tried to sign in with.
//              var cred = error.credential;
//              // If using Firebase Realtime Database. The anonymous user data has to be
//              // copied to the non-anonymous user.
//              var app = firebase.app();
//              // Save anonymous user data first.
//              return app.database().ref('users/' + firebase.auth().currentUser.uid)
//                  .once('value')
//                  .then(function(snapshot) {
//                    data = snapshot.val();
//                    // This will trigger onAuthStateChanged listener which
//                    // could trigger a redirect to another page.
//                    // Ensure the upgrade flow is not interrupted by that callback
//                    // and that this is given enough time to complete before
//                    // redirection.
//                    return firebase.auth().signInWithCredential(cred);
//                  })
//                  .then(function(user) {
//                    // Original Anonymous Auth instance now has the new user.
//                    return app.database().ref('users/' + user.uid).set(data);
//                  })
//                  .then(function() {
//                    // Delete anonymnous user.
//                    return anonymousUser.delete();
//                  }).then(function() {
//                    // Clear data in case a new user signs in, and the state change
//                    // triggers.
//                    data = null;
//                    // FirebaseUI will reset and the UI cleared when this promise
//                    // resolves.
//                    // signInSuccess will not run. Successful sign-in logic has to be
//                    // run explicitly.
//                    window.location.assign('<url-to-redirect-to-on-success>');
//                  });
            }
        },
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: 'redirect',
        signInSuccessUrl: 'main.html',
        signInOptions: [
            // Leave the lines as is for the providers you want to offer your users.

            //firebase.auth.GithubAuthProvider.PROVIDER_ID,
            //firebase.auth.PhoneAuthProvider.PROVIDER_ID,
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        // Terms of service url.
        tosUrl: 'main.html'
    };

    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);
})();