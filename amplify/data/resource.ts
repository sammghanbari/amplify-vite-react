import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { schema as generatedSqlSchema } from './schema.sql';


const sqlSchema = generatedSqlSchema
.renameModels(() => [
	["tblContacts", "Contacts_Table"], 
	["tblLeads","Leads_Table"], 
	])
      .setAuthorization((models) => [
	  models.Leads_Table.authorization(allow => [allow.guest()]),
	  models.Contacts_Table.authorization(allow=> [allow.guest()])
	  ]);
	  


// Add a global authorization rule

/*
const sqlSchema = generatedSqlSchema.authorization(allow => allow.guest())

  .addToSchema({Q
    listLeads: a.query()
      // reference custom types added to the schema
      .returns(a.ref("TblLeads").array())
      .handler(a.handler.inlineSql(
          `SELECT
            LeadId,
            LeadName,
            LeadLastName,
            DOB
          FROM tblLeads;`
      ))
      .authorization(allow => [allow.guest()]),


      // Define custom types to provide end-to-end typed results
      // for custom queries / mutations
      //TblLeads: a.customType({
      //  LeadTId: a.integer(),
      //  LeadTName: a.string(),
      //  LeadTLastName: a.string(),
      //  DOB: a.date(),
      //})
  })
  */
/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),
  Leads: a
  .model({
      Lead_PID: a.string(),
      Lead_FirstName: a.string(),
      Lead_LastName: a.string()
  }).authorization((allow) => [allow.publicApiKey()]),
});

//const sqlSchema = generatedSqlSchema.authorization(allow => allow.guest());

const combinedSchema = a.combine([schema, sqlSchema]);

// export type Schema = ClientSchema<typeof schema>; //Old line
export type Schema = ClientSchema<typeof combinedSchema>;



export const data = defineData({
  schema:combinedSchema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
  
/*  
const sqlSchema = generatedSqlSchema.setAuthorization((models) => [
  // Model-level authorization rules
  models.event.authorization((allow) => [allow.publicApiKey()]),
  // Field-level authorization rules
  models.event.fields.id.authorization(allow => [allow.publicApiKey(), allow.guest()]),
  models.event.fields.created_at.authorization(allow => [allow.publicApiKey(), allow.guest()])
]);
*/
});

/*
const schema_lead = a.schema ({
  Leads: a
  .model({
      Lead_PID: a.string(),
      Lead_FirstName: a.string(),
      Lead_LastName: a.string()
  }).authorization((allow) => [allow.publicApiKey()]),
});

export type SchemaLead = LeadSchema<typeof schema_lead>;

export const data = defineData({
  schema_lead,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
}); */

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
