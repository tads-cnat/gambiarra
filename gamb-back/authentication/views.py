from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserRegistrationSerializer
from rest_framework.permissions import AllowAny
# from .permissions import *

class RegisterUserView(CreateAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny] #any can register an account

    def create(self, request):
        serializer = self.get_serializer(data=request.data) 
        serializer.is_valid(raise_exception=True) #checks the validations inside the serializer
        self.perform_create(serializer) #calls the serializer's create method
        return Response(serializer.data, status=status.HTTP_201_CREATED)