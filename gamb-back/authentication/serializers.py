from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from authentication.constants import GrupoEnum

User = get_user_model()  # gets the AUTH_USER_MODEL from settings.py


class UserRegistrationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[
            UniqueValidator(queryset=User.objects.all())
        ],  # checks if the email is unique
    )
    password1 = serializers.CharField(
        write_only=True, required=True, validators=[validate_password]
    )
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = (
            "username",
            "email",
            "password1",
            "password2",
        )  # fields to put in the register process

    def validate(self, attrs):  # checks and validate the password
        if attrs["password1"] != attrs["password2"]:
            raise serializers.ValidationError(
                {"password": "Senhas precisam ser iguais."}
            )
        return attrs

    def create(self, validated_data):  # creates and saves the user
        validated_data.pop("password2")
        cliente, created = Group.objects.get_or_create(name=GrupoEnum.CLIENTE)

        user = User(
            username=validated_data["username"],
            email=validated_data["email"],
            grupo=cliente,
        )
        user.set_password(
            validated_data["password1"]
        )  # used this instead of create_user method to make sure the password is hashed
        user.save()
        # user.groups.add(cliente)    #VER COM O PESSOAL SE VAMOS QUERER ISSO AQUI MESMO(ACUMULAR GRUPOS)
        return user


class ProfileUserSerializer(serializers.ModelSerializer):
    imagem = serializers.SerializerMethodField()
    grupo = serializers.CharField(source="grupo.name", read_only=True)

    class Meta:
        model = User
        fields = [
            "id",
            "is_superuser",
            "username", 
            "first_name",
            "last_name",
            "email",
            "is_staff",
            "is_active",
            "grupo",
            "imagem"
        ]
        
    def get_imagem(self, obj):
        request = self.context.get('request')
        if obj.imagem:
            return request.build_absolute_uri(obj.imagem.url) if request else settings.MEDIA_URL + str(obj.imagem)
        return request.build_absolute_uri(settings.MEDIA_URL + "Padrao/perfil_padrao.png") if request else settings.MEDIA_URL + "perfil_padrao.png"



class ListarUsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "grupo"]

class AlterarCargoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id"]
 