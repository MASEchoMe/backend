## Backend Library

This repository contains all the code which runs the
EchoMe backend.  The backend runs in NodeJS and provides
the following API instructions:

| Verbs | Endpoint | Parameters | Description |
| ----- | -------- | ---------- | ----------- |
| GET | `/api/users/:userId` | Token | Get all messages by user |
| GET | `/api/users/unread/:userId` | Token | Get a list of messages which haven't been read yet |
| POST | `/api/messages` | Token, Message, Recipient | Send a message to another user |
| DELETE | `/api/messages/:messageId` | Token | Delete message by ID |
| GET | /api/products | Token, Product | Get an Amazon affiliates link from a product name |