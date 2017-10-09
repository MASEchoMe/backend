## Backend Library

This repository contains all the code which runs the
EchoMe backend.  The backend runs in NodeJS and provides
the following API instructions:

| Verbs | Endpoint | Parameters | Description |
| ----- | -------- | ---------- | ----------- |
| GET | `/api/users/:userId` | token | Get all messages by user |
| GET | `/api/users/unread/:userId` | token | Get a list of messages which haven't been read yet |
| POST | `/api/messages` | token, message, sender, recipient | Send a message to another user |
| DELETE | `/api/messages/:messageId` | token | Delete message by ID |
| GET | /api/products | token, product | Get an Amazon affiliates link from a product name |