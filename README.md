# API Spec

## Authentication

### Login

Request :

- Method : POST
- Endpoint : `/api/login`
- Body :

```json
{
  "email": "string, unique",
  "password": "string"
}
```

Response :

```json
{
  "message": {
    "id": "integer, unique",
    "name": "string",
    "email": "string",
    "address": "string",
    "role": "string"
  },
  "token": "string"
}
```

### Register

Request :

- Method : POST
- Endpoint : `/api/register`
- Body :

```json
{
  "name": "string",
  "email": "string, unique",
  "address": "string",
  "password": "string"
}
```

Response :

```json
{
    {
    "data": {
        "email": "string",
        "name": "string",
        "address": "string"
    },
    "token": "string",
    "message": "Registration Success"
}
}
```

---

<br><br>

## Community

### Get All Communities in Hijauin

Request :

- Method : GET
- Endpoint guest: `/api/communities`
- Endpoint admin: `/api/v1/communities`
- Endpoint admin: `/api/v2/communities`

Response :

```json
{
  "success": "boolean",
  "message": "SUCCESS",
  "communityData": [
    {
      "id": "integer",
      "name": "string",
      "location": "string",
      "postal_code": "string",
      "image": "string",
      "leader_id": "integer",
      "leader_name": "string"
    },
    {
      "id": "integer",
      "name": "string",
      "location": "string",
      "postal_code": "string",
      "image": "string",
      "leader_id": "integer",
      "leader_name": "string"
    }
  ]
}
```

### Get Community Detail

Request :

- Method : GET
- Endpoint guest: `/api/communities/{id}`
- Endpoint admin: `/api/v1/communities/{id}`
- Endpoint admin: `/api/v2/communities/{id}`

Response :

```json
{
  "success": "boolean",
  "status": "string",
  "message": "string",
  "communityDetail": {
    "id": "integer",
    "name": "string",
    "location": "string",
    "postal_code": "string",
    "image": "string",
    "description": "text"
  },
  "communityActivities": [
    {
      "title": "string",
      "description": "string",
      "date": "date",
      "status": "string"
    }
  ],
  "communityLeader": {
    "id": "integer",
    "name": "string"
  }
}
```

---

### Create New Community

Request :

- Method : POST
- Endpoint admin: `/api/v1/communities`
- Endpoint user: `/api/v2/communities`
- Header
  Authorization: Bearer token

- Body :

```json
{
  "name": "string",
  "leader_id": "integer",
  "location": "string",
  "postal_code": "string",
  "image": "string",
  "description": "text"
}
```

Response :

```json
{
  "success": "boolean",
  "status": "string",
  "message": "string",
  "communityDetail": {
    "id": "integer",
    "name": "string",
    "location": "string",
    "postal_code": "string",
    "image": "string",
    "description": "text"
  },
  "communityActivities": [
    {
      "title": "string",
      "description": "string",
      "date": "date",
      "status": "string"
    }
  ],
  "communityLeader": {
    "id": "integer",
    "name": "string"
  }
}
```

---

### Update Community

Request :

- Method : PATCH
- Endpoint admin: `/api/v1/communities/{id}`
- Endpoint user: `/api/v2/communities/{id}`
- Header
  Authorization: Bearer token

- Body :

```json
{
  "name": "string",
  "leader_id": "integer",
  "location": "string",
  "postal_code": "string",
  "image": "string",
  "description": "text"
}
```

Response :

```json
{
  "success": "boolean",
  "status": "string",
  "message": "string",
  "data": {
    "id": "integer",
    "name": "string",
    "location": "string",
    "description": "text",
    "leader_id": "integer",
    "image": "string",
    "postal_code": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

---

### Delete Community

Request :

- Method : DELETE
- Endpoint: `/api/v1/communities/{id}`
- Header
  Authorization: Bearer token

Response :

```json
{
  "status": "boolean",
  "message": "string"
}
```

---

## Community Members

### Get Community Member List

Request :

- Method : GET
- Endpoint admin: `/api/v1/communities/{id}/community-members`
- Endpoint user: `/api/v2/communities/{id}/community-members`
- Header
  Authorization: Bearer token

Response :

```json
{
    "success": boolean,
    "message": "string",
    "communityMembers": [
        {
            "id": integer,
            "name": "string",
            "address": "string",
            "email": "string",
            "users_id": integer
        },
        {
            "id": integer,
            "name": "string",
            "address": "string",
            "email": "string",
            "users_id": integer
        }
    ]
}
```

---

### Create New Community Member (User self-enrollment or added by admin)

Request :

- Method : POST
- Endpoint admin: `/api/v1/communities/{id}/community-members`
- Endpoint user: `/api/v2/communities/{id}/community-members`
- Header
  Authorization: Bearer token

- Body

```json
{
  "users_id": "integer",
  "community_role": "string"
}
```

Response :

```json
{
  "success": "boolean",
  "message": "string",
  "data": {
    "id": "integer",
    "users_id": "integer",
    "communities_id": "integer",
    "community_role": "string",
    "updatedAt": "2023-06-14T19:34:19.693Z",
    "createdAt": "2023-06-14T19:34:19.693Z"
  }
}
```

---

### Delete Community Member

Request :

- Method : DELETE
- Endpoint admin: `/api/v1/communities/{communityId}/community-members/{memberId}`
- Header
  Authorization: Bearer token

Response :

```json
{
  "status": "string",
  "message": "string"
}
```

---

## Community Activities

### Create New Activity

Request :

- Method : POST
- Endpoint: `/api/v2/communities/{communityId}/activity`
- Header
  Authorization: Bearer token
  -Body:

```json
{
  "title": "string ",
  "description": " text",
  "date": "date",
  "status": "string"
}
```

Response :

```json
{
  "status": "string",
  "message": "string",
  "data": {
    "id": "integer",
    "communities_id": "integer",
    "title": "string",
    "date": "date",
    "description": " text",
    "status": "string",
    "updatedAt": "date",
    "createdAt": "date"
  }
}
```

---

### Update Activity

Request :

- Method : PATCH
- Endpoint: `/api/v2/communities/{communityId}/activity/{activityId}`
- Header
  Authorization: Bearer token
  -Body:

```json
{
  "title": "string",
  "description": " text",
  "date": "date",
  "status": "string"
}
```

Response :

```json
{
  "success": "boolean",
  "status": "string",
  "message": "string",
  "data": {
    "id": "integer",
    "communities_id": "integer",
    "title": "string",
    "description": " text",
    "date": "date",
    "status": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

---

### Delete Activity

Request :

- Method : DELETE
- Endpoint: `/api/v2/communities/{communityId}/activity/{activityId}`
- Header
  Authorization: Bearer token

Response :

```json
{
  "status": "string",
  "message": "string"
}
```

---
