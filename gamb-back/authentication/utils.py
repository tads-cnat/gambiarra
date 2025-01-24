from rest_framework.exceptions import AuthenticationFailed
from rest_framework.views import exception_handler
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError


def auth_exception_handler(exc, context):
    # Let DRF handle the standard exception response
    response = exception_handler(exc, context)

    # Customize for InvalidToken or TokenError
    if isinstance(exc, (InvalidToken, TokenError)):
        response.data = {
            "success": False,
            "message": "Token inválido, amigo",
        }

    return response
