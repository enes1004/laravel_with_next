# PostController API Documentation
## Prompt For Claude

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

# Response

## Endpoints

### `GET /api/post`
**Description:** Retrieves a list of all posts with their associated user data.
**Response:** A list of `Post` objects with their `user` relationship loaded.

### `POST /api/post`
**Description:** Stores a new post.
**Request Body:**
- `title`: The title of the post.
- `content`: The content of the post.
**Response:** The newly created `Post` object.

### `GET /api/post/{post}`
**Description:** Retrieves a specific post with its associated user data.
**Parameters:**
- `post`: The ID of the post to retrieve.
**Response:** The requested `Post` object with its `user` relationship loaded.

### `PUT /api/post/{post}`
**Description:** Updates an existing post.
**Parameters:**
- `post`: The ID of the post to update.
**Request Body:**
- `title`: The updated title of the post.
- `content`: The updated content of the post.
**Response:** The updated `Post` object.

### `DELETE /api/post/{post}`
**Description:** Deletes a specific post.
**Parameters:**
- `post`: The ID of the post to delete.
**Response:** No content.

## Middleware
The `auth:sanctum` middleware is applied to all the routes in the `PostController`, which means that the user must be authenticated to access these endpoints.

## Additional Routes
There are also additional routes defined in the `routes/api.php` file that are not part of the `PostController`:

### `GET /api/auth/post/{post?}`
**Description:** Checks if the current user can view a specific post.
**Parameters:**
- `post`: (Optional) The ID of the post to check. If not provided, the response will indicate that the user can view content.
**Response:**
- If `post` is not provided: `{ "ok": true }`
- If `post` is provided and the post ID is less than 10: `{ "ok": false, "reason": "old content only viewable to admin" }`
- If `post` is provided and the post ID is 10 or greater: `{ "ok": true }`

This route is protected by the `auth:sanctum` middleware, so the user must be authenticated to access it.
