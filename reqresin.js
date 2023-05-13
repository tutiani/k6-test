import http from "k6/http";
import {check, fail} from "k6";


//Post API
export default function createUser() {

    const url = 'https://reqres.in/api/users';
    const reqBody1 = JSON.stringify({
    name: 'morpheus',
      job: 'leader',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  http.post(url, reqBody1, params);
}

function checkStatusCode(response){
  if(!(check(response, {'response status code check': res => res.status < 400}))){
          fail('api call ${response.url} failed with response ${response.body}')
       }
}

//Put API
export function putUser(){

    const url = 'https://reqres.in/api/users/2';
    const reqBody2 = JSON.stringify({
    name: 'morpheus',
    job: 'zion resident',
  })
  const params= {
      headers : {'Content-Type': 'application/json'}
  }
  const response= http.put(url, reqBody2, params);
}


