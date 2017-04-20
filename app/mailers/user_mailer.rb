class UserMailer < ApplicationMailer

  default from: 'admin@bonagate.com'
 
  def invitation_email(receiver_email, rand_key)
    # @user = user
    @url  = 'http://localhost:3000/sign_up?rand_key&email=receiver_email'
    mail(to: 'basem.muhammad@gmail.com', subject: 'Welcome to Bonagate')
  end

end
