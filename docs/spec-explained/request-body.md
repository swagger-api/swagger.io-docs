## Describing Request Body

The POST, PUT and PATCH requests can have the request body (payload), such as JSON or XML data. In Swagger terms, the request body is called a **body parameter**. There can be only one body parameter, although the operation may have other parameters (path, query, header).

**Note:** The payload of the `application/x-www-form-urlencoded` and `multipart/form-data` requests is described by using [form parameters](parameters.md#form-parameters), not body parameters. 

The body parameter is defined in the operation’s parameters section and includes the following:

* `in: body`

* `schema` that describes the body data type and structure. The data type is usually an object, but can also be a primitive (such as a string or number) or an array.

* Optional `description`.

* The payload name. It is required but ignored (it is used for documentation purposes only).

### Object Payload (JSON, etc.)

Many APIs transmit data as an object, such as JSON. `schema` for an object should specify `type: object` and properties for that object.

For example, the `POST /users` operation with this JSON body:

```
{
  "userName":  "Trillian",
  "firstName": "Tricia",
  "lastName":  "McMillan"
}
```

can be described as:

```
paths:
  /users:
    post:
      summary: Creates a new user.
      consumes:
        - application/json
      parameters:
        - in: body
          name: user
          description: The user to create.
          schema:
            type: object
            required:
              - userName
            properties:
              userName:
                type: string
              firstName:
                type: string
              lastName:
                type: string
      responses:
        201:
          description: Created
```

**Note:** The name of the body parameter is ignored. It is used for documentation purposes only. 

For a more modular style, you can move the schema definitions to the global `definitions` section and refer to them by using `$ref`:

```
paths:
  /users:
    post:
      summary: Creates a new user.
      consumes:
        - application/json
      parameters:
        - in: body
          name: user
          description: The user to create.
          schema:
            $ref: "#/definitions/User"     # <----------
     responses:
         200:
           description: OK
definitions:
  User:           # <----------
    type: object
    required:
      - userName
    properties:
      userName:
        type: string
      firstName:
        type: string
      lastName:
        type: string
```

### Primitive Body

Want to POST/PUT just a single value? No problem, you can define the body schema type as a primitive, such as a string or number.

Raw request:

```
POST /status HTTP/1.1
Host: api.example.com
Content-Type: text/plain
Content-Length: 42

Time is an illusion. Lunchtime doubly so.
```

Swagger definition:

```
paths:
  /status:
    post:
      summary: Updates the status message.
      consumes:
        - text/plain      # <----------
    parameters:
      - in: body
        name: status
        required: true
        schema:
          type: string  # <----------
    responses:
      200:
        description: Success!
```
