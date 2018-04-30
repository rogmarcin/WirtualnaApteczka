var mainText = document.getElementById("mainText");
var submitBtn = document.getElementById("submitBtn");
var heading = document.getElementById("heading");

function postData() {
    var firebaseRef = firebase.database().ref();

    var msgText = mainText.value;

    firebaseRef.child("heading").set(msgText);
}

function getData() {
    var firebaseHeadingRef = firebase.database().ref().child("heading");

    firebaseHeadingRef.on('value', function(datasnapshot) {
    heading.innerText = datasnapshot.val();
});
}