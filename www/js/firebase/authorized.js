function redirectToLogin() {
    window.location.href="index.html#start";
}

function isGuest() {
    var user = firebase.auth().currentUser;
    return (user ? false : true);
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        Application.initialize();
    } else {
        console.log('user is logged out');
        redirectToLogin();
    }
});

function logout() {
    firebase.auth().signOut();

    facebookConnectPlugin.logout(function () {
        console.log("User sign out from Facebook");
    }, function () {
        console.log("User not sign out from Facebook");
    });

    var auth2 = gapi.auth2.getAuthInstance();
	auth2.signOut().then(function () {
		console.log('User signed out from Google.');
	});
};
