import http from 'k6/http';

export default function () {
  const baseUrl = http.get('https://reqres.in/api/users');
  const params = { headers: { 'Content-Type': 'application/json'}, tags: {type: 'api'}}
}