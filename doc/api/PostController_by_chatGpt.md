# PostController API Documentation


## Prompt For ChatGPT

```
For below laravel code, create an md format API documentation.
Entire response should be in md format and include all documentation inside one md.
It should only document the API for PostController, not models or migrations.
Also, escape all ticks(`) by backslash(\`), so I can manually revert them back to ticks.

// PostController
{省略}
// Post
{省略}
// User
{省略}
//routes/api.php
{省略}
// migration for posts
{省略}
```
## Documentation

### List all Posts

```plaintext
GET /api/post
```

Retrieves a list of all posts with associated user information.

#### Response

```json
[
    {
        "id": "integer",
        "title": "string",
        "content": "string",
        "user_id": "integer",
        "created_at": "timestamp",
        "updated_at": "timestamp",
        "user": {
            "id": "integer",
            "name": "string",
            "email": "string",
            "email_verified_at": "timestamp",
            "created_at": "timestamp",
            "updated_at": "timestamp"
        }
    },
    ...
]
```

### Create a Post

```plaintext
POST /api/post
```

Creates a new post. Requires authentication.

#### Request Body

```json
{
    "title": "string",
    "content": "string"
}
```

#### Response

```json
{
    "id": "integer",
    "title": "string",
    "content": "string",
    "user_id": "integer",
    "created_at": "timestamp",
    "updated_at": "timestamp"
}
```

### Show a Post

```plaintext
GET /api/post/{post_id}
```

Retrieves a specific post by its ID.

#### Response

```json
{
    "id": "integer",
    "title": "string",
    "content": "string",
    "user_id": "integer",
    "created_at": "timestamp",
    "updated_at": "timestamp",
    "user": {
        "id": "integer",
        "name": "string",
        "email": "string",
        "email_verified_at": "timestamp",
        "created_at": "timestamp",
        "updated_at": "timestamp"
    }
}
```

### Update a Post

```plaintext
PUT /api/post/{post_id}
```

Updates an existing post. Requires authentication.

#### Request Body

```json
{
    "title": "string",
    "content": "string"
}
```

#### Response

```json
{
    "id": "integer",
    "title": "string",
    "content": "string",
    "user_id": "integer",
    "created_at": "timestamp",
    "updated_at": "timestamp"
}
```

### Delete a Post

```plaintext
DELETE /api/post/{post_id}
```

Deletes a specific post by its ID. Requires authentication.


