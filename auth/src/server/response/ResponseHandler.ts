interface SuccessResponse {
    data: any;
    message: string;
}

const BaseResponse = {
    successResponse: (response: SuccessResponse) => {
        return {
            success: true,
            data: response.data,
            message: response.message,
        };
    },
};

export default BaseResponse;
