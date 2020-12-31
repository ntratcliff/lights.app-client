import io from 'socket.io-client'

const serverAddress = `${process.env.API_HOST}:${process.env.API_PORT}`
export default io(serverAddress, {
	transports: ['websocket'] // websocket only to get around cors issues (this is fine)
})
