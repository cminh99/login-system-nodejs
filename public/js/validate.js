if (window.location.href.indexOf('register') !== -1) {
	const name = document.getElementById('name');
	const email = document.getElementById('email');
	const password = document.getElementById('password');
	const confirmPassword = document.getElementById('confirmPassword');

	const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	name.addEventListener('change', function () {
		if (name.value === '') {
			setErrorFor(name, 'Please enter your name.');
		} else {
			setSuccessFor(name);
		}
	});

	email.addEventListener('change', function () {
		if (!email.value.match(emailPattern)) {
			setErrorFor(email, 'Please enter a valid email.');
		} else {
			setSuccessFor(email);
		}
	});

	password.addEventListener('change', function () {
		if (password.value.length < 6) {
			setErrorFor(password, 'Password must be at least 6 characters.');
		} else {
			setSuccessFor(password);
		}
	});

	confirmPassword.addEventListener('change', function () {
		if (confirmPassword.value !== password.value) {
			setErrorFor(confirmPassword, 'Password dose not match.');
		} else {
			setSuccessFor(confirmPassword);
		}
	});

	// functions
	function setErrorFor(element, message) {
		var formGroup = element.parentNode;
		var feedback = formGroup.querySelector('span');

		element.classList.add('is-invalid');
		feedback.innerText = message;
	}

	function setSuccessFor(element) {
		var formGroup = element.parentNode;
		var input = formGroup.querySelector('input');
		var feedback = formGroup.querySelector('span');

		if (input.classList.contains('is-invalid')) {
			input.classList.remove('is-invalid');
		}

		input.classList.add('is-valid');
		feedback.innerText = '';
	}
}
