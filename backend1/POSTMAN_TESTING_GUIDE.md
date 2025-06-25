# Postman Testing Guide for Placement Training API

## Server Information
- **Base URL**: `http://localhost:3000`
- **Port**: 3000
- **Database**: MongoDB (connected)

## Available Endpoints

### 1. Health Check
**GET** `http://localhost:3000/api/health`
- **Description**: Check if server is running
- **Headers**: None required
- **Expected Response**: 
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

### 2. Get All Users
**GET** `http://localhost:3000/api/users`
- **Description**: Retrieve all registered users
- **Headers**: None required
- **Expected Response**: Array of user objects

### 3. Create New User
**POST** `http://localhost:3000/api/users`
- **Description**: Register a new student
- **Headers**: 
  - `Content-Type: application/json`
- **Body** (raw JSON):
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "age": 22,
  "phone": "1234567890",
  "skills": ["JavaScript", "React", "Node.js"],
  "education": {
    "degree": "B.Tech",
    "institution": "Example University",
    "graduationYear": 2024
  }
}
```

### 4. Update User
**PUT** `http://localhost:3000/api/users/:id`
- **Description**: Update existing user
- **Headers**: 
  - `Content-Type: application/json`
- **Body**: Same as POST

### 5. Delete User
**DELETE** `http://localhost:3000/api/users/:id`
- **Description**: Delete user by ID

### 6. Get Skills
**GET** `http://localhost:3000/api/skills`
- **Description**: Get available skills list

### 7. Get Training Modules
**GET** `http://localhost:3000/api/training-modules`
- **Description**: Get training modules

### 8. Get Placement Stats
**GET** `http://localhost:3000/api/placement-stats`
- **Description**: Get placement statistics

## Postman Configuration Steps

### Step 1: Create a New Collection
1. Open Postman
2. Click "New" → "Collection"
3. Name it "Placement Training API"

### Step 2: Set Collection Variables
1. Go to Collection settings
2. Add variable:
   - **Variable**: `baseUrl`
   - **Initial Value**: `http://localhost:3000`
   - **Current Value**: `http://localhost:3000`

### Step 3: Create Requests

#### Health Check Request
1. **Method**: GET
2. **URL**: `{{baseUrl}}/api/health`
3. **Headers**: None

#### Get Users Request
1. **Method**: GET
2. **URL**: `{{baseUrl}}/api/users`
3. **Headers**: None

#### Create User Request
1. **Method**: POST
2. **URL**: `{{baseUrl}}/api/users`
3. **Headers**: 
   - Key: `Content-Type`
   - Value: `application/json`
4. **Body**: 
   - Select "raw"
   - Select "JSON" from dropdown
   - Use the JSON example above

### Step 4: Test Cases

#### Test 1: Health Check
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response has correct structure", function () {
    const response = pm.response.json();
    pm.expect(response).to.have.property('status');
    pm.expect(response).to.have.property('message');
    pm.expect(response.status).to.eql('OK');
});
```

#### Test 2: Create User
```javascript
pm.test("Status code is 201", function () {
    pm.response.to.have.status(201);
});

pm.test("User created successfully", function () {
    const response = pm.response.json();
    pm.expect(response).to.have.property('_id');
    pm.expect(response).to.have.property('name');
    pm.expect(response).to.have.property('email');
    
    // Store user ID for later tests
    pm.collectionVariables.set("userId", response._id);
});
```

#### Test 3: Get Users
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response is an array", function () {
    const response = pm.response.json();
    pm.expect(response).to.be.an('array');
});
```

## Common Issues and Solutions

### Issue 1: "Connection refused"
**Solution**: 
- Make sure backend server is running: `cd backend1 && npm start`
- Check if port 3000 is available

### Issue 2: "CORS error"
**Solution**: 
- Backend has CORS configured to allow all origins
- If still getting CORS errors, check browser console for details

### Issue 3: "Invalid JSON"
**Solution**:
- Ensure Content-Type header is set to `application/json`
- Validate JSON syntax in request body
- Use proper JSON format (double quotes, no trailing commas)

### Issue 4: "Missing required fields"
**Solution**:
- Ensure all required fields are provided: `name`, `email`, `age`
- Check field names match exactly (case-sensitive)

### Issue 5: "Email already exists"
**Solution**:
- Email field must be unique
- Use a different email address for testing

## Sample Test Data

### Valid User Data
```json
{
  "name": "Alice Johnson",
  "email": "alice.johnson@example.com",
  "age": 23,
  "phone": "9876543210",
  "skills": ["Python", "Django", "PostgreSQL"],
  "education": {
    "degree": "B.E",
    "institution": "Tech University",
    "graduationYear": 2023
  }
}
```

### Minimal User Data (Required fields only)
```json
{
  "name": "Bob Smith",
  "email": "bob.smith@example.com",
  "age": 21
}
```

## Environment Setup

### Development Environment
- **Base URL**: `http://localhost:3000`
- **Database**: MongoDB Atlas (cloud)
- **CORS**: Enabled for all origins

### Production Environment (if needed)
- **Base URL**: `https://your-domain.com`
- **Database**: MongoDB Atlas
- **CORS**: Configure for specific domains

## Troubleshooting

1. **Check server logs** in terminal for detailed error messages
2. **Verify MongoDB connection** in backend console
3. **Test with curl** first: `curl http://localhost:3000/api/health`
4. **Check Postman console** for request/response details
5. **Validate JSON** using online JSON validator

## Success Indicators

✅ Server responds to health check  
✅ GET /api/users returns array  
✅ POST /api/users creates user with 201 status  
✅ User appears in GET /api/users response  
✅ All endpoints return proper JSON  
✅ No CORS errors in browser console  