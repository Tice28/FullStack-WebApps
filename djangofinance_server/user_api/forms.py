from django import forms
from django.contrib.auth.models import User

class CreateUserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['email', 'password']

    def save(self, commit=True) -> User:
        user = super().save(commit=False)
        user.email = self.cleaned_data['email']
        user.set_password(self.cleaned_data['password'])
        if commit:
            user.save()

        return user
    

class TestForm(forms.Form):
    test_input = forms.CharField(label='test' , max_length=10)
    test_num = forms.IntegerField(label='number')
