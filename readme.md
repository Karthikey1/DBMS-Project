# Community Connect - Full Stack Application

## 🌟 Project Overview

Community Connect is a social platform designed to help individuals who have moved away from their hometowns for work or education stay connected with their cultural roots. The platform enables users to find and join communities based on cultural, regional, or linguistic backgrounds, organize cultural events, share local recipes, and interact through a dedicated social feed.

### 🎯 Key Features
- **Community Management**: Create, join, and manage cultural communities
- **Social Feed**: Share posts and experiences within communities
- **Event Management**: Organize and participate in cultural events
- **User Profiles**: Personalized user profiles with hometown information
- **Admin Dashboard**: Comprehensive data management interface

## 🏗️ Project Structure

### Frontend (React)
```
community-connect/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── common/          # Reusable UI components
│   │   ├── auth/           # Authentication components
│   │   ├── communities/    # Community-related components
│   │   ├── posts/          # Post management components
│   │   └── events/         # Event management components
│   ├── pages/              # Main application pages
│   ├── context/            # React context for state management
│   ├── services/           # API service layers
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions and constants
│   └── styles/             # CSS stylesheets
└── configuration files
```

### Backend (Spring Boot - To be implemented)
```
backend/
├── src/main/java/
│   ├── controller/         # REST API controllers
│   ├── service/           # Business logic layer
│   ├── repository/        # Data access layer
│   ├── entity/            # JPA entities
│   ├── dto/               # Data transfer objects
│   └── config/            # Configuration classes
├── src/main/resources/
│   └── application.properties
└── pom.xml
```

## 🚀 Frontend Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation
1. Clone the repository
2. Navigate to the frontend directory
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open http://localhost:3000 in your browser

### Frontend Features
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Professional interface with smooth animations
- **State Management**: React Context for authentication
- **API Integration**: Axios for HTTP requests
- **Routing**: React Router for navigation

## 🔧 Backend Development Guide

### Database Schema

#### User Table
```sql
CREATE TABLE user (
    user_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    uname VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    birth_date DATE,
    phone_numbers VARCHAR(20),
    home_town VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Community Table
```sql
CREATE TABLE community (
    community_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    cname VARCHAR(100) NOT NULL,
    description TEXT,
    user_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);
```

#### Members Table (Join Table)
```sql
CREATE TABLE members (
    membership_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    joined_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    role ENUM('admin', 'moderator', 'member') DEFAULT 'member',
    user_id BIGINT,
    community_id BIGINT,
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (community_id) REFERENCES community(community_id),
    UNIQUE KEY unique_membership (user_id, community_id)
);
```

#### Post Table
```sql
CREATE TABLE post (
    post_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id BIGINT,
    community_id BIGINT,
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (community_id) REFERENCES community(community_id)
);
```

#### Event Table
```sql
CREATE TABLE event (
    event_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    event_title VARCHAR(200) NOT NULL,
    event_description TEXT,
    event_date TIMESTAMP NOT NULL,
    location VARCHAR(255) NOT NULL,
    user_id BIGINT,
    community_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (community_id) REFERENCES community(community_id)
);
```

## 📡 API Endpoints Specification

### Base URL: `http://localhost:8080/api`

### 1. User Endpoints

#### GET `/api/user`
- **Description**: Get all users
- **Response**: Array of user objects
- **Sample Response**:
```json
[
  {
    "user_id": 1,
    "uname": "John Doe",
    "email": "john@example.com",
    "birth_date": "1990-01-01",
    "phone_numbers": "+1234567890",
    "home_town": "New York"
  }
]
```

#### GET `/api/user/{id}`
- **Description**: Get user by ID
- **Parameters**: `id` (path parameter)
- **Response**: User object

#### POST `/api/user`
- **Description**: Create new user
- **Request Body**:
```json
{
  "uname": "John Doe",
  "email": "john@example.com",
  "password": "hashedpassword",
  "birth_date": "1990-01-01",
  "phone_numbers": "+1234567890",
  "home_town": "New York"
}
```

#### PUT `/api/user/{id}`
- **Description**: Update user
- **Parameters**: `id` (path parameter)
- **Request Body**: User object with updated fields

#### DELETE `/api/user/{id}`
- **Description**: Delete user
- **Parameters**: `id` (path parameter)

### 2. Community Endpoints

#### GET `/api/community`
- **Description**: Get all communities
- **Response**: Array of community objects
- **Sample Response**:
```json
[
  {
    "community_id": 1,
    "cname": "New York Expats",
    "description": "Community for New Yorkers abroad",
    "user_id": 1,
    "creator_name": "John Doe",
    "member_count": 5
  }
]
```

#### GET `/api/community/{id}`
- **Description**: Get community by ID
- **Parameters**: `id` (path parameter)

#### POST `/api/community`
- **Description**: Create new community
- **Request Body**:
```json
{
  "cname": "New York Expats",
  "description": "Community for New Yorkers abroad",
  "user_id": 1
}
```

#### GET `/api/user/{id}/communities`
- **Description**: Get all communities a user has joined
- **Parameters**: `id` (user ID path parameter)

### 3. Membership Endpoints

#### POST `/api/members/join`
- **Description**: Join a community
- **Request Body**:
```json
{
  "user_id": 1,
  "community_id": 1,
  "role": "member"
}
```

#### DELETE `/api/members/leave/{membershipId}`
- **Description**: Leave a community
- **Parameters**: `membershipId` (path parameter)

#### GET `/api/community/{id}/members`
- **Description**: Get all members of a community
- **Parameters**: `id` (community ID path parameter)
- **Sample Response**:
```json
[
  {
    "membership_id": 1,
    "user_id": 1,
    "uname": "John Doe",
    "role": "admin",
    "joined_on": "2024-01-15T10:30:00Z"
  }
]
```

### 4. Post Endpoints

#### GET `/api/community/{id}/posts`
- **Description**: Get all posts for a community
- **Parameters**: `id` (community ID path parameter)
- **Sample Response**:
```json
[
  {
    "post_id": 1,
    "title": "Welcome Post",
    "content": "Welcome to our community!",
    "created_at": "2024-01-15T10:30:00Z",
    "user_id": 1,
    "author_name": "John Doe",
    "community_id": 1
  }
]
```

#### POST `/api/post`
- **Description**: Create new post
- **Request Body**:
```json
{
  "title": "Welcome Post",
  "content": "Welcome to our community!",
  "user_id": 1,
  "community_id": 1
}
```

#### DELETE `/api/post/{id}`
- **Description**: Delete post
- **Parameters**: `id` (post ID path parameter)

### 5. Event Endpoints

#### GET `/api/event`
- **Description**: Get all events
- **Response**: Array of event objects
- **Sample Response**:
```json
[
  {
    "event_id": 1,
    "event_title": "Cultural Festival",
    "event_description": "Annual cultural festival",
    "event_date": "2024-02-15T18:00:00Z",
    "location": "Community Center",
    "user_id": 1,
    "organizer_name": "John Doe",
    "community_id": 1
  }
]
```

#### POST `/api/event`
- **Description**: Create new event
- **Request Body**:
```json
{
  "event_title": "Cultural Festival",
  "event_description": "Annual cultural festival",
  "event_date": "2024-02-15T18:00:00Z",
  "location": "Community Center",
  "user_id": 1,
  "community_id": 1
}
```

#### GET `/api/community/{id}/events`
- **Description**: Get all events for a community
- **Parameters**: `id` (community ID path parameter)

#### DELETE `/api/event/{id}`
- **Description**: Delete event
- **Parameters**: `id` (event ID path parameter)

## 🔌 Frontend-Backend Integration

### CORS Configuration
The backend needs to configure CORS to accept requests from the frontend:

```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins("http://localhost:3000")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}
```

### Environment Configuration
Create `application.properties`:

```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/community_connect
spring.datasource.username=your_username
spring.datasource.password=your_password

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# Server Configuration
server.port=8080

# CORS (adjust for production)
cors.allowed-origins=http://localhost:3000
```

## 🗃️ Sample Data for Testing

### Users
```sql
INSERT INTO user (uname, email, password, birth_date, phone_numbers, home_town) VALUES
('John Doe', 'john@example.com', 'hashedpassword1', '1990-01-01', '+1234567890', 'New York'),
('Jane Smith', 'jane@example.com', 'hashedpassword2', '1992-05-15', '+1234567891', 'Los Angeles'),
('Mike Johnson', 'mike@example.com', 'hashedpassword3', '1988-11-20', '+1234567892', 'Chicago');
```

### Communities
```sql
INSERT INTO community (cname, description, user_id) VALUES
('New York Expats', 'Community for people from New York living abroad', 1),
('California Dreamers', 'Californians connecting around the world', 2),
('Texas Worldwide', 'Keeping Texas culture alive everywhere', 1);
```

## 🛠️ Development Notes

### Frontend Development
- The frontend uses mock data when the backend is unavailable
- All API calls are handled through service layers in `src/services/`
- Authentication state is managed using React Context
- Components are designed to be reusable and modular

### Backend Development Priorities
1. **Set up basic Spring Boot project** with MySQL connection
2. **Implement User entity and CRUD operations**
3. **Implement Community and Membership functionality**
4. **Add Post and Event management**
5. **Implement authentication and authorization**
6. **Add validation and error handling**

### Testing the Integration
1. Start the Spring Boot backend on port 8080
2. The frontend will automatically proxy API calls to the backend
3. Update the service files to remove mock data once backend is ready
4. Test all CRUD operations through the UI

## 🚨 Important Notes for Backend Developer

1. **Use consistent response formats** across all endpoints
2. **Implement proper error handling** with meaningful error messages
3. **Add input validation** for all request bodies
4. **Consider pagination** for endpoints that return lists
5. **Implement proper security** (authentication/authorization)
6. **Use DTOs** to control what data is exposed through the API
7. **Add comprehensive logging** for debugging



