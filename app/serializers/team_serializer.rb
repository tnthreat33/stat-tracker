class TeamSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :address, :wins, :loses, :name, :nickname
end
