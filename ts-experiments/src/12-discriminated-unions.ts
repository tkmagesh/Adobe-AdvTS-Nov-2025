/* 
REST API response
    Success
        data {
            userId
            name
        }
    Error
        message
        code
*/

type SuccessResponse = {
    // discriminant
    type : "success";
    data : {
        userId : number;
        name : string;
    }
}

type ErrorResponse = {
    // discriminant
    type : "error";
    message : string;
    code : number;
}

type ApiResponse = SuccessResponse | ErrorResponse;

function handleResponse(response : ApiResponse) {
    if (response.type === "success"){
        console.log(response.data.userId, response.data.name)

        // should throw compilation error
        //console.log(response.message)

    } else if (response.type === "error") {
        console.error("Error :", response.message, "Code ", response.code)

        // should throw compilation error
        // console.log(response.data.userId)
    }
}