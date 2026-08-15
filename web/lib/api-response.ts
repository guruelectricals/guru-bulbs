import { NextResponse } from "next/server";

export class ApiResponse {
 
  static success<T>(
    data: T,
    message = "Success",
    status = 200
  ) {
    return NextResponse.json(
      {
        success: true,
        message,
        data,
      },
      {
        status,
      }
    );
  }

  /**
   * Error Response
   */
  static error(
    message = "Something went wrong",
    status = 500
  ) {
    return NextResponse.json(
      {
        success: false,
        message,
      },
      {
        status,
      }
    );
  }
}