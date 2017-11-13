## Backend Library

* [Request & Response Examples](#request--response-examples)

This repository contains all the code which runs the
EchoMe backend.  The backend runs in NodeJS and provides
the following API instructions:

| Verbs | Endpoint | Parameters | Description |
| ----- | -------- | ---------- | ----------- |
| POST | `/api/newGroup` | None | Create a new group with a unique group ID |
| POST | `/api/newUserTempToken` | name, groupId | Create a new user with a temporary token |
| GET | `/api/getUserTempToken` | name, groupId | Get the temporary token for an exisiting user |
| GET | `/api/getUser` | tempToken | Get an existing user via his/her temporary token |
| GET | `/api/messages` | name, groupId | Get all messages for an exisiting user |
| POST | `/api/messages` | recipient, groupId, sender, message | Send a message from sender to recipient |
| DELETE | `/api/messages` | messageId | Delete a message by its ID |
| GET | `/api/messages/unread` | name, groupId | Get all unread messages for an exisiting user |
| GET | `/api/products` | product | Get an Amazon affiliates link from a product name |

## Request & Response Examples

### POST /api/newGroup

Response body:

    {
        "groupId": "1"
    }
    
### POST /api/newUserTempToken

Response body:

    {
        "tempToken": "1234"
    }
    
### GET /api/getUserTempToken

Response body:

    {
        "tempToken": "1234",
        "name": "Sue",
        "groupId": "1"
    }

### GET /api/getUser

Response body:

    {
        "name": "Sue"
    }
    
### GET /api/messages

Response body:

    [
        {
            "sender_name": "Sue",
            "message": "This is message 1",
            "message_id": 1,
            "create_date": "2017-11-13T03:44:01.000Z"
        },
        {
            "sender_name": "Sue",
            "message": "This is message 2",
            "message_id": 2,
            "create_date": "2017-11-13T03:45:46.000Z"
        },
        .
        .
        .
    ]
    
### POST /api/messages

Response body:

    Successfully added Sue's message to Joe

### DELETE /api/messages

Response body:

    Successfully deleted message 11

### GET /api/messages/unread

Response body:

     [
        {
            "sender_name": "Sue",
            "message": "This is message 1",
            "message_id": 1,
            "create_date": "2017-11-13T03:44:01.000Z"
        },
        {
            "sender_name": "Sue",
            "message": "This is message 2",
            "message_id": 2,
            "create_date": "2017-11-13T03:45:46.000Z"
        },
        .
        .
        .
    ]
    
### GET /api/products

Response body:

    [
        "https://www.amazon.com/Colgate-Adult-Full-Toothbrush-Count/dp/B002YXXZQM?psc=1&SubscriptionId=AKIAI6RASLQCHLXUANVQ&tag=echome0b-20&linkCode=xm2&camp=2025&creative=165953&creativeASIN=B002YXXZQM"
    ]
