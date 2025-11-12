

const url = "http://dementica.danigoes.online:80/"
var MyUserID = ""

export function backend_register(name,password,email, callback){
	fetch(url+"v1/register", {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			Name: name,
			Password: password,
			UserType: "Doctor",
			RegType: "EMAIL",
			RegisterWith: email
		})
	})
	.then(response => response.json() )
	.then(data => { callback(data); })
	.catch((err)=>{ console.log("BACKEND: "+err.message) } )
}

export function backend_login(name,password, callback){
	fetch(url+"v1/login", {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			Name: name,
			Password: password,
			UserType: "Doctor",
		})
	})
	.then(response => response.json() )
	.then(data => { MyUserID = data.UserID; callback(data); })
	.catch((err)=>{ console.log("BACKEND: "+err.message) } )
}

export function backend_logout() {
	return True }



export function backend_PatientInfo(userID, callback){
	fetch(url+"v1/patient_info", {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			UserID: UserID
		})
	})
	.then(response => response.json() )
	.then(data => { callback(data); })
	.catch((err)=>{ console.log("BACKEND: "+err.message) } )
}
export function backend_GetRiskScore(userID, callback){
	fetch(url+"v1/get_risk", {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			UserID: UserID
		})
	})
	.then(response => response.json() )
	.then(data => { callback(data); })
	.catch((err)=>{ console.log("BACKEND: "+err.message) } )
}

export function backend_MyData(callback){
	fetch(url+"v1/doctor_info", {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			UserID: MyUserID
		})
	})
	.then(response => response.json() )
	.then(data => { callback(data); })
	.catch((err)=>{ console.log("BACKEND: "+err.message) } )
}

export function backend_GetPatients(callback){
	fetch(url+"v1/patients", {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			UserID: MyUserID
		})
	})
	.then(response => response.json() )
	.then(data => { callback(data); })
	.catch((err)=>{ console.log("BACKEND: "+err.message) } )
}

export function backend_PatientTestHistory(userId, callback){
	fetch(url+"v1/test_history", {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			UserID: userId
		})
	})
	.then(response => response.json() )
	.then(data => { callback(data); })
	.catch((err)=>{ console.log("BACKEND: "+err.message) } )
}

export function backend_SetDementia(userId, demStr, callback){
	// demStr must be of type "Unknown", "Positive", "Negative"
	fetch(url+"v1/send_dementia", {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			UserID: userId,
			Dementia: demStr
		})
	})
	.then(response => response.json() )
	.then(data => { callback(data); })
	.catch((err)=>{ console.log("BACKEND: "+err.message) } )
}

export function backend_GetNews(callback){
	fetch(url+"v1/get_news", {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			Type:"Doctor"
		})
	})
	.then(response => response.json() )
	.then(data => { callback(data); })
	.catch((err)=>{ console.log("BACKEND: "+err.message) } )
}


