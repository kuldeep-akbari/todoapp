import React from 'react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Todo from './TodoItem/Todo'
import "./App.css";

function App() {

	const [todoList, setTodoList] = useState(null)
	const todoNameRef = useRef()
    const todoExpirationDateRef = useRef()
    const [buttonText, setButtonText] = useState("Sort by Expiry Date");
    var isAdding = Boolean(true)
    var editTodo = null

    function handleSorting(){
        if(buttonText === "Sort by Expiry Date"){
            setTodoList(getItemData("http://127.0.0.1:8000/item/expiration_date/", "Sort by Created Date"));
        }
        else{
            setTodoList(getItemData("http://127.0.0.1:8000/item/created_date/", "Sort by Expiry Date"))
        }  
    }

	function getItemData(url="http://127.0.0.1:8000/item/created_date/", buttonName="Sort by Expiry Date"){ 

		try {
            setButtonText(buttonName);
            axios.get(url, 
           	{
            headers: {
                 'Content-Type': null,
                 "Access-Control-Allow-Origin": "*",
                 "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
                 "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE"
            }})
			.then((res) => {
                setTodoList(res.data);
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

    function handleClear(e){
        todoNameRef.current.value = null
        todoExpirationDateRef.current.value = null  
        isAdding = true    
        editTodo = null    
    }

    function handleSubmitTodo(e){
        if (isAdding){
            handleAddTodo(e)
        }else{
            handleEditTodo(e)
        }
    }

    function fillTodoForm(todo){
        isAdding = false
        editTodo = todo
        todoNameRef.current.value = editTodo.name
        
        if(editTodo.expiration_date){
            todoExpirationDateRef.current.value = editTodo.expiration_date.replace(":00Z","")
        }
        else{
            todoExpirationDateRef.current.value = null
        }
        
    }

	function handleAddTodo(e){

        e.preventDefault();

        var name = todoNameRef.current.value
        var expirationDate = todoExpirationDateRef.current.value

        if(expirationDate !== ''){
            expirationDate = expirationDate+":00Z";
        }
        else{
            expirationDate = null;
        }

        var date = new Date();
        var createdDate = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+"T"+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+"Z";

        var body = {
            "name": name,
            "created_date" : createdDate,
            "expiration_date": expirationDate,
        } 

		const url = "http://127.0.0.1:8000/item/";

        try {
             axios.post(url, 
				body, {
                headers: {
                    'Content-Type': null,
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
                    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE"
                }
            }).then((res) => {
                console.log(res.data);
                if (res.data.status === "success"){
                    todoNameRef.current.value = null
                    todoExpirationDateRef.current.value = null
                    toast("Added successfully");
                    getItemData();
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
            return false;
        }
    }
    
    function handleEditTodo(e){

        e.preventDefault();

        var name = todoNameRef.current.value
        var expirationDate = todoExpirationDateRef.current.value

        if(expirationDate !== ''){
            expirationDate = expirationDate+":00Z";
        }
        else{
            expirationDate = null;
        }

        var  id = editTodo.id;
        var createdDate = editTodo.created_date;

        var body = {
            "id": id,
            "name": name,
            "created_date" : createdDate,
            "expiration_date": expirationDate,
        } 

		const url = "http://127.0.0.1:8000/item/";

        try {
             axios.put(url, 
				body, {
                headers: {
                    'Content-Type': null,
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
                    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE"
                }
            }).then((res) => {
                console.log(res.data);
                if (res.data.status === "success"){
                    todoNameRef.current.value = null
                    todoExpirationDateRef.current.value = null
                    toast("Updated successfully");
                    getItemData();
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
            return false;
        }
    }

   	useEffect(() => {
		getItemData();
  	}, [])

  	return (
      	<div className="main-container">
            {
                todoList?
                    <>

                        <ToastContainer/>         

                        <div className='form-title-cointainer'>
                            <h1 >ToDo List</h1>
                        </div>
                        <form className='todo-form' action='' onSubmit={handleSubmitTodo}>
                            <label id='name_title' className='input-full-width input-label' ref={todoNameRef}><b>Name*</b></label>
                            <input className='input-full-width input-text' type='text' id='name' ref={todoNameRef} required></input>
                            <label id='name_title' className='input-full-width input-label' ref={todoExpirationDateRef}><b>Expiry Date</b></label>
                            <input className='input-full-width input-text' type='datetime-local' id='name' ref={todoExpirationDateRef} ></input>
                            <div className='button-container'>
                                <input type='submit' value='SUBMIT' className='form-button form-submit-button'  />
                                <button type='button'  className='form-button form-clear-button' onClick={handleClear}>CLEAR</button> 
                                <button type='button'  className='form-button form-sort-button' onClick={handleSorting}>{buttonText}</button>                                                             
                            </div>
                        </form>
                        <div>{
                             todoList.map((todo) => {
                                return (
                                  <Todo key={todo.id} todo={todo} getItemData={getItemData} fillTodoForm={fillTodoForm}/>
                                );
                              })
                        }</div>
                        
                    </>
                :
                    <></>
            }
       	</div>
  	)  
}

export default App;
