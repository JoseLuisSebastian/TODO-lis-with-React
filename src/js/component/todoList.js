import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/js/bootstrap";

export function TodoList() {
	const [currentTask, setTask] = useState("");
	const [arrayTask, setArrayTask] = useState([]);

	useEffect(() => {
		getData();
	}, []);

	async function getData() {
		let data = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/alesanchezr",
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				}
			}
		);
		data = await data.json();
		setArrayTask(data);
	}

	async function updateData(tasks) {
		let data = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/alesanchezr",
			{
				method: "PUT",
				body: JSON.stringify(tasks),
				headers: {
					"Content-Type": "application/json"
				}
			}
		);
	}

	function saveTaskFunction() {
		let taskObject = {};
		taskObject["done"] = false;
		taskObject["label"] = currentTask;
		const arrayNewTask = [...arrayTask];
		arrayNewTask.push(taskObject);
		setArrayTask(arrayNewTask);
		updateData(arrayNewTask);
		setTask("");
	}

	const handleInputChangeFunction = event => {
		setTask(event.target.value);
	};

	const deleteTaskFunction = indexToDelete => {
		const arrayNewTask = arrayTask.filter((item, index) => {
			if (index == indexToDelete) {
				return false;
			} else {
				return true;
			}
		});
		updateData(arrayNewTask);
		setArrayTask(arrayNewTask);
	};
	return (
		<div className="container">
			<h2> TODOs </h2>
			<div>
				<input
					type="text"
					indexToDelete
					onChange={handleInputChangeFunction} //Esta pendiente de este input y hacer reaccionar una función que nos creemos entre {}. Cada vez
					//que se escriba algo, se modifique, o eliminen, se va a ejecutar la función handleInputChange
					value={currentTask}
				/>
				<button
					onClick={saveTaskFunction}
					type="button"
					className="btn bg-primary">
					save
				</button>
			</div>

			<ul className="list-group">
				{arrayTask.map((item, index) => {
					return (
						<li key={index} className="list-group-item">
							{item.label}
							<button
								onClick={() => {
									deleteTaskFunction(index);
								}}>
								<i className="fa fa-times" />
							</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
