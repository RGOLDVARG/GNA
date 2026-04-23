from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'tier', 'profession', 'country', 'city', 'gna_id', 'avatar', 'certification_status', 'verified_since', 'date_joined', 'bio', 'linkedin_url', 'website_url', 'education', 'experience', 'licenses', 'publications', 'languages', 'expertise', 'is_staff')
        read_only_fields = ('id', 'tier', 'gna_id', 'certification_status', 'verified_since', 'date_joined')

    def get_avatar(self, obj):
        if not obj.avatar:
            return None
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(obj.avatar.url)
        return obj.avatar.url
        
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ('email', 'password', 'first_name', 'last_name', 'profession', 'country', 'city')
        
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['email'], # Use email as username background
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            profession=validated_data.get('profession', ''),
            country=validated_data.get('country', ''),
            city=validated_data.get('city', ''),
        )
        # Create initial ID trigger
        user.save() 
        return user
class AdminUserSerializer(serializers.ModelSerializer):
    """Serializer for administrative tasks - allows editing protected fields."""
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = '__all__'
        read_only_fields = ('id', 'date_joined')

    def get_avatar(self, obj):
        if not obj.avatar:
            return None
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(obj.avatar.url)
        return obj.avatar.url
