class BookSerializer < ActiveModel::Serializer
  attributes :id, :title, :author, :description, :cover_image_url
end
