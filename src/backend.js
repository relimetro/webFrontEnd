


export function backend_request(str, callback){
	fetch('http://localhost:80/v1/say_hello', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			name: str
		})
	})
	.then(response => response.json() )
	.then(data => { callback(data.message); })
	.catch((err)=>{ console.log("BACKEND: "+err.message) } )
}




