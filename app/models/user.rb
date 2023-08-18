class User < ApplicationRecord
    has_secure_password
  
    validates :password, presence: true
    validates :email, presence: true, uniqueness: true
    validates :first_name, length: { minimum: 2 }
    validates :last_name, length: { minimum: 2 }
    validates :username, presence: true
    validates :address, presence: true
    
    has_many :teams
end
