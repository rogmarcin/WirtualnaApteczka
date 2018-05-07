$(document).ready(function () {
    $('#register').click(function (event) {
        event.stopPropagation();
        var email = $('#userEmail');
        var pass = $('#userPass');

        if (email.val() && pass.val()) {
            firebase.auth().createUserWithEmailAndPassword(email.val(), pass.val()).then(function (user) {
                console.log('everything went fine');
                console.log('user object:' + user);
                alert('Your account has been registred.');
                window.location.href = "main.html#user_account";
            }).catch(function (error) {
                console.log('there was an error');
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage);
            });
        } else {
            alert('Fill in both fields');
        }

        return false;
    });

    $('#login').click(function () {

        var email = $('#userEmail2');
        var pass = $('#userPass2');

        if (email.val() && pass.val()) {
            firebase.auth().signInWithEmailAndPassword(email.val(), pass.val()).then(function (user) {
                console.log('everything went fine');
                console.log('user object:' + user);
                window.location.href = "main.html#user_account";
            }).catch(function (error) {
                console.log('there was an error');
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage);
            });

        } else {
            alert('Fill in both fields');
        }
    });

    $('#logingoogle').click(function () {
        window.plugins.googleplus.login(
            {
                'webClientId': '292234828986-2jil32amnder6s5346gere18i7ub5knq.apps.googleusercontent.com',
                'offline': true
            },
            function (obj) {

                console.log(obj);
                if (!firebase.auth().currentUser) {
                    console.log(obj.idToken);
                    firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(obj.idToken))
                        .then((success) => {
                            console.log("success: " + JSON.stringify(success));
                            window.location.href = "main.html#user_account";
                        })
                        .catch((error) => {
                            document.querySelector("#feedback").innerHTML = "error0: " + JSON.stringify(error);
                        });
                } else {
                    document.querySelector("#feedback").innerHTML = 'error1: already sigend in firebase';
                }
            },
            function (msg) {
                document.querySelector("#feedback").innerHTML = "error2: " + msg;
            }
        );

    });

    $('#loginfacebook').click(function () {

        facebookConnectPlugin.getLoginStatus(
            function (status) {
                console.log("current status: " + JSON.stringify(status));
            },
            function (error) {
                console.log("Something went wrong: " + JSON.stringify(error));
            }
        );

        facebookConnectPlugin.login(["email"], function (result) {
            console.log("logowanie:");
            console.log("RESULT:" + JSON.stringify(result));
            console.log("RESULT2:" + JSON.stringify(result.authResponse));
            console.log("RESULT3:" + JSON.stringify(result.authResponse.accessToken));

            firebase.auth().signInWithCredential(firebase.auth.FacebookAuthProvider.credential(result.authResponse.accessToken))
                .then((success) => {
                    console.log("success: " + JSON.stringify(success));
                    window.location.href = "main.html#user_account";
                })

            //calling api after login success
            facebookConnectPlugin.api("/me?fields=email,name,picture", ["public_profile", "email"]
                , function (userData) {
                    //API success callback
                    console.log(JSON.stringify(userData));

                }, function (error) {
                    //API error callback
                    console.log(JSON.stringify(error));
                });
        }, function (error) {
            //authenication error callback
            console.log(JSON.stringify(error));
        });
    });
});

facebookConnectPlugin.getLoginStatus(function (status) {
    console.log("current status: " + JSON.stringify(status));
});

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        window.location.href = "main.html#user_account";
    }
});