from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.hashers import make_password, check_password

from .models import Employee
from .serializers import EmployeeSerializer

# Register API
class RegisterView(APIView):
    def post(self, request):
        print("hih")
        data = request.data
        data['password'] = make_password(data['password'])  # Hash password
        serializer = EmployeeSerializer(data=data)
        print(data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Login API
class LoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        try:
            user = Employee.objects.get(username=username)
            if check_password(password, user.password):
                refresh = RefreshToken.for_user(user)

                # ✅ Ensure we are NOT generating a new access token unnecessarily
                access_token = str(refresh.access_token) 

                print("\n--- GENERATED TOKENS ---")
                print("Backend Refresh Token:", refresh)
                print("Backend Access Token:", access_token)
                print("-------------------------\n")

                return Response({
                    "refresh": str(refresh),
                    "access": access_token  # ✅ Ensuring we return the correct access token
                })
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        except Employee.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        try:
            user = Employee.objects.get(username=username)
            if check_password(password, user.password):
                # Check if the user already has an active refresh token
                refresh = RefreshToken.for_user(user)

                # ✅ Debugging
                print("\n--- GENERATED TOKENS ---")
                print("Backend Refresh Token:", refresh)
                print("Backend Access Token:", refresh.access_token)
                print("-------------------------\n")

                return Response({
                    "refresh": str(refresh),
                    "access": str(refresh.access_token)
                })
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        except Employee.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        try:
            user = Employee.objects.get(username=username)
            if check_password(password, user.password):
                refresh = RefreshToken.for_user(user)
                
                # ✅ Print tokens for debugging
                print("Generated Access Token:", refresh.access_token)
                print()
                print("Generated Refresh Token:", refresh)
                
                return Response({
                    "refresh": str(refresh),
                    "access": str(refresh.access_token)
                })
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        except Employee.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

# Update API (JWT protected)
class UpdateEmployeeView(APIView):
    
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        serializer = EmployeeSerializer(user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Employee details updated"})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Delete API (JWT protected)
class DeleteEmployeeView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        user = request.user
        user.delete()
        return Response({"message": "Account deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
