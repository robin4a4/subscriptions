# Subscriptions

Small app to keep tracks of subscriptions to any kind of services online.

## Deployment

1. Clone this repo
2. Go to railway.com
3. Connect with your github account
4. Add a new project
5. In this project add a new service -> Github repo -> choose the cloned repo
6. In the side panels go to "Variables" and create three variables: `PORT = 3000`, `USERNAME = <your username>` and `PASSWORD = <your password>`
7. In settings you should be able to generate a url for this project in the networking tab
8. Add a new Volume service with a mount path of /app/data
