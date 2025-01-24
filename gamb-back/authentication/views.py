from rest_framework import status
from rest_framework.generics import CreateAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from .serializers import ProfileUserSerializer, UserRegistrationSerializer

# from .permissions import *


class RegisterUserView(CreateAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]  # any can register an account

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(
            raise_exception=True
        )  # checks the validations inside the serializer
        self.perform_create(serializer)  # calls the serializer's create method
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ProfileUserView(RetrieveAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = [IsAuthenticated]
    serializer_class = ProfileUserSerializer

    def get(self, request):
        user = request.user
        serializer = self.get_serializer(user)

        return Response(
            data={
                "success": True,
                "data": serializer.data,
                "message": None,
            },
            status=status.HTTP_200_OK,
        )
