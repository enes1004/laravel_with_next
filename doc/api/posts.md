# API Documentation

## Posts

### GET /api/post

Retrieve a list of all posts with the associated user information.

**Response**

```json
[
  {
    "id": 1,
    "title": "Post Title",
    "content": "Post content goes here",
    "user_id": 1,
    "created_at": "2023-04-01T12:00:00.000000Z",
    "updated_at": "2023-04-01T12:00:00.000000Z",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "email_verified_at": null,
      "created_at": "2023-04-01T10:00:00.000000Z",
      "updated_at": "2023-04-01T10:00:00.000000Z"
    }
  },
  // ... more posts
]
```

### POST /api/post

Create a new post associated with the authenticated user.

**Request**

```json
{
  "title": "New Post Title",
  "content": "New post content"
}
```

**Response**

```json
{
  "id": 2,
  "title": "New Post Title",
  "content": "New post content",
  "user_id": 1,
  "created_at": "2023-04-02T14:00:00.000000Z",
  "updated_at": "2023-04-02T14:00:00.000000Z",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "email_verified_at": null,
    "created_at": "2023-04-01T10:00:00.000000Z",
    "updated_at": "2023-04-01T10:00:00.000000Z"
  }
}
```

### GET /api/post/{id}

Retrieve a specific post with the associated user information.

**Response**

```json
{
  "id": 1,
  "title": "Post Title",
  "content": "Post content goes here",
  "user_id": 1,
  "created_at": "2023-04-01T12:00:00.000000Z",
  "updated_at": "2023-04-01T12:00:00.000000Z",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "email_verified_at": null,
    "created_at": "2023-04-01T10:00:00.000000Z",
    "updated_at": "2023-04-01T10:00:00.000000Z"
  }
}
```

### PUT /api/post/{id}

Update an existing post.

**Request**

```json
{
  "title": "Updated Post Title",
  "content": "Updated post content"
}
```

**Response**

```json
{
  "id": 1,
  "title": "Updated Post Title",
  "content": "Updated post content",
  "user_id": 1,
  "created_at": "2023-04-01T12:00:00.000000Z",
  "updated_at": "2023-04-02T15:00:00.000000Z",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "email_verified_at": null,
    "created_at": "2023-04-01T10:00:00.000000Z",
    "updated_at": "2023-04-01T10:00:00.000000Z"
  }
}
```

### DELETE /api/post/{id}

Delete a post.

**Response**

```
204 No Content
```

## Authentication

### GET /api/auth/post/{id?}

Check if the authenticated user has access to view a post.

**Response**

- If no `id` is provided:

```json
{
  "ok": true
}
```

- If the `id` is less than 10:

```json
{
  "ok": false,
  "reason": "old content only viewable to admin"
}
```

- Otherwise:

```json
{
  "ok": true
}
```
