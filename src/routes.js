import Home from 'pages/Home'
import EditProfile from 'pages/EditProfile'

export default [
	{ path: '/', component: Home },
	{ path: '/profile/:name?', component: EditProfile }
]
