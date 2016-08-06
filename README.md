Start Server
------------

```
npm install
node index.js
```

Will listen on `3000`

Client: Say hello
-----------------

```
curl localhost:3000
```

Client: POST with form data
---------------------------

```
curl -X POST -d '{"name":"bbb","email":"bbb.com"}' localhost:3000/user
```

Client: POST with JSON
-----------------------

```
curl -X POST -d '{"name":"bbb","email":"bbb.com"}' -H "Content-Type: application/json" localhost:3000/user
```

Client: Show users
-------------------

```
curl localhost:3000/users
```