import React from 'react'
import "./Todo.css";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Todo(props) {

	function editTodoItem(){
		props.fillTodoForm(props.todo);
	}

	function deleteTodoItem(){

		var body = {
            "id": props.todo.id
        } 

		const url = "http://127.0.0.1:8000/item/";

        try {
             axios.delete(url, 
				{
					data: body
				}, {
                headers: {
                    'Content-Type': null,
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
                    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE"
                }
            }).then((res) => {
                console.log(res.data);
                if (res.data.status === "success"){
                    toast("Deleted successfully");
                    props.getItemData();
                }
                else{
                    toast("Something went wrong");
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
        }

	}

	function getProperDate(date){
		const temp_date = new Date(date);
		return temp_date.getFullYear()+"-"+(temp_date.getMonth()+1)+"-"+temp_date.getDate()+" "+temp_date.getHours()+":"+temp_date.getMinutes();
	}

  	return (
		<div className='item-div'>
			<ToastContainer/>
			<div className='item-name-div'>
				<p >{
					props.todo.expiration_date?
						"\"" + props.todo.name + "\"is due on " + getProperDate(props.todo.expiration_date)
					:
						"\"" + props.todo.name + "\""
				}</p>
			</div>
			<button type='button'  className='item-button item-edit' onClick={editTodoItem}>Edit</button>
			<button type='button'  className='item-button item-delete' onClick={deleteTodoItem}>Delete</button>
		</div>
  	)
}
