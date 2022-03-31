# Get Users API
This is an API built with Node.js and Express that retrieves user data from an external API, it then filters and merges this data before returning a list of all users who live in London or whose current location is within 50 miles of London.

## Getting Started
### Prerequisites
This project was built with Node.js (LTS v16.13.2), please ensure you have this and npm correctly installed on your system.

## Running the Application
Clone the repository using the following command:
```bash
git clone https://github.com/burhan-u/get-users.git
```

### Installing Dependencies
To install dependencies, execute the following in the project directory:
```bash
npm install
```

### Starting the Server
To run the application, execute the following:
```bash
npm start
```
The application will then be available on `http://localhost:3000`  

The following endpoints are available:  
`/users` - Returns a list of users  
`/api` - API documentation  
`/healthcheck` - Simple healthcheck endpoint

For more information, please check the API documentation on `http://localhost:300/api`

## Testing
To run the unit tests, execute the following:
```bash
npm test
```
