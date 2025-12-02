# HTTP, HTTPS, REST API — Summary Guide

---

## 1. What is HTTP?

**HTTP (HyperText Transfer Protocol)**  
A protocol used by clients (browsers, apps, scripts) to communicate with servers.

### Characteristics
- Stateless (server does not remember previous requests)
- Text-based requests and responses
- Supports multiple methods (GET, POST, PUT, DELETE, etc.)
- Runs on port **80**

### Common use cases
- Websites  
- APIs  
- Mobile apps  

---

## 2. What is HTTPS?

**HTTPS (HTTP Secure)**  
Same as HTTP, but with **SSL/TLS encryption**.

### Benefits
- Encrypts data in transmission  
- Protects credentials, tokens, sensitive data  
- Prevents MITM attacks  
- Runs on port **443**  
- Required by most modern APIs  

---

## 3. HTTP vs HTTPS (Quick Table)

| Feature      | HTTP             | HTTPS                |
|--------------|------------------|-----------------------|
| Security     | ❌ No encryption | ✔ Encrypted (TLS)     |
| Port         | 80               | 443                   |
| Data safety  | Low              | High                  |
| Browser icon | "Not secure"     | 🔒 Lock icon          |

---

## 4. What is a REST API?

**REST (Representational State Transfer)** is an architectural style for web services.

### A REST API:
- Uses HTTP(s) methods  
- Returns data in **JSON**  
- Is stateless  
- Uses standard URLs to represent resources  

### Example
GET /users/123

yaml
Copy code

---

## 5. HTTP Methods (Verbs)

### ✔ GET
Retrieve data (should not modify anything)

GET https://api.example.com/users

csharp
Copy code

### ✔ POST
Create new data

POST https://api.example.com/users
{
"name": "John"
}

shell
Copy code

### ✔ PUT
Replace an existing resource

PUT /users/123

shell
Copy code

### ✔ PATCH
Partially update a resource

PATCH /users/123
{ "email": "new@email.com" }

shell
Copy code

### ✔ DELETE
Remove a resource

DELETE /users/123

yaml
Copy code

---

## 6. URL Structure

Example URL:

https://dev.azure.com/myorg/myproject/_apis/wit/workitems?api-version=7.1

yaml
Copy code

### Breakdown
| Part | Meaning |
|------|---------|
| https:// | protocol |
| dev.azure.com | domain / host |
| /myorg/myproject/ | path |
| _apis/wit/workitems | resource |
| ?api-version=7.1 | query parameters |

---

## 7. HTTP Headers (Very Important)

### ✔ Authorization  
Used to authenticate the client.

Examples:
Authorization: Basic <base64_username_password>
Authorization: Bearer <token>
Authorization: PAT <token>

perl
Copy code

### ✔ Content-Type  
Tells the server what format you send:
Content-Type: application/json

perl
Copy code

### ✔ Accept  
Tells the server what format you want back:
Accept: application/json

shell
Copy code

### ✔ User-Agent  
Identifies the client or SDK:
User-Agent: MyApp/1.0

yaml
Copy code

---

## 8. Authentication Types

### 🔑 Basic Auth
Authorization: Basic base64(username:password)

shell
Copy code

### 🔑 Bearer Token (OAuth2)
Authorization: Bearer eyJhbGciOi...

shell
Copy code

### 🔑 API Key / PAT
Authorization: Basic base64(":" + PAT)

yaml
Copy code

### 🔑 Custom Token  
Varies by API.

---

## 9. HTTP Request Body

Typically JSON for REST APIs.

Example:
json
{
  "id": 100,
  "name": "Task A"
}
Rules
GET usually has no body

POST, PUT, PATCH use bodies

---

## 10. HTTP Responses
Structure
Status Code

Headers

Body

Common Status Codes
Code	Meaning
- 200	OK
- 201	Created
- 204	No Content
- 301	Redirect
- 400	Bad Request
- 401	Unauthorized
- 403	Forbidden
- 404	Not Found
- 409	Conflict
- 500	Server Error

---

## 11. JSON Responses
Objects:

json
Copy code
{
  "id": 123,
  "name": "John",
  "active": true
}
Arrays:

json
Copy code
[
  { "id": 1 },
  { "id": 2 }
]

---

## 12. Pagination
APIs limit data per request.

Common strategies
?skip=100&top=50

?page=2

continuationToken

nextLink

---

## 13. Rate Limits (Throttling)
APIs limit:

requests per minute

payload size (e.g., Azure limit: 200 IDs per batch)

If you hit the limit:
retry logic

batching (chunking)

exponential backoff

---

## 14. Batching (Chunking Concept)
Example: limit = 200 IDs
1000 IDs → 5 batches

js
Copy code
function chunkArray(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

---

## 15. HTTPS + REST Best Practices
✔ Always use HTTPS
✔ Validate inputs
✔ Use proper headers (Authorization, Content-Type, Accept)
✔ Handle errors gracefully
✔ Cache when possible
✔ Chunk large datasets
✔ Parse JSON safely

---

## 16. Tools for Working With REST APIs
✔ Postman — manual testing
✔ curl — CLI testing
✔ Browser DevTools — inspect network requests
✔ SDKs — Node.js, Python, C#, Java

---

## 17. Security Considerations
Never log tokens or passwords

Never hardcode tokens

Use secret storage (Vault, environment variables)

Always use HTTPS

Rotate tokens regularly

Limit API scopes (least privilege)
