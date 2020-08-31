const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.render('home', {
		title: 'Home page'
	});
});

app.get('/auth/login', (req, res) => {
	res.render('login', {
		title: 'Log in'
	});
});

app.get('/auth/register', (req, res) => {
	res.render('register', {
		title: 'Register'
	});
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
