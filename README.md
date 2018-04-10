## dk-crud - graphql branch
This branch implements the ui/api using graphql. graphql.js on the backend and apollo client on the front.  
  
#### backend  
graphql.js was used to implement the backend, notably the types, query, mutation and input objects, in grapthql object types with resolve functions. 
  
#### frontend
The frontend was implemented in apollo. Whereas the queries and mutations were fairly straight forward, it was the cache that presented the difficulties. There were tricks to getting the user/:id to hit the users list for the use that already existed in that query collection. Also, the updates would update all items in all queries, but the add/delete mutations required and update section to update the user list. The user list was put in a watchQuery so the user list was automatically updated on add/update/delete. It originally had been in a edit user route resolve, but you can't watchQuery from there. In the end, the original refresh() call could have been used, it being filled from the cache instead of hitting the api, so doesnt' really matter, just that I needed a watchQuery exercise, and that did the trick. 

The question of concurrency comes up with these UI caches. They live isolated from the rest of the users. I imagine an updatedDate or timestamp would suffice, which would generate an error if the updating data didn't have the same value for that. That would be the next version of this: timestamp concurrency. 

#### todo
* timestamp concurrency
* error dialog that uses correct graphql error settings to show both http errors and graphql errors (could be http error as well, but that's configurable).
