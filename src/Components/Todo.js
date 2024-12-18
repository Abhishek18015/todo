import React, { useEffect, useState } from 'react'
const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist");

    if (lists) {
        return JSON.parse(lists);
    }
    else {
        return [];
    }
}

const Todo = () => {
    const [inputData, setInputData] = useState("");
    const [items, setItems] = useState(getLocalData());
    const [isEditItem, setIsEditItem] = useState(null)
    const [toggleButton, setToggleButton] = useState(false);
    const addItem = () => {
        if (!inputData) {
            alert("please fill the data")

        }
        else if (inputData && toggleButton) {
            setItems(
                items.map((currElem) => {
                    if (currElem.id === isEditItem) {
                        return { ...currElem, name: inputData }
                    }
                    return currElem;
                })
                
            )
            setInputData("");
            setIsEditItem(null);
            setToggleButton(false);
        }
        else {
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputData
            };
            setItems([...items, myNewInputData]);
            setInputData("")
        }
    };
    const editItem = (index) => {
        const item_todo_edited = items.find((currElem) => {
            return currElem.id === index;
        })
        if (item_todo_edited) {
            setInputData(item_todo_edited.name);
            setIsEditItem(index);
            setToggleButton(true); // Indicate we're editing, not adding
        }

    }
    const deleteItem = (index) => {
        const updatedItem = items.filter((currElem) => {
            return currElem.id !== index;
        });
        setItems(updatedItem);
    }
    const removeAll = () => {
        if (window.confirm("Are you sure you want to remove all items from the list?")) {
            setItems([]);
        }
    }
        useEffect(() => {
            localStorage.setItem("mytodolist", JSON.stringify(items))
        }, [items])
        return (
            <>
                <div className="main-div">
                    <div className="child-div">
                        <figure>
                            <i className="fa-solid fa-book"></i>
                            <figcaption>Add Your List Here </figcaption>
                        </figure>
                        <div className="addItems">
                            <input type="text"
                                placeholder='Add Item'
                                className='form-ctrl'
                                value={(inputData)}
                                onChange={(event) => setInputData(event.target.value)} />
                            {toggleButton ? (
                                <i className="fa-regular fa-pen-to-square " onClick={addItem}></i>
                            ) : (
                                <i className="fa-solid fa-plus" onClick={addItem}></i>
                            )
                            }
                      
                        </div>
                        <div className="showItems">
                            {
                                items.map((currElem, index) => {
                                    return (
                                        <div className="eachItem" key={currElem.id}>
                                            <h3>{currElem.name}</h3>
                                            <div className="todoBtn">
                                                <i className="fa-regular fa-pen-to-square " onClick={() => { editItem(currElem.id) }}></i>
                                                <i className="fa-solid fa-trash-can " onClick={() => { deleteItem(currElem.id) }}></i>
                                            </div>
                                        </div>
                                    )
                                })}
                        </div>
                        <button onClick={removeAll}>Remove All</button>
                    </div>
                </div>


            </>
        )
    }

    export default Todo
