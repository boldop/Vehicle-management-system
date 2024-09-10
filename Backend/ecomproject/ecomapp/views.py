from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
# from .products import products
from .models import Products
from .serializer import ProductsSerializer,UserSerializer,UserSerializerWithToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status

# for sending mails and generate token
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_decode,urlsafe_base64_encode
from .utils import TokenGenerator,generate_token
from django.utils.encoding import force_bytes,force_text,DjangoUnicodeDecodeError
from django.core.mail import EmailMessage
from django.conf import settings
from django.views.generic import View
import threading


class EmailThread(threading.Thread):
    def __init__(self,email_message):
        self.email_message=email_message
        threading.Thread.__init__(self)

    def run(self):
        self.email_message.send()

# Create your views here.
@api_view(['GET'])
def getRoutes(request):
    return Response('Hello Anees')


@api_view(['GET'])
def getProducts(request):
    products=Products.objects.all()
    serializer=ProductsSerializer(products,many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request,pk):
    product=Products.objects.get(_id=pk)
    serializer=ProductsSerializer(product,many=False)
    return Response(serializer.data)



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer=UserSerializerWithToken(self.user).data
        for k,v in serializer.items():
            data[k]=v       
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class=MyTokenObtainPairSerializer




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def  getUserProfiles(request):
    user=request.user
    serializer=UserSerializer(user,many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users=User.objects.all()
    serializer=UserSerializer(users,many=True)
    return Response(serializer.data)


@api_view(['POST'])
def registerUser(request):
    data=request.data
    try:
        user= User.objects.create(first_name=data['fname'],last_name=data['lname'],username=data['email'],email=data['email'],password=make_password(data['password']),is_active=False)
      
        # generate token for sending mail
        email_subject="Activate Your Account"
        message=render_to_string(
            "activate.html",
           {
            'user':user,
            'domain':'127.0.0.1:8000',
            'uid':urlsafe_base64_encode(force_bytes(user.pk)),
            'token':generate_token.make_token(user)
           }

        )
        # print(message)
        email_message=EmailMessage(email_subject,message,settings.EMAIL_HOST_USER,[data['email']])
        EmailThread(email_message).start()
        message={'detail':'Activate your account please check the mail'}
        return Response(message)
    
    except Exception as e:
        message={'details':'User with this email already exist'}
        return Response(message)



class ActivateAccountView(View):
    def get(self,request,uidb64,token):
        try:
            uid=force_text(urlsafe_base64_decode(uidb64))
            user=User.objects.get(pk=uid)
        except Exception as identifier:
            user=None
        if user is not None and generate_token.check_token(user,token):
            user.is_active=True
            user.save()
            return render(request,"activatesuccess.html")
        else:
            return render(request,"activatefail.html")   
        

import hmac
import hashlib
from django.conf import settings

def generate_esewa_signature(fields, secret_key):
    # Sort the fields alphabetically by their keys
    sorted_fields = sorted(fields.items())
    
    # Create the signing string by concatenating the field names and their values
    signing_string = ';'.join([f'{key}={value}' for key, value in sorted_fields])
    
    # Generate HMAC-SHA256 signature
    signature = hmac.new(
        key=secret_key.encode('utf-8'),  # Secret key from eSewa
        msg=signing_string.encode('utf-8'),  # The signing string
        digestmod=hashlib.sha256  # HMAC-SHA256 algorithm
    ).hexdigest()
    
    return signature

# Example usage
def get_esewa_payment_data():
    secret_key = settings.ESEWA_SECRET_KEY  # Get secret key from Django settings
    
    # Fields you want to include in the signature (make sure they match signed_field_names)
    fields = {
        'total_amount': '1000',
        'transaction_uuid': 'unique-transaction-id',
        'product_code': 'EPAYTEST',
        # You can add more fields if necessary
    }
    
    # Generate signature
    signature = generate_esewa_signature(fields, secret_key)
    
    # Add the signature to the form data to be sent to eSewa
    form_data = {
        'amount': '1000',
        'tax_amount': '0',
        'total_amount': '1000',
        'transaction_uuid': 'unique-transaction-id',
        'product_code': 'EPAYTEST',
        'product_service_charge': '0',
        'product_delivery_charge': '0',
        'success_url': 'http://localhost:3000/paymentSuccess',
        'failure_url': 'http://localhost:3000/paymentFailed',
        'signed_field_names': 'total_amount,transaction_uuid,product_code',
        'signature': signature  # Add generated signature
    }
    
    return form_data
