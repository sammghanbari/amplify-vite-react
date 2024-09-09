
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();
//const { data: all_leads } = await client.models.Leads_Table.list()

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

  const [leads_tbl, setTblLeads] = useState<Array<Schema["Leads_Table"]["type"]>>([]);
  useEffect(() => {
    client.models.Leads_Table.observeQuery().subscribe({
      next: (data) => setTblLeads([...data.items]),
    });
  }, []);
  
/*
	admin
	admin123
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
			{LId = "200"}
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
		
		content: window.prompt("Leads - double check")
		
		client.models.Leads.create({ Lead_PID: LId, Lead_FirstName: FName, Lead_LastName: LName});
		console.log("Lead Created"); 
		
  }

  function createLeads2(){
 		const textBox_LId = document.getElementById("LeadTId") as HTMLInputElement | null;
		const textBox_First = document.getElementById("LeadTName") as HTMLInputElement | null;
		const textBox_Last = document.getElementById("LeadTLastName") as HTMLInputElement | null;
		const textBox_DOB = "2024-05-05";
		
		let LId = 2000;
		let FName: string ;
		let LName: string ; 
		 
		if (textBox_LId == null)
			{LId = 2000}
			else
			 LId = 2001;//textBox_LId.value as number;
			 
		if (textBox_First == null)
			{FName = "Default_fname"}
			else
			FName = textBox_First.value;
			
		if (textBox_Last == null)
			{LName = "Default_lname"}
			else
			LName = textBox_Last.value;
		
		content: window.prompt("TblLeads - double check")
		
		client.models.Leads_Table.create({ LeadId: LId, LeadName: FName, LeadLastName: LName, DOB: textBox_DOB})
		console.log("Lead Created"); 
}


  function deleteLeads(id: string) {
    client.models.Leads.delete({ id })
  }
  
  function deleteLeads2(id: number) {
    client.models.Leads_Table.delete({ LeadId: id })
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
	  <ul>
	  <input type="text" id="LeadId" placeholder="Lead id"/>
	  <input type="text" id="FName" placeholder="First Name"/>
	  <input type="text" id="LName" placeholder="Last Name"/>
	  
	  </ul>
		<li>	
      <button onClick={createLeads2}>+ New Lead2</button>
	  </li>
	  <ul>
        {leads_tbl.map((lead) => (
          <li 
            onClick={() => deleteLeads2(lead.LeadId)}
            key={lead.LeadId}>{lead.LeadName + " &&& "+ lead.LeadLastName}</li>
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
