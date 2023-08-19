class UserSerializer < ActiveModel::Serializer
  attributes :id, :address, :email, :username, :first_name, :last_name

  has_many: teams
end
