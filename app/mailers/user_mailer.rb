class UserMailer < ApplicationMailer

  default from: 'admin@bonagate.com'
 
  def invitation_email(receiver_email, rand_key)
    # @user = user
    @url  = "http://localhost:3000/users/new#?invitation_code="+rand_key
    mail(to: receiver_email, subject: 'Welcome to Bonagate')
  end

end
