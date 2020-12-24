module.exports = {
	apps: [
		{
			name: 'lights.app-client',
			script: '/home/lights/lights.app/client/server.js',
			watch: true,
			autorestart: true,
			restart_delay: 1000,
			env: {
				NODE_ENV: 'development'
			},
			env_production: {
				NODE_ENV: 'production'
			}
		}
	]
};