## Backend Library

This repository contains all the code which runs the
EchoMe backend.  The backend runs in NodeJS and provides
the following API instructions:

| Verbs | Endpoint | Parameters | Description |
| ----- | -------- | ---------- | ----------- |
| GET, POST, DELETE | /api/messages | Token, Sender (Post), Receiver (Get,Post,Delete), Message(Post,Delete) | Creating/sending/deleting mesages from inboxes |
| GET | /api/unread | Token, Receiver | Get a list of messages which haven't been read yet |
| GET | /api/products | Token, Product | Get an Amazon affiliates link from a product name |