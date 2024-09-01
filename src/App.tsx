
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const [leads, setLeads] = useState<Array<Schema["Leads"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  useEffect(() => {
    client.models.Leads.observeQuery().subscribe({
      next: (data) => setLeads([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content - updated") });
  }
  
  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }

  
  function createLeads(){
		let l_id = window.prompt("Lead Id");
      client.models.Leads.create({ Lead_PID: l_id, Lead_FirstName: "Sam3", Lead_LastName: "Gha3"});
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
      <button onClick={createLeads}>+ New Lead</button>
      
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
