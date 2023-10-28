# SERVER

Docker mongoDB:
```
docker run --name mongodb-test-app -p 27017:27017 -v "$(pwd)"/data/db:/data/db --rm -it -d mongo:4.4.14
```

## Project structure

```
src: This is the root directory of the project.

  config: Store configuration files, such as environment variables and database configuration.

  graphql: Organize your GraphQL schema, resolvers, and related files in this directory. You can further subdivide it into:
    types: Define your GraphQL types and schema here.
    resolvers: Store your GraphQL resolvers.
    middleware: Add any custom middleware specific to your GraphQL server.

  models: Define your MongoDB models here. Each model should correspond to a MongoDB collection.

  routes: Handle non-GraphQL HTTP routes and controllers in this folder, if needed. For example, you might have authentication routes or other RESTful endpoints.

  services: Create reusable services that interact with your database, external APIs, or other third-party services. This keeps your business logic separate from your resolvers.

  utils: Store utility functions and helper modules here, like authentication and error-handling utilities.

  main.js: The main entry point of your application. It initializes your server, connects to the database, sets up GraphQL, and starts the server.

migrations (optional): If you plan to use a database migration tool like Knex or Sequelize to manage database schema changes, you can store your migration scripts here.

seeds (optional): If you need to populate your database with initial data for development and testing, keep your seed data scripts in this directory.

tests: Store your unit and integration tests here, organized by modules or features.

logs (optional): If you want to maintain logs of your server's activities, create a folder to store log files.

package.json: The project's configuration file, which includes dependencies, scripts, and other project metadata.

.env: Store environment variables here. Use a tool like dotenv to load these variables into your application.

.gitignore: Specify files and directories that should be ignored by Git in this file. It helps keep sensitive or irrelevant files out of your version control.

Dockerfile and docker-compose.yml (optional): If you plan to containerize your application using Docker, include these files for container configuration.

README.md: Provide documentation for your project, including setup instructions and explanations of the folder structure.
```

## Maintainers
This project was built and maintained by Håkan Sundström.
https://github.com/Sundarenius
