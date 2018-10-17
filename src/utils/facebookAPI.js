const token = "248795865786395|e5d775168a32130c3634be40b492589a"
const endpoint = (center,query,token) =>  `https://graph.facebook.com/search?type=place&fields=location,name,picture&center=${center}&q=${query}&access_token=${token}`

const fetchPlaces = (center = "36.6968513,2.9238258" ,query ="café") => {
 	return fetch(endpoint(center, query,token))
 	  .then(response => response.json())
 	  .then(data => data )
 	  .catch(err =>  [])

}


export default fetchPlaces;