from django.urls import path
from .views import RegisterView, LoginView, UpdateEmployeeView, DeleteEmployeeView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('update/', UpdateEmployeeView.as_view(), name='update'),
    path('delete/', DeleteEmployeeView.as_view(), name='delete'),
]
