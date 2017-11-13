## Backend Library

This repository contains all the code which runs the
EchoMe backend.  The backend runs in NodeJS and provides
the following API instructions:

| Verbs | Endpoint | Parameters | Description |
| ----- | -------- | ---------- | ----------- |
| POST | `/api/newGroup` | None | Create a new group with a unique group ID |
| POST | `/api/newUserTempToken` | name, groupId | Create a new user with a temporary token |
| GET | `/api/getUserTempToken` | name, groupId | Get the temporary token for an exisiting user |
| GET | `/api/getUser` | temporary token | Get an existing user via his/her temporary token |
| GET | `/api/messages` | name, groupId | Get all messages for an exisiting user |
| POST | `/api/messages` | recipient, groupId, sender, message | Send a message from sender to recipient |
| DELETE | `/api/messages` | messageId | Delete a message by its ID |
| GET | `/api/messages/unread` | name, groupId | Get all unread messages for an exisiting user |
| GET | `/api/products` | product | Get an Amazon affiliates link from a product name |