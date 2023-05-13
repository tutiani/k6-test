import http from 'k6/http'
import { group, check } from 'k6'
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
    vus:  1000,
    iterations: 3500,
    thresholds: {
        http_req_failed: ['rate<0.01'],
        http_req_duration: ['p(99)<2000'], // 95% of requests should be below 2000ms
      },
    };


// reconsider this type of code

const baseUrl = "https://reqres.in/api/users";
const baseUrl2 = "https://reqres.in/api/users/2";
const params = { headers: { 'Content-Type': 'application/json'},  tags: {type: 'api'}}; 

export default function (){
  //Post API
    group('Create User',  () => {
      let user = JSON.stringify({
        "name": "morpheus",
        "job": "leader"
      });
       const resPOST = http.post(baseUrl,user, params)
          check(resPOST, {
            'POST Method: status is 201': (r) => r.status === 201});
        });
    
    //Put API
    group('Update User', () => {
      let userUp = JSON.stringify({
        "name": "morpheus",
        "job": "zion resident"
      });
      const resPUT = http.put(baseUrl2,userUp, params)
       check(resPUT, {
          'PUT Method: status is 200': (rPUT) => rPUT.status === 200});
        });
      } 

//export file to html
export function handleSummary(data) {
  return {
    "Summary.html": htmlReport(data),
  };
}