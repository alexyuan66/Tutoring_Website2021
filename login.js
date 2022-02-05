//Student name: Alexander Yuan
function slideRight() { //Used for sliding button on home page
	const student = document.getElementById('login-student');
	const tutor = document.getElementById('login-tutor');
	const button = document.getElementById('login-button');
	student.style.left='-600px';
	tutor.style.left='120px';
	button.style.left='110px';
}
function slideLeft() { //Used for sliding button on home page
	const student = document.getElementById('login-student');
	const tutor = document.getElementById('login-tutor');
	const button = document.getElementById('login-button');
	student.style.left='120px';
	tutor.style.left='600px';
	button.style.left='0px';
}
function confirm_pass() { //Used for confirming that password and confirm password are the same on registration form
    if (document.getElementById('password').value ==
            document.getElementById('confirm_password').value) {
        document.getElementById('submit').disabled = false;
    } else {
        document.getElementById('submit').disabled = true;
    }
}
document.querySelector('.slide-btn').addEventListener('click', slideLeft);
document.querySelector('.slide-btn-2').addEventListener('click', slideRight);