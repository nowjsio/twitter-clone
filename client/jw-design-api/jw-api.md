# Design API

### step : sketch (메서드, req, res, description)

|   | get  | post  | put  | delete  | delete|
|---|---|---|---|---| --- |
| /         |   |   |   |   |   |
| /user:id  |   |   |   |   |   | 
| /login    |   |   |   |   |   |

### answer
1. schema
    ```json
    {
      id: string,  // 트윗 아이디
      text: string,  // 트윗 텍스트
      createdAt: Date, // 트윗 생성 날짜
      name: string,  // 사용자 이름
      username: string,  // 사용자 닉네임 (아이디)
      url: string (optional) // 사용자 프로파일 사진 URL
    }
    ```
2. api
    1. GET /tweets
        * Response 200
            ```json
            {
               [tweet, tweet ....] 
            }
            ``` 
    2. POST /tweets
        * request 200 (creating new tweet)
        
            ```json
            {
                text,
                name,
                username,
                url, (optinal)  
            }
            ``` 
        * Response 201
            ```json
            {
               tweet
            }
            ``` 
    3. put /tweets/:id
        * request 200 (updating new tweet)
            ```json
            {
               text
            }
            ``` 
        * Response 200
            ```json
            {
               tweet
            }
            ``` 
