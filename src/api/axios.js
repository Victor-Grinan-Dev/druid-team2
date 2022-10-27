import axios from "axios";


/*
axios.get('http://localhost:8010/database').then(res =>{
    console.log(res.data)
})
*/

export default axios.create({
    baseURL: 'http://localhost:8010/database'
},
console.log("axios create has runned")//ok
);