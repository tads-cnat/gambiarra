from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
# from .permissions import *

class RegisterUserView(CreateAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny] #any can register an account

    def create(self, request):
        serializer = self.get_serializer(data=request.data) 
        serializer.is_valid(raise_exception=True) #checks the validations inside the serializer


        access_token = serializer.create(validated_data=request.data) #calls the serializer's create method
        #print("ALOUOUOUOU", access_token)

        retorno = {
            "user": serializer.data,
            "access_token": access_token.access_token
        }

        return Response(retorno, status=status.HTTP_201_CREATED)
    

class LogarView(TokenObtainPairView):
    serializer_class = CustomLoginSerializer