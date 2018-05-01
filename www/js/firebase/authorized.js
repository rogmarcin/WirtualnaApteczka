function redirectToLogin() {
    window.location.href="index.html#start";
}

function isGuest() {
    var user = firebase.auth().currentUser;
    return (user ? false : true);
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log('user is logged in');
    } else {
        console.log('user is logged out');
        redirectToLogin();
    }
});
