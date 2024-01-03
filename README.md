# API Routes

### Registration

method:POST

```jsx
https://text-backend.vercel.app/user/register
```

### Input

In Body.JSON

```jsx
{
    "name":"arpit",
    "email":"text@gmail.com",
    "password":1
}
```

Response:

```jsx
{
    "success": true,
    "_id": "65959112aedc42edfd0a42f0",
    "name": "arpit",
    "email": "text@gmail.com",
    "pic": "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OTU5MTEyYWVkYzQyZWRmZDBhNDJmMCIsImlhdCI6MTcwNDMwMDgxOCwiZXhwIjoxNzA2ODkyODE4fQ.vDXgyiHNBBqK8x_WpgXDO_ViU6YSxGFWIpKOeaeCuPo"
}
```

### Login

method:POST

```jsx
https://text-backend.vercel.app/user/login
```

### Input

body.JSON

```jsx
{
    "email":"text2@gmail.com",
    "password":"1"
}
```

## Respnse:

```jsx
{
    "_id": "6595b269aaed9c1e942d70aa",
    "name": "arpit",
    "email": "text2@gmail.com",
    "pic": "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OTViMjY5YWFlZDljMWU5NDJkNzBhYSIsImlhdCI6MTcwNDMwOTY3OCwiZXhwIjoxNzA2OTAxNjc4fQ.Xms0cBfniFKeD7QQm-TsrsTIAi2lI_hCYTfbogc08e8"
}
```

### Creating text

### API

method:POST

```jsx
https://text-backend.vercel.app/edit/create
```

### Input

```jsx
Headers:
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OTU0MzZlZjg0NWIxODU2ZWU5NGQwMiIsImlhdCI6MTcwNDI4MDk0MiwiZXhwIjoxNzA2ODcyOTQyfQ.kuMGNdIp8q5olCVlvQsXa5r5MzQp0rkaEF3O73M8Ua0
```

```jsx
{
    "name":"text-1"
}
```

Response

```jsx
{
    "success": true,
    "data": "Created successfully:",
    "text": {
        "user": "6595b269aaed9c1e942d70aa",
        "name": "text-3",
        "content": "",
        "_id": "6595b70859e669876cb21d17",
        "createdAt": "2024-01-03T19:35:36.521Z",
        "updatedAt": "2024-01-03T19:35:36.521Z",
        "__v": 0
    }
}
```

### Fetching all text

### API

method:GET

```jsx
https://text-backend.vercel.app/edit/
```

### Input

```jsx
Headers:
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OTU0MzZlZjg0NWIxODU2ZWU5NGQwMiIsImlhdCI6MTcwNDI4MDk0MiwiZXhwIjoxNzA2ODcyOTQyfQ.kuMGNdIp8q5olCVlvQsXa5r5MzQp0rkaEF3O73M8Ua0
```

Response

```jsx
{
    "success": true,
    "listOfNotes": [
        {
            "_id": "6595b6b68155f94288a38419",
            "user": "6595b269aaed9c1e942d70aa",
            "name": "text-1",
            "content": "",
            "createdAt": "2024-01-03T19:34:14.707Z",
            "updatedAt": "2024-01-03T19:34:14.707Z",
            "__v": 0
        },
        {
            "_id": "6595b6cd4396ab0433fab416",
            "user": "6595b269aaed9c1e942d70aa",
            "name": "text-2",
            "content": "",
            "createdAt": "2024-01-03T19:34:37.028Z",
            "updatedAt": "2024-01-03T19:34:37.028Z",
            "__v": 0
        },
        {
            "_id": "6595b70859e669876cb21d17",
            "user": "6595b269aaed9c1e942d70aa",
            "name": "text-3",
            "content": "",
            "createdAt": "2024-01-03T19:35:36.521Z",
            "updatedAt": "2024-01-03T19:35:36.521Z",
            "__v": 0
        }
    ]
}
```

### Update Text

method: POST

### Input

```jsx
{
    "content":"hello everyone",
    "textID":"6595b70859e669876cb21d17"
}
```

```jsx
Headers:
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OTU0MzZlZjg0NWIxODU2ZWU5NGQwMiIsImlhdCI6MTcwNDI4MDk0MiwiZXhwIjoxNzA2ODcyOTQyfQ.kuMGNdIp8q5olCVlvQsXa5r5MzQp0rkaEF3O73M8Ua0
```

Response

```json
{
    "success": true,
    "data": "updated successfully:",
    "text": {
        "_id": "6595b70859e669876cb21d17",
        "user": "6595b269aaed9c1e942d70aa",
        "name": "text-3",
        "content": "hello everyone",
        "createdAt": "2024-01-03T19:35:36.521Z",
        "updatedAt": "2024-01-03T20:07:46.467Z",
        "__v": 0
    }
}
```

Delete Text

method: POST

Input

```jsx
Headers:
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OTU0MzZlZjg0NWIxODU2ZWU5NGQwMiIsImlhdCI6MTcwNDI4MDk0MiwiZXhwIjoxNzA2ODcyOTQyfQ.kuMGNdIp8q5olCVlvQsXa5r5MzQp0rkaEF3O73M8Ua0
```

```
{
    "id":"6595b70859e669876cb21d17"
}
```

Response

```json
{
    "success": true,
    "message": {
        "acknowledged": true,
        "deletedCount": 1
    }
}
```