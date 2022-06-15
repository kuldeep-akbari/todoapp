import axios from 'axios';

export default async function getTodoList() {

    try {
        await axios.get("http://127.0.0.1:8000/item/created_date", 
        {
          headers: {
              'Content-Type': null,
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
              "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE"
          }}).then((res) => {
              // console.log(res.data);
              return res.data;
          });
    } catch (error) {
        if (error.response) { 
          console.log(error.response);
        } else if (error.request) { 
          console.log(error.request);
        } else {
          console.log(error.message);
        }
        console.log(error.config);
    }
}

export const addTodoItem = async (formdata) => {
        try {
        await axios.post("http://127.0.0.1:8000/item/", formdata, {
            headers: {
                'Content-Type': null,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE"
            }
        }).then((res) => {
            if (res.data.status === "success"){
                console.log(res.data);
                return true;
                
            }
            else{
                return false;
            }
        });
    } catch (error) {
        if (error.response) { 
          console.log(error.response);
        } else if (error.request) { 
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
        return false;
    }
}