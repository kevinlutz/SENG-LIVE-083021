class BookSerializer < ActiveModel::Serializer
  attributes :id, :title, :author, :description, :cover_image_url, :user_book

  def user_book
    current_user.user_books.find_by(book_id: object.id)
  end
end
