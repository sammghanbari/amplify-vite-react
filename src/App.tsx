
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  const [leads, setLeads] = useState<Array<Schema["Leads"]["type"]>>([]);
  useEffect(() => {
    client.models.Leads.observeQuery().subscribe({
      next: (data) => setLeads([...data.items]),
    });
  }, []);
/*
  const textBox = document.createElement("input");
	textBox.type = "text";
	textBox.placeholder = "Enter your email";
	textBox.maxLength = 50;
	document.getElementsByTagName('body')[0].appendChild(textBox);

		//let l_id = window.prompt("Lead Id");
      // <input type="text" id="LeadId" placeholder="Enter lead id"></input>

	let nameTextBox = document.getElementById("name") as HTMLInputElement;
		nameTextBox.addEventListener("input", () => {
		console.log("User entered: " + nameTextBox.value);
	});
*/

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content - updated") });
  }
  
  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }

  
  function createLeads(){
		const textBox_LId = document.getElementById("LeadId") as HTMLInputElement | null;
		const textBox_First = document.getElementById("FName") as HTMLInputElement | null;
		const textBox_Last = document.getElementById("LName") as HTMLInputElement | null;
		
		let LId: string;
		let FName: string ;
		let LName: string ; 
		
		 
		if (textBox_LId == null)
			{LId = "100"}
			else
			 LId = textBox_LId.value;
			 
		if (textBox_First == null)
			{FName = "Default_fname"}
			else
			FName = textBox_First.value;
			
		if (textBox_Last == null)
			{LName = "Default_lname"}
			else
			LName = textBox_Last.value;
			
		client.models.Leads.create({ Lead_PID: LId, Lead_FirstName: FName, Lead_LastName: LName});
		console.log("Lead Created");
		
  }

  function deleteLeads(id: string) {
    client.models.Leads.delete({ id })
  }
  

  return (
        
    <Authenticator>
      {({ signOut }) => (
      
    <main>
      <h1>My ToDo's</h1>
	  <div>
      <button onClick={createTodo}>+ New Todo</button>      
	  <ul>
        {todos.map((todo) => (
          <li 
            onClick={() => deleteTodo(todo.id)}
            key={todo.id}>{todo.content}</li>
        ))}
      </ul>
	  </div>
	  <div>
	  <ul>
	  <input type="text" id="LeadId" placeholder="Lead id"/>
	  <input type="text" id="FName" placeholder="First Name"/>
	  <input type="text" id="LName" placeholder="Last Name"/>
	  
	  </ul>
		<li>	
      <button onClick={createLeads}>+ New Lead</button>
	  </li>
	  <ul>
        {leads.map((lead) => (
          <li 
            onClick={() => deleteLeads(lead.id)}
            key={lead.id}>{lead.Lead_FirstName + " "+ lead.Lead_LastName}</li>
        ))}
      </ul>
	  </div>
	  
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
	  </div>
      <div>
      <br/>
        Newly Updated by Developer to Check for Status Committs.
      </div>
      <button onClick={signOut}>Sign outout</button>
    </main>
          
      )}
    </Authenticator>
  );
}

export default App;
