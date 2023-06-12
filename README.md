## Endpoints

### POST /api/login

- **Description**: Allows a guest to log in to Hijauin.
- **Input**: email, password
- **Authentication**: No
- **Authorization**: No
- **Response**: User authentication token

---

### POST /api/register

- **Description**: Allows a guest to register a new user in Hijauin.
- **Input**: email, name, address, password, role
- **Authentication**: No
- **Authorization**: No
- **Response**: User registration confirmation

---

### GET /api/communities

- **Description**: Retrieves a list of communities.
- **Authentication**: No
- **Authorization**: No
- **Response**: List of communities

---

### GET /api/communities/{id}

- **Description**: Retrieves the details of a specific community, including its activities and leader.
- **Input**: id
- **Authentication**: No
- **Authorization**: No
- **Response**: Community details

---

### GET /api/v1/dashboard

- **Description**: Retrieves the authorized homepage for an admin.
- **Authentication**: Yes
- **Authorization**: Admin
- **Response**: Admin dashboard

---

### GET /api/v1/communities

- **Description**: Retrieves a list of communities for an admin.
- **Authentication**: Yes
- **Authorization**: Admin
- **Response**: List of communities

---

### GET /api/v1/communities/{id}

- **Description**: Retrieves the details of a specific community for an admin, including its activities and leader.
- **Input**: id
- **Authentication**: Yes
- **Authorization**: Admin
- **Response**: Community details

---

### POST /api/v1/communities

- **Description**: Allows an admin to create a new community.
- **Input**: leader_id, name, location, description
- **Authentication**: Yes
- **Authorization**: Admin
- **Response**: New community details

---

### PATCH /api/v1/communities/{id}

- **Description**: Allows an admin to update the information of a community.
- **Input**: id, leader_id, name, location, description
- **Authentication**: Yes
- **Authorization**: Admin
- **Response**: Updated community details

---

### DELETE /api/v1/communities/{id}

- **Description**: Allows an admin to delete a community.
- **Input**: id
- **Authentication**: Yes
- **Authorization**: Admin
- **Response**: Deletion confirmation

---

### GET /api/v1/communities/{id}/community-members

- **Description**: Retrieves a list of members in a community for an admin.
- **Input**: id
- **Authentication**: Yes
- **Authorization**: Admin
- **Response**: List of community members

---

### POST /api/v1/communities/{id}/community-members

- **Description**: Allows an admin to create a new community user.
- **Input**: users_id, communities_id
- **Authentication**: Yes
- **Authorization**: Admin
- **Response**: New community user details

---

### DELETE /api/v1/community-members/{id}

- **Description**: Allows an admin to delete a community user.
- **Input**: id
- **Authentication**: Yes
- **Authorization**: Admin
- **Response**: Deletion confirmation

---

### GET /api/v2/home

- **Description**: Retrieves the authorized homepage for a user.
- **Authentication**: Yes
- **Authorization**: User
- **Response**: User homepage

---

### GET /api/v2/communities

- **Description**: Retrieves a list of communities for a user.
- **Authentication**: Yes
- **Authorization**: User
- **Response**: List of communities

---

### GET /api/v2/communities/{id}

- **Description**: Retrieves the details of a specific community for a user, including its activities and leader.
- **Input**: id
- **Authentication**: Yes
- **Authorization**: User
- **Response**: Community details

---

### POST /api/v2/communities

- **Description**: Allows a user to create a new community.
- **Input**: leader_id, name, location, description
- **Authentication**: Yes
- **Authorization**: User
- **Response**: New community details

---

### PATCH /api/v2/communities/{id}

- **Description**: Allows a user who is the leader of a community to update the information of that community.
- **Input**: id, leader_id, name, location, description
- **Authentication**: Yes
- **Authorization**: User
- **Response**: Updated community details

---

### POST /api/v2/communities/membership

- **Description**: Allows a user to join a community.
- **Input**: users_id, communities_id
- **Authentication**: Yes
- **Authorization**: User
- **Response**: Membership confirmation

---

### POST /api/v2/communities/activity

- **Description**: Allows a user who is the leader of a community to create a new activity in that community.
- **Input**: id, communities_id, title, description, date, status
- **Authentication**: Yes
- **Authorization**: User
- **Response**: New activity details

---

### PATCH /api/v2/communities/activity/{id}

- **Description**: Allows a user who is the leader of a community to update an activity in that community.
- **Input**: id
- **Authentication**: Yes
- **Authorization**: User
- **Response**: Updated activity
