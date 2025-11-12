


// their is some basic example code in pages/patients.js
// note danis code only sometimes responds to requests so until I fix that might need to call multiple times (will get 501 not implemented)

// each function takes in arguments which should be self explanatory, the last argument is always a callback which will be called when response is recieved
// I have added a list of fields the return object will have above each function
// I will create more detailed documentation when I am less lazy



const url = "http://dementica.danigoes.online:80/"
// const url = "http://localhost:80/"

var MyUserID = "" // internal use / private



// create a new user
// return: .Result (Ok, Taken)
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

// Login to existing user; required for all other functions to work as they assume already logged in
// return: .UserID .Result (Ok,UserPass (incorrect password or username), Type, given user is a patient not doctor) // note, many of these checks are not actualy implemented in backend yet
// in future when i integrate danis pos code, this will return a session_token, not userID, but i should be able to change these functions without affecting your code (just dont use UserID)
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

// the function i put most effort into
export function backend_logout() {
	return true }


// returns patient data based on UserID (see getPatients for getting patient userIds)
// return: Result(Ok,NotFound,NoPermission,NotPatient) Name, HasDementia(Unknown,Positive,Negative), DoctorID (your id), RiskScore ("" or float 0.0--1.0)
export function backend_PatientInfo(userID, callback){
	fetch(url+"v1/patient_info", {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			UserID: userID
		})
	})
	.then(response => response.json() )
	.then(data => { callback(data); })
	.catch((err)=>{ console.log("BACKEND: "+err.message) } )
}
// simular to above but only .Result and .RiskScore
export function backend_GetRiskScore(userID, callback){
	fetch(url+"v1/get_risk", {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			UserID: userID
		})
	})
	.then(response => response.json() )
	.then(data => { callback(data); })
	.catch((err)=>{ console.log("BACKEND: "+err.message) } )
}

// get your information
// returns: .Result(Ok,NotFound,NoPermission,NotDoctor), Name, Email
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

// all patients assigned to loged in doctor
// returns .Result(Ok,NotFound,NoPermission,NotDoctor) .Patients (list of patients with same info as PatientInfo)
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

// returns list of all patient tests and calculated risk score (rather than just overall risk score)
// returns .Result (Ok,NotFound,NoPermission,NotPatient), .Tests (list of...
	// .Date, .RiskScore ("Calculating" or a float)
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

// set a patients dementia status (Unknown,Positive,Negative)
// returns .Result (Ok,NotFound,NoOperation (misspelling of no permission), NotPatient)
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

// not implemted crewAI yet, for now just returns .content
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


